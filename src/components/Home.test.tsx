import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";
import React from "react";
import { server } from "../mocks/server";
import { rest } from "msw";
import { Routes, Route } from "react-router-dom";
import TableComponent from "./TableComponent";

test("Having h1", async () => {
  render(<Home />, { wrapper: BrowserRouter });
  expect(screen.getByText("Daily Brand Sales")).toBeInTheDocument();
});

test("Having link", async () => {
  render(<Home />, { wrapper: BrowserRouter });
  const link = screen.getByRole("link");
  expect(link).toBeInTheDocument();
  expect(link).toHaveTextContent("Add Daily Brand Sales");
});

test("Having Data", async () => {
  render(<Home />, { wrapper: BrowserRouter });
  expect(await screen.findAllByTestId("data-row")).toHaveLength(1);
});

test("Having error message on error", async () => {
  server.use(
    rest.get(
      "http://localhost:8000/api/v1/brand_sales_daily",
      (req, res, ctx) => {
        return res(ctx.status(400));
      }
    )
  );
  render(<Home />, { wrapper: BrowserRouter });
  const errorText = await screen.findByTestId("error-message");
  expect(errorText).toBeInTheDocument();
});

test("routes to /add when clicked the Link /add", async () => {
  window.history.pushState({}, "", "/");
  render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/add" element={<TableComponent />}></Route>
      </Routes>
    </BrowserRouter>
  );
  const Link = screen.getByText("Add Daily Brand Sales");
  fireEvent.click(Link);

  expect(await screen.findByText("Add Daily Brand Sales")).toBeInTheDocument();
});
