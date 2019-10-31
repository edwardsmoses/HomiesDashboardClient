import React from "react";
import { Grid } from "semantic-ui-react";
import { IFood } from "../../../app/modules/food";
import FoodList from "./FoodList";
import FoodDetail from "../details/FoodDetail";
import FoodForm from "../form/FoodForm";

interface IProps {
  activities: IFood[];
  selectFood: (id: string) => void;
  selectedFood: IFood | null;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
  setSelectedFood: (activity: IFood | null) => void;
  createFood: (food: IFood) => void;
  editFood: (food: IFood) => void;
}

const FoodDashboard: React.FC<IProps> = ({
  activities,
  selectFood,
  selectedFood,
  editMode,
  setEditMode,
  setSelectedFood,
  createFood,
  editFood
}) => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <FoodList foods={activities} selectFood={selectFood}></FoodList>
      </Grid.Column>
      <Grid.Column width={6}>
        {selectedFood && !editMode && (
          <FoodDetail
            food={selectedFood}
            setEditMode={setEditMode}
            setSelectedFood={setSelectedFood}
          />
        )}
        {editMode && (
          <FoodForm
            key={(selectedFood && selectedFood.id) || 0}
            setEditMode={setEditMode}
            food={selectedFood!}
            createFood={createFood}
            editFood={editFood}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default FoodDashboard;
