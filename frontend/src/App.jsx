import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from './Components/home/Homepage.jsx';
import { UserProvider } from './context/userContext.jsx';
import OrderProvider from './context/orderContext.jsx';
import AdminLogin from './Admin/login/AdminLogin.jsx';
import AdminDashboard from './Admin/dashboard/AdminDashboard.jsx';
import Products from './Admin/dashboard/Products.jsx';
import Orders from './Admin/dashboard/Orders.jsx';
import Categories from './Admin/dashboard/Categories.jsx';
import ProductReviews from './Admin/dashboard/ProductReviews.jsx';
import Shopping from './Components/shop/Shopping.jsx';
import ProductDetails from './Components/productDetails/ProductDetails.jsx';
import Cart from './Components/cart/Cart.jsx';
import OrderPage from './Components/order/OrderPage.jsx';
import Common from './Components/Common.jsx';
import Profile from './Components/profile/Profile.jsx';
import { CategoryProvider } from './context/categoryContext.jsx';
import { SearchProvider } from './context/searchContext.jsx';
import Password from './Components/profile/Password.jsx';
import UserOrders from './Components/profile/Orders.jsx';
import Address from './Components/profile/Address.jsx';
import Dashboard from './Admin/dashboard/Dash/DashBoard.jsx';
import { AdminProvider } from './context/adminContext.jsx';
import AdminProfile from "./Admin/dashboard/Profile.jsx";

function App() {
  return (
    <SearchProvider>
      <CategoryProvider>
        <OrderProvider>
          <UserProvider>
            <AdminProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Common />}>
                    <Route index element={<Homepage />} />
                    <Route path='shopping' element={<Shopping />} />
                    <Route path='shopping/:product_id' element={<ProductDetails />} />
                    <Route path='cart' element={<Cart />} />
                    <Route path='account' element={<Profile />}>
                      <Route index element={<UserOrders />} />
                      <Route path='addresses' element={<Address />} />
                      <Route path='reset-password' element={<Password />} />
                    </Route>
                  </Route>
                  <Route path='order' element={<OrderPage />} />
                  <Route path='/admin-login' element={<AdminLogin />} />
                  <Route path='/admin' element={<AdminDashboard />}>
                    <Route index element={<Dashboard />} />
                    <Route path='profile' element={<AdminProfile />} />
                    <Route path='orders' element={<Orders />} />
                    <Route path='products' element={<Products />} />
                    <Route path='categories' element={<Categories />} />
                    <Route path='product-reviews' element={<ProductReviews />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </AdminProvider>
          </UserProvider>
        </OrderProvider>
      </CategoryProvider>
    </SearchProvider>
  )
}

export default App
