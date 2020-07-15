import React, { Fragment } from "react";
import { Table, Icon } from "semantic-ui-react";
import { IItem } from "../models/item";

interface IProps {
  categories: string[];
  totals: number[];
  items: IItem[];
  deleteItem: (item: IItem) => void;
}

export const ItemsTable: React.FC<IProps> = ({
  categories,
  totals,
  items,
  deleteItem,
}) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <h3>Description</h3>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <h3>Value</h3>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {categories.map((category, i) =>
          totals[i] > 0 ? (
            <Fragment key={i}>
              <Table.Row className="category-header">
                <Table.Cell>
                  <Icon name="folder" />
                  {category}
                </Table.Cell>
                <Table.Cell>
                  <h4>{`$${totals[i]}`}</h4>
                </Table.Cell>
              </Table.Row>
              {items
                .filter((item) => item.category === category)
                .map((item) => (
                  <Table.Row key={item.id}>
                    <Table.Cell className="category-item">
                      {item.name}
                    </Table.Cell>
                    <Table.Cell style={{paddingLeft: 30}}>
                      {`$${item.value}`}
                      <Icon
                        name="trash alternate outline"
                        style={{ marginLeft: 6, cursor: "pointer" }}
                        onClick={() => deleteItem(item)}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Fragment>
          ) : (
            <Fragment key={i}></Fragment>
          )
        )}
      </Table.Body>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <strong>TOTAL:</strong>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <strong>{`$${totals.reduce((a, b) => a + b, 0)}`}</strong>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>
  );
};
