import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Avatar,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import { menuOptions } from "../data/menuOptions"; // Importar opciones del menú

function ProfileMenu({ selectedOption, setSelectedOption }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuContent = (
    <Paper sx={{ width: 280, p: 2, borderRadius: 3, boxShadow: 3 }}>
      {/* Avatar del usuario */}
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Avatar sx={{ width: 80, height: 80, mb: 1, bgcolor: "primary.main" }}>
          <AccountCircle fontSize="large" />
        </Avatar>
        <Typography variant="h6" fontWeight="bold">Juan Pérez</Typography>
        <Typography variant="body2" color="textSecondary">juanperez@example.com</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <List>
        {menuOptions.map((option) => (
          <ListItem
            button
            key={option.id}
            onClick={() => {
              setSelectedOption(option);
              setMobileOpen(false); // Cerrar el menú al seleccionar opción
            }}
            selected={selectedOption.id === option.id}
            sx={{
              borderRadius: 2,
              "&.Mui-selected": { bgcolor: "primary.light", color: "primary.contrastText" },
              "&:hover": { bgcolor: "primary.lighter" },
            }}
          >
            <ListItemIcon sx={{ color: "primary.main" }}>{option.icon}</ListItemIcon>
            <ListItemText primary={option.title} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );

  return (
    <>
  
      {/* Menú en pantallas grandes */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        {menuContent}
      </Box>

      {/* Menú en pantallas móviles */}
      {mobileOpen && (
        <Box
          sx={{
            display: { xs: "block", md: "none" },
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
            zIndex: 10,
            padding: 2,
            boxShadow: 3,
          }}
        >
          {menuContent}
        </Box>
      )}

      {/* Menú de íconos en pantallas móviles */}
      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          padding: 2,
        }}
      >
        {/* Avatar y nombre */}
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Avatar sx={{ width: 80, height: 80, mb: 1, bgcolor: "primary.main" }}>
            <AccountCircle fontSize="large" />
          </Avatar>
          <Typography variant="h6" fontWeight="bold">
            Juan Pérez
          </Typography>
        </Box>

        <Divider sx={{ my: 2, width: "100%" }} />

        {/* Mostrar los íconos del menú */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          {menuOptions.map((option) => (
            <IconButton
              key={option.id}
              onClick={() => {
                setSelectedOption(option);
                setMobileOpen(false); // Cerrar el menú al seleccionar opción
              }}
              sx={{
                color: selectedOption.id === option.id ? "primary.main" : "inherit",
                "&:hover": {
                  color: "primary.main",
                },
              }}
            >
              {option.icon}
            </IconButton>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default ProfileMenu;
