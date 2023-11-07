import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, getProducts, updateProduct } from "../api/productsAPI";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export const Products = () => {
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: products,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    select: (products) => products.sort((a, b) => b.id - a.id),
  });

  const updateProductMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      console.log("Removed Product!");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <>
      <Card sx={{ mt: 10, p: 1, width: 1 / 2 }}>
        <Typography sx={{ p: 2, textAlign: "center" }} variant="h4">
          My product list
        </Typography>
        <Divider />
        {products.map((product) => (
          <>
            <CardContent>
              <div key={product.id}>
                <Typography variant="h5" component="div" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {product.description}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {product.price}
                </Typography>
              </div>
            </CardContent>
            <CardActions>
              <input
                id={product.id}
                type="checkbox"
                checked={product.inStock}
                onChange={(e) => {
                  updateProductMutation.mutate({
                    ...product,
                    inStock: e.target.checked,
                  });
                }}
              />
              <label htmlFor={product.id}>In Stock</label>

              <Button
                onClick={() => {
                  deleteProductMutation.mutate(product.id);
                }}
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                sx={{ ml: 2 }}
              >
                Delete
              </Button>
            </CardActions>
            <Divider />
          </>
        ))}
      </Card>
    </>
  );
};
