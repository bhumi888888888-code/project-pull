import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import HomePage from "./pages/user/HomePage";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./store/slices/auth.slice";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AppLayout from "./components/layout/AppLayout";
import ProfilePage from "./pages/user/ProfilePage";
import CartPage from "./pages/user/CartPage";
import CheckoutPage from "./pages/user/CheckoutPage";
import OrdersPage from "./pages/user/OrdersPage";
import ProductsPage from "./pages/user/ProductsPage";
import SocialMedia from "./pages/user/SocialMedia/SocialMedia";
import ManageProducts from "./pages/seller/ManageProducts";
import InventoryManager from "./pages/seller/InventoryManager";
import ManageOrders from "./pages/seller/ManageOrders";
import OrdersTable from "./pages/seller/OrdersTable";
import SellerDashboard from "./pages/seller/SellerDashboard";
import ManageSellers from "./pages/admin/ManageSellers";
import ManageUsers from "./pages/admin/ManageUsers";
import { Home, Loader } from "lucide-react";
import ProductDetails from "./pages/user/ProductDetails";
import Register from "./pages/auth/Register";
import Menu from "./components/layout/Menu";
import SuccessPage from "./pages/user/SuccessPage";
import Notifications from "./pages/Notifications";

// ********* uncomment ****************
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { authUser,loading } = useSelector((state) => state.auth);

  if(loading) return <Loader />

  if (!authUser) {
    return <Navigate to={"/login"} replace />;
  }

  if (
    allowedRoles?.length &&
    authUser?.role &&
    !allowedRoles.includes(authUser.role)
  ) {
    const redirectPath =
      authUser.role === "Admin"
        ? "/admin"
        : authUser.role === "Seller"
          ? "/seller"
          : "/user";

    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

// const ProtectedRoute = ({ children }) => {
//   return children;
// }
const App = () => {
  //   console.log({
  //   Reels,
  //   ManageProducts,
  //   InventoryManager,
  //   ManageOrders,
  //   OrdersTable,
  //   SellerDashboard,
  //   ManageProducts,
  //   ManageSellers,
  //   ManageUsers
  // });

  const { isAuthenticated, authUser, loading } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();

  // ********* uncomment ****************
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center ">
        <Loader className="animate-spin mb-4 text-secondary-dark" />
        <p className="text-secondary-dark text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Routes>
        {/* Default Redirect */}
        <Route path="/" element={<Navigate to={"/login"} replace />} />
        <Route
          path="/unauthorized"
          element={
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-800 mb-4">
                  Unauthorized Access
                </h1>
                <p className="text-slate-600 mb-4">
                  You don't have permission to access this page.
                </p>
                <button
                  onClick={() => window.history.back()}
                  className="text-white bg-blue-600 px-4 py-2 text-lg font-semibold hover:bg-blue-700"
                >
                  Go Back
                </button>
              </div>
            </div>
          }
        />
        <Route path="*" element={<NotFound />} />
        {/* Auth Routes */}
        {/* <Route path="/login" element={
          authUser?.role === "Admin"
          ? <Navigate to="/admin" replace />
            : authUser?.role === "Seller"
          ? <Navigate to="/seller" replace/>
          : authUser?.role === "User"
          ? <Navigate to="/user" replace/>
          : <Navigate to="/login" replace />
        } /> */}
        // ********* uncomment ****************
        <Route
          path="/login"
          element={
            authUser ? (
              authUser.role === "Admin" ? (
                <Navigate to="/admin" replace />
              ) : authUser.role === "Seller" ? (
                <Navigate to="/seller" replace />
              ) : (
                <Navigate to="/user" replace />
              )
            ) : (
              <LoginPage />
            )
          }
        />
        {/* <Route path="/login" element={<LoginPage /> } /> */}
        <Route path="/register" element={<Register />} />
        {/* Admin Routes */}
        <Route
          path={"/admin"}
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AppLayout userRole="Admin" />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
        </Route>
        {/* User Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <AppLayout userRole="User" />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="product-details/:id" element={<ProductDetails />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="social-media-home-page" element={<SocialMedia />} />
          <Route path="menu" element={<Menu />} />
        </Route>
        {/* Seller Routes */}
        <Route
          path="/seller"
          element={
            <ProtectedRoute allowedRoles={["Seller"]}>
              <AppLayout userRole="Seller" />
            </ProtectedRoute>
          }
        >
          <Route index element={<SellerDashboard />} />
          <Route path="manage-products" element={<ManageProducts />} />
          <Route path="manage-inventory" element={<InventoryManager />} />
          <Route path="manage-orders" element={<ManageOrders />} />
        </Route>

          <Route path="/success" element={<SuccessPage />} />
          <Route path="/notification" element={<Notifications />} />
      </Routes>
    </>
  );
};

export default App;
