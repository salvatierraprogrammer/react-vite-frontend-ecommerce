import React, { useState } from "react";
import { Container, Typography, Button, Box, List, ListItem, ListItemText, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

// Datos de compras simuladas
const purchasedProducts = [
  { 
    id: 1, 
    name: "Smartphone Xiaomi Redmi Note 12", 
    price: 220, 
    img: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_SL1500_.jpg", 
    category: 'Electrónica',
    purchaseDate: "2025-03-01",
  },
  { 
    id: 2, 
    name: "Laptop ASUS VivoBook 15", 
    price: 599, 
    img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_SL1500_.jpg", 
    category: 'Electrónica',
    purchaseDate: "2025-02-15",
  },

];

const Myshop = () => {
  const navigate = useNavigate(); // Inicializa el hook de navegación
  const [purchases, setPurchases] = useState(purchasedProducts);

  // Función para eliminar un producto de las compras
  const removePurchase = (productId) => {
    setPurchases(purchases.filter((product) => product.id !== productId));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}> 🛍️ Mis Compras</Typography>
      <List>
        {purchases.length > 0 ? (
          purchases.map((product) => (
            <ListItem 
              key={product.id} 
              sx={{ 
                borderBottom: "1px solid #ddd", 
                padding: "15px", 
                display: "flex", 
                justifyContent: "space-between", 
                alignItems: "center",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: "10px"
              }}
              onClick={() => navigate(`/product/${product.id}`)} // Redirigir al hacer clic
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    style={{ 
                      width: "80px", 
                      height: "80px", 
                      objectFit: "cover", 
                      borderRadius: "8px", 
                      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)" 
                    }} 
                  />
                </Grid>
                <Grid item xs={6}>
                  <ListItemText 
                    primary={product.name} 
                    secondary={`Precio: $${product.price} - Fecha de compra: ${product.purchaseDate}`} 
                  />
                </Grid>
                <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={(e) => {
                      e.stopPropagation(); // Evitar que el clic en "Eliminar" también navegue
                      removePurchase(product.id);
                    }}
                    sx={{ borderRadius: "20px", padding: "6px 16px" }}
                  >
                    Eliminar
                  </Button>
                </Grid>
              </Grid>
            </ListItem>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 3 }}>No tienes compras registradas</Typography>
        )}
      </List>
    </Container>
  );
};

export default Myshop;
