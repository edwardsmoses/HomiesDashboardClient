import React, { useState, FormEvent, useContext } from "react";
import { Segment, Form, Button, Icon } from "semantic-ui-react";
import { IFood } from "../../../app/modules/food";

import FoodStore from "../../../app/stores/foodStore";
import { observer } from "mobx-react-lite";

interface IProps {
  food: IFood;
}

const FoodForm: React.FC<IProps> = ({ food: initFood }) => {
  const foodStore = useContext(FoodStore);
  const { createMeal, editMeal, submitting, cancelFormOpen } = foodStore;

  const createMealForm = () => {
    if (initFood) {
      return initFood;
    } else {
      return {
        Id: "",
        Name: "",
        CategoryName: "",
        Description: "",
        Price: 0,
        PriceInCurrency: "",
        currency: "",
        PictureUrl: "",
        FullPictureUrl: "",
        Pictures: [],
        Currency: ""
      };
    }
  };

  const [food, setFood] = useState<IFood>(createMealForm);

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
      createMeal(newFood);
    } else {
      editMeal(food);
    }
  };

  return (
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
          onClick={() => cancelFormOpen()}
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default observer(FoodForm);
