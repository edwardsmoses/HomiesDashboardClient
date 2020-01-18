import { observable, computed, action, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../modules/user";
import agent from "../api/agent";
import { RootStore } from "./rootStore";
import { history } from "../..";

export default class UserStore {
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable user: IUser | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.login(values);

      runInAction("set the User", () => {
        this.user = user;
      });
      this.rootStore.commonStore.setToken(user.Token);
      this.rootStore.modalStore.closeModal();
      history.push("/meals");
    } catch (error) {
      throw error;
    }
  };

  @action register = async (values: IUserFormValues) => {
    try {
      const user = await agent.User.register(values);
      this.rootStore.commonStore.setToken(user.Token);
      this.rootStore.modalStore.closeModal();
      history.push("/meals");
    } catch (error) {
      throw error;
    }
  };

  @action getUser = async () => {
    try {
      const user = await agent.User.current();
      runInAction("get current user", () => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  @action logOut = () => {
    this.rootStore.commonStore.setToken(null);
    this.user = null;
    history.push("/");
  };
}
