import React from "react";
import Textarea from "./components/Textarea";
import Record from "./components/Record";
import Download from "./components/Download";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import MyProvider from "./components/MyProvider";

function App() {
  const vid = "download-vid";
  return (
    <>
      <ChakraProvider>
        <MyProvider>
          <Routes>
            <Route exact path="/" element={<Textarea />}></Route>
            <Route exact path="Record" element={<Record vid2={vid}/>}></Route>
            <Route exact path="Download" element={<Download vid2={vid} />}></Route>
          </Routes>
        </MyProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
