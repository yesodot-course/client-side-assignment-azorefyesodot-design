import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { addToCart } from "../cart/cartSlice";
import { useNavigate } from "react-router";
import type { Product } from "../types/product";

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">{product.name}</Typography>
        <Typography>${product.price}</Typography>
        <Typography>{product.category}</Typography>
        <Typography>Stock: {product.stock}</Typography>

        <TextField
          type="number"
          size="small"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          sx={{ mt: 1 }}
        />

        <Button
          variant="contained"
          sx={{ mt: 2, mr: 1 }}
          disabled={product.stock === 0}
          onClick={() =>
            dispatch(
              addToCart({
                productId: product.id,
                quantity,
              })
            )
          }
        >
          Add
        </Button>

        <Button
          variant="outlined"
          sx={{ mt: 2 }}
          onClick={() => navigate(`/product/${product.id}`)}
        >
          Details
        </Button>
      </CardContent>
    </Card>
  );
}