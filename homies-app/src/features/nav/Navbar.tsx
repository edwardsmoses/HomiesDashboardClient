import React, { useContext } from "react";
import { Menu, Container, Button } from "semantic-ui-react";

import FoodStore from "../../app/stores/foodStore";
import { observer } from "mobx-react-lite";

const Navbar: React.FC = () => {
  const foodStore = useContext(FoodStore);

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/img/icon.png"
            alt="logo"
            style={{ marginRight: 10, width: 30 }}
          />
          Homies
        </Menu.Item>
        <Menu.Item name="Meals" />
        <Menu.Item>
          <Button
            positive
            content="Create New Meal"
            onClick={foodStore.openCreateForm}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(Navbar);
