import React, { Fragment, useContext } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";

import { observer } from "mobx-react-lite";

import FoodStore from "../../../app/stores/foodStore";

const FoodList: React.FC = () => {
  const foodStore = useContext(FoodStore);
  const { mealsByDate: foods, selectMeal } = foodStore;

  return (
    <Card.Group>
      {foods.map(food => (
        <Card key={food.Id}>
          <Image src={food.FullPictureUrl} wrapped ui={false} />
          <Card.Content>
            <Card.Header>{food.Name}</Card.Header>
            <Card.Meta>{food.CategoryName}</Card.Meta>
            <Card.Description>{food.Description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Fragment>
              <Label content={food.PriceInCurrency}></Label>
              <Button
                animated
                onClick={() => selectMeal(food.Id)}
                floated="right"
                primary
              >
                <Button.Content visible>View Meal</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Fragment>
          </Card.Content>
        </Card>
      ))}
    </Card.Group>
  );
};

export default observer(FoodList);
