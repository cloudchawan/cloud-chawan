import Image from "next/image";
import type { Collection } from "@/lib/collections";

type CollectionCardProps = {
  collection: Collection;
  onLoveThis: () => void;
};

export function CollectionCard({ collection, onLoveThis }: CollectionCardProps) {
  const imageSrc = collection.image_url.startsWith("http") || collection.image_url.startsWith("/")
    ? collection.image_url
    : `/collections1/${collection.image_url}`;

  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-[#EAEAEA] bg-[#FCFCFA] shadow-[0_18px_48px_rgba(51,65,85,0.06)] transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#C5D9B8]/50">
        <Image
          src={imageSrc}
          alt={collection.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="space-y-3 p-5 sm:p-6">
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#334155]/60">
            Collection
          </p>
          <h3 className="text-xl font-semibold text-[#334155]">{collection.name}</h3>
          <p className="text-sm leading-7 text-[#334155]/75">{collection.description}</p>
        </div>

        <button
          type="button"
          onClick={onLoveThis}
          className="inline-flex items-center rounded-full border border-[#EFC0CB] bg-[#EFC0CB] px-4 py-2 text-sm font-semibold text-[#334155] transition-colors duration-200 hover:bg-[#EFC0CB]/80"
        >
          I Love This ☁️
        </button>
      </div>
    </article>
  );
}
