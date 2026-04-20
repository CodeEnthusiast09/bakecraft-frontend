// src/app/[tenant-slug]/(internal-routes)/(protected)/production/_components/setup-empty-state.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { AddProductModal } from "./add-product-modal";

export const SetupEmptyState = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-[15px] p-10 text-center">
      <div className="w-20 h-20 rounded-full bg-secondary-300 flex items-center justify-center mb-6">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-secondary-100"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
      </div>

      <h2 className="text-xl font-bold text-primary-300 mb-3">
        Set up production
      </h2>
      <p className="font-light text-primary-500 text-base max-w-sm mb-8">
        Define your bakery recipes to allow account of all bakery products and
        get started with real-time production reports.
      </p>

      <Button
        variant="secondary"
        onClick={() => setShowModal(true)}
        className="gap-2"
      >
        + Add your first product
      </Button>

      {showModal && (
        <AddProductModal onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};
