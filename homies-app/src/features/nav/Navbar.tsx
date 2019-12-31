import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import { NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} to="/" exact>
          <img
            src="/assets/img/icon.png"
            alt="logo"
            style={{ marginRight: 10, width: 30 }}
          />
          Homies
        </Menu.Item>
        <Menu.Item name="Meals" as={NavLink} to="/meals" />
        <Menu.Item as={NavLink} to="/createMeal">
          <Button positive content="Create New Meal" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(Navbar);
