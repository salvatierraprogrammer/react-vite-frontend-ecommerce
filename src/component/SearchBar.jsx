import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = ({ onSearch }) => {
  return (
    <TextField
      fullWidth
      label="Buscar productos..."
      variant="outlined"
      onChange={(e) => onSearch(e.target.value)}
      sx={{
        mb: 2,
        bgcolor: "white",
        borderRadius: 2,
        boxShadow: 1,
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#ccc" },
          "&:hover fieldset": { borderColor: "#666" },
          "&.Mui-focused fieldset": { borderColor: "#007bff" },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search color="primary" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
