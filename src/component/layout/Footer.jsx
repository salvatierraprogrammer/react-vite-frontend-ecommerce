import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        textAlign: "center",
        p: 2,
        bgcolor: "primary.main",
        color: "white",
        mt: "auto", // Asegura que se coloque al final del contenido
      }}
    >
      <Typography variant="body2">
        © 2025 Mi eCommerce. Todos los derechos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
