import React, { Fragment } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";

import { Link } from "react-router-dom";
import { IFood } from "../../../app/modules/food";

import { format } from "date-fns";

export const FoodListItem: React.FC<{ food: IFood }> = ({ food }) => {
  return (
    <Card>
      <Image
        size="tiny"
        circular
        as={Link}
        to={`/meals/${food.Id}`}
        src={food.FullPictureUrl}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{food.Name}</Card.Header>
        <Card.Meta>{food.CategoryName}</Card.Meta>
        <Card.Description>
          <Icon name="info circle"></Icon>
          {food.Description}
          <br></br>
          <Icon name="clock outline"></Icon>
          {format(food.CreatedOn, "eeee do MMMM YYYY")}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Fragment>
          <Label content={food.PriceInCurrency}></Label>
          <Button
            animated
            as={Link}
            to={`/meals/${food.Id}`}
            floated="right"
            color="green"
          >
            <Button.Content visible>View Meal</Button.Content>
            <Button.Content hidden>
              <Icon name="arrow right" />
            </Button.Content>
          </Button>
        </Fragment>
      </Card.Content>
    </Card>
  );
};
