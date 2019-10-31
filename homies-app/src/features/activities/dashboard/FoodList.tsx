import React from "react";
import { Item, Button, Label, Segment } from "semantic-ui-react";

import { IFood } from "../../../app/modules/food";

interface IProps {
  foods: IFood[];
  selectFood: (id: string) => void;
}

const FoodList: React.FC<IProps> = ({ foods, selectFood: selectFood }) => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {foods.map(food => (
          <Item key={food.id}>
            <Item.Content>
              <Item.Header as="a">{food.name}</Item.Header>
              <Item.Meta>{food.PriceInCurrency}</Item.Meta>
              <Item.Description>
                <div>{food.description}</div>
              </Item.Description>
              <Item.Extra>
                <Button
                  onClick={() => selectFood(food.id)}
                  floated="right"
                  content="View"
                  color="blue"
                />
                <Label basic content={food.CategoryName} />
              </Item.Extra>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    </Segment>
  );
};

export default FoodList;
