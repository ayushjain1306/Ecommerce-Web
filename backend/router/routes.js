import express from "express";
import multer from "multer";
import { loginWork, signupWork, forgotPassword, fetchUserData, logoutWork, checkPassword, resetPassword } from "../controllers/accountController.js";
import adminLogin, { adminData, adminLogout } from "../controllers/adminLogin.js";
import userAuth from "../middleware/userAuth.js";
import adminAuth from "../middleware/adminAuth.js";
import { addProduct, addProductImage, getAdminProducts, deleteProduct, editProduct, getProductName } from "../controllers/productsController.js";
import { fetchAdminOrders, bookOrder, getUserOrders, updateStatus } from "../controllers/ordersControllers.js";
import { addCategory, getCategories, deleteCategory, editCategory } from "../controllers/categoriesController.js";
import { getReviews, getProductReviews, addReviewImage, addProductReview, deleteReview } from "../controllers/reviewsController.js";
import { getProductsHome, getShoppingProducts, getProductDetails, getCategoryProducts } from "../controllers/userProductsController.js";
import { addItemCart, checkProductCart, deleteItemInCart, getCartItems } from "../controllers/cartController.js";
import { getSearchData } from "../controllers/searchController.js";
import { getAddresses, addAddress, editAddress, deleteAddress, defaultEdit } from "../controllers/addressController.js";
import { getResult, getYears, getSalesData, getTopSellingProducts } from "../controllers/dashboardController.js";
import { changeCredential } from "../controllers/adminProfileController.js";
// import { createOrder, captureOrder } from "../controllers/paypalController.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({storage});

router.get('/', (request, response) => {
    response.send("Hello from SERVER.");
})

// Admin Routes
router.post('/admin-login', adminLogin);
router.get('/admin-data', adminAuth, adminData);
router.get('/admin-get-products', adminAuth, getAdminProducts);
router.get('/fetch-admin-orders', adminAuth, fetchAdminOrders);
router.post('/add-admin-category', adminAuth, addCategory);
router.get('/admin-get-categories', adminAuth, getCategories);
router.post('/admin-add-products', adminAuth, addProduct);
router.post('/add-product-image', adminAuth, upload.single('file') , addProductImage);
router.get('/admin-get-reviews', adminAuth, getReviews);
router.delete('/admin-delete-product', adminAuth, deleteProduct);
router.delete('/admin-delete-category', adminAuth, deleteCategory);
router.put('/admin-edit-category', adminAuth, editCategory);
router.put('/admin-edit-product', adminAuth, editProduct);
router.put('/admin-update-status', adminAuth, updateStatus);
router.delete('/admin-delete-review', adminAuth, deleteReview);
router.get('/get-product-name', adminAuth, getProductName);
router.delete('/admin-logout', adminLogout);
router.get('/admin-get-result', adminAuth, getResult);
router.get('/admin-get-years', adminAuth, getYears);
router.get('/admin-get-sales-data', adminAuth, getSalesData);
router.get('/admin-get-top-selling-products', adminAuth, getTopSellingProducts);
router.post('/admin-change-credentials', adminAuth, changeCredential);

// User Routes
router.post('/login', loginWork);
router.post('/signup', signupWork);
router.post('/forgot-pass', forgotPassword);
router.get('/get-user-data', userAuth, fetchUserData);
router.get('/get-latest-products-home', getProductsHome);
router.get('/get-shopping-products', getShoppingProducts);
router.get('/get-product-details', getProductDetails);
router.get('/get-product-reviews', getProductReviews);
router.post('/add-review-image', userAuth, upload.single("file"), addReviewImage);
router.post('/add-product-review', userAuth, addProductReview);
router.post('/add-item-cart', userAuth, addItemCart);
router.get('/check-product-cart', userAuth, checkProductCart);
router.get('/get-cart-items', userAuth, getCartItems);
router.delete('/delete-item-cart', userAuth, deleteItemInCart);
router.post('/book-order', userAuth, bookOrder);
router.get('/get-category-products', getCategoryProducts);
router.get('/get-search-data', getSearchData);
router.delete('/user-log-out', logoutWork);
router.get('/check-password', userAuth, checkPassword);
router.put('/reset-password', userAuth, resetPassword);
router.get('/get-addresses', userAuth, getAddresses);
router.post('/add-address', userAuth, addAddress);
router.put('/edit-address', userAuth, editAddress);
router.delete('/delete-address', userAuth, deleteAddress);
router.put('/set-default-address', userAuth, defaultEdit);
router.get('/get-user-orders', userAuth, getUserOrders);
// router.post('/create-order', userAuth, createOrder);
// router.post('/capture-order', userAuth, captureOrder);

export default router;