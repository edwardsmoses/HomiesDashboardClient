import React, { useContext, Fragment } from "react";
import { Segment, Header, Icon, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import categoriestore from "../../../app/stores/foodCategoryStore";

const CategoryList: React.FC = () => {
  const categoryStore = useContext(categoriestore);

  return (
    <Fragment>
      {categoryStore.allCategories.length === 0 && (
        <Segment placeholder>
          <Header>
            <Icon.Group size="huge">
              <Icon name="cubes" size="big" />
              <Icon corner name="blind" />
            </Icon.Group>
            No Categories added yet. You could add one now.
          </Header>
        </Segment>
      )}

      {categoryStore.allCategories.length > 0 && (
        <Label.Group size="huge" color="grey">
          {categoryStore.allCategories.map(category => (
            <Label key={category.Id}>
              <Icon name="cube" size="small"></Icon>
              {category.Name}
            </Label>
          ))}
        </Label.Group>
      )}
    </Fragment>
  );
};

export default observer(CategoryList);
