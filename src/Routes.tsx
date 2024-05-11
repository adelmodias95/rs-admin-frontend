import { createBrowserRouter } from "react-router-dom";

import { PrivateRoute } from "./components/PrivateRoutes";

import { HomePage } from "./pages/HomePage";
import { action as loginAction, LoginPage } from "./pages/LoginPage/LoginPage";
import { LayoutComponent } from "./layouts/LayoutComponent";
import { ServicesPage } from "./pages/ServicesPage";
import { CustomersPage } from "./pages/CustomersPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutComponent />,
        children: [
            {
                path: "/",
                element: (
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>
                ),
            },
            {
                path: "/login",
                element: <LoginPage />,
                action: loginAction,
            },
            {
                path: "/servicos",
                element: (
                    <PrivateRoute>
                        <ServicesPage />
                    </PrivateRoute>
                ),
            },
            {
                path: "/clientes",
                element: (
                    <PrivateRoute>
                        <CustomersPage />
                    </PrivateRoute>
                ),
            },
        ],
    },
]);

export { router };
