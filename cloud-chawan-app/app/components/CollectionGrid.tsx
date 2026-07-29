"use client";

import { useState } from "react";
import type { Collection } from "@/lib/collections";
import { useCollections } from "@/hooks/useCollections";
import { CollectionCard } from "./CollectionCard";
import { WishlistModal } from "@/components/WishlistModal";

export function CollectionGrid() {
  const { collections, isLoading, error } = useCollections();
  const [activeCollection, setActiveCollection] = useState<Collection | null>(null);

  return (
    <section id="gallery" className="mx-auto w-full max-w-6xl px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pb-24">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#2E3A59]/60">
            Curated Collections
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-[#2E3A59] sm:text-4xl">
            Soft forms, calm rituals.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[#2E3A59]/70 sm:text-base">
          Each set is designed to feel quietly luxurious, with airy silhouettes and a touch of cloud-inspired serenity.
        </p>
      </div>

      {isLoading ? (
        <div className="text-sm text-[#334155]/70">Loading collections…</div>
      ) : null}

      {!isLoading && error ? (
        <div className="mb-6 text-sm text-[#334155]/70">{error}</div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {collections.map((collection) => (
          <CollectionCard
            key={collection.id}
            collection={collection}
            onLoveThis={() => setActiveCollection(collection)}
          />
        ))}
      </div>

      <WishlistModal
        isOpen={Boolean(activeCollection)}
        collection={activeCollection}
        onClose={() => setActiveCollection(null)}
      />
    </section>
  );
}
