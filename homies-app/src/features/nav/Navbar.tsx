import React, { useContext } from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";

import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const Navbar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logOut } = rootStore.userStore;

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
        <Menu.Item name="Categories" as={NavLink} to="/categories" />

        <Menu.Item as={NavLink} to="/createMeal">
          <Button positive content="Create New Meal" />
        </Menu.Item>

        {user && (
          <Menu.Item position="right">
            <Image
              avatar
              spaced="right"
              src={user.Image || "/assets/img/user.png"}
            />
            <Dropdown pointing="top left" text={user.DisplayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/${user.UserName}`}
                  text="My profile"
                  icon="user"
                />
                <Dropdown.Item onClick={logOut} text="Logout" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(Navbar);
