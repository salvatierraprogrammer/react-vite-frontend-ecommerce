import { AppBar, Toolbar, Typography, IconButton, TextField, Box, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";  

const Header = ({ onSearch, cart }) => {
  const navigate = useNavigate();

  // Maneja el clic en el carrito
  const handleCartClick = () => {
    navigate("/cart");
  };

  // Maneja el clic en el logo
  const handleLogoClick = () => {
    navigate("/"); // Redirigir a la página de inicio
  };

  // Simulación de 2 productos en el carrito
  const cartLength = 2;  // Aquí estamos forzando que siempre haya 2 productos en el carrito

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo clickeable */}
        <Typography 
          variant="h6" 
          sx={{ flexGrow: 1, cursor: "pointer" }} 
          onClick={handleLogoClick}
        >
          Mi eCommerce
        </Typography>
        
        {/* Buscador */}
        <Box sx={{ mr: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Buscar productos..."
            onChange={(e) => onSearch(e.target.value)}
            sx={{
              bgcolor: "white",
              borderRadius: 1,
              input: { color: "black" },
            }}
          />
        </Box>

        {/* Icono de carrito con badge */}
        <IconButton color="inherit" onClick={handleCartClick}>
          <Badge 
            badgeContent={cartLength} // Muestra siempre 2 productos en el carrito
            color="secondary" // Color del badge
            sx={{ "& .MuiBadge-dot": { backgroundColor: "#ff4081" } }} // Color moderno
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
