import React from 'react';
import { Modal, Box, Typography, Button, Grid } from "@mui/material";

function ModalEliminarProduct({ openModal, setOpenModal, handleDeleteProduct, productId }) {
  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Box
        sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 2
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          ¿Estás seguro de eliminar este producto?
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              onClick={() => handleDeleteProduct(productId)}
            >
              Eliminar
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button 
              fullWidth 
              variant="outlined" 
              color="error" 
              onClick={() => setOpenModal(false)}
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default ModalEliminarProduct;
