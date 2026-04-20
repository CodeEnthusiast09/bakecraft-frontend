// src/app/[tenant-slug]/(internal-routes)/(protected)/production/page.tsx
"use client";

import { useProducts } from "@/hooks/services/production";
import { ProductsListView } from "./_components/products-list-view";
import { SetupEmptyState } from "./_components/setup-empty-state";

const ProductionPage = () => {
  const { data: products, isLoading } = useProducts();

  const hasProducts = !isLoading && products && products.length > 0;

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold mb-3 text-primary-300">
        Production
      </h1>
      <p className="font-light text-primary-500 text-sm md:text-lg mb-8">
        Set up your production processes and enjoy real-time production reports.
      </p>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-48 bg-secondary-300 rounded-[15px] animate-pulse"
            />
          ))}
        </div>
      ) : hasProducts ? (
        <ProductsListView products={products} />
      ) : (
        <SetupEmptyState />
      )}
    </div>
  );
};

export default ProductionPage;
