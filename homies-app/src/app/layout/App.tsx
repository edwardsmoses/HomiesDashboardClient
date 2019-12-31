import React, { Fragment } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "../../features/nav/Navbar";
import FoodDashboard from "../../features/activities/dashboard/FoodDashboard";

import { observer } from "mobx-react-lite";

import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import { homepage } from "../../features/home/homepage";
import FoodForm from "../../features/activities/form/FoodForm";
import FoodDetail from "../../features/activities/details/FoodDetail";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <Route exact path="/" component={homepage} />
      <Route
        path={"/(.+)"}
        render={() => (
          <Fragment>
            <Navbar />

            <Container style={{ marginTop: "7em" }}>
              <Route path="/meals" exact component={FoodDashboard}></Route>
              <Route path="/meals/:id" exact component={FoodDetail}></Route>

              <Route
                key={location.key}
                path={["/createMeal", "/editMeal/:id"]}
                component={FoodForm}
              ></Route>
            </Container>
          </Fragment>
        )}
      />
    </Fragment>
  );
};

export default withRouter(observer(App));
