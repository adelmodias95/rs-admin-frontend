import "./App.css";
import { RouterProvider } from "react-router-dom";

import { router } from "./Routes";

import { ChakraProvider, Container } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            body: {
                backgroundColor: "gray.100",
            },
        },
    },

    colors: {
        primary: "#C667AD",
        primaryHover: "#9F4388",
        white: "#fff",
        titleColor: "#333",
    },
});

function App() {
    return (
        <>
            <ChakraProvider theme={theme}>
                <RouterProvider router={router} />
            </ChakraProvider>
        </>
    );
}

export default App;
