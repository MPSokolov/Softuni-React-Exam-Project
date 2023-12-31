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
import RecipeDetails from "./components/RecipeDetails";
import RecipeEdit from "./components/RecipeEdit";
import RecipeDelete from "./components/RecipeDelete";
import Page404 from "./components/Page404";
import ErrorBoundary from "./components/ErrorBoundary";
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipe/all" element={<Catalogue />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route element={<AuthGuard />}>
            <Route path="/user" element={<UserDetails />} />
            <Route path="/recipe/add" element={<RecipeAdd />} />
            <Route path="/recipe/:id/edit" element={<RecipeEdit />} />
            <Route path="/recipe/:id/delete" element={<RecipeDelete />} />
          </Route>
          <Route path="*" element={<Page404/>} />
        </Routes>

        <Footer />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
