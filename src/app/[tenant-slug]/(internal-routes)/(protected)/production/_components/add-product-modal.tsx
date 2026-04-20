// src/app/[tenant-slug]/(internal-routes)/(protected)/production/_components/add-product-modal.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useCreateProduct } from "@/hooks/services/production";
import { FaX } from "react-icons/fa6";

interface AddProductModalProps {
  onClose: () => void;
  onCreated?: (productId: string) => void;
}

export const AddProductModal = ({ onClose, onCreated }: AddProductModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, isPending } = useCreateProduct((productId) => {
    onCreated?.(productId);
    onClose();
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    mutate({ name: name.trim(), description: description.trim() || undefined });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-[95vw] max-w-md p-8 relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary-300">Add Product</h2>
          <button
            type="button"
            onClick={onClose}
            className="bg-secondary-100 rounded-full p-2 text-sm focus:outline-secondary-500"
          >
            <FaX className="text-background" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Product Name"
            placeholder="e.g. White Bread"
            value={name}
            onChange={(e) => setName(e.target.value)}
            showRequiredAsterik
          />
          <Input
            label="Description"
            placeholder="Optional description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="transparent"
              onClick={onClose}
              className="border border-primary-500 text-primary-500 h-11 px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="secondary"
              isLoading={isPending}
              className="h-11 px-6"
            >
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
