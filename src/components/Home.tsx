import React from "react";
import { Link } from "react-router-dom";
import Show from "./Show";
import { Table, Thead, Tbody, Tr, Th, TableContainer } from "@chakra-ui/react";
import "../styles/home.css";

const Home = () => {
  const [rowData, setRowData] = React.useState([
    {
      date: new Date(),
      brand: "any",
      transactionType: "any",
      totalOrders: 0,
      totalOrderValue: 0,
      grossMarginPercentage: 0,
    },
  ]);

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<any>();

  React.useEffect(() => {
    const rowData1 = rowData;
    rowData1.splice(0, 1);
    setRowData(rowData1);
    fetch("http://localhost:8000/api/v1/brand_sales_daily")
      .then((res) => {
        if (!res.ok) {
          throw Error("Couldn't Load the Data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setRowData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("Fetch Aborted");
        }
        setError(err);
        setIsLoading(false);
      });
  }, []);
  return (
    <div data-testid="outer-div">
      <h1>Home</h1>
      <h2>Daily Brand Sales</h2>
      {isLoading && (
        <div style={{ marginLeft: "20px" }} data-testid="isLoading">
          is Loading..
        </div>
      )}
      {!isLoading && !error && (
        <TableContainer style={{ margin: "20px" }} data-testid="tableContainer">
          <Table variant="striped">
            <Thead>
              <Tr>
                <Th>Date</Th>
                <Th>Brand</Th>
                <Th>Transaction Type</Th>
                <Th>Total Orders</Th>
                <Th>Total Order Value</Th>
                <Th>Gross Margin Percentage</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Show rowData={rowData}></Show>
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {error !== undefined && (
        <div
          style={{ marginLeft: "20px", color: "red" }}
          data-testid="error-message"
        >
          {error.message}
        </div>
      )}
      <div className="add_brandSales_div">
        <Link
          to="/add"
          className="add_brandSales_button"
          style={{ marginTop: "10px" }}
        >
          Add Daily Brand Sales
        </Link>
      </div>
    </div>
  );
};

export default Home;
