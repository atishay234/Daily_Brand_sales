import { Tr, Td, Input } from "@chakra-ui/react";
import { ChangeEvent } from "react";
import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";

interface rowDatatype {
  brand: string;
  transactionType: string;
  totalOrders: number;
  totalOrderValue: number;
  grossMarginPercentage: number;
}
interface Props {
  rowData: rowDatatype[];
  handleChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    index: number
  ) => void;
  handleDelete: (index: number) => void;
}
const Row: React.FC<Props> = ({ handleChange, rowData, handleDelete }) => {
  return (
    <React.Fragment>
      {rowData.map((data, index) => {
        const {
          brand,
          transactionType,
          totalOrders,
          totalOrderValue,
          grossMarginPercentage,
        } = data;

        return (
          <Tr key={index}>
            <Td>{index + 1}</Td>
            <Td>
              <input
                type="text"
                onChange={(e) => handleChange(e, index)}
                name="brand"
                value={brand}
                data-testid={`input-${index + 1}`}
              />
            </Td>
            <Td>
              <select
                name="transactionType"
                value={transactionType}
                onChange={(e) => handleChange(e, index)}
                data-testid={`input-${index + 1}`}
              >
                <option value="Trading">Trading</option>
                <option value="Facilitation">Facilitation</option>
              </select>
            </Td>
            <Td>
              <input
                type="number"
                name="totalOrders"
                value={totalOrders}
                onChange={(e) => handleChange(e, index)}
                data-testid={`input-${index + 1}`}
              />
            </Td>
            <Td>
              <input
                type="number"
                name="totalOrderValue"
                value={totalOrderValue}
                onChange={(e) => {
                  handleChange(e, index);
                }}
                data-testid={`input-${index + 1}`}
              />
            </Td>
            <Td>
              <input
                type="number"
                name="grossMarginPercentage"
                value={grossMarginPercentage}
                onChange={(e) => handleChange(e, index)}
                data-testid={`input-${index + 1}`}
              />
            </Td>
            <Td>
              <button
                onClick={() => {
                  handleDelete(index);
                }}
                data-testid={`delete-button-${index + 1}`}
              >
                <DeleteIcon />
              </button>
            </Td>
          </Tr>
        );
      })}
    </React.Fragment>
  );
};

export default Row;
