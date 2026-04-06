import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Books from "../Pages/Books/Books";
import Homepage from "../Pages/Homepage/Homepage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import BookDetails from "../Pages/bookDetails/BookDetails";
import { Component } from "react";
import pagesToRead from "../Components/PagesToRead/pagesToRead";

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
      {
        path: "/bookDetails/:bookId", //dynamic
        Component: BookDetails,
        loader: ()=> fetch('/booksData.json')
      },
      {
        path: "/page-to-read",
        Component: pagesToRead,
      }
    ],

    errorElement: <ErrorPage></ErrorPage>
  },

]);