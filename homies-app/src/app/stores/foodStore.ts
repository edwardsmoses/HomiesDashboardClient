import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext } from "react";
import { IFood } from "../modules/food";
import agent from "../api/agent";

configure({ enforceActions: "always" });

export class FoodStore {
  @observable mealRegistry = new Map();

  @observable mealDetail: IFood | null = null;

  @observable loadingInitial = false;

  @observable submitting = false;

  @computed get mealsByCategory() {
    return this.groupMealsByCategory(Array.from(this.mealRegistry.values()));
  }

  groupMealsByCategory(meals: IFood[]) {
    const sortedMeals = meals.sort((a, b) =>
      this.SortCategoryNames(a.CategoryName, b.CategoryName)
    );
    return Object.entries(
      sortedMeals.reduce((meals, meal) => {
        const CategoryName = meal.CategoryName;
        meals[CategoryName] = meals[CategoryName]
          ? [...meals[CategoryName], meal]
          : [meal];
        return meals;
      }, {} as { [key: string]: IFood[] })
    );
  }

  SortCategoryNames(a: string, b: string) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    return a > b ? -1 : b > a ? 1 : 0;
  }

  @action loadMeals = async () => {
    this.loadingInitial = true;

    try {
      //get a list of foods.
      const foods = await agent.Foods.list();

      runInAction("loading meals", () => {
        foods.forEach(meal => {
          this.mealRegistry.set(meal.Id, meal);
        });
        this.loadingInitial = false;
      });

      console.log(this.groupMealsByCategory(foods));
    } catch (error) {
      //log the error.
      console.log(error);

      runInAction("load meals error", () => {
        this.loadingInitial = false;
      });
    }
  };

  @action viewMealDetail = async (id: string) => {
    let meal = this.getMeal(id);
    if (meal) {
      this.mealDetail = meal;
    } else {
      this.loadingInitial = true;

      try {
        //get the food detail
        meal = await agent.Foods.details(id);

        runInAction("mealDetail", () => {
          this.mealDetail = meal;
          this.loadingInitial = false;
        });
      } catch (error) {
        console.log(error);

        runInAction("mealDetailError", () => {
          this.loadingInitial = false;
        });
      }
    }
  };

  @action clearMealDetail = () => {
    this.mealDetail = null;
  };

  //helper method to get the meal detail from the Observable Map
  getMeal = (id: string) => {
    return this.mealRegistry.get(id);
  };

  @action createMeal = async (food: IFood) => {
    this.submitting = true;

    try {
      await agent.Foods.create(food);

      runInAction("create Meal", () => {
        this.mealRegistry.set(food.Id, food);
        this.submitting = false;
      });
    } catch (error) {
      runInAction("create meal Error", () => {
        this.submitting = false;
      });

      console.log(error);
    }
  };

  @action editMeal = async (food: IFood) => {
    this.submitting = true;

    try {
      await agent.Foods.update(food);

      runInAction("editing Meals", () => {
        this.mealRegistry.set(food.Id, food);
        this.mealDetail = food;

        this.submitting = false;
      });
    } catch (error) {
      console.log(error);

      runInAction("editing Meals Error", () => {
        this.submitting = false;
      });
    }
  };

  @action cancelSeletectedMeal = () => {
    this.mealDetail = null;
  };

  @action selectMeal = (id: string) => {
    this.mealDetail = this.mealRegistry.get(id);
  };
}

export default createContext(new FoodStore());
