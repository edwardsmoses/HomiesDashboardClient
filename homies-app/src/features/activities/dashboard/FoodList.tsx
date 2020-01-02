import React, { useContext, Fragment } from "react";

import { observer } from "mobx-react-lite";

import FoodStore from "../../../app/stores/foodStore";
import { FoodListItem } from "./FoodListItem";

import { Card, Divider, Header, Icon } from "semantic-ui-react";

const FoodList: React.FC = () => {
  const foodStore = useContext(FoodStore);
  const { mealsByCategory: foods } = foodStore;

  return (
    <Fragment>
      {foods.map(([group, meals]) => (
        <Fragment key={group}>
          <Divider hidden></Divider>

          <Divider horizontal style={{ marginTop: 30, marginBottom: 30 }}>
            <Header as="h4">
              <Icon name="cubes" />
              {group.toUpperCase()}
            </Header>
          </Divider>
          <Card.Group>
            {meals.map(food => (
              <FoodListItem food={food} key={food.Id} />
            ))}
          </Card.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(FoodList);
