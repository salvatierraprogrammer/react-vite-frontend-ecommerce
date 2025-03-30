import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Card, CardMedia, CardContent, Button, Box, IconButton, Modal } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react";
import data from "../data/data";
import ProductRecommendations from "../component/ProductRecommendations";

const ProductDetail = () => {
    const { id } = useParams();
    const product = data.find((p) => p.id === parseInt(id));
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState(1);
    const [openModal, setOpenModal] = useState(false); // Estado para controlar el modal

    if (!product) {
        return <Typography variant="h5">Producto no encontrado</Typography>;
    }

    const recommendedProducts = data.filter(
        (p) => p.category === product.category && p.id !== product.id
    );

    const handleIncrease = () => setQuantity((prev) => prev + 1);
    const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));

    const handleAddToCart = () => {
        console.log(`Añadir ${quantity} ${product.name} al carrito`);
        setOpenModal(true); // Abrir el modal cuando se añade al carrito
        setTimeout(() => setOpenModal(false), 2000); // Cerrar el modal después de 2 segundos
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
                    
                    {/* Corregido: Validamos que price sea un número antes de usar toFixed(2) */}
                    <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                        ${Number(product.price.replace('$', '').trim()) ? Number(product.price.replace('$', '').trim()).toFixed(2) : "N/A"}
                    </Typography>

                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Este es un excelente producto de alta calidad. Ideal para tus necesidades diarias.
                    </Typography>

                    <Box sx={{ mt: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <IconButton onClick={handleDecrease} sx={{ borderRadius: "50%", backgroundColor: "#f4f4f4", p: 1 }}>
                            <RemoveIcon />
                        </IconButton>
                        <Typography variant="h6" sx={{ mx: 2 }}>{quantity}</Typography>
                        <IconButton onClick={handleIncrease} sx={{ borderRadius: "50%", backgroundColor: "#f4f4f4", p: 1 }}>
                            <AddIcon />
                        </IconButton>
                    </Box>

                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" sx={{ width: "100%" }} onClick={handleAddToCart}>
                            Añadir al Carrito
                        </Button>
                    </Box>
                </CardContent>
            </Card>

            {recommendedProducts.length > 0 && (
                <ProductRecommendations recommendedProducts={recommendedProducts} navigate={navigate} />
            )}

            {/* Modal de confirmación */}
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box 
                    sx={{ 
                        bgcolor: 'white', 
                        p: 4, 
                        borderRadius: 2, 
                        boxShadow: 24, 
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        ¡Producto agregado al carrito!
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenModal(false)}
                    >
                      OK
                    </Button>
                </Box>
            </Modal>
        </Container>
    );
};

export default ProductDetail;
