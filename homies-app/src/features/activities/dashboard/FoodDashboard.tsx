import React, { useEffect, useContext } from "react";

import { Grid } from "semantic-ui-react";
import FoodList from "./FoodList";
import { observer } from "mobx-react-lite";

import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

const FoodDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { loadMeals, loadingInitial } = rootStore.foodStore;

  useEffect(() => {
    loadMeals();
  }, [loadMeals]);

  if (loadingInitial) return <LoadingComponent content="Loading Meals.." />;

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
