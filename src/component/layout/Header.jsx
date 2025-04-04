import { AppBar, Toolbar, Typography, IconButton, Box, Badge, Menu, MenuItem } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MenuIcon from "@mui/icons-material/Menu";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useNavigate } from "react-router-dom";  
import shop from '../../assets/shop.png';
import React from "react";
import { Settings, SettingsInputComponent } from "@mui/icons-material";

const Header = ({ cart }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleCartClick = () => navigate("/cart");
  const handleLogoClick = () => navigate("/");
  const handleMenuClick = (event) => setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const cartLength = cart?.length || 2; // Simulación de productos en el carrito

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo */}
        <Typography 
          variant="h6" 
          sx={{ flexGrow: 1, cursor: "pointer" }} 
          onClick={handleLogoClick}
        >
          <img src={shop} alt="Logo" style={{ height: 60, cursor: 'pointer' }} /> 
        </Typography>

        {/* Icono de carrito con badge */}
        <IconButton color="inherit" onClick={handleCartClick}>
          <Badge badgeContent={cartLength} color="secondary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>

        {/* Íconos de usuario y favoritos */}
        <IconButton color="inherit" onClick={() => navigate("/profile")}>
          <AccountCircleIcon />
        </IconButton>

        <IconButton color="inherit" onClick={() => navigate("/favorite")}>
          <FavoriteIcon />
        </IconButton>
        <MenuItem onClick={() => { navigate("/miPanel"); handleCloseMenu(); }}>
          <Settings sx={{ mr: 2 }} />
        </MenuItem>

        {/* Menú hamburguesa */}
        <IconButton color="inherit" onClick={handleMenuClick}>
          <MenuIcon />
        </IconButton>

        {/* Menú desplegable */}
       
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={() => { navigate("/miPanel"); handleCloseMenu(); }}>
          <Settings sx={{ mr: 2 }} /> Mi panel
        </MenuItem>
          <MenuItem onClick={() => { navigate("/"); handleCloseMenu(); }}>
            <StoreIcon sx={{ mr: 2 }} /> Tienda
          </MenuItem>
          <MenuItem onClick={() => { navigate("/profile"); handleCloseMenu(); }}>
            <AccountCircleIcon sx={{ mr: 2 }} /> Mi cuenta
          </MenuItem>
          <MenuItem onClick={() => { navigate("/myshop"); handleCloseMenu(); }}>
            <ShoppingBagIcon sx={{ mr: 2 }} /> Mis compras
          </MenuItem>
          <MenuItem onClick={() => { navigate("/favorite"); handleCloseMenu(); }}>
            <FavoriteIcon sx={{ mr: 2 }} /> Mi lista de deseados
          </MenuItem>
          <MenuItem onClick={() => { navigate("/cart"); handleCloseMenu(); }}>
            <ShoppingCartIcon sx={{ mr: 2 }} /> Mi carrito
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
