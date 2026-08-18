import { api } from "./api-client";
export interface Category { id: number; name: string; description?: string | null; is_active: boolean; }
export async function getCategories(): Promise<Category[]> { return api.get<Category[]>("/categories"); }
