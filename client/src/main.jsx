import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectPage from "./utils/ProtectPage.jsx";
import AddTea from "./pages/AddTea.jsx";
import ViewTeas from "./pages/ViewTeas.jsx";
import AddMeal from "./pages/AddMeal.jsx";
import ViewMeals from "./pages/ViewMeals.jsx";
import AddBeverage from "./pages/AddBeverage.jsx";
import PurchaseBeverage from "./pages/PurchaseBeverage.jsx";
import ViewBeverages from "./pages/ViewBeverages.jsx";
import AddWaiter from "./pages/AddWaiter.jsx";
import ViewWaiters from "./pages/ViewWaiters.jsx";
import HomeDashboard from "./pages/HomeDashboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    element: <ProtectPage />,
    children: [
      {
        element: <Dashboard />,
        children: [
          {
            path: "/dashboard/home",
            element: <HomeDashboard />,
          },
          {
            path: "/dashboard/add-tea",
            element: <AddTea />,
          },
          {
            path: "/dashboard/view-teas",
            element: <ViewTeas />,
          },
          {
            path: "/dashboard/add-meal",
            element: <AddMeal />,
          },
          {
            path: "/dashboard/view-meals",
            element: <ViewMeals />,
          },
          {
            path: "/dashboard/purchase-beverage",
            element: <PurchaseBeverage />,
          },
          {
            path: "/dashboard/add-beverage",
            element: <AddBeverage />,
          },
          {
            path: "/dashboard/view-beverages",
            element: <ViewBeverages />,
          },
          {
            path: "/dashboard/add-waiter",
            element: <AddWaiter />,
          },
          {
            path: "/dashboard/view-waiters",
            element: <ViewWaiters />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
