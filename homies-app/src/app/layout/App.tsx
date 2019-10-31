import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IFood } from "../modules/food";
import Navbar from "../../features/nav/Navbar";
import FoodDashboard from "../../features/activities/dashboard/FoodDashboard";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

const App = () => {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [selectedFood, setSelectedFood] = useState<IFood | null>(null);
  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const handleSelectFood = (id: string) => {
    setEditMode(false);
    setSelectedFood(foods.filter(a => a.Id === id)[0]);
  };

  const handleOpenCreateForm = () => {
    setSelectedFood(null);
    setEditMode(true);
  };

  const handleCreateFood = (food: IFood) => {
    setSubmitting(true);
    agent.Foods.create(food)
      .then(() => {
        setFoods([...foods, food]);
        setSelectedFood(food);
        setEditMode(false);
      })
      .then(() => {
        setSubmitting(false);
      });
  };

  const handleEditFood = (food: IFood) => {
    setSubmitting(true);
    agent.Foods.update(food)
      .then(() => {
        setFoods([...foods.filter(a => a.Id !== food.Id), food]);
        setSelectedFood(food);
        setEditMode(false);
      })
      .then(() => {
        setSubmitting(false);
      });
  };

  useEffect(() => {
    agent.Foods.list()
      .then(response => {
        setFoods(response);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading)
    return <LoadingComponent content="Loading Meals.." inverted={true} />;

  return (
    <Fragment>
      <Navbar openCreateForm={handleOpenCreateForm} />

      <Container style={{ marginTop: "7em" }}>
        <FoodDashboard
          activities={foods}
          selectFood={handleSelectFood}
          setSelectedFood={setSelectedFood}
          selectedFood={selectedFood}
          editMode={editMode}
          setEditMode={setEditMode}
          createFood={handleCreateFood}
          editFood={handleEditFood}
          submitting={submitting}
        ></FoodDashboard>
      </Container>
    </Fragment>
  );
};

export default App;
