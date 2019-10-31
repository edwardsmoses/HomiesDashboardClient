import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Container } from "semantic-ui-react";
import { IFood } from "../modules/food";
import Navbar from "../../features/nav/Navbar";
import FoodDashboard from "../../features/activities/dashboard/FoodDashboard";

const App = () => {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [selectedFood, setSelectedFood] = useState<IFood | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectFood = (id: string) => {
    setEditMode(false);
    setSelectedFood(foods.filter(a => a.id === id)[0]);
  };

  const handleOpenCreateForm = () => {
    setSelectedFood(null);
    setEditMode(true);
  };

  const handleCreateFood = (food: IFood) => {
    setFoods([...foods, food]);
    setSelectedFood(food);
    setEditMode(false);
  };

  const handleEditFood = (food: IFood) => {
    setFoods([...foods.filter(a => a.id !== food.id), food]);
    setSelectedFood(food);
    setEditMode(false);
  };

  useEffect(() => {
    axios
      .get<IFood[]>("http://homiesapi.tra-pp.com//api/Foods")
      .then(response => {
        setFoods(response.data);
      });
  }, []);

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
        ></FoodDashboard>
      </Container>
    </Fragment>
  );
};

export default App;
