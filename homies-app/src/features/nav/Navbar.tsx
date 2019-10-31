import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  openCreateForm: () => void;
}

const Navbar: React.FC<IProps> = ({ openCreateForm }) => {
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
          <Button positive content="Create New Meal" onClick={openCreateForm} />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
