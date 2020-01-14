import React from "react";
import { Segment, Image, Item, Header, Button } from "semantic-ui-react";
import { IFood } from "../../../app/modules/food";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import { format } from "date-fns";

const activityImageStyle = {
  filter: "brightness(30%)"
};

const activityImageTextStyle = {
  position: "absolute",
  bottom: "5%",
  left: "5%",
  width: "100%",
  height: "auto",
  color: "white"
};

const FoodDetailedHeader: React.FC<{ meal: IFood }> = ({ meal }) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: "0" }}>
        <Image src={meal.FullPictureUrl} fluid style={activityImageStyle} />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={meal.Name}
                  style={{ color: "white" }}
                />
                <p>{meal.CategoryName}</p>
                <p>
                  Created by <strong>Eddy</strong> &nbsp; on &nbsp;
                  <strong>{format(meal.CreatedOn, "eeee do MMMM YYYY")}</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="green">Create New Order</Button>
        <Button>View Orders</Button>
        <Button
          color="facebook"
          floated="right"
          as={Link}
          to={`/editMeal/${meal.Id}`}
        >
          Manage Meal
        </Button>
      </Segment>
    </Segment.Group>
  );
};

export default observer(FoodDetailedHeader);
