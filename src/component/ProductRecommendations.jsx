import { Typography, Grid, Card, CardMedia, CardContent, Button, Box } from "@mui/material";

const ProductRecommendations = ({ recommendedProducts, navigate }) => {
    return (
        <>
            <Typography variant="h5" sx={{ mt: 4, mb: 2, textAlign: "center", fontWeight: "bold" }}>
                Recomendaciones de la misma categoría
            </Typography>
            <Grid container spacing={2} justifyContent="center">
                {recommendedProducts.slice(0, 5).map((recProduct) => (  // 🔹 Mostramos solo 5 productos
                    <Grid item xs={6} sm={6} md={3} lg={2.4} key={recProduct.id}>  
                        <Card 
                            sx={{ 
                                cursor: "pointer", 
                                display: "flex", 
                                flexDirection: "column", 
                                justifyContent: "space-between",
                                height: "100%", 
                                width: "100%", 
                                maxWidth: 180, // Ajustado para pantallas pequeñas
                                margin: "0 auto", 
                            }} 
                            onClick={() => navigate(`/product/${recProduct.id}`)}
                        >
                            <CardMedia 
                                component="img" 
                                height="160" 
                                image={recProduct.img} 
                                alt={recProduct.name} 
                                loading="lazy"
                                sx={{ objectFit: "contain", padding: "10px" }} 
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography 
                                    variant="h6" 
                                    sx={{ 
                                        fontSize: "1rem", 
                                        fontWeight: "bold", 
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 2, 
                                        overflow: "hidden"
                                    }}
                                >
                                    {recProduct.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    ${Number(recProduct.price) ? Number(recProduct.price).toFixed(2) : "N/A"}
                                </Typography>
                            </CardContent>
                            <Box sx={{ textAlign: "center", pb: 2, px: 2 }}>
                                <Button variant="contained" fullWidth>
                                    Comprar
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    );
};

export default ProductRecommendations;
