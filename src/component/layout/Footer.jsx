import { Box, Typography, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";  // Importamos los iconos

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
      <Typography variant="body2" sx={{ mb: 2 }}>
        © 2025 Mi eCommerce. Todos los derechos reservados.
      </Typography>
      
      {/* Iconos de redes sociales */}
      <Box>
        <IconButton 
          color="inherit" 
          aria-label="Facebook" 
          sx={{ mx: 1 }} 
          onClick={() => window.open("https://www.facebook.com", "_blank")}
        >
          <Facebook />
        </IconButton>
        <IconButton 
          color="inherit" 
          aria-label="Twitter" 
          sx={{ mx: 1 }} 
          onClick={() => window.open("https://www.twitter.com", "_blank")}
        >
          <Twitter />
        </IconButton>
        <IconButton 
          color="inherit" 
          aria-label="Instagram" 
          sx={{ mx: 1 }} 
          onClick={() => window.open("https://www.instagram.com", "_blank")}
        >
          <Instagram />
        </IconButton>
        <IconButton 
          color="inherit" 
          aria-label="LinkedIn" 
          sx={{ mx: 1 }} 
          onClick={() => window.open("https://www.linkedin.com", "_blank")}
        >
          <LinkedIn />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;