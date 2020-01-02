import React from "react";
import { Container, Segment, Header, Button, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const homepage = () => {
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
        <Header as="h2" inverted content="Welcome to Our Dashboard" />
        <Button as={Link} to="/meals" size="huge" inverted>
          Manage all Meals & Orders
        </Button>
      </Container>
    </Segment>
  );
};
