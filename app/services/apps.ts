import { api } from "../lib/api";
import type { App } from "../types";

export async function getApps(): Promise<App[]> {
  const { data } = await api.get<App[]>("/ferramentas_search.json");
  return data;
}
