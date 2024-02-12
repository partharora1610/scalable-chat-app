import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthPage from "./pages/AuthPage.tsx";
import RootLayout from "./pages/RootLayout.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import UserContext from "./context/AccountContext.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "chat",
        element: <ChatPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <UserContext> */}
    <RouterProvider router={router} />
    {/* </UserContext> */}
  </React.StrictMode>
);
