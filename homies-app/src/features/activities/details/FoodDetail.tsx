import React from "react";
import { Card, Image, Button } from "semantic-ui-react";
import { IFood } from "../../../app/modules/food";

interface IProps {
  food: IFood;
  setEditMode: (editMode: boolean) => void;
  setSelectedFood: (food: IFood | null) => void;
}

const FoodDetail: React.FC<IProps> = ({
  food,
  setEditMode,
  setSelectedFood: setSelectedFood
}) => {
  return (
    <Card fluid>
      <Image src={food.FullPictureUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{food.name}</Card.Header>
        <Card.Meta>
          <span>{food.PriceInCurrency}</span>
        </Card.Meta>
        <Card.Description>{food.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            onClick={() => setEditMode(true)}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => setSelectedFood(null)}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default FoodDetail;
