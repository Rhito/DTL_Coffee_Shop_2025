import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import _404 from "./pages/_404.jsx";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";

import LoginPage from "./components/auth/LoginPage.jsx";
import RegisterPage from "./components/auth/RegistrationPage.jsx";

import PrivateRoute from "./routes/PrivateRoute";

import UsersList from "./components/dashboard/users/UsersList.jsx";
import EditUser from "./components/dashboard/users/EditUser.jsx";
import AddUser from "./components/dashboard/users/AddUser.jsx";
import UserDetails from "./components/dashboard/users/UserDetails.jsx";

import CategoriesList from "./components/dashboard/categories/CategoriesList.jsx";
import EditCategory from "./components/dashboard/categories/EditCategory.jsx";
import AddCategory from "./components/dashboard/categories/AddCategory.jsx";
import CategoryDetails from "./components/dashboard/categories/CategoryDetails.jsx";

import InventoriesList from "./components/dashboard/inventory/InventoriesList.jsx";
import AddInventory from "./components/dashboard/inventory/AddInventory.jsx";
import EditInventory from "./components/dashboard/inventory/EditInventory.jsx";
import InventoryDetails from "./components/dashboard/inventory/InventoryDetails.jsx";

import OrdersList from "./components/dashboard/orders/OrdersList.jsx";
import AddOrder from "./components/dashboard/orders/AddOrder.jsx";
import EditOrder from "./components/dashboard/orders/EditOrder.jsx";
import OrderDetails from "./components/dashboard/orders/OrderDetails.jsx";

import OrderDetailsList from "./components/dashboard/orderdetails/OrderDetailsList.jsx";
import AddOrderDetail from "./components/dashboard/orderdetails/AddOrderDetail.jsx";
import EditOrderDetail from "./components/dashboard/orderdetails/EditOrderDetail.jsx";
import OrderDetailsDetails from "./components/dashboard/orderdetails/OrderDetailsDetails.jsx";

import ProductsList from "./components/dashboard/products/ProductsList.jsx";
import AddProduct from "./components/dashboard/products/AddProduct.jsx";
import EditProduct from "./components/dashboard/products/EditProduct.jsx";
import ProductDetails from "./components/dashboard/products/ProductDetails.jsx";

import PromotionsList from "./components/dashboard/promotions/PromotionsList.jsx";
import AddPromotion from "./components/dashboard/promotions/AddPromotion.jsx";
import EditPromotion from "./components/dashboard/promotions/EditPromotion.jsx";
import PromotionDetails from "./components/dashboard/promotions/PromotionDetails.jsx";

import ReservationsList from "./components/dashboard/reservations/ReservationsList.jsx";
import AddReservation from "./components/dashboard/reservations/AddReservation.jsx";
import EditReservation from "./components/dashboard/reservations/EditReservation.jsx";
import ReservationDetails from "./components/dashboard/reservations/ReservationDetails.jsx";

import TablesList from "./components/dashboard/tables/TablesList.jsx";
import AddTable from "./components/dashboard/tables/AddTable.jsx";
import EditTable from "./components/dashboard/tables/EditTable.jsx";
import TableDetails from "./components/dashboard/tables/TableDetails.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ProductDetailPage from "./pages/ProductDetailPage.jsx";
import CheckoutPage from "./pages/CheckoutPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

function App() {
  const userID = localStorage.getItem("userId");
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
    {
      path: "/orders",
      elements: {
        list: <OrdersList />,
        create: <AddOrder />,
        edit: <EditOrder />,
        details: <OrderDetails />,
      },
    },
    {
      path: "/order-details",
      elements: {
        list: <OrderDetailsList />,
        create: <AddOrderDetail />,
        edit: <EditOrderDetail />,
        details: <OrderDetailsDetails />,
      },
    },
    {
      path: "/products",
      elements: {
        list: <ProductsList />,
        create: <AddProduct />,
        edit: <EditProduct />,
        details: <ProductDetails />,
      },
    },
    {
      path: "/promotions",
      elements: {
        list: <PromotionsList />,
        create: <AddPromotion />,
        edit: <EditPromotion />,
        details: <PromotionDetails />,
      },
    },
    {
      path: "/reservations",
      elements: {
        list: <ReservationsList />,
        create: <AddReservation />,
        edit: <EditReservation />,
        details: <ReservationDetails />,
      },
    },
    {
      path: "/tables",
      elements: {
        list: <TablesList />,
        create: <AddTable />,
        edit: <EditTable />,
        details: <TableDetails />,
      },
    },
  ];
  return (
    <CartProvider>
      {" "}
      {/* Bọc ứng dụng trong CartProvider */}
      <BrowserRouter>
        <Routes>
          {/* Các route giữ nguyên */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/product-detail/:productId"
            element={<ProductDetailPage />}
          />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route index element={<DashboardPage />} />
          </Route>

          {userID && (
            <Route path="/profile" element={<PrivateRoute />}>
              <Route index element={<ProfilePage />} />
            </Route>
          )}
          {routeCRUD.map((route) => (
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
          <Route path="/product-page" element={<ProductPage />} />
          <Route path="*" element={<_404 />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
