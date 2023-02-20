import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TableComponent from "./TableComponent";
import Home from "./Home";
import { Route, Routes } from "react-router-dom";
beforeEach(() => {
  cleanup();
});

test("button add row", () => {
  render(<TableComponent />, { wrapper: BrowserRouter });
  const addRowButton = screen.getByText("Add Row");
  expect(addRowButton).toBeInTheDocument();
});

test("submit button present", () => {
  render(<TableComponent />, { wrapper: BrowserRouter });
  const submitButton = screen.getByText("Submit");
  expect(submitButton).toBeInTheDocument();
});

test("add Row working", () => {
  render(<TableComponent />, { wrapper: BrowserRouter });
  const addRowButton = screen.getByText("Add Row");
  fireEvent.click(addRowButton);
  const Rows = screen.getAllByRole("row");
  expect(Rows).toHaveLength(3);
});

test("Delete Row Working", () => {
  render(<TableComponent />, { wrapper: BrowserRouter });
  const addRowButton = screen.getByText("Add Row");
  const deleteButton = screen.getByTestId("delete-button-1");
  expect(deleteButton).toBeInTheDocument();
  fireEvent.click(addRowButton);
  const deleteButton1 = screen.getByTestId("delete-button-2");
  expect(deleteButton1).toBeInTheDocument();
  fireEvent.click(deleteButton1);
  expect(deleteButton1).not.toBeInTheDocument();
});

test("to add the data to the database working", async () => {
  window.history.pushState({}, "", "/add");
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/add" element={<TableComponent />}></Route>
      </Routes>
    </BrowserRouter>
  );

  const inputFields = screen.getAllByTestId("input-1");

  fireEvent.change(inputFields[0], { target: { value: "Maruti" } });
  fireEvent.change(inputFields[1], { target: { value: "Trading" } });
  fireEvent.change(inputFields[2], { target: { value: "12" } });
  fireEvent.change(inputFields[3], { target: { value: "12000" } });
  fireEvent.change(inputFields[4], { target: { value: "4" } });
  const addButton = await screen.findByTestId("submit-button");
  fireEvent.click(addButton);
  await waitForElementToBeRemoved(screen.getByText("Submitting..."));
  expect(screen.getByText("Add Daily Brand Sales")).toBeInTheDocument();
});
