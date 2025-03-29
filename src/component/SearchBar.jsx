import { TextField } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  return (
    <TextField
      fullWidth
      label="Buscar productos..."
      variant="outlined"
      onChange={(e) => onSearch(e.target.value)}
      sx={{ mb: 2 }}
    />
  );
};

export default SearchBar;
