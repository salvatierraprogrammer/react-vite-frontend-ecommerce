import React from "react";
import { Box, Button } from "@mui/material";
import ElectronicsIcon from '@mui/icons-material/Devices';
import ShirtIcon from '@mui/icons-material/Checkroom';
import HomeIcon from '@mui/icons-material/Home';
import ToysIcon from '@mui/icons-material/Toys';
import SportsIcon from '@mui/icons-material/SportsHandball';
import AllIcon from '@mui/icons-material/AllInclusive'; // Ícono para "Todos"

// Simulación de categorías
const categories = [
  { name: "Todos", icon: <AllIcon /> },
  { name: "Deportes", icon: <SportsIcon /> },
  { name: "Electrónica", icon: <ElectronicsIcon /> },
  { name: "Hogar", icon: <HomeIcon /> },
  { name: "Juguetes", icon: <ToysIcon /> },
  { name: "Ropa", icon: <ShirtIcon /> }


];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto",
        gap: 2,
        py: 1,
        px: 2,
        whiteSpace: "nowrap",
        backgroundColor: "background.paper",
        borderRadius: 2,
        mb: 3,
        scrollbarWidth: "none",  // Ocultar scrollbar en Firefox
        "&::-webkit-scrollbar": { display: "none" }, // Ocultar scrollbar en WebKit
      }}
    >
      {categories.map((category) => (
        <Button
          key={category.name}
          variant={selectedCategory === category.name ? "contained" : "outlined"}
          onClick={() => onCategoryChange(category.name)}
          sx={{
            flexShrink: 0,  // Evitar que los botones se estiren
            borderRadius: 20,
            padding: "6px 16px", 
            top: 5,
            display: "flex",
            alignItems: "center",
            gap: 1
          }}
        >
          {category.icon}
          {category.name}
        </Button>
      ))}
    </Box>
  );
};

export default CategoryFilter;
