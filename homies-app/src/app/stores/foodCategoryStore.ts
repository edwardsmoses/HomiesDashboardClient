import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext } from "react";
import { IFoodCategory } from "../modules/foodCategory";
import agent from "../api/agent";
import { ISelect } from "../modules/ISelect";

configure({ enforceActions: "always" });

export class categoriestore {
  @observable categoryRegistry = new Map();

  @observable categoryDetail: IFoodCategory | null = null;

  @observable loadingInitial = false;

  @observable submitting = false;

  @computed get allCategories() {
    return Array.from(this.categoryRegistry.values());
  }

  @computed get categoriesSelectList() {
    var selectList = this.TransformCategoriesToSelectList();
    return selectList;
  }

  TransformCategoriesToSelectList = () => {
    var selectList: ISelect[] = [];
    var arrayCategories = Array.from(this.categoryRegistry.values());
    arrayCategories.forEach(m => {
      let selectSingle = {} as ISelect;
      selectSingle.key = m.Id;
      selectSingle.text = m.Name;
      selectSingle.value = m.Id;

      selectList.push(selectSingle);
    });
    return selectList;
  };

  @action loadCategories = async () => {
    this.loadingInitial = true;

    try {
      //get a list of Categories.
      const categories = await agent.FoodCategory.list();

      runInAction("loading categories", () => {
        categories.forEach(category => {
          this.categoryRegistry.set(category.Id, category);
        });
        this.loadingInitial = false;
      });
    } catch (error) {
      //log the error.
      console.log(error);

      runInAction("load categories error", () => {
        this.loadingInitial = false;
      });
    }
  };

  @action viewcategoryDetail = async (id: string) => {
    let category = this.getcategory(id);
    if (category) {
      this.categoryDetail = category;
    } else {
      this.loadingInitial = true;

      try {
        //get the category detail
        category = await agent.FoodCategory.details(id);

        runInAction("categoryDetail", () => {
          this.categoryDetail = category;
          this.loadingInitial = false;
        });
      } catch (error) {
        runInAction("categoryDetailError", () => {
          this.loadingInitial = false;
        });
        console.log(error);
      }
    }
  };

  @action clearCategories = () => {
    this.categoryRegistry.clear();
  };

  //helper method to get the category detail from the Observable Map
  getcategory = (id: string) => {
    return this.categoryRegistry.get(id);
  };

  @action createcategory = async (category: IFoodCategory) => {
    this.submitting = true;

    try {
      await agent.FoodCategory.create(category);

      runInAction("create category", () => {
        this.categoryRegistry.set(category.Id, category);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("create category Error", () => {
        this.submitting = false;
      });

      console.log(error);
    }
  };

  @action editcategory = async (category: IFoodCategory) => {
    this.submitting = true;

    try {
      await agent.FoodCategory.update(category);

      runInAction("editing categories", () => {
        this.categoryRegistry.set(category.Id, category);
        this.categoryDetail = category;

        this.submitting = false;
      });
    } catch (error) {
      console.log(error);

      runInAction("editing categories Error", () => {
        this.submitting = false;
      });
    }
  };

  @action cancelSeletectedcategory = () => {
    this.categoryDetail = null;
  };

  @action selectcategory = (id: string) => {
    this.categoryDetail = this.categoryRegistry.get(id);
  };
}

export default createContext(new categoriestore());
