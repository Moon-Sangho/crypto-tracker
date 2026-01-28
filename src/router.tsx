import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/home";
import CryptoList from "./pages/crypto-list";
import CryptoDetail from "./pages/crypto-detail";
import Favorites from "./pages/favorites";
import Layout from "./components/layout";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/crypto" element={<CryptoList />} />
          <Route path="/crypto/:coinId" element={<CryptoDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
