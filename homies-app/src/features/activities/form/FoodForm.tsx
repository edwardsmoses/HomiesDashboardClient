import React from "react";
import { Segment, Form, Button } from "semantic-ui-react";

interface IProps {
  setEditMode: (editMode: boolean) => void;
}

const FoodForm: React.FC<IProps> = ({ setEditMode }) => {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Title" />
        <Form.Input placeholder="Category" />
        <Form.TextArea placeholder="Description" />
        <Form.Input placeholder="Price" type="number" />

        <Button floated="right" positive type="submit" content="Save" />
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
