import React, { useState } from "react";
import { Container, Typography, Grid } from "@mui/material";
import ProductList from "../component/ProductList";
import CategoryFilter from "../component/CategoryFilter";

const HomePage = ({ searchTerm }) => {
    const [selectedCategory, setSelectedCategory] = useState("Todos"); 
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h4" gutterBottom>
        Catálogo de Productos
      </Typography>

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
