import { useState } from "react";
import { Container, Typography, Button, Box, List, ListItem, ListItemText, Grid, Paper, IconButton, RadioGroup, Radio, FormControlLabel, FormControl, FormLabel, TextField, Modal, Backdrop, Fade, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PaymentIcon from "@mui/icons-material/Payment";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StorefrontIcon from "@mui/icons-material/Storefront";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([
    { id: 1, name: "Smartphone Xiaomi Redmi Note 12", price: 220, quantity: 1, img: "https://m.media-amazon.com/images/I/71E5zB1qbIL._AC_SL1500_.jpg" },
    { id: 2, name: "Laptop ASUS VivoBook 15", price: 599, quantity: 1, img: "https://m.media-amazon.com/images/I/81bc8mA3nKL._AC_SL1500_.jpg" },
  ]);

  const [paymentMethod, setPaymentMethod] = useState("tarjeta");
  const [shippingMethod, setShippingMethod] = useState("estandar");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // Estado para mostrar el cargando

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const total = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleShippingChange = (event) => {
    setShippingMethod(event.target.value);
  };

  const handlePurchase = () => {
    setModalOpen(true);
    setIsProcessing(true); // Activar el estado de carga
    setTimeout(() => {
      setIsProcessing(false); // Desactivar el estado de carga
      setModalOpen(false); // Cerrar el modal después de 3 segundos
      setCart([]); // Vaciar el carrito
    }, 3000);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, pb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>Carrito de Compras</Typography>
      <List>
        {cart.length > 0 ? (
          cart.map((product) => (
            <Paper 
              elevation={3} 
              key={product.id} 
              sx={{ mb: 2, borderRadius: 2, overflow: "hidden", padding: 2, position: "relative" }}
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromCart(product.id);
                }}
                sx={{ 
                  position: "absolute", 
                  top: 8, 
                  right: 8, 
                  backgroundColor: "rgba(0,0,0,0.1)", 
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.2)" }
                }}
              >
                <CloseIcon />
              </IconButton>
              <ListItem onClick={() => navigate(`/product/${product.id}`)} sx={{ cursor: "pointer" }}>
                <Grid container spacing={2} alignItems="center" justifyContent="space-between">
                  <Grid item xs={3}>
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "8px" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <ListItemText 
                      primary={<Typography variant="h6" sx={{ fontWeight: "bold" }}>{product.name}</Typography>} 
                      secondary={<Typography variant="body2">Precio: ${product.price} x Cantidad: {product.quantity}</Typography>} 
                    />
                  </Grid>
                </Grid>
              </ListItem>
            </Paper>
          ))
        ) : (
          <Typography variant="h6" sx={{ textAlign: "center", mt: 3 }}>Tu carrito está vacío</Typography>
        )}
      </List>

      {cart.length > 0 ? (
  <>
    {/* Métodos de pago */}
    {!isProcessing && (
      <FormControl sx={{ mt: 3 }}>
        <FormLabel>Selecciona el método de pago</FormLabel>
        <RadioGroup value={paymentMethod} onChange={handlePaymentChange}>
          <FormControlLabel
            value="tarjeta"
            control={<Radio />}
            label="Tarjeta"
            labelPlacement="end"
            icon={<CreditCardIcon sx={{ marginRight: 1 }} />}
          />
          <FormControlLabel
            value="efectivo"
            control={<Radio />}
            label="Efectivo"
            labelPlacement="end"
            icon={<PaymentIcon sx={{ marginRight: 1 }} />}
          />
          <FormControlLabel
            value="mercadoPago"
            control={<Radio />}
            label="Mercado Pago"
            labelPlacement="end"
            icon={<PaymentIcon sx={{ marginRight: 1 }} />}
          />
        </RadioGroup>
      </FormControl>
    )}

    {/* Formulario Tarjeta */}
    {paymentMethod === "tarjeta" && !isProcessing && (
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Número de Tarjeta"
          fullWidth
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Fecha de Vencimiento"
              fullWidth
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="CVV"
              fullWidth
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              sx={{ mb: 2 }}
            />
          </Grid>
        </Grid>
      </Box>
    )}

    {/* Confirmación Efectivo */}
    {paymentMethod === "efectivo" && !isProcessing && (
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Por favor, acepta el pago en efectivo al recibir el pedido.</Typography>
      </Box>
    )}

    {/* Mercado Pago */}
    {paymentMethod === "mercadoPago" && !isProcessing && (
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1">Serás redirigido a Mercado Pago para completar el pago.</Typography>
      </Box>
    )}

    {/* Tipo de envío */}
    {!isProcessing && (
      <FormControl sx={{ mt: 3 }}>
        <FormLabel>Selecciona el tipo de envío</FormLabel>
        <RadioGroup value={shippingMethod} onChange={handleShippingChange}>
          <FormControlLabel
            value="estandar"
            control={<Radio />}
            label="Envío a tu dirección"
            labelPlacement="end"
            icon={<LocalShippingIcon sx={{ marginRight: 1 }} />}
          />
          <FormControlLabel
            value="express"
            control={<Radio />}
            label="Retirar en el local"
            labelPlacement="end"
            icon={<StorefrontIcon sx={{ marginRight: 1 }} />}
          />
        </RadioGroup>
      </FormControl>
    )}

    {/* Botón de Finalizar Compra */}
    {!isProcessing && (
      <Box sx={{ mt: 3, textAlign: "right" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          Total: ${total}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%", borderRadius: "25px", padding: "12px" }}
          onClick={handlePurchase}
        >
          Finalizar Compra
        </Button>
      </Box>
    )}
  </>
) : (
  <Typography variant="h6" sx={{ textAlign: "center", mt: 3 }}>Tu compra fue exito mira tu mail</Typography>
)}

   

      {/* Modal de Compra Exitosa */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <Box 
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>¡Ya es tuyo!</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>Procesando pagos...</Typography>
            {isProcessing ? (
           <CircularProgress sx={{ my: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }} />

            ) : (
              <Typography variant="body1" sx={{ mb: 2 }}>¡Éxito!</Typography>
            )}
            <Button variant="contained" onClick={() => navigate('/compras')} sx={{ mt: 2 }}>
              Cancelar
            </Button>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default Cart;
