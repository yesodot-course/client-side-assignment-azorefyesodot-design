// features/admin/api/adminApi.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Product } from "../types/product";
import type { Supplier } from "../types/Supplier";

const BASE_URL = "http://localhost:3000";

export const useProducts = () =>
  useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/items`);
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });

export const useCreateProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<Product>) => {
      const res = await fetch(`${BASE_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Create failed");
      return res.json();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useDeleteProduct = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${BASE_URL}/items/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
};

export const useSuppliers = () =>
  useQuery<Supplier[]>({
    queryKey: ["suppliers"],
    queryFn: async () => {
      const res = await fetch(BASE_URL);
      if (!res.ok) throw new Error("Failed to fetch suppliers");
      return res.json();
    },
  });

export const useCreateSupplier = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Supplier, "id">) => {
      const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Create failed");
      return res.json();
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["suppliers"] }),
  });
};

export const useDeleteSupplier = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
    },
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["suppliers"] }),
  });
};