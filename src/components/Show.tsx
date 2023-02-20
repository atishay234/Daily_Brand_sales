import React from "react";
import { Tr, Td } from "@chakra-ui/react";

export interface rowDatatype {
  date: Date;
  brand: string;
  transactionType: string;
  totalOrders: number;
  totalOrderValue: number;
  grossMarginPercentage: number;
}
interface Props {
  rowData: rowDatatype[];
}
const Show: React.FC<Props> = ({ rowData }) => {
  return (
    <React.Fragment>
      {rowData.map((data, index) => {
        const {
          date,
          brand,
          transactionType,
          totalOrders,
          totalOrderValue,
          grossMarginPercentage,
        } = data;
        const newDate = new Date(date);
        const day = newDate.getDate().toString();
        const month = newDate.getMonth().toString();
        const year = newDate.getFullYear().toString();
        return (
          <Tr key={index} data-testid="data-row">
            <Td>
              {day}/{month}/{year}
            </Td>
            <Td>{brand}</Td>
            <Td>{transactionType}</Td>
            <Td>{totalOrders}</Td>
            <Td>{totalOrderValue}</Td>
            <Td>{grossMarginPercentage}</Td>
          </Tr>
        );
      })}
    </React.Fragment>
  );
};

export default Show;
