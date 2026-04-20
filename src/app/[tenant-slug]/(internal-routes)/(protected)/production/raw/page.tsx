// src/app/[tenant-slug]/(internal-routes)/(protected)/production/raw/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { FaX } from "react-icons/fa6";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  useRawMaterials,
  useCreateRawMaterial,
  useUpdateRawMaterial,
  useDeleteRawMaterial,
} from "@/hooks/services/production";
import type { RawMaterial, MaterialUnit } from "@/interfaces";

const UNIT_OPTIONS: { value: MaterialUnit; label: string }[] = [
  { value: "kg", label: "kg" },
  { value: "g", label: "g" },
  { value: "litres", label: "litres" },
  { value: "ml", label: "ml" },
  { value: "units", label: "units" },
  { value: "pieces", label: "pieces" },
];

interface MaterialFormState {
  name: string;
  unit: MaterialUnit;
  currentStock: number | "";
  reorderLevel: number | "";
}

const emptyForm = (): MaterialFormState => ({
  name: "",
  unit: "kg",
  currentStock: "",
  reorderLevel: "",
});

interface MaterialFormModalProps {
  initial?: RawMaterial;
  onClose: () => void;
}

const MaterialFormModal = ({ initial, onClose }: MaterialFormModalProps) => {
  const [form, setForm] = useState<MaterialFormState>(
    initial
      ? {
          name: initial.name,
          unit: initial.unit,
          currentStock: initial.currentStock,
          reorderLevel: initial.reorderLevel,
        }
      : emptyForm(),
  );

  const { mutate: createMaterial, isPending: isCreating } = useCreateRawMaterial(onClose);
  const { mutate: updateMaterial, isPending: isUpdating } = useUpdateRawMaterial(onClose);

  const isPending = isCreating || isUpdating;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const payload = {
      name: form.name.trim(),
      unit: form.unit,
      currentStock: Number(form.currentStock) || 0,
      reorderLevel: Number(form.reorderLevel) || 0,
    };
    if (initial) {
      updateMaterial({ id: initial.id, payload });
    } else {
      createMaterial(payload);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-[95vw] max-w-md p-8 relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary-300">
            {initial ? "Edit Raw Material" : "Add Raw Material"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="bg-secondary-100 rounded-full p-2 text-sm"
          >
            <FaX className="text-background" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <Input
            label="Material Name"
            placeholder="e.g. Flour"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            showRequiredAsterik
          />
          <Select
            label="Unit"
            options={UNIT_OPTIONS}
            defaultValue={form.unit}
            onChange={(e) => setForm((p) => ({ ...p, unit: e.target.value as MaterialUnit }))}
            showRequiredAsterik
          />
          <Input
            label="Current Stock"
            type="number"
            placeholder="0"
            min={0}
            value={form.currentStock === "" ? "" : form.currentStock}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                currentStock: e.target.value === "" ? "" : Number(e.target.value),
              }))
            }
            showRequiredAsterik
          />
          <Input
            label="Reorder Level"
            type="number"
            placeholder="0"
            min={0}
            value={form.reorderLevel === "" ? "" : form.reorderLevel}
            onChange={(e) =>
              setForm((p) => ({
                ...p,
                reorderLevel: e.target.value === "" ? "" : Number(e.target.value),
              }))
            }
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
              {initial ? "Save Changes" : "Add Material"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RawMaterialsPage = () => {
  const { data: materials = [], isLoading } = useRawMaterials();
  const { mutate: deleteMaterial } = useDeleteRawMaterial();

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<RawMaterial | null>(null);

  const openCreate = () => {
    setEditing(null);
    setShowModal(true);
  };

  const openEdit = (m: RawMaterial) => {
    setEditing(m);
    setShowModal(true);
  };

  const closeModal = () => {
    setEditing(null);
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary-300">Raw Materials</h1>
          <p className="font-light text-primary-500 text-sm md:text-base mt-1">
            Manage the ingredients and materials used in your bakery recipes.
          </p>
        </div>
        <Button variant="secondary" size="sm" onClick={openCreate} className="gap-1 shrink-0">
          + Add Material
        </Button>
      </div>

      <div className="mt-8 bg-white rounded-tl-[15px] rounded-tr-[15px] overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-secondary-300 rounded animate-pulse" />
            ))}
          </div>
        ) : materials.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <p className="text-primary-500 font-light mb-4">
              No raw materials yet. Add your first one to get started.
            </p>
            <Button variant="secondary" onClick={openCreate}>
              + Add Material
            </Button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary-500/20">
                <th className="text-left px-6 py-4 font-semibold text-primary-300">Name</th>
                <th className="text-left px-6 py-4 font-semibold text-primary-300">Unit</th>
                <th className="text-right px-6 py-4 font-semibold text-primary-300">
                  Current Stock
                </th>
                <th className="text-right px-6 py-4 font-semibold text-primary-300">
                  Reorder Level
                </th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {materials.map((m) => (
                <tr
                  key={m.id}
                  className="border-b border-primary-500/10 hover:bg-secondary-300/20 transition-colors"
                >
                  <td className="px-6 py-4 font-light text-primary-300">{m.name}</td>
                  <td className="px-6 py-4 font-light text-primary-500">{m.unit}</td>
                  <td className="px-6 py-4 font-light text-primary-500 text-right">
                    <span
                      className={
                        Number(m.currentStock) <= Number(m.reorderLevel)
                          ? "text-red-500 font-medium"
                          : ""
                      }
                    >
                      {parseFloat(String(m.currentStock))}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-light text-primary-500 text-right">
                    {parseFloat(String(m.reorderLevel))}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => openEdit(m)}
                        className="text-secondary-100 hover:text-secondary-100/70 transition-colors"
                        aria-label="Edit"
                      >
                        <FaEdit size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteMaterial(m.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                        aria-label="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <MaterialFormModal initial={editing ?? undefined} onClose={closeModal} />
      )}
    </div>
  );
};

export default RawMaterialsPage;
