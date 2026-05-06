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

  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("price", String(form.price));
    formData.append("stock", String(form.stock));
    formData.append("category", form.category);
    formData.append("supplier", form.supplier);

    if (image) {
      formData.append("image", image);
    }

    createProduct.mutate(formData);
  };

  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
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

      <TextField
        type="number"
        label="Stock"
        value={form.stock}
        onChange={(e) =>
          setForm({ ...form, stock: Number(e.target.value) })
        }
      />

      <TextField
        label="Category"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      />

      <TextField
        label="Supplier"
        value={form.supplier}
        onChange={(e) =>
          setForm({ ...form, supplier: e.target.value })
        }
      />

      <Button variant="outlined" component="label">
        Upload Image
        <input
          type="file"
          hidden
          accept="image/*"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            }
          }}
        />
      </Button>

      <Button variant="contained" onClick={handleSubmit}>
        Create
      </Button>
    </Box>
  );
}