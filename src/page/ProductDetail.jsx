import { useNavigate, useParams } from "react-router-dom"; 
import { Container, Typography, Card, CardMedia, CardContent, Button, Box, Grid, IconButton } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";
import data from "../data/data";

const ProductDetail = () => {
  const { id } = useParams();
  const product = data.find((p) => p.id === parseInt(id));
  const navigate = useNavigate();
  if (!product) return <Typography variant="h5">Producto no encontrado</Typography>;

  const recommendedProducts = data.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const [quantity, setQuantity] = useState(1); // Estado para la cantidad seleccionada

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1); // Incrementa la cantidad
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1); // Decrementa la cantidad si es mayor a 1
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      // Lógica para agregar al carrito
      console.log(`Añadir ${quantity} ${product.name} al carrito`);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Card sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, boxShadow: 3 }}>
        <CardMedia 
          component="img" 
          image={product.img} 
          alt={product.name} 
          sx={{ 
            width: "100%", 
            height: { xs: 300, md: 400 },
            objectFit: "contain", 
            maxWidth: { xs: "100%", md: "50%" }, 
            borderRadius: 2 
          }} 
        />
        <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", p: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>{product.name}</Typography>
          <Typography variant="h6" color="primary" sx={{ mt: 1 }}>${product.price}</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Este es un excelente producto de alta calidad. Ideal para tus necesidades diarias.
          </Typography>

          {/* Controles modernos para seleccionar cantidad */}
          <Box sx={{ mt: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconButton 
              onClick={handleDecrease} 
              disabled={quantity <= 1} 
              sx={{ borderRadius: "50%", backgroundColor: "#f4f4f4", p: 1 }}
            >
              <RemoveIcon />
            </IconButton>
            <Typography variant="h6" sx={{ mx: 2 }}>{quantity}</Typography>
            <IconButton 
              onClick={handleIncrease} 
              sx={{ borderRadius: "50%", backgroundColor: "#f4f4f4", p: 1 }}
            >
              <AddIcon />
            </IconButton>
          </Box>

          {/* Botón para añadir al carrito */}
          <Box sx={{ mt: 2 }}>
            <Button 
              variant="contained" 
              sx={{ width: "100%" }} 
              onClick={handleAddToCart}
              disabled={quantity <= 0} // Deshabilita el botón si la cantidad es cero o menor
            >
              Añadir al Carrito
            </Button>
          </Box>
        </CardContent>
      </Card>

      {recommendedProducts.length > 0 && (
        <>
          <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
            Recomendaciones de la misma categoría
          </Typography>
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            {recommendedProducts.map((recProduct) => (
              <Grid item xs={12} sm={6} md={3} key={recProduct.id}>
                <Card sx={{ display: "flex", flexDirection: "column", height: "100%", boxShadow: 2, borderRadius: 2 }}>
                  <CardMedia 
                    component="img" 
                    height="180" 
                    image={recProduct.img} 
                    alt={recProduct.name} 
                    sx={{ objectFit: "contain", padding: "10px" }} 
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", height: "60px", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {recProduct.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ${recProduct.price}
                    </Typography>
                  </CardContent>
                  <Box sx={{ textAlign: "center", pb: 2 }}>
                  <Button 
                      variant="contained" 
                      fullWidth 
                      onClick={() => navigate(`/product/${recProduct.id}`)} // Navegar al detalle del producto
                    >
                      Comprar
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ProductDetail;
