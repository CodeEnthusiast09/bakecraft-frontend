// src/app/[tenant-slug]/(internal-routes)/(protected)/production/_components/products-list-view.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { SearchBox } from "@/components/search-box";
import type { Product } from "@/interfaces";
import { AddProductModal } from "./add-product-modal";
import { ProductWizard } from "./product-wizard/product-wizard";

interface ProductsListViewProps {
  products: Product[];
}

export const ProductsListView = ({ products }: ProductsListViewProps) => {
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (selectedProduct) {
    return (
      <ProductWizard
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  return (
    <div className="flex gap-4">
      {/* Left sidebar — product list */}
      <div className="w-56 shrink-0">
        <h2 className="text-xl font-bold text-primary-300 mb-4">Products</h2>
        <ul className="space-y-3">
          {filtered.map((p) => (
            <li key={p.id}>
              <button
                onClick={() => setSelectedProduct(p)}
                className="text-left text-sm font-light underline text-secondary-100 hover:text-secondary-100/80 transition-colors"
              >
                {p.name}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right panel — empty state before selecting */}
      <div className="flex-1 bg-white rounded-tl-[15px] rounded-tr-[15px] p-6 min-h-[500px]">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <SearchBox
            value={search}
            onChange={(v) => setSearch(String(v))}
            placeholder="Search products"
          />
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowAddModal(true)}
            className="gap-1"
          >
            + Add Product
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-primary-500 font-light">
            Select a product from the list to view or edit its recipe.
          </p>
        </div>
      </div>

      {showAddModal && (
        <AddProductModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  );
};
