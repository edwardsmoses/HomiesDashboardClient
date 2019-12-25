import React, { useContext } from "react";
import { Grid } from "semantic-ui-react";
import FoodList from "./FoodList";
import FoodDetail from "../details/FoodDetail";
import FoodForm from "../form/FoodForm";
import { observer } from "mobx-react-lite";

import FoodStore from "../../../app/stores/foodStore";

const FoodDashboard: React.FC = () => {
  const foodStore = useContext(FoodStore);

  const { editMode, selectedMeal } = foodStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <FoodList></FoodList>
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedMeal && !editMode && <FoodDetail />}
        {editMode && (
          <FoodForm
            key={(selectedMeal && selectedMeal.Id) || 0}
            food={selectedMeal!}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(FoodDashboard);
