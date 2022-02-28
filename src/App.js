import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import Dashboard from "./pages/Dashboard";
import Playable from "./component/playables";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";

const AuthRoute = ({ user }) => {
  return user ? <Outlet user={user} /> : <Navigate to="/login" />;
};

export default function App() {
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, setUser);

  return (
    <Routes>
      <Route exact path="/" element={<AuthRoute user={user} />}>
        <Route exact path="/" element={<Dashboard />} />
      </Route>
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/playable" element={<Playable />} />
    </Routes>
  );
}
