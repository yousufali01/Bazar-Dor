import type { Category, Product } from "@/types";

const API_BASE_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://api.abcz.workers.dev/api/bazardor"
).replace(/\/+$/, "");

async function fetchList<T>(endpoint: string): Promise<T[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
      cache: "force-cache",
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");

      console.error(`[API Error] ${endpoint}`, {
        status: response.status,
        message: errorBody || "No response body",
      });

      return [];
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      console.error(
        `[API Error] ${endpoint}: Expected an array response`,
        data,
      );

      return [];
    }

    return data as T[];
  } catch (error) {
    console.error(`[API Request Failed] ${endpoint}:`, error);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  return fetchList<Category>("categories");
}

export async function getProducts(): Promise<Product[]> {
  return fetchList<Product>("products");
}
