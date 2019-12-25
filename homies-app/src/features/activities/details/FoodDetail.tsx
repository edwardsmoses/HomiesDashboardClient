import React, { useContext } from "react";
import { Card, Image, Button } from "semantic-ui-react";

import FoodStore from "../../../app/stores/foodStore";
import { observer } from "mobx-react-lite";

const FoodDetail: React.FC = () => {
  const foodStore = useContext(FoodStore);
  const { selectedMeal: food, openEditForm, cancelSeletectedMeal } = foodStore;

  return (
    <Card fluid>
      <Image src={food!.FullPictureUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{food!.Name}</Card.Header>
        <Card.Meta>
          <span>{food!.PriceInCurrency}</span>
        </Card.Meta>
        <Card.Description>{food!.Description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => openEditForm(food!.Id)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => cancelSeletectedMeal()}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default observer(FoodDetail);
