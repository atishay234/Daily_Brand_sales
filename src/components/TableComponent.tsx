import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import React, { ChangeEvent, useState } from "react";
import Row from "./Row";
import { Link, useNavigate } from "react-router-dom";
import "../styles/TableComponent.css";
// import { Navigate } from "react-router-dom";

const TableComponent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>();
  const [rowData, setRowData] = useState([
    {
      brand: "",
      transactionType: "Trading",
      totalOrders: 0,
      totalOrderValue: 0,
      grossMarginPercentage: 0,
    },
  ]);
  const handleDelete = (index: number) => {
    const rowInput = [...rowData];
    rowInput.splice(index, 1);
    setRowData(rowInput);
  };
  const handleSendingTheData = async () => {
    let ifZero = false;
    rowData.forEach((row) => {
      if (
        row.brand === "" ||
        row.grossMarginPercentage === 0 ||
        row.totalOrderValue === 0 ||
        row.totalOrders === 0
      ) {
        ifZero = true;
      }
    });
    if (ifZero === false) {
      setIsLoading(true);
      try {
        const res = await fetch(
          "http://localhost:8000/api/v1/brand_sales_daily",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(rowData),
          }
        );
        setIsLoading(false);
        console.log(res);
      } catch (err: any) {
        setIsLoading(false);
        setError(err);
        throw new Error(err.message);
      }
      navigate("/");
    } else {
      alert("None of the values should be zero or empty");
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    let val1: number = Number(value);

    const rowInput = [...rowData];
    if (name === "brand") {
      console.log("Hi");
      rowInput[index].brand = value;
    }
    if (name === "transactionType") {
      console.log("HI");
      rowInput[index].transactionType = value;
    }
    if (name === "totalOrders") {
      console.log("HI");
      rowInput[index].totalOrders = val1;
    }
    if (name === "totalOrderValue") {
      console.log("HI");
      rowInput[index].totalOrderValue = val1;
    }
    if (name === "grossMarginPercentage") {
      console.log("HI");
      rowInput[index].grossMarginPercentage = val1;
    }

    setRowData(rowInput);
  };

  const addTableRows = () => {
    const rowObj = {
      brand: "",
      transactionType: "Trading",
      totalOrders: 0,
      totalOrderValue: 0,
      grossMarginPercentage: 0,
    };
    setRowData([...rowData, rowObj]);
  };

  return (
    <div>
      <div className="heading_div">
        <h1>Add Daily Brand Sales</h1>
        <Link to={"/"}>Back</Link>
      </div>

      <TableContainer
        style={{ margin: "20px", borderBottom: "1px solid #dee2e6" }}
      >
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Brand</Th>
              <Th>Transaction Type</Th>
              <Th>Total Orders</Th>
              <Th>Total Order Value</Th>
              <Th>Gross Margin Percentage</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Row
              handleChange={handleChange}
              rowData={rowData}
              handleDelete={handleDelete}
            ></Row>
          </Tbody>
        </Table>
        <div className="button_add">
          <button onClick={() => addTableRows()}>Add Row</button>
        </div>
      </TableContainer>

      <div className="button_submit">
        {!isLoading && (
          <button
            onClick={() => handleSendingTheData()}
            data-testid="submit-button"
          >
            Submit
          </button>
        )}
        {isLoading && <button>Submitting...</button>}

        {error && (
          <div
            style={{
              marginRight: "20px",
              display: "flex",
              alignItems: "center",
              color: "red",
            }}
          >
            {error.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;
