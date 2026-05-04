import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import type { Product } from "../types/product";

interface FiltersProps {
  products: Product[];

  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  supplier: string;
  setSupplier: (value: string) => void;

  sortBy: string;
  setSortBy: (value: string) => void;

  minPrice: number | "";
  setMinPrice: (value: number | "") => void;

  maxPrice: number | "";
  setMaxPrice: (value: number | "") => void;
}

export default function Filters({
  products,
  search,
  setSearch,
  category,
  setCategory,
  supplier,
  setSupplier,
  sortBy,
  setSortBy,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}: FiltersProps) {
  const categories = [...new Set(products.map((p) => p.category))];
  const suppliers = [...new Set(products.map((p) => p.supplier))];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value);
  };

  const handleSupplierChange = (e: SelectChangeEvent) => {
    setSupplier(e.target.value);
  };

  const handleSortChange = (e: SelectChangeEvent) => {
    setSortBy(e.target.value);
  };

  const handleMinPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setMinPrice(value === "" ? "" : Number(value));
  };

  const handleMaxPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setMaxPrice(value === "" ? "" : Number(value));
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        flexWrap: "wrap",
        mb: 3,
      }}
    >

      <TextField
        label="Search"
        value={search}
        onChange={handleSearchChange}
      />

      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value="">All</MenuItem>
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {c}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Supplier</InputLabel>
        <Select
          value={supplier}
          label="Supplier"
          onChange={handleSupplierChange}
        >
          <MenuItem value="">All</MenuItem>
          {suppliers.map((s) => (
            <MenuItem key={s} value={s}>
              {s}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Min Price"
        type="number"
        value={minPrice}
        onChange={handleMinPriceChange}
      />

      <TextField
        label="Max Price"
        type="number"
        value={maxPrice}
        onChange={handleMaxPriceChange}
      />

      <FormControl sx={{ minWidth: 150 }}>
        <InputLabel>Sort</InputLabel>
        <Select
          value={sortBy}
          label="Sort"
          onChange={handleSortChange}
        >
          <MenuItem value="">None</MenuItem>
          <MenuItem value="price-asc">Price ↑</MenuItem>
          <MenuItem value="price-desc">Price ↓</MenuItem>
          <MenuItem value="name-asc">Name A-Z</MenuItem>
          <MenuItem value="name-desc">Name Z-A</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
