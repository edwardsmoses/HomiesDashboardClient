import React, { useState, useContext } from "react";
import { Segment, Form, Button, Header, Icon } from "semantic-ui-react";
import { IFoodCategory } from "../../../app/modules/foodCategory";
import { v4 as uuid } from "uuid";
import foodCategoryStore from "../../../app/stores/foodCategoryStore";
import { observer } from "mobx-react-lite";

import { Form as FinalForm, Field } from "react-final-form";
import TextInput from "../../../app/common/form/TextInput";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { combineValidators, isRequired } from "revalidate";

const validate = combineValidators({
  Name: isRequired({ message: "The Category Name is required." })
});

const CategoryForm: React.FC<RouteComponentProps> = ({ history }) => {
  const categoryStore = useContext(foodCategoryStore);
  const { createcategory, submitting } = categoryStore;
  const initializeForm = () => {
    return {
      Id: "",
      Name: ""
    };
  };

  const [category] = useState<IFoodCategory>(initializeForm);

  const handleFinalFormSubmit = (values: any) => {
    const { ...category } = values;

    let newCategory = {
      ...category,
      id: uuid()
    };
    createcategory(newCategory).then(() => window.location.reload());
  };

  return (
    <Segment clearing>
      <Header>
        <Icon.Group size="big">
          <Icon color="teal" name="cube" />
          <Icon color="teal" corner name="add" />
        </Icon.Group>
        Add New Category
      </Header>

      <FinalForm
        onSubmit={handleFinalFormSubmit}
        validate={validate}
        render={({ handleSubmit, valid, pristine }) => (
          <Form onSubmit={handleSubmit}>
            <Field
              name="Name"
              placeholder="Category Name"
              value={category.Name}
              component={TextInput}
            />

            <Button
              loading={submitting}
              floated="right"
              positive
              disabled={valid || pristine}
              type="submit"
              content="Add New Category"
            />
          </Form>
        )}
      ></FinalForm>
    </Segment>
  );
};

export default withRouter(observer(CategoryForm));
