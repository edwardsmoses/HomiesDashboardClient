import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IFood } from "../modules/food";
import Navbar from "../../features/nav/Navbar";
import FoodDashboard from "../../features/activities/dashboard/FoodDashboard";

const App = () => {
  const [activities, setActivities] = useState<IFood[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IFood | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectActivity = (id: string) => {
    setEditMode(false);
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
  };

  const handleOpenCreateForm = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };

  useEffect(() => {
    axios
      .get<IFood[]>("http://homiesapi.tra-pp.com//api/Foods")
      .then(response => {
        setActivities(response.data);
      });
  }, []);

  return (
    <Fragment>
      <Navbar openCreateForm={handleOpenCreateForm} />

      <Container style={{ marginTop: "7em" }}>
        <FoodDashboard
          activities={activities}
          selectFood={handleSelectActivity}
          setSelectedFood={setSelectedActivity}
          selectedFood={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
        ></FoodDashboard>
      </Container>
    </Fragment>
  );
};

export default App;
