import { createSupabaseClient } from "./supabase";

export type Collection = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  image_url: string;
};

export async function getCollections(): Promise<Collection[]> {
  try {
    const supabase = createSupabaseClient();

    const { data, error } = await supabase
      .from("collections")
      .select("id, slug, name, description, image_url")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to load collections from Supabase", error);
      throw error;
    }

    return (data ?? []) as Collection[];
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error(
        "Failed to initialize Supabase client or load collections",
        error,
      );
    }

    throw error;
  }
}
