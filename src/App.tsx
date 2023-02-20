import React, { useEffect } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import TableComponent from "./components/TableComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
function App() {
  useEffect(() => {
    document.title = "garaaz";
  }, []);
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <ChakraProvider>
                  <Home />
                </ChakraProvider>
              }
            ></Route>
            <Route
              path="/add"
              element={
                <ChakraProvider>
                  <TableComponent />
                </ChakraProvider>
              }
            ></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
