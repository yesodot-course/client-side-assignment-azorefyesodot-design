import {
  Typography,
  Card,
  CardContent,
  Grid,
} from "@mui/material";

import {
  useMonthlyRevenue,
  useTopCategory,
  useTopItem,
  useProfitExtremes,
  useTopSupplier,
  useSupplierSpending,
} from "../api/analysticsApi";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsPanel() {
  const { data: revenue } = useMonthlyRevenue();
  const { data: category } = useTopCategory();
  const { data: item } = useTopItem();
  const { data: extremes } = useProfitExtremes();
  const { data: supplier } = useTopSupplier();
  const { data: spending = [] } = useSupplierSpending();

  return (
    <>
      <Typography variant="h5" sx={{ mt: 4 }}>
        Analytics
      </Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid size={{xs:12, md:4}}>
          <Card>
            <CardContent>
              <Typography>Monthly Revenue</Typography>
              <Typography variant="h6">
                ${revenue ?? 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <Card>
            <CardContent>
              <Typography>Top Category</Typography>
              <Typography>
                {category?.category} (${category?.profit})
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:4}}>
          <Card>
            <CardContent>
              <Typography>Top Item</Typography>
              <Typography>
                {item?.name} (${item?.profit})
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <Card>
            <CardContent>
              <Typography>Profit Margins</Typography>
              <Typography>
                Highest: {extremes?.highest.name} (
                {extremes?.highest.margin}%)
              </Typography>
              <Typography>
                Lowest: {extremes?.lowest.name} (
                {extremes?.lowest.margin}%)
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:6}}>
          <Card>
            <CardContent>
              <Typography>Top Supplier</Typography>
              <Typography>
                {supplier?.name} (${supplier?.profit})
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12}}>
          <Card>
            <CardContent>
              <Typography>Supplier Spending</Typography>

              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={spending}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="total" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
