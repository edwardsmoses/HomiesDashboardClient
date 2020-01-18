import React, { useState, useContext, useEffect } from "react";
import { Segment, Form, Button, Icon, Grid, Divider } from "semantic-ui-react";
import { FormFormValues as FoodFormValues } from "../../../app/modules/food";

import { v4 as uuid } from "uuid";

import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";

import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import TextAreaInput from "../../../app/common/form/TextAreaInput";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import { combineDateAndTime } from "../../../app/common/util/util";
import {
  combineValidators,
  isRequired,
  composeValidators,
  hasLengthGreaterThan,
  isNumeric
} from "revalidate";
import NumberInput from "../../../app/common/form/NumberInput";
import { RootStoreContext } from "../../../app/stores/rootStore";

const validate = combineValidators({
  Name: isRequired({ message: "The Meal Title is required." }),
  CategoryId: isRequired({ message: "A Category is required to be selected." }),
  Description: composeValidators(
    isRequired("Description"),
    hasLengthGreaterThan(4)({
      message: "Description should be at least 5 characters"
    })
  )(),
  Price: composeValidators(
    isRequired({ message: "The Price for the meal is required." }),
    isNumeric({ message: "Price must be a number" })
  )(),
  CreatedOn: isRequired({
    message: "Enter the Date of Avaliablity of this Meal."
  }),
  time: isRequired({ message: "Enter the Time this meal will be available." })
});

interface DetailParams {
  id: string;
}

const FoodForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const rootStore = useContext(RootStoreContext);

  const {
    createMeal,
    editMeal,
    submitting,
    viewMealDetail
  } = rootStore.foodStore;

  const {
    categoriesSelectList,
    loadCategories,
    clearCategories
  } = rootStore.foodCategoryStore;

  const [food, setFood] = useState(new FoodFormValues());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategories();

    return () => {
      clearCategories();
    };
  }, [loadCategories, clearCategories]);

  useEffect(() => {
    if (match.params.id) {
      setLoading(true);
      viewMealDetail(match.params.id)
        .then(meal => {
          meal && setFood(new FoodFormValues(meal));
        })
        .finally(() => setLoading(false));
    }
  }, [viewMealDetail, match.params.id]);

  const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.CreatedOn, values.time);
    const { CreatedOn, time, ...meal } = values;
    meal.CreatedOn = dateAndTime;
    if (!meal.Id) {
      let newFood = {
        ...meal,
        Id: uuid()
      };
      createMeal(newFood);
    } else {
      editMeal(meal);
    }
  };

  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            validate={validate}
            initialValues={food}
            onSubmit={handleFinalFormSubmit}
            render={({ handleSubmit, invalid, pristine }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  name="Name"
                  placeholder="Meal Name"
                  value={food.Name}
                  component={TextInput}
                />

                <Field
                  name="CategoryId"
                  options={categoriesSelectList}
                  placeholder="Category"
                  value={food.CategoryName}
                  component={SelectInput}
                />

                {/* only show date input when in create mode */}
                {/* {food.Id.length === 0 && (
                
                )} */}

                <Form.Group widths="equal">
                  <Field
                    name="CreatedOn"
                    type="datetime-local"
                    placeholder="Date"
                    component={DateInput}
                    date={true}
                    value={food.CreatedOn}
                  />

                  <Field
                    name="time"
                    type="datetime-local"
                    placeholder="Time"
                    time={true}
                    component={DateInput}
                    value={food.time}
                  />
                </Form.Group>

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
                  component={NumberInput}
                  min="1"
                  type="number"
                />

                <Divider hidden></Divider>

                <Button
                  loading={submitting}
                  floated="right"
                  positive
                  disabled={loading || invalid || pristine}
                  type="submit"
                  icon
                  labelPosition="right"
                >
                  Save Meal
                  <Icon name="arrow right"></Icon>
                </Button>
                <Button
                  floated="right"
                  onClick={
                    food.Id
                      ? () => history.push(`/meals/${food.Id}`)
                      : () => history.push("/meals")
                  }
                  type="button"
                  disabled={loading}
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
