import React, { useEffect, useContext } from "react";
import { Grid } from "semantic-ui-react";
import CategoryList from "./CategoryList";
import CategoryForm from "../form/CategoryForm";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";

const CategoryDashboard: React.FC = () => {
  const rootStore = useContext(RootStoreContext);

  const { loadCategories, loadingInitial } = rootStore.foodCategoryStore;

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  if (loadingInitial)
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
