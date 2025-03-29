import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import ProductDetail from "../src/page/ProductDetail";
import HomePage from "../src/page/HomePage";
import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";
import { useState } from "react";
import Cart from "./page/Cart";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header onSearch={setSearchTerm} />
        <Box 
          sx={{ 
            flex: 1, 
            overflowY: "auto", 
            pb: "64px" // Padding para evitar que el contenido quede oculto por el footer
          }}
        >
          <Routes>
            <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  );
}


export default App;






