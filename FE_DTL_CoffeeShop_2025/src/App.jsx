import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";

import LoginPage from "./components/auth/LoginPage.jsx";
import RegisterPage from "./components/auth/RegistrationPage.jsx";

import PrivateRoute from "./routes/PrivateRoute";

import UsersList from "./components/dashboard/users/UsersList.jsx";
import EditUser from "./components/dashboard/users/EditUser.jsx";
import AddUser from "./components/dashboard/users/AddUser.jsx";
import UserDetails from "./components/dashboard/users/UserDetails.jsx";
import _404 from "./pages/_404.jsx";

import CategoriesList from "./components/dashboard/categories/CategoriesList.jsx";
import EditCategory from "./components/dashboard/categories/EditCategory.jsx";
import AddCategory from "./components/dashboard/categories/AddCategory.jsx";
import CategoryDetails from "./components/dashboard/categories/CategoryDetails.jsx";

import InventoriesList from "./components/dashboard/inventory/InventoriesList.jsx";
import AddInventory from "./components/dashboard/inventory/AddInventory.jsx";
import EditInventory from "./components/dashboard/inventory/EditInventory.jsx";
import InventoryDetails from "./components/dashboard/inventory/InventoryDetails.jsx";

function App() {
  const routeCRUD = [
    {
      path: "/users",
      elements: {
        list: <UsersList />,
        create: <AddUser />,
        edit: <EditUser />,
        details: <UserDetails />,
      },
    },
    {
      path: "/categories",
      elements: {
        list: <CategoriesList />,
        create: <AddCategory />,
        edit: <EditCategory />,
        details: <CategoryDetails />,
      },
    },
    {
      path: "/inventory",
      elements: {
        list: <InventoriesList />,
        create: <AddInventory />,
        edit: <EditInventory />,
        details: <InventoryDetails />,
      },
    },
    //{ path: "/orders", elements: {} },
    // { path: "/order-details" },
    // { path: "/products" },
    // { path: "/promotions"},
    // { path: "/reservations"},
    // { path: "/tables" },
  ];
  return (
    <BrowserRouter>
      <Routes>
        {/* 🟢 Route công khai */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* 🔒 Route cần đăng nhập */}
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route index element={<DashboardPage />} />
        </Route>

        {routeCRUD &&
          routeCRUD.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<PrivateRoute />}
            >
              <Route index element={route.elements.list} />
              <Route path="edit/:id" element={route.elements.edit} />
              <Route path="create" element={route.elements.create} />
              <Route path="details/:id" element={route.elements.details} />
            </Route>
          ))}

        {/* 🟢 Xử lý khi không khớp route nào */}
        <Route path="*" element={<_404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
