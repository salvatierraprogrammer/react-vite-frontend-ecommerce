import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import data from "../data/data";

const ProductList = ({ search, category }) => {
  const navigate = useNavigate();

  // Filtrar productos según búsqueda y categoría
  const filteredProducts = data.filter(
    (product) =>
      (category === "Todos" || product.category === category) &&
      product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Grid 
      container 
      spacing={2} 
      sx={{ 
        marginBottom: 5, 
        justifyContent: "center", // Centramos los productos
        flexWrap: "wrap", // Aseguramos que el contenido se ajuste a varias filas
      }} 
    >
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Grid item xs={12} sm={6} md={3} lg={3} key={product.id}>
            <Card 
              sx={{ 
                cursor: "pointer", 
                display: "flex", 
                flexDirection: "column", 
                justifyContent: "space-between",
                height: "100%", 
                maxWidth: 250, // Ajustamos el tamaño de las tarjetas para que no sean tan grandes
                margin: "0 auto", // Centramos las tarjetas dentro de su contenedor
              }} 
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardMedia 
                component="img" 
                height="180" 
                image={product.img} 
                alt={product.name} 
                loading="lazy"
                sx={{ objectFit: "contain", padding: "10px" }} 
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontSize: "1rem", 
                    fontWeight: "bold", 
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 2, // Permite hasta 2 líneas antes de cortar
                    overflow: "hidden"
                  }}
                >
                  {product.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {product.price}
                </Typography>
              </CardContent>
              <Box sx={{ textAlign: "center", pb: 2, px: 2 }}>
                <Button variant="contained" fullWidth>
                  Comprar
                </Button>
              </Box>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid item xs={12}>
          <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
            No se encontraron productos
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default ProductList;
