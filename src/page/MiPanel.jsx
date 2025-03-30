import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom';
import data from '../data/data';
import SearchBar from "../component/SearchBar";
import CategoryFilter from "../component/CategoryFilter";
import { Paper, Button, Typography, IconButton, Grid, Container, Box, Card, CardContent, CardMedia } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalNuevoProduct from '../component/ModalNuevoProduct';
import ModalEditProduct from '../component/ModalEditProduct';
import ModalEliminarProduct from '../component/ModalEliminarProduct';

function MiPanel() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(data);
  const [filteredProducts, setFilteredProducts] = useState(data);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    img: "",
    category: ""
  });
  const [imagePreview, setImagePreview] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    let filtered = [...products];
    if (selectedCategory !== 'Todos') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const handleDelete = (id) => {
    setProducts(products.filter(product => product.id !== id));
    setOpenDeleteModal(false); // Cerrar modal después de eliminar
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.img && newProduct.category) {
      const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
      setProducts([...products, { id: newId, ...newProduct }]);
      setOpenModal(false);
      setNewProduct({ name: "", price: "", img: "", category: "" });
      setImagePreview("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewProduct({ ...newProduct, img: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, pb: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", textAlign: "center" }}>
        🛒 Mi Panel
      </Typography>

      <Button 
        variant="contained" 
        color="primary" 
        sx={{ mb: 3, ml: 'auto', display: 'block' }}
        onClick={() => setOpenModal(true)}
      >
        Agregar Producto
      </Button>

      <SearchBar setSearchTerm={setSearchTerm} />
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      <Grid 
           container 
           spacing={2} 
           sx={{ 
             marginBottom: 5, 
             justifyContent: "center", 
           }} 
         >
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Grid item xs={6} sm={6} md={3} lg={3} key={product.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ cursor: "pointer", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", width: "100%", maxWidth: 180, margin: "0 auto" }}>
                <CardMedia component="img" height="160" image={product.img} alt={product.name} loading="lazy" sx={{ objectFit: "contain", padding: "10px" }} />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontSize: "1rem", fontWeight: "bold", display: "-webkit-box", WebkitBoxOrient: "vertical", WebkitLineClamp: 2, overflow: "hidden" }} onClick={() => navigate(`/product/${product.id}`)}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">{product.price}</Typography>
                </CardContent>

                <Box sx={{ padding: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <IconButton fullWidth onClick={() => { setSelectedProduct(product); setOpenEditModal(true); }}><EditIcon /></IconButton>
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton fullWidth onClick={() => { setSelectedProduct(product); setOpenDeleteModal(true); }}><DeleteIcon /></IconButton>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}><Typography variant="h6" sx={{ textAlign: "center", mt: 3 }}>No hay productos disponibles</Typography></Grid>
        )}
      </Grid>

      <ModalNuevoProduct
        openModal={openModal}
        setOpenModal={setOpenModal}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        handleAddProduct={handleAddProduct}
        handleImageChange={handleImageChange}
      />

      <ModalEditProduct
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
        product={selectedProduct}
        setProduct={setSelectedProduct}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        handleEditProduct={() => {
          setProducts(products.map(p => p.id === selectedProduct.id ? selectedProduct : p));
          setOpenEditModal(false);
        }}
        handleImageChange={handleImageChange}
      />

      <ModalEliminarProduct
        openModal={openDeleteModal}
        setOpenModal={setOpenDeleteModal}
        handleDeleteProduct={handleDelete}
        productId={selectedProduct?.id}
      />
    </Container>
  );
}

export default MiPanel;
