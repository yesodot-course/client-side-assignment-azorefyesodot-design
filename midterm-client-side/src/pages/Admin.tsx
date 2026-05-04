import { Container, Typography } from "@mui/material";
import ProductList from "../components/ProductList";
import SupplierList from "../components/SupplierList";
import AnalyticsPanel from "../components/AnalyticsPanel";

export default function Admin() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">Admin Dashboard</Typography>

      <ProductList />
      <SupplierList />
      <AnalyticsPanel />
    </Container>
  );
}
