import React, { Fragment } from "react";
import { Segment, List, Item, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const FoodDetailedSidebar = () => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        3 Orders Today
      </Segment>
      <Segment attached>
        <List relaxed divided>
          <Item style={{ position: "relative" }}>
            <Label
              style={{ position: "absolute" }}
              color="green"
              ribbon="right"
            >
              Paid
            </Label>
            <Image size="mini" circular src={"/assets/img/user.png"} />
            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`#`}>Bob</Link>
              </Item.Header>
              <Item.Extra style={{ color: "green" }}>Ordered</Item.Extra>
            </Item.Content>
          </Item>

          <Item style={{ position: "relative" }}>
            <Image size="mini" circular src={"/assets/img/user.png"} />

            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`#`}>Tom</Link>
              </Item.Header>
              <Item.Extra style={{ color: "green" }}>Ordered</Item.Extra>
            </Item.Content>
          </Item>

          <Item style={{ position: "relative" }}>
            <Image size="mini" circular src={"/assets/img/user.png"} />

            <Item.Content verticalAlign="middle">
              <Item.Header as="h3">
                <Link to={`#`}>Sally</Link>
              </Item.Header>
              <Item.Extra style={{ color: "green" }}>Ordered</Item.Extra>
            </Item.Content>
          </Item>
        </List>
      </Segment>
    </Fragment>
  );
};
