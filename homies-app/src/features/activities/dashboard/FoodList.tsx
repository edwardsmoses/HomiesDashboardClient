import React, { Fragment } from "react";
import { Button, Segment, Card, Icon, Label } from "semantic-ui-react";

import { IFood } from "../../../app/modules/food";

interface IProps {
  foods: IFood[];
  selectFood: (id: string) => void;
}

const FoodList: React.FC<IProps> = ({ foods, selectFood: selectFood }) => {
  return (
    <Card.Group>
      {foods.map(food => (
        <Card
          key={food.id}
          image={food.FullPictureUrl}
          header={food.name}
          meta={food.CategoryName}
          description={food.description}
          extra={
            <Fragment>
              <Label content={food.PriceInCurrency}></Label>
              <Button
                animated
                onClick={() => selectFood(food.id)}
                floated="right"
                primary
              >
                <Button.Content visible>View Meal</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Fragment>
          }
        />
      ))}
    </Card.Group>
  );
};

export default FoodList;
