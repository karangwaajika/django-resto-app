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
import ViewBeverages from "./pages/ViewBeverages.jsx";
import AddWaiter from "./pages/AddWaiter.jsx";
import ViewWaiters from "./pages/ViewWaiters.jsx";
import HomeDashboard from "./pages/HomeDashboard.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import WaiterHome from "./pages/waiter/Home.jsx";
import Service from "./pages/waiter/Service.jsx";
import Beverages from "./pages/waiter/Beverages.jsx";
import Smoothies from "./pages/waiter/Smoothies.jsx";
import Meal from "./pages/waiter/Meal.jsx";
import Order from "./pages/waiter/Order.jsx";
import ViewOrders from "./pages/waiter/ViewOrders.jsx";
import WaiterOrders from "./pages/waiter/WaiterOrders.jsx";
import ApproveBill from "./pages/waiter/ApproveBill.jsx";
import ReOrder from "./pages/waiter/ReOrder.jsx";
import EditOrder from "./pages/waiter/EditOrder.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFoundPage />,
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
  {
    element: <ProtectPage />,
    children: [
      {
        element: <Service />,
        children: [
          {
            path: "/service/home",
            element: <WaiterHome />,
          },
          {
            path: "/service/beverages",
            element: <Beverages />,
          },
          {
            path: "/service/smoothies",
            element: <Smoothies />,
          },
          {
            path: "/service/meals",
            element: <Meal />,
          },
          {
            path: "/service/service",
            element: <Order />,
          },
          {
            path: "/service/orders",
            element: <ViewOrders />,
          },
          {
            path: "/service/my-services",
            element: <WaiterOrders />,
          },
          {
            path: "/service/approve/:orderId/bill",
            element: <ApproveBill />,
          },
          {
            path: "/service/:orderId/reorder",
            element: <ReOrder />,
          },
          {
            path: "/service/:orderId/edit-order",
            element: <EditOrder />,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
