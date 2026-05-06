import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useCreateProduct } from "../api/adminApi";

export default function ProductForm() {
  const createProduct = useCreateProduct();

  const [form, setForm] = useState({
    name: "",
    price: 0,
    stock: 0,
    category: "",
    supplier: "",
  });

  const handleSubmit = () => {
    createProduct.mutate(form);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        label="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <TextField
        type="number"
        label="Price"
        value={form.price}
        onChange={(e) =>
          setForm({ ...form, price: Number(e.target.value) })
        }
      />

      <Button onClick={handleSubmit}>Create</Button>
    </Box>
  );
}
