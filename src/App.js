import React from "react";
import Textarea from "./components/Textarea";
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <>
    <ChakraProvider>
      <Textarea/>
    </ChakraProvider>
    </>
  );
}

export default App;
