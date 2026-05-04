import { useMemo, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Grid
} from "@mui/material";

import { useNavigate } from "react-router";

import { useProducts } from "../api/productApi";
import Filters from "../components/Filters";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/product";

export default function Home() {
  const { data: products = [], isLoading, isError } = useProducts();
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");

  const filteredProducts = useMemo(() => {
    let result = [...products] as Product[];

    result = result.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (category) {
      result = result.filter((p) => p.category === category);
    }

    if (supplier) {
      result = result.filter((p) => p.supplierId === supplier);
    }

    if (minPrice !== "") {
      result = result.filter((p) => p.price >= minPrice);
    }

    if (maxPrice !== "") {
      result = result.filter((p) => p.price <= maxPrice);
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [products, search, category, supplier, sortBy, minPrice, maxPrice]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading products</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={() => navigate("/cart")}
      >
        Go to Cart
      </Button>

      <Filters
        products={products}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        supplier={supplier}
        setSupplier={setSupplier}
        sortBy={sortBy}
        setSortBy={setSortBy}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
      />

      <Grid container spacing={3}>
        {filteredProducts.map((p) => (
          <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}