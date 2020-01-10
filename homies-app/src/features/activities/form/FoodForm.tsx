import React, { useState, FormEvent, useContext, useEffect } from "react";
import { Segment, Form, Button, Icon, Grid, Divider } from "semantic-ui-react";
import { IFood } from "../../../app/modules/food";

import { v4 as uuid } from "uuid";

import FoodStore from "../../../app/stores/foodStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import { category } from "../../../app/common/options/categoryOptions";

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

  // const handleSubmit = () => {
  //   if (food.Id.length === 0) {
  //     let newFood = {
  //       ...food,
  //       Id: uuid()
  //     };
  //     createMeal(newFood).then(() => history.push(`/meals/${newFood.Id}`));
  //   } else {
  //     editMeal(food).then(() => history.push(`/meals/${food.Id}`));
  //   }
  // };

  const handleFinalFormSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Field
                  name="Name"
                  placeholder="Meal Name"
                  value={food.Name}
                  component={TextInput}
                />
                {/* only show category name when in create mode */}
                {food.Id.length === 0 && (
                  <Field
                    name="CategoryName"
                    options={category}
                    placeholder="Category"
                    value={food.CategoryName}
                    component={SelectInput}
                  />
                )}

                <Field
                  component={TextAreaInput}
                  name="Description"
                  rows="4"
                  placeholder="Description"
                  value={food.Description}
                />

                <Field
                  name="Price"
                  placeholder="Price (in naira)"
                  value={food.Price}
                  component="input"
                  type="number"
                />

                <Divider hidden></Divider>

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
            )}
          ></FinalForm>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(FoodForm);
