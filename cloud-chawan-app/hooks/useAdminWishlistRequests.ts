"use client";

import { useCallback, useEffect, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export type AdminWishlistRequest = {
  id: string;
  collectionId: string;
  instagramHandle: string;
  customerName: string;
  message: string;
  createdAt: string;
  contacted: boolean;
  collectionName: string;
  collectionSlug: string;
};

export function useAdminWishlistRequests() {
  const { isAuthenticated } = useAdminAuth();
  const [requests, setRequests] = useState<AdminWishlistRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshRequests = useCallback(async () => {
    if (!isAuthenticated) {
      setRequests([]);
      setError(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createSupabaseClient();
      const { data, error: fetchError } = await supabase
        .from("wishlist_requests")
        .select("id, collection_id, instagram_handle, name, message, created_at, contacted, collections(name, slug)")
        .order("created_at", { ascending: false });

      if (fetchError) {
        if (process.env.NODE_ENV !== "production") {
          console.error("Failed to load wishlist requests from Supabase", fetchError);
        }
        setError("We couldn’t load wishlist requests right now.");
        setRequests([]);
        return;
      }

      const normalized = (data ?? []).map((entry) => {
        const collectionData = Array.isArray(entry.collections)
          ? entry.collections[0]
          : entry.collections;

        return {
          id: entry.id,
          collectionId: entry.collection_id,
          instagramHandle: entry.instagram_handle ?? "",
          customerName: entry.name ?? "",
          message: entry.message ?? "",
          createdAt: entry.created_at ?? "",
          contacted: Boolean(entry.contacted),
          collectionName: collectionData?.name ?? "Unknown collection",
          collectionSlug: collectionData?.slug ?? "",
        } satisfies AdminWishlistRequest;
      });

      setRequests(normalized);
      setError(null);
    } catch (requestError) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Failed to initialize Supabase client for admin dashboard", requestError);
      }
      setError("We couldn’t load wishlist requests right now.");
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    void refreshRequests();
  }, [refreshRequests]);

  return { requests, isLoading, error, refreshRequests };
}
