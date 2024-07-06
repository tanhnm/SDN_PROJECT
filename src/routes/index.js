import DefaultLayout from "Components/layout/DefaultLayout";
import LoginForm from "Components/Molescule/LoginForm/LoginForm";
import VerifiOTP from "Components/Molescule/VerifyOtp";
import Register from "Components/Molescule/RegisterForm/index.jsx";
import GioiThieu from "Components/Molescule/GioiThieu/GioiThieu";
import Contact from "Components/Molescule/Contact/Contact";
import ErrorPage from "Components/Molescule/ErrorPage/ErrorPage";
import Dogfood from "Components/Molescule/ProductPage/Dogfood/Dogfood";
import Catfood from "Components/Molescule/ProductPage/Catfood/Catfood";
import Dogproduct from "Components/Molescule/ProductPage/Dogproduct/Dogproduct";
import Catproduct from "Components/Molescule/ProductPage/Catproduct/Catproduct";
import HomePage from "Components/Pages/HomePage/HomePage";
import CatGeneral from "Components/Molescule/ProductPage/CatGeneral/CatGeneral";
import DogGeneral from "Components/Molescule/ProductPage/DogGeneral/DogGeneral";
import Product from "Components/Molescule/ProductPage/Product.jsx/Product";
import Productdetail from "Components/Molescule/ProductDetail/Productdetail";
import Services from "Components/Molescule/Services/Services";
import ServicesDetail from "Components/Molescule/ServicesDetail/ServicesDetail";
import Order from "Components/Molescule/Order/Order";
import Cart from "Components/Molescule/Cart/Cart";
import ProductSearch from "Components/Molescule/ProductPage/ProductSearch/ProductSearch";
import StaffPage from "Components/Molescule/Staff/StaffPage";
import Petinfo from "Components/Molescule/PetInfo/PetInfo";
import ListOrder from "Components/Molescule/Staff/ListOrder/ListOrder";
import OrderHistory from "Components/Molescule/OrderHistory/OrderHistory";
import UserProfile from "Components/Molescule/UserProfile/UserProfile";
import ListBooking from "Components/Molescule/Staff/ListBooking/ListBooking";
const role = localStorage.getItem("userRole");
const publicRoute = [
  { path: "/register", component: Register, layout: null },
  { path: "/introduction", component: GioiThieu, layout: DefaultLayout },
  { path: "/login", component: LoginForm, layout: null },
  { path: "/verify", component: VerifiOTP, layout: null },
  { path: "/contact", component: Contact, layout: DefaultLayout },
  { path: "/dog-food", component: Dogfood, layout: DefaultLayout },
  { path: "/cat-food", component: Catfood, layout: DefaultLayout },
  { path: "/dog-product", component: Dogproduct, layout: DefaultLayout },
  { path: "/cat-product", component: Catproduct, layout: DefaultLayout },

  { path: "/", component: HomePage, layout: DefaultLayout },
  {
    path: "/cat-product-general",
    component: CatGeneral,
    layout: DefaultLayout,
  },
  {
    path: "/dog-product-general",
    component: DogGeneral,
    layout: DefaultLayout,
  },

  { path: "/general-product", component: Product, layout: DefaultLayout },
  { path: "/product/search", component: ProductSearch, layout: DefaultLayout },
  { path: "/product/:id", component: Productdetail, layout: DefaultLayout },
  { path: "*", component: ErrorPage, layout: null },
  { path: "/services", component: Services, layout: DefaultLayout },
  { path: "/services/:id", component: ServicesDetail, layout: DefaultLayout },
  { path: "/order", component: Order, layout: DefaultLayout },
  { path: "/shopping-cart", component: Cart, layout: DefaultLayout },
  { path: "/pet-info", component: Petinfo, layout: DefaultLayout },
  { path: "/order-history", component: OrderHistory, layout: DefaultLayout },
  { path: "/profile", component: UserProfile, layout: DefaultLayout },
];
if (role == "STAFF") {
  publicRoute.push({
    path: "/staff",
    component: ListBooking,
    layout: StaffPage,
  });
  publicRoute.push({
    path: "/staff/list-order",
    component: ListOrder,
    layout: StaffPage,
  });
  publicRoute.push({
    path: "/staff/list-booking",
    component: ListBooking,
    layout: StaffPage,
  });
}
const privateRoute = [];
export { publicRoute, privateRoute };
