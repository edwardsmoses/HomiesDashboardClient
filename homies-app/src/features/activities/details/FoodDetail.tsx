import React, { useContext, useEffect } from "react";
import { Card, Image, Button } from "semantic-ui-react";

import FoodStore from "../../../app/stores/foodStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps, Link } from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";

interface DetailParams {
  id: string;
}

const FoodDetail: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history
}) => {
  const foodStore = useContext(FoodStore);
  const { mealDetail: food, viewMealDetail, loadingInitial } = foodStore;

  useEffect(() => {
    viewMealDetail(match.params.id);
  }, [viewMealDetail, match.params.id]);

  if (loadingInitial || !food)
    return <LoadingComponent content="Loading Meal.."></LoadingComponent>;

  return (
    <Card fluid>
      <Image src={food!.FullPictureUrl} wrapped ui={false} widths={3} />
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
            as={Link}
            to={`/editMeal/${food.Id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            onClick={() => history.push("/meals")}
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
