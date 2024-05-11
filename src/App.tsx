import "./App.css";
import { RouterProvider } from "react-router-dom";

import { router } from "./Routes";

import { GlobalStyles } from "./GlobalStyle";

function App() {
    return (
        <>
            <GlobalStyles />
            <RouterProvider router={router} />
        </>
    );
}

export default App;
