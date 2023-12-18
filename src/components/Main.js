import React from "react";
import "../styles/Main.css";
import NavPage from "./NavPage";
import ErrorPage from "./ErrorPage";

import Pomodoro from "./Pomodoro";
import TaskList from "./TaskList";
import Music from "./Music";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyCQjHZVkaLZAPAQuA0V3XqlqXXfKdZ6CKA",
  authDomain: "be-productive-68b27.firebaseapp.com",
  databaseURL:
    "https://be-productive-68b27-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "be-productive-68b27",
  storageBucket: "be-productive-68b27.appspot.com",
  messagingSenderId: "641540293833",
  appId: "1:641540293833:web:c41c0be6fe6b12a996f918",
  measurementId: "G-C56YW66E0K",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export default function Main() {
  const [start, setStart] = React.useState(false);

  function toggleStart() {
    setStart((prevStart) => !prevStart);
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <main>
          <div className="main">
            <Link to="/nav" id="main-text">
              <h1>BE PRODUCTIVE</h1>
            </Link>
          </div>
        </main>
      ),
      // errorElement: <ErrorPage />,
    },
    {
      path: "/nav",
      element: <NavPage toggleClick={toggleStart} />,
    },
    {
      path: "/pomodoro",
      element: <Pomodoro database={database} />,
    },
    {
      path: "/todo",
      element: <TaskList database={database} />,
    },
    {
      path: "/music",
      element: <Music database={database} />,
    },
  ]);

  return <RouterProvider router={router} />;
}
