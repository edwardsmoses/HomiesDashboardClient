import React, { useEffect, useContext } from "react";

import { Grid } from "semantic-ui-react";
import FoodList from "./FoodList";
import { observer } from "mobx-react-lite";

import FoodStore from "../../../app/stores/foodStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const FoodDashboard: React.FC = () => {
  const foodStore = useContext(FoodStore);

  useEffect(() => {
    foodStore.loadMeals();
  }, [foodStore]);

  if (foodStore.loadingInitial)
    return <LoadingComponent content="Loading Meals.." inverted={true} />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <FoodList></FoodList>
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Meals Filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(FoodDashboard);
