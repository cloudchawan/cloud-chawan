"use client";

import { useState } from "react";
import { createSupabaseClient } from "@/lib/supabase";

export type WishlistSubmissionPayload = {
  collectionId: number;
  instagramHandle: string;
  name: string;
  message: string;
};

export function useWishlistSubmission() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  async function submit(payload: WishlistSubmissionPayload) {
    setIsSubmitting(true);
    setError(null);
    setIsSuccess(false);

    try {
      const supabase = createSupabaseClient();

      const { error: insertError } = await supabase.from("wishlist_requests").insert({
        collection_id: payload.collectionId,
        instagram_handle: payload.instagramHandle.trim(),
        name: payload.name.trim(),
        message: payload.message.trim(),
      });

      if (insertError) {
        throw insertError;
      }

      setIsSuccess(true);
      return true;
    } catch (err) {
      console.error("Wishlist submission failed", err);
      setError("We couldn’t save your wishlist request right now. Please try again.");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }

  return { isSubmitting, error, isSuccess, submit };
}
