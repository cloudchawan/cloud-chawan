"use client";

import { useEffect, useState } from "react";
import type { Collection } from "@/lib/collections";
import { getCollections } from "@/lib/collections";

export function useCollections() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function loadCollections() {
      console.log("Starting collections request");

      try {
        const data = await getCollections();

        console.log("Collections received:", data);

        if (!isMounted) return;

        setCollections(data);
        setError(null);
      } catch (error) {
        console.error("Failed to load collections from Supabase:", error);

        if (!isMounted) return;

        setCollections([]);
        setError(
          "We couldn’t load the collections right now. Please refresh and try again.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
          console.log("Collections loading finished");
        }
      }
    }

    void loadCollections();

    return () => {
      isMounted = false;
    };
  }, []);

  return { collections, isLoading, error };
}