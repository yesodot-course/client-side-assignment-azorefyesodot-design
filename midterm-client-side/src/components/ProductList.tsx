import {
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  Grid
} from "@mui/material";
import { useProducts, useDeleteProduct } from "../api/adminApi";

export default function ProductList() {
  const { data: products = [] } = useProducts();
  const deleteProduct = useDeleteProduct();

  return (
    <>
      <Typography variant="h5" sx={{ mt: 4 }}>
        Products
      </Typography>

      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid key={p.id} size={{ xs: 12, md: 4 }}>
            <Card>
              <CardContent>
                <Typography>{p.name}</Typography>
                <Typography>${p.price}</Typography>

                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                  <Button variant="outlined">Edit</Button>

                  <Button
                    color="error"
                    onClick={() => deleteProduct.mutate(p.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
