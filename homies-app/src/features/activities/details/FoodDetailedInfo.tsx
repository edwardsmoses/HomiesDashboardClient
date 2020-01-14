import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { IFood } from "../../../app/modules/food";

import { format } from "date-fns";

export const FoodDetailedInfo: React.FC<{ meal: IFood }> = ({ meal }) => {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="green" name="info circle" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{meal.Description}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="cube" size="large" color="green" />
          </Grid.Column>
          <Grid.Column width={15}>
            <small>Category:</small>
            <span>{meal.CategoryName}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar outline" size="large" color="green" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>
              {format(meal.CreatedOn, "eeee do MMMM YYYY")} at &nbsp;
              {format(meal.CreatedOn, "h:mm a")}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="currency" size="large" color="green" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>{meal.PriceInCurrency}</span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};
