import {
  Container,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Grid
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../cart/cartSlice";
import { useProducts } from "../api/productApi";
import type { Product } from "../types/product";

export default function Cart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const { data } = useProducts();
  const products: Product[] = data ?? [];

  const cart = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return product
        ? { ...product, quantity: item.quantity }
        : null;
    })
    .filter(Boolean) as (Product & { quantity: number })[];

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const recommendations = products
    .filter((p) => !cartItems.some((c) => c.productId === p.id))
    .slice(0, 3);

  if (cart.length === 0) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h5">Your cart is empty</Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>

      <Button
        variant="outlined"
        color="error"
        sx={{ mb: 2 }}
        onClick={() => dispatch(clearCart())}
      >
        Clear Cart
      </Button>

      <Grid container spacing={3}>
        {cart.map((item) => (
          <Grid key={item.id} size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>${item.price}</Typography>
                <Typography>
                  Subtotal: ${item.price * item.quantity}
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                  <Button
                    onClick={() =>
                      dispatch(decreaseQuantity(item.id))
                    }
                  >
                    ➖
                  </Button>

                  <Typography>{item.quantity}</Typography>

                  <Button
                    onClick={() =>
                      dispatch(increaseQuantity(item.id))
                    }
                  >
                    ➕
                  </Button>
                </Box>

                <Button
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() =>
                    dispatch(removeFromCart(item.id))
                  }
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mt: 3 }}>
        Total: ${totalPrice.toFixed(2)}
      </Typography>

      <Typography variant="h5" sx={{ mt: 4 }}>
        You may also like
      </Typography>

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {recommendations.map((p) => (
          <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card>
              <CardContent>
                <Typography>{p.name}</Typography>
                <Typography>${p.price}</Typography>

                <Button
                  sx={{ mt: 1 }}
                  onClick={() =>
                    dispatch({
                      type: "cart/addToCart",
                      payload: { productId: p.id, quantity: 1 },
                    })
                  }
                >
                  Add
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
