import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/items");
      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });
};
