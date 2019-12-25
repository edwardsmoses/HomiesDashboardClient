import React, { useEffect, Fragment, useContext } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "../../features/nav/Navbar";
import FoodDashboard from "../../features/activities/dashboard/FoodDashboard";
import LoadingComponent from "./LoadingComponent";

import { observer } from "mobx-react-lite";

import FoodStore from "../stores/foodStore";

const App = () => {
  const foodStore = useContext(FoodStore);

  useEffect(() => {
    foodStore.loadMeals();
  }, [foodStore]);

  if (foodStore.loadingInitial)
    return <LoadingComponent content="Loading Meals.." inverted={true} />;

  return (
    <Fragment>
      <Navbar />

      <Container style={{ marginTop: "7em" }}>
        <FoodDashboard />
      </Container>
    </Fragment>
  );
};

export default observer(App);
