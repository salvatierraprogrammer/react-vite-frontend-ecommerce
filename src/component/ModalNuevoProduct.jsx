// ModalNuevoProduct.js
import React from 'react';
import { Modal, Box, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Grid } from "@mui/material";

const categories = ["Electrónica", "Ropa", "Hogar", "Juguetes", "Deportes"];

function ModalNuevoProduct({
  openModal, setOpenModal, newProduct, setNewProduct, imagePreview, setImagePreview, handleAddProduct, handleImageChange
}) {
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box
        sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          Agregar Producto
        </Typography>

        <TextField
          fullWidth
          label="Nombre"
          variant="outlined"
          sx={{ mb: 2 }}
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />

        <TextField
          fullWidth
          label="Precio"
          variant="outlined"
          sx={{ mb: 2 }}
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Categoría</InputLabel>
          <Select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Campo de cantidad */}
        <TextField
          fullWidth
          label="Cantidad"
          variant="outlined"
          type="number"
          sx={{ mb: 2 }}
          value={newProduct.quantity}
          onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
        />

        <Button variant="contained" component="label" fullWidth sx={{ mb: 2 }}>
          Subir Imagen
          <input type="file" hidden accept="image/*" onChange={handleImageChange} />
        </Button>

        {imagePreview && (
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <img
              src={imagePreview}
              alt="Vista previa"
              style={{ width: "100%", maxHeight: "160px", objectFit: "cover", borderRadius: "8px" }}
            />
          </Box>
        )}

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Button fullWidth variant="contained" color="primary" onClick={handleAddProduct}>
              Agregar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth variant="outlined" color="error" onClick={() => setOpenModal(false)}>
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default ModalNuevoProduct;
