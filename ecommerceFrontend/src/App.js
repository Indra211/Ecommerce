import "./App.css";
import { Header } from "./components";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { URL } from "./utility/Urls";
import { useDispatch } from "react-redux";
import { addProducts } from "./redux/ProductSLice";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(URL.fetch_products);
      const jsondata = await response.json();
      dispatch(addProducts(jsondata?.data));
      // console.log(jsondata);
    };
    fetchProducts();
  }, []);
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <Header />
        <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
