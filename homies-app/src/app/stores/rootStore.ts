import FoodStore from "./foodStore";
import UserStore from "./userStore";
import FoodCategoryStore from "./foodCategoryStore";
import { createContext } from "react";
import { configure } from "mobx";
import CommonStore from "./commonStore";
import ModalStore from "./modalStore";

configure({ enforceActions: "always" });

export class RootStore {
  foodStore: FoodStore;
  foodCategoryStore: FoodCategoryStore;
  userStore: UserStore;
  commonStore: CommonStore;
  modalStore: ModalStore;

  constructor() {
    this.foodStore = new FoodStore(this);
    this.foodCategoryStore = new FoodCategoryStore(this);
    this.userStore = new UserStore(this);
    this.commonStore = new CommonStore(this);
    this.modalStore = new ModalStore(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
