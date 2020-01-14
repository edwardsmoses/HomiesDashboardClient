import React, { useEffect, useContext } from "react";
import { Grid } from "semantic-ui-react";
import CategoryList from "./CategoryList";
import CategoryForm from "../form/CategoryForm";
import { observer } from "mobx-react-lite";
import foodCategoryStore from "../../../app/stores/foodCategoryStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const CategoryDashboard: React.FC = () => {
  const foodStore = useContext(foodCategoryStore);

  useEffect(() => {
    foodStore.loadCategories();
  }, [foodStore]);

  if (foodStore.loadingInitial)
    return <LoadingComponent content="Loading Categories.." />;

  return (
    <Grid>
      <Grid.Column width={12}>
        <CategoryList />
      </Grid.Column>
      <Grid.Column width={4}>
        <CategoryForm />
      </Grid.Column>
    </Grid>
  );
};

export default observer(CategoryDashboard);
