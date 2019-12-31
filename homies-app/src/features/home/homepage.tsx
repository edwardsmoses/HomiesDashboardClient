import React from "react";
import { Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

export const homepage = () => {
  return (
    <Container style={{ marginTop: "7em" }}>
      <h1>Home Page</h1>
      <h3>
        View <Link to="/meals">All Meals</Link>
      </h3>
    </Container>
  );
};
