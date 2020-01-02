import React, { Fragment } from "react";
import { Image, Header } from "semantic-ui-react";
import { IFood } from "../../../app/modules/food";

export const FoodDetailedPictures: React.FC<{ meal: IFood }> = ({ meal }) => {
  const pictures = meal.Pictures.map(pic => <Image src={pic}></Image>);
  return (
    <Fragment>
      <Header>
        {meal.Name} Pictures ({meal.Pictures.length})
      </Header>
      <Image.Group size="small">{pictures}</Image.Group>
    </Fragment>
  );
};
