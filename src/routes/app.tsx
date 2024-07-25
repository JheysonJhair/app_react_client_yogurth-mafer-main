import AppLayout from "../layouts/AppLayout";
import { Navigate } from "react-router-dom";

import { HomePage } from "../pages/Home";
import { Users } from "../modules/user/pages/Users";
import { NewUser } from "../modules/user/pages/NewUser";
import ProtectedRoute from "../storage/ProtectedRoute";

const appRouter = [
  {
    path: "/",
    element: (
      
     // <ProtectedRoute>
        <AppLayout />
     // </ProtectedRoute>
    ),
    children: [
      // JUGADORES 1 Y 2
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/new-user",
        element: <NewUser />,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
];

export default appRouter;
