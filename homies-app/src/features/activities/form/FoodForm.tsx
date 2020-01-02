import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Icon, Grid } from "semantic-ui-react";
import { IFood } from "../../../app/modules/food";

import FoodStore from "../../../app/stores/foodStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

interface DetailParams {
  id: string;
}

const FoodForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const foodStore = useContext(FoodStore);
  const {
    createMeal,
    editMeal,
    submitting,
    mealDetail: initFood,
    viewMealDetail,
    clearMealDetail
  } = foodStore;

  const [food, setFood] = useState<IFood>({
    Id: "",
    Name: "",
    CategoryName: "",
    Description: "",
    Price: 0,
    PriceInCurrency: "",
    PictureUrl: "",
    FullPictureUrl: "",
    Pictures: [],
    Currency: ""
  });

  useEffect(() => {
    if (match.params.id && food.Id.length === 0) {
      viewMealDetail(match.params.id).then(() => {
        initFood && setFood(initFood);
      });
    }

    return () => {
      clearMealDetail();
    };
  }, [
    viewMealDetail,
    clearMealDetail,
    match.params.id,
    initFood,
    food.Id.length
  ]);

  const handleInputChanges = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setFood({ ...food, [name]: value });
  };

  const handleSubmit = () => {
    if (food.Id.length === 0) {
      let newFood = {
        ...food,
        id: ""
      };
      createMeal(newFood).then(() => history.push(`/meals/${newFood.Id}`));
    } else {
      editMeal(food).then(() => history.push(`/meals/${food.Id}`));
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <Form onSubmit={handleSubmit}>
            <Form.Input
              onChange={handleInputChanges}
              name="Name"
              placeholder="Meal Name"
              value={food.Name}
            />
            <Form.Input
              onChange={handleInputChanges}
              name="CategoryName"
              placeholder="Category"
              value={food.CategoryName}
            />
            <Form.TextArea
              onChange={handleInputChanges}
              name="Description"
              placeholder="Description"
              value={(food.Description && food.Description) || ""}
            />
            <Form.Input
              onChange={handleInputChanges}
              name="Price"
              placeholder="Price (in naira)"
              type="number"
              value={food.Price}
            />

            <Button
              loading={submitting}
              floated="right"
              positive
              type="submit"
              icon
              labelPosition="right"
            >
              Save Meal
              <Icon name="arrow right"></Icon>
            </Button>

            <Button
              floated="right"
              onClick={() => history.push("/meals")}
              type="button"
              content="Cancel"
            />
          </Form>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(FoodForm);
