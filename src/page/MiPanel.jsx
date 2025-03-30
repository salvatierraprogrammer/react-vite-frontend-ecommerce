// MiPanel.js
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
  const [openEditModal, setOpenEditModal] = useState(false); // Nuevo estado para el modal de edición
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // Nuevo estado para el modal de eliminación
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    img: "",
    category: ""
  });
  const [imagePreview, setImagePreview] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null); // Producto seleccionado para editar o eliminar

  useEffect(() => {
    let filtered = [...products]; // Use a copy to avoid mutating state directly

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
      setProducts([...products, { id: products.length + 1, ...newProduct }]);
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
  sx={{ mb: 3, ml: 'auto', display: 'block' }} // Alinearlo a la derecha
  onClick={() => setOpenModal(true)}
>
  Agregar Producto
</Button>

      <SearchBar setSearchTerm={setSearchTerm} />
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />

      <Grid container spacing={3} sx={{ mt: 2, justifyContent: 'center', alignItems: 'center' }}>
  {filteredProducts.length > 0 ? (
    filteredProducts.map(product => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={product.id} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Card
          sx={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            maxWidth: 180,
            margin: "0 auto",
          }}
        >
          <CardMedia
            component="img"
            height="160"
            image={product.img}
            alt={product.name}
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
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.price}
            </Typography>
          </CardContent>

          {/* Botones de Editar y Eliminar debajo del precio */}
          <Box sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <IconButton fullWidth onClick={() => {
                  setSelectedProduct(product); // Establecer el producto seleccionado
                  setOpenEditModal(true); // Abrir modal de edición
                }}>
                  <EditIcon />
                </IconButton>
              </Grid>
              <Grid item xs={6}>
                <IconButton fullWidth onClick={() => {
                  setSelectedProduct(product); // Establecer el producto seleccionado
                  setOpenDeleteModal(true); // Abrir modal de eliminación
                }}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Grid>
    ))
  ) : (
    <Grid item xs={12}>
      <Typography variant="h6" sx={{ textAlign: "center", mt: 3 }}>No hay productos disponibles</Typography>
    </Grid>
  )}
</Grid>

      {/* Usar el componente ModalNuevoProduct */}
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

      {/* Modal Editar Producto */}
      <ModalEditProduct
        openModal={openEditModal}
        setOpenModal={setOpenEditModal}
        product={selectedProduct}
        setProduct={setSelectedProduct}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        handleEditProduct={() => {
          // Lógica para guardar cambios de edición
          setProducts(products.map(p => p.id === selectedProduct.id ? selectedProduct : p));
          setOpenEditModal(false);
        }}
        handleImageChange={handleImageChange}
      />

      {/* Modal Eliminar Producto */}
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
