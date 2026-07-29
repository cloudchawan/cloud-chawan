"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { Collection } from "@/lib/collections";
import { useWishlistSubmission } from "@/hooks/useWishlistSubmission";

type WishlistModalProps = {
  isOpen: boolean;
  collection: Collection | null;
  onClose: () => void;
};

export function WishlistModal({ isOpen, collection, onClose }: WishlistModalProps) {
  const [instagramHandle, setInstagramHandle] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { isSubmitting, error, isSuccess, submit } = useWishlistSubmission();

  useEffect(() => {
    if (!isOpen) {
      setInstagramHandle("");
      setName("");
      setMessage("");
    }
  }, [isOpen]);

  if (!isOpen || !collection) {
    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!collection) {
      return;
    }

    const succeeded = await submit({
      collectionId: collection.id,
      instagramHandle,
      name,
      message,
    });

    if (!succeeded) {
      return;
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#334155]/70 px-4 py-6 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg rounded-[1.75rem] border border-[#EAEAEA] bg-[#FFFEFD] p-6 shadow-[0_24px_70px_rgba(51,65,85,0.16)]"
          onClick={(event) => event.stopPropagation()}
        >
          {isSuccess ? (
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#334155]/60">Wishlist request sent</p>
              <h2 className="text-2xl font-semibold text-[#334155]">You’re on the list ✨</h2>
              <p className="text-sm leading-7 text-[#334155]/75">
                Thanks for sharing your interest in {collection.name}. We’ll reach out through Instagram when it’s ready.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center rounded-full bg-[#C5D9B8] px-5 py-2.5 text-sm font-semibold text-[#334155]"
              >
                Close
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#334155]/60">Cloud Wishlist</p>
                <h2 className="mt-2 text-2xl font-semibold text-[#334155]">Let us know you love {collection.name}</h2>
                <p className="mt-2 text-sm leading-7 text-[#334155]/70">
                  We’ll keep you posted through Instagram when this collection is available again.
                </p>
              </div>

              <div className="space-y-3">
                <input
                  value={instagramHandle}
                  onChange={(event) => setInstagramHandle(event.target.value)}
                  placeholder="Instagram handle"
                  className="w-full rounded-full border border-[#EAEAEA] bg-[#FCFCFA] px-4 py-3 text-sm text-[#334155] outline-none"
                  required
                />
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="w-full rounded-full border border-[#EAEAEA] bg-[#FCFCFA] px-4 py-3 text-sm text-[#334155] outline-none"
                  required
                />
                <textarea
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Tell us a little about your dream ritual"
                  className="min-h-[110px] w-full rounded-[1.2rem] border border-[#EAEAEA] bg-[#FCFCFA] px-4 py-3 text-sm text-[#334155] outline-none"
                  required
                />
              </div>

              {error ? <p className="text-sm text-[#b91c1c]">{error}</p> : null}

              <div className="flex flex-wrap items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-[#EAEAEA] px-4 py-2.5 text-sm font-semibold text-[#334155]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-[#C5D9B8] px-5 py-2.5 text-sm font-semibold text-[#334155] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send request"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
