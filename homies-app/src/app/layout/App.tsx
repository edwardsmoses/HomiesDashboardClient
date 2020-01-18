import React, { Fragment, useContext, useEffect } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "../../features/nav/Navbar";
import FoodDashboard from "../../features/activities/dashboard/FoodDashboard";

import { observer } from "mobx-react-lite";

import { ToastContainer } from "react-toastify";

import {
  Route,
  withRouter,
  RouteComponentProps,
  Switch
} from "react-router-dom";
import FoodForm from "../../features/activities/form/FoodForm";
import FoodDetail from "../../features/activities/details/FoodDetail";
import NotFound from "./NotFound";
import CategoryDashboard from "../../features/categories/dashboard/CategoryDashboard";
import { LoginForm } from "../../features/user/LoginForm";
import HomePage from "../../features/home/HomePage";
import { RootStoreContext } from "../stores/rootStore";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;

  useEffect(() => {
    if (token) {
      getUser().finally(() => setAppLoaded());
    } else {
      setAppLoaded();
    }
  }, [setAppLoaded, token, getUser]);

  if (!appLoaded) return <LoadingComponent content="App is loading...." />;

  return (
    <Fragment>
      <ModalContainer></ModalContainer>
      <ToastContainer position="bottom-right"></ToastContainer>

      <Route exact path="/" component={HomePage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <Navbar />

            <Container style={{ marginTop: "7em" }}>
              <Switch>
                <Route
                  path="/categories"
                  exact
                  component={CategoryDashboard}
                ></Route>

                <Route path="/meals" exact component={FoodDashboard}></Route>
                <Route path="/meals/:id" exact component={FoodDetail}></Route>

                <Route
                  key={location.key}
                  path={["/createMeal", "/editMeal/:id"]}
                  component={FoodForm}
                ></Route>
                <Route component={LoginForm} path="/login"></Route>

                <Route component={NotFound}></Route>
              </Switch>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
