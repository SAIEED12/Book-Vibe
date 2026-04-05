import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Books from "../Pages/Books/Books";
import Homepage from "../Pages/Homepage/Homepage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true, 
        element: <Homepage></Homepage>
      },
      {
        path: "/books", 
        element: <Books></Books>
      },
    ],
    
    errorElement: <ErrorPage></ErrorPage>
  },

]);