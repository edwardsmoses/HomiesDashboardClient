import React, { useContext, Fragment } from "react";
import { Segment, Header, Icon, Label } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";

const CategoryList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { allCategories } = rootStore.foodCategoryStore;

  return (
    <Fragment>
      {allCategories.length === 0 && (
        <Segment placeholder>
          <Header>
            <Icon name="cubes" size="big" />
            No Categories added yet. You could add one now.
          </Header>
        </Segment>
      )}

      {allCategories.length > 0 && (
        <Label.Group size="huge" color="grey">
          {allCategories.map(category => (
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
