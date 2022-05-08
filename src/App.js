import React from "react";
import Textarea from "./components/Textarea";
import Record from "./components/Record";
import Download from "./components/Download";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <ChakraProvider>
          <Routes>
            <Route exact path="/" element={<Textarea />}></Route>
            <Route exact path="Record" element={<Record/>}></Route>
            <Route exact path="Download" element={<Download />}></Route>
          </Routes>
      </ChakraProvider>
    </>
  );
}

export default App;
