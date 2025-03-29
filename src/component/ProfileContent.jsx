import React from "react";
import { Paper, Typography, Divider, Box, Icon } from "@mui/material";
import { CheckCircle, AccountBox, Settings } from "@mui/icons-material"; // Ejemplo de íconos

// Asumimos que 'selectedOption' tiene una propiedad 'icon' para mostrar el ícono
function ProfileContent({ selectedOption }) {
  const getIcon = () => {
    switch (selectedOption.id) {
      case 'profile':
        return <AccountBox fontSize="large" sx={{ color: "primary.main" }} />;
      case 'settings':
        return <Settings fontSize="large" sx={{ color: "primary.main" }} />;
      case 'status':
        return <CheckCircle fontSize="large" sx={{ color: "primary.main" }} />;
      default:
        return <AccountBox fontSize="large" sx={{ color: "primary.main" }} />;
    }
  };

  return (
    <Paper sx={{ flex: 1, p: 3, borderRadius: 3, boxShadow: 3 }}>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        {/* Icono al lado del título */}
        {getIcon()}
        <Typography variant="h5" fontWeight="bold">{selectedOption.title}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Contenido de la opción seleccionada */}
      <Box sx={{ paddingLeft: 2 }}>
        {selectedOption.content}
      </Box>
    </Paper>
  );
}

export default ProfileContent;
