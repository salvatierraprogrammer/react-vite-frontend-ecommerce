import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import ProfileMenu from "../component/ProfileMenu";
import ProfileContent from "../component/ProfileContent";
import { menuOptions } from "../data/menuOptions";

function Profile() {
  const [selectedOption, setSelectedOption] = useState(menuOptions[0]);

  return (
    <Box
      sx={{
        display: "flex",
        top: 100,
        flexDirection: { xs: "column", md: "row" },
        maxWidth: "100%",
        margin: "auto",
        padding: 3,
        gap: { xs: 2, md: 3 }, // Diferente gap dependiendo del tamaño
      }}
    >
      {/* Menú de perfil */}
      <ProfileMenu selectedOption={selectedOption} setSelectedOption={setSelectedOption} />

      {/* Contenido de perfil dentro de un Paper para mejorar el diseño */}
      <Paper sx={{ flex: 1, padding: 3, borderRadius: 2, boxShadow: 3 }}>
        <ProfileContent selectedOption={selectedOption} />
      </Paper>
    </Box>
  );
}

export default Profile;
