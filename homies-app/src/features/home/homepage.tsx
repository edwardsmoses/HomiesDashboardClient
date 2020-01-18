import React, { useContext, Fragment } from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import { observer } from "mobx-react-lite";
import { LoginForm } from "../user/LoginForm";
import { RegisterForm } from "../user/RegisterForm";

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);

  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;

  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/img/icon.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Homies Dashboard
        </Header>
        {isLoggedIn && user ? (
          <Fragment>
            <Header
              as="h2"
              inverted
              content={`Welcome back, ${user.DisplayName}`}
            />
            <Button as={Link} to="/meals" size="huge" inverted>
              Manage All Meals
            </Button>
          </Fragment>
        ) : (
          <Fragment>
            <Header as="h2" inverted content="Welcome to Our Dashboard" />
            <Button
              onClick={() => openModal(<LoginForm></LoginForm>)}
              size="huge"
              inverted
            >
              Login
            </Button>
            <Button
              onClick={() => openModal(<RegisterForm></RegisterForm>)}
              size="huge"
              inverted
            >
              Register
            </Button>
          </Fragment>
        )}
      </Container>
    </Segment>
  );
};

export default observer(HomePage);
