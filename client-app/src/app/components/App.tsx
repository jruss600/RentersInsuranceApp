import React, { useState, useEffect } from "react";
import { Header, Container } from "semantic-ui-react";
import { IItem } from "../models/item";
import { AddItemForm } from "./AddItemForm";
import agent from "../api/agent";
import { LoadingComponent } from "./LoadingComponent";
import categories from "../models/categories";
import { ItemsTable } from "./ItemsTable";

const App = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [totals, setTotals] = useState<number[]>([]);

  const handleCreateItem = (item: IItem) => {
    setSubmitting(true);
    console.log("Item: ", item);
    agent.Items.create(item)
      .then(() => {
        setItems([...items, item]);
      })
      .then(() => setSubmitting(false));
    const i = categories.indexOf(item.category);
    let categoryTotals = [...totals];
    categoryTotals[i] += item.value;
    setTotals(categoryTotals);
  };

  const handleDeleteItem = (item: IItem) => {
    agent.Items.delete(item.id).then(() => {
      setItems([...items.filter((a) => a.id !== item.id)]);
    });
    const i = categories.indexOf(item.category);
    let categoryTotals = [...totals];
    categoryTotals[i] -= item.value;
    setTotals(categoryTotals);
  };

  const getTotalsByCategory = (listOfItems: IItem[]) => {
    let totalsByCategory: number[] = [];
    categories.forEach((category, i) => {
      let categoryTotal = 0;
      listOfItems
        .filter((item) => item.category === category)
        .forEach((item) => {
          categoryTotal += item.value;
        });
      totalsByCategory[i] = categoryTotal;
    });
    setTotals(totalsByCategory);
  };

  useEffect(() => {
    agent.Items.list()
      .then((response) => {
        setItems(response);
        getTotalsByCategory(response);
      })
      .then(() => setLoading(false));
  }, []);

  if (loading)
    return <LoadingComponent content="Loading Items" inverted={true} />;

  return (
    <Container style={{width: 700}}>
      <Header as="h1" style={{ marginTop: 40 }}>
        Renter's Insurance Contents
      </Header>
      <ItemsTable
        categories={categories}
        totals={totals}
        items={items}
        deleteItem={handleDeleteItem}
      />
      <AddItemForm
        categories={categories}
        createItem={handleCreateItem}
        submitting={submitting}
      />
    </Container>
  );
};

export default App;
