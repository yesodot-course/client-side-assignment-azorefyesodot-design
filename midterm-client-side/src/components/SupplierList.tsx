// features/admin/components/SupplierList.tsx

import {
  Typography,
  Card,
  CardContent,
  Button,
  Grid
} from "@mui/material";
import { useSuppliers, useDeleteSupplier } from "../api/adminApi";
import SupplierForm from "./SupplierForm";

export default function SupplierList() {
  const { data: suppliers = [], isLoading } = useSuppliers();
  const deleteSupplier = useDeleteSupplier();

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <>
      <Typography variant="h5" sx={{ mt: 4 }}>
        Suppliers
      </Typography>

      <SupplierForm />

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {suppliers.map((s) => (
          <Grid key={s.id} size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6">{s.name}</Typography>

                {s.items.map((item, i) => (
                  <Typography key={i}>
                    {item.name} - ${item.price}
                  </Typography>
                ))}

                <Button
                  color="error"
                  sx={{ mt: 2 }}
                  onClick={() => {
                    if (!confirm("Delete supplier?")) return;
                    deleteSupplier.mutate(s.id);
                  }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}