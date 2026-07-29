"use client";

import { useMemo, useState } from "react";
import { useAdminWishlistRequests } from "@/hooks/useAdminWishlistRequests";

function formatDate(value: string) {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export function AdminDashboard() {
  const { requests, isLoading, error } = useAdminWishlistRequests();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCollection, setSelectedCollection] = useState("all");

  const collectionOptions = useMemo(() => {
    return Array.from(
      new Set(requests.map((request) => request.collectionName).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b));
  }, [requests]);

  const filteredRequests = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesCollection = selectedCollection === "all" || request.collectionName === selectedCollection;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        request.instagramHandle.toLowerCase().includes(normalizedSearch) ||
        request.customerName.toLowerCase().includes(normalizedSearch);

      return matchesCollection && matchesSearch;
    });
  }, [requests, searchTerm, selectedCollection]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(239,192,203,0.28),_transparent_34%),linear-gradient(135deg,_#FFFEFD_0%,_#F4F9EE_100%)] px-4 py-6 text-[#334155] sm:px-6 lg:px-8 lg:py-8">
      <section className="mx-auto flex max-w-6xl flex-col gap-6 rounded-[2rem] border border-[#EAEAEA]/80 bg-[#FFFEFD]/90 p-5 shadow-[0_24px_80px_rgba(51,65,85,0.08)] sm:p-8 lg:p-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#334155]/60">Cloud Chawan admin</p>
            <h1 className="mt-2 text-3xl font-semibold text-[#334155] sm:text-4xl">Wishlist requests</h1>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-[#334155]/70">
              A calm read-only view of the requests that are waiting for a reply.
            </p>
          </div>
          <div className="rounded-full border border-[#EFC0CB]/70 bg-[#FBE8EE] px-3.5 py-2 text-sm font-medium text-[#334155]/80">
            {requests.length} requests
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-[#EAEAEA] bg-[#FCFCFA] p-4 shadow-[0_16px_36px_rgba(51,65,85,0.06)] sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <label className="flex-1 text-sm font-medium text-[#334155]">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.32em] text-[#334155]/60">
                Search
              </span>
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Instagram handle or customer name"
                className="w-full rounded-full border border-[#EAEAEA] bg-[#FFFEFD] px-4 py-3 text-sm text-[#334155] outline-none"
              />
            </label>

            <label className="w-full text-sm font-medium text-[#334155] lg:max-w-[240px]">
              <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.32em] text-[#334155]/60">
                Filter by collection
              </span>
              <select
                value={selectedCollection}
                onChange={(event) => setSelectedCollection(event.target.value)}
                className="w-full rounded-full border border-[#EAEAEA] bg-[#FFFEFD] px-4 py-3 text-sm text-[#334155] outline-none"
              >
                <option value="all">All collections</option>
                {collectionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-[1.5rem] border border-[#EAEAEA] bg-[#FCFCFA] p-6 text-sm text-[#334155]/70 shadow-[0_16px_36px_rgba(51,65,85,0.06)]">
            Loading wishlist requests…
          </div>
        ) : null}

        {!isLoading && error ? (
          <div className="rounded-[1.5rem] border border-[#EAEAEA] bg-[#FCFCFA] p-6 text-sm text-[#334155]/70 shadow-[0_16px_36px_rgba(51,65,85,0.06)]">
            {error}
          </div>
        ) : null}

        {!isLoading && !error && filteredRequests.length === 0 ? (
          <div className="rounded-[1.5rem] border border-[#EAEAEA] bg-[#FCFCFA] p-6 text-sm text-[#334155]/70 shadow-[0_16px_36px_rgba(51,65,85,0.06)]">
            No wishlist requests match your current search.
          </div>
        ) : null}

        {!isLoading && !error && filteredRequests.length > 0 ? (
          <>
            <div className="hidden overflow-hidden rounded-[1.5rem] border border-[#EAEAEA] bg-[#FFFEFD] shadow-[0_16px_36px_rgba(51,65,85,0.06)] lg:block">
              <table className="min-w-full divide-y divide-[#EAEAEA] text-left text-sm">
                <thead className="bg-[#FBE8EE]/70">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-[#334155]">Collection</th>
                    <th className="px-4 py-3 font-semibold text-[#334155]">Instagram</th>
                    <th className="px-4 py-3 font-semibold text-[#334155]">Customer</th>
                    <th className="px-4 py-3 font-semibold text-[#334155]">Message</th>
                    <th className="px-4 py-3 font-semibold text-[#334155]">Created</th>
                    <th className="px-4 py-3 font-semibold text-[#334155]">Contacted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EAEAEA] bg-[#FFFEFD]">
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="align-top">
                      <td className="px-4 py-3">
                        <div className="font-medium text-[#334155]">{request.collectionName}</div>
                        <div className="mt-1 text-xs uppercase tracking-[0.2em] text-[#334155]/50">{request.collectionSlug}</div>
                      </td>
                      <td className="px-4 py-3 text-[#334155]/80">{request.instagramHandle}</td>
                      <td className="px-4 py-3 text-[#334155]/80">{request.customerName}</td>
                      <td className="max-w-[320px] px-4 py-3 text-sm leading-7 text-[#334155]/75">{request.message}</td>
                      <td className="px-4 py-3 text-sm text-[#334155]/70">{formatDate(request.createdAt)}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-[0.24em] ${request.contacted ? "bg-[#C5D9B8]/70 text-[#334155]" : "bg-[#FBE8EE] text-[#334155]/80"}`}>
                          {request.contacted ? "Contacted" : "Pending"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 lg:hidden">
              {filteredRequests.map((request) => (
                <article key={request.id} className="rounded-[1.5rem] border border-[#EAEAEA] bg-[#FCFCFA] p-4 shadow-[0_16px_36px_rgba(51,65,85,0.06)]">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#334155]/60">{request.collectionName}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#334155]/50">{request.collectionSlug}</p>
                    </div>
                    <div className="rounded-full bg-[#FBE8EE] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-[#334155]/70">
                      {formatDate(request.createdAt)}
                    </div>
                  </div>
                  <div className="mt-4 space-y-2 text-sm text-[#334155]/75">
                    <div>
                      <span className="font-semibold text-[#334155]">Instagram:</span> {request.instagramHandle}
                    </div>
                    <div>
                      <span className="font-semibold text-[#334155]">Customer:</span> {request.customerName}
                    </div>
                    <div>
                      <span className="font-semibold text-[#334155]">Message:</span> {request.message}
                    </div>
                    <div>
                      <span className="font-semibold text-[#334155]">Contacted:</span>{" "}
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] ${request.contacted ? "bg-[#C5D9B8]/70 text-[#334155]" : "bg-[#FBE8EE] text-[#334155]/80"}`}>
                        {request.contacted ? "Contacted" : "Pending"}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : null}
      </section>
    </main>
  );
}
