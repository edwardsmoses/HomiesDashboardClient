import React, { useState, FormEvent } from "react";
import { Segment, Form, Button, Icon } from "semantic-ui-react";
import { IFood } from "../../../app/modules/food";
import { v4 as uuid } from "uuid";

interface IProps {
  setEditMode: (editMode: boolean) => void;
  food: IFood;
  createFood: (food: IFood) => void;
  editFood: (food: IFood) => void;
}

const FoodForm: React.FC<IProps> = ({
  setEditMode,
  food: initFood,
  createFood,
  editFood
}) => {
  const createMealForm = () => {
    if (initFood) {
      return initFood;
    } else {
      return {
        id: "",
        name: "",
        CategoryName: "",
        description: "",
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
    if (food.id.length === 0) {
      let newFood = {
        ...food,
        id: uuid()
      };
      createFood(newFood);
    } else {
      editFood(food);
    }
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          onChange={handleInputChanges}
          name="name"
          placeholder="Meal Name"
          value={food.name}
        />
        <Form.Input
          onChange={handleInputChanges}
          name="CategoryName"
          placeholder="Category"
          value={food.CategoryName}
        />
        <Form.TextArea
          onChange={handleInputChanges}
          name="description"
          placeholder="Description"
          value={food.description}
        />
        <Form.Input
          onChange={handleInputChanges}
          name="Price"
          placeholder="Price"
          type="number"
          value={food.Price}
        />

        <Button
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
          onClick={() => setEditMode(false)}
          type="button"
          content="Cancel"
        />
      </Form>
    </Segment>
  );
};

export default FoodForm;
