import { createBrowserRouter } from "react-router";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProductList from "./pages/ProductList";
import ProductForm from "./pages/ProductForm";
import ProductDetail from "./pages/ProductDetail";
import EntryRegister from "./pages/EntryRegister";
import EntryHistory from "./pages/EntryHistory";
import ExitRegister from "./pages/ExitRegister";
import ExitHistory from "./pages/ExitHistory";
import StockView from "./pages/StockView";
import StockAdjustment from "./pages/StockAdjustment";
import Reports from "./pages/Reports";
import Layout from "./components/Layout";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "productos", Component: ProductList },
      { path: "productos/nuevo", Component: ProductForm },
      { path: "productos/editar/:id", Component: ProductForm },
      { path: "productos/:id", Component: ProductDetail },
      { path: "entradas", Component: EntryHistory },
      { path: "entradas/nuevo", Component: EntryRegister },
      { path: "salidas", Component: ExitHistory },
      { path: "salidas/nuevo", Component: ExitRegister },
      { path: "stock", Component: StockView },
      { path: "stock/ajuste", Component: StockAdjustment },
      { path: "reportes", Component: Reports },
    ],
  },
]);
