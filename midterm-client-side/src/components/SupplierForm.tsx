// features/admin/components/SupplierForm.tsx

import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useCreateSupplier } from "../api/adminApi";
import type { SupplierItem } from "../types/Supplier";

export default function SupplierForm() {
  const createSupplier = useCreateSupplier();

  const [name, setName] = useState("");
  const [items, setItems] = useState<SupplierItem[]>([
    { name: "", price: 0 },
  ]);

  const handleItemChange = (
    index: number,
    field: keyof SupplierItem,
    value: string | number
  ) => {
    const updated = [...items];
    updated[index] = {
      ...updated[index],
      [field]: field === "price" ? Number(value) : value,
    };
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { name: "", price: 0 }]);
  };

  const handleSubmit = () => {
    if (!name) return;

    createSupplier.mutate({
      name,
      items,
    });

    setName("");
    setItems([{ name: "", price: 0 }]);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Add Supplier</Typography>

      <TextField
        label="Supplier Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        sx={{ mt: 1 }}
      />

      {items.map((item, index) => (
        <Box key={index} sx={{ display: "flex", gap: 1, mt: 1 }}>
          <TextField
            label="Item Name"
            value={item.name}
            onChange={(e) =>
              handleItemChange(index, "name", e.target.value)
            }
          />

          <TextField
            type="number"
            label="Price"
            value={item.price}
            onChange={(e) =>
              handleItemChange(index, "price", e.target.value)
            }
          />
        </Box>
      ))}

      <Button sx={{ mt: 1 }} onClick={addItem}>
        + Add Item
      </Button>

      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Create Supplier
      </Button>
    </Box>
  );
}