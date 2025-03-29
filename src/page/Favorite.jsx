import React, { useState } from "react";
import { Container, Typography, Button, Grid, Card, CardMedia, CardContent, IconButton, Box } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const products = [
  { id: 1, name: "Smartphone Xiaomi Redmi Note 12", price: 220, img: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_SL1500_.jpg" },
  { id: 2, name: "Laptop ASUS VivoBook 15", price: 599, img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_SL1500_.jpg" },
];

const FavoritePage = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(products);

  const removeFromFavorites = (productId) => {
    setFavorites(favorites.filter((product) => product.id !== productId));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>Favoritos</Typography>
      <Grid container spacing={2} justifyContent="center">
        {favorites.length > 0 ? (
          favorites.map((product) => (
            <Grid item xs={6} sm={6} md={3} lg={3} key={product.id}>
              <Card 
                sx={{ 
                  cursor: "pointer", 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "space-between",
                  height: "100%", 
                  width: "100%", // Ocupar todo el ancho disponible
                  maxWidth: 180, // Reducimos para que quepan bien en pantallas pequeñas
                  margin: "0 auto", 
                }} 
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <CardMedia 
                  component="img" 
                  height="160" 
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
                      WebkitLineClamp: 2, 
                      overflow: "hidden"
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Precio: ${product.price}
                  </Typography>
                </CardContent>
                <Box sx={{ textAlign: "center", pb: 2, px: 2 }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromFavorites(product.id);
                    }}
                    sx={{ borderRadius: "20px" }}
                  >
                    Eliminar
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ textAlign: "center", mt: 2 }}>
              No tienes productos favoritos
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default FavoritePage;
