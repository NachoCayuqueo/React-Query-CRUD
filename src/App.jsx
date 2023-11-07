import { Box } from "@mui/material";
import "./App.css";
import { ProductForm } from "./components/ProductForm";
import { Products } from "./components/Products";

function App() {
  return (
    <Box sx={{ p: 5 }}>
      <ProductForm />
      <Products />
    </Box>
  );
}

export default App;
