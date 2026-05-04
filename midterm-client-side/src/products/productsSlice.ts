import { createSlice } from "@reduxjs/toolkit";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  supplier: string;
  stock: number;
}

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [
    {
      id: "1",
      name: "Laptop",
      price: 1200,
      category: "Electronics",
      supplier: "Dell",
      stock: 10,
    },
    {
      id: "2",
      name: "Phone",
      price: 800,
      category: "Electronics",
      supplier: "Apple",
      stock: 3,
    },
    {
      id: "3",
      name: "Shoes",
      price: 150,
      category: "Fashion",
      supplier: "Nike",
      stock: 20,
    },
  ],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
});

export default productsSlice.reducer;