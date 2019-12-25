import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext } from "react";
import { IFood } from "../modules/food";
import agent from "../api/agent";

configure({ enforceActions: "always" });

export class FoodStore {
  @observable mealRegistry = new Map();

  @observable meals: IFood[] = [];
  @observable selectedMeal: IFood | undefined;

  @observable loadingInitial = false;
  @observable editMode = false;

  @observable submitting = false;

  @computed get mealsByDate() {
    return Array.from(this.mealRegistry.values()).sort(
      (a, b) => a.Price - b.Price
    );
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
    } catch (error) {
      //log the error.
      console.log(error);

      runInAction("load meals error", () => {
        this.loadingInitial = false;
      });
    }
  };

  @action createMeal = async (food: IFood) => {
    this.submitting = true;

    try {
      await agent.Foods.create(food);

      runInAction("create Meal", () => {
        this.mealRegistry.set(food.Id, food);
        this.editMode = false;
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
        this.selectedMeal = food;

        this.editMode = false;
        this.submitting = false;
      });
    } catch (error) {
      console.log(error);

      runInAction("editing Meals Error", () => {
        this.submitting = false;
      });
    }
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedMeal = undefined;
  };

  @action openEditForm = (id: string) => {
    this.selectedMeal = this.mealRegistry.get(id);
    this.editMode = true;
  };

  @action cancelSeletectedMeal = () => {
    this.selectedMeal = undefined;
  };

  @action cancelFormOpen = () => {
    this.editMode = false;
  };

  @action selectMeal = (id: string) => {
    this.selectedMeal = this.mealRegistry.get(id);
    this.editMode = false;
  };
}

export default createContext(new FoodStore());
