import React, { useState } from "react";
import { Segment, Form, Input, Select } from "semantic-ui-react";
import { IItem } from "../models/item";
import { v4 as uuid } from "uuid";

interface IProps {
  categories: string[];
  createItem: (item: IItem) => void;
  submitting: boolean;
}

export const AddItemForm: React.FC<IProps> = ({
  categories,
  createItem,
  submitting,
}) => {
  const initializeNewItem: IItem = {
    id: "",
    name: "",
    value: 0,
    category: "",
  };

  const [newItem, setNewItem] = useState<IItem>(initializeNewItem);

  const options = [
    { key: uuid(), text: categories[0], value: categories[0] },
    { key: uuid(), text: categories[1], value: categories[1] },
    { key: uuid(), text: categories[2], value: categories[2] },
    { key: uuid(), text: categories[3], value: categories[3] },
  ];

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    document.querySelector('input[type="text"]')?.classList.remove("invalid");
    setNewItem({ ...newItem, name: event.target.value });
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    document.querySelector('input[type="number"]')?.classList.remove("invalid");
    setNewItem({ ...newItem, value: parseFloat(event.target.value) });
  };

  const handleCategoryChange = (event: any, data: any) => {
    document.querySelector('.ui.selection.dropdown')?.classList.remove("invalid");
    setNewItem({...newItem, category: data.value});
  };

  const handleSubmit = () => {
    let valid = true;
    if (newItem.name.length < 1) {
      document.querySelector('input[type="text"]')?.classList.add("invalid");
      valid = false;
    }
    if (newItem.value <= 0) {
      document.querySelector('input[type="number"]')?.classList.add("invalid");
      valid = false;
    }
    if(!categories.includes(newItem.category)){
      document.querySelector('.ui.selection.dropdown')?.classList.add("invalid");
      valid = false;
    }

    if (valid) {
      let itemToCreate = { ...newItem, id: uuid() };
      createItem(itemToCreate);
      setNewItem(initializeNewItem);
    }
  };

  return (
    <Segment>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            label="Item"
            placeholder="Item Description"
            value={newItem.name}
            onChange={handleNameChange}
          />
          <Form.Field
            control={Input}
            type="number"
            min="0"
            label="Value ($)"
            placeholder="Value"
            value={newItem.value}
            onChange={handleValueChange}
          />
          <Form.Field
            control={Select}
            label="Category"
            options={options}
            placeholder="Category"
            onChange={handleCategoryChange}
            value={newItem.category}
          />
          <Form.Button loading={submitting} color="blue" type="submit" className="add-button">
            Add
          </Form.Button>
        </Form.Group>
      </Form>
    </Segment>
  );
};
