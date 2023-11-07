import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../api/productsAPI";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const ProductForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const queryClient = useQueryClient();

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      console.log("Product added!");
      queryClient.invalidateQueries({ queryKey: ["products"] });

      clearInputs();
    },
  });

  const clearInputs = () => {
    setName("");
    setDescription("");
    setPrice("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      name,
      description,
      price,
    };
    addProductMutation.mutate({ ...product, inStock: true });
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: 1 / 2 }}>
      <Typography variant="h3" gutterBottom>
        New Product
      </Typography>

      <TextField
        id="name"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <TextField
        id="description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <TextField
        id="price"
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        fullWidth
        variant="outlined"
        sx={{ mb: 2 }}
      />

      <Button type="submit" variant="contained" style={{ float: "right" }}>
        Add Product
      </Button>
    </Box>
  );
};
