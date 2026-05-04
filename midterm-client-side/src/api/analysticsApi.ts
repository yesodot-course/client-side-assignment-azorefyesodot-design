import { useQuery } from "@tanstack/react-query";

const BASE = "http://localhost:3000/analytics";

export const useMonthlyRevenue = () =>
  useQuery<number>({
    queryKey: ["monthlyRevenue"],
    queryFn: () =>
      fetch(`${BASE}/revenue/month`).then((r) => r.json()),
  });

export const useTopCategory = () =>
  useQuery<{ category: string; profit: number }>({
    queryKey: ["topCategory"],
    queryFn: () =>
      fetch(`${BASE}/category/top`).then((r) => r.json()),
  });

export const useTopItem = () =>
  useQuery<{ name: string; profit: number }>({
    queryKey: ["topItem"],
    queryFn: () =>
      fetch(`${BASE}/item/top`).then((r) => r.json()),
  });

export const useProfitExtremes = () =>
  useQuery<{
    highest: { name: string; margin: number };
    lowest: { name: string; margin: number };
  }>({
    queryKey: ["profitExtremes"],
    queryFn: () =>
      fetch(`${BASE}/profit/extremes`).then((r) => r.json()),
  });

export const useTopSupplier = () =>
  useQuery<{ name: string; profit: number }>({
    queryKey: ["topSupplier"],
    queryFn: () =>
      fetch(`${BASE}/supplier/top`).then((r) => r.json()),
  });

export const useSupplierSpending = () =>
  useQuery<{ name: string; total: number }[]>({
    queryKey: ["supplierSpending"],
    queryFn: () =>
      fetch(`${BASE}/supplier/spending`).then((r) => r.json()),
  });