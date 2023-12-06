import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/authContext";

import Home from "./components/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Catalogue from "./components/Catalogue";
import Login from "./components/Login";
import Register from "./components/Register";
import UserDetails from "./components/UserDetails";
import RecipeAdd from "./components/RecipeAdd";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <AuthProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<UserDetails />} />
          <Route path="/recipe/all" element={<Catalogue />} />
          <Route path="/recipe/add" element={<RecipeAdd />} />
        </Routes>

        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
