import { useState } from "react";
import { Container, Typography, Button, Box, List, ListItem, ListItemText, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Importa useNavigate

// Datos de productos de ejemplo
const products = [
  { 
    id: 1, 
    name: "Smartphone Xiaomi Redmi Note 12", 
    price: 220, 
    img: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_SL1500_.jpg", 
    category: 'Electrónica',
  },
  { 
    id: 2, 
    name: "Laptop ASUS VivoBook 15", 
    price: 599, 
    img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_SL1500_.jpg", 
    category: 'Electrónica', 
  },
  { 
    id: 3, 
    name: "Auriculares Gamer Logitech G435", 
    price: 55, 
    img: "https://example.com/img.jpg", // Reemplazar con URL válida
    category: 'Electrónica', 
  },
  { 
    id: 4, 
    name: "Smartwatch Xiaomi Redmi Watch 3", 
    price: 89, 
    img: "https://example.com/img.jpg", // Reemplazar con URL válida
    category: 'Electrónica', 
  },
];

const Cart = () => {
  const navigate = useNavigate(); // Inicializa el hook de navegación
  const [cart, setCart] = useState([
    { id: 1, name: "Smartphone Xiaomi Redmi Note 12", price: 220, quantity: 1, img: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_SL1500_.jpg" },
    { id: 2, name: "Laptop ASUS VivoBook 15", price: 599, quantity: 1, img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_SL1500_.jpg" },
  ]);

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  // Calcular el total
  const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: "bold" }}>Carrito de Compras</Typography>
      <List>
        {cart.length > 0 ? (
          cart.map((product) => (
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
                    secondary={`Precio: $${product.price} x Cantidad: ${product.quantity}`} 
                  />
                </Grid>
                <Grid item xs={3} sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={(e) => {
                      e.stopPropagation(); // Evitar que el clic en "Eliminar" también navegue
                      removeFromCart(product.id);
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
          <Typography variant="h6" sx={{ textAlign: "center", mt: 3 }}>Tu carrito está vacío</Typography>
        )}
      </List>
      {cart.length > 0 && (
        <>
          <Typography variant="h6" sx={{ textAlign: "right", mt: 2, fontWeight: "bold" }}>Total: ${total}</Typography>
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <Button 
              variant="contained" 
              color="primary" 
              sx={{ width: "100%", borderRadius: "25px", padding: "12px" }}
            >
              Finalizar Compra
            </Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
