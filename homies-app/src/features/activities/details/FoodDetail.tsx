import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";

import FoodStore from "../../../app/stores/foodStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import FoodDetailedHeader from "./FoodDetailedHeader";
import { FoodDetailedInfo } from "./FoodDetailedInfo";
import { FoodDetailedPictures } from "./FoodDetailedPictures";
import { FoodDetailedSidebar } from "./FoodDetailedSidebar";

interface DetailParams {
  id: string;
}

const FoodDetail: React.FC<RouteComponentProps<DetailParams>> = ({ match }) => {
  const foodStore = useContext(FoodStore);
  const { mealDetail: food, viewMealDetail, loadingInitial } = foodStore;

  useEffect(() => {
    viewMealDetail(match.params.id);
  }, [viewMealDetail, match.params.id]);

  if (loadingInitial)
    return <LoadingComponent content="Loading Meal.."></LoadingComponent>;

  if (!food) return <h2>Not Found</h2>;

  return (
    <Grid>
      <Grid.Column width={10}>
        <FoodDetailedHeader meal={food}></FoodDetailedHeader>
        <FoodDetailedInfo meal={food}></FoodDetailedInfo>
        <FoodDetailedPictures meal={food}></FoodDetailedPictures>
      </Grid.Column>
      <Grid.Column width={6}>
        <FoodDetailedSidebar></FoodDetailedSidebar>
      </Grid.Column>
    </Grid>
  );
};

export default observer(FoodDetail);
