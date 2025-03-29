import React, { useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import ProductList from "../component/ProductList";
import CategoryFilter from "../component/CategoryFilter";
import SearchBar from "../component/SearchBar";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Container sx={{ mt: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" }, // Responsivo
          fontWeight: "bold",
        }}
      >
        🛒 Catálogo de Productos
      </Typography>
      
      {/* Barra de búsqueda */}
      <SearchBar onSearch={setSearchTerm} />

      {/* Filtro de categorías */}
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      {/* Lista de productos filtrados */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProductList search={searchTerm} category={selectedCategory} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
