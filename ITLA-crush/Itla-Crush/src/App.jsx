import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

//import routes
import Navbar from "./components/Navbar";
import Home from "./routes/Home";

import Login from "./routes/Auth/Login";
import Signup from "./routes/Auth/Signup";
import ConfessionForm from "./routes/ConfessionForm";

export default function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/confess" element={<ConfessionForm />} />
        </Routes>
      </main>
    </>
  );
}
