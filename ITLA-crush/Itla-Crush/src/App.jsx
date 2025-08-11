import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

//import routes
import Navbar from "./components/navbar";
import Home from "./routes/Home";
import Dashboard from "./routes/dashboard";
import Login from "./routes/Auth/Login";
import Signup from "./routes/Auth/Signup";

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </main>
    </>
  );
}
