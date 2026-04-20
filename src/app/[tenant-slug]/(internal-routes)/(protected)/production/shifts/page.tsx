// src/app/[tenant-slug]/(internal-routes)/(protected)/production/shifts/page.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Select } from "@/components/select";
import { FaX } from "react-icons/fa6";
import {
  useShifts,
  useCreateShift,
  useCompleteShift,
  useAbortShift,
  useProducts,
} from "@/hooks/services/production";
import type { ProductionShift, ShiftStatus } from "@/interfaces";

// ─── Status badge ─────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<ShiftStatus, string> = {
  in_progress: "bg-yellow-100 text-yellow-700",
  completed: "bg-green-100 text-green-700",
  aborted: "bg-red-100 text-red-600",
};

const STATUS_LABELS: Record<ShiftStatus, string> = {
  in_progress: "In Progress",
  completed: "Completed",
  aborted: "Aborted",
};

const StatusBadge = ({ status }: { status: ShiftStatus }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[status]}`}
  >
    {STATUS_LABELS[status]}
  </span>
);

// ─── Start shift modal ────────────────────────────────────────────────────────

interface StartShiftModalProps {
  onClose: () => void;
}

const StartShiftModal = ({ onClose }: StartShiftModalProps) => {
  const { data: products = [] } = useProducts();
  const [productId, setProductId] = useState("");
  const [notes, setNotes] = useState("");

  const { mutate, isPending } = useCreateShift(onClose);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productId) return;
    mutate({
      productId,
      startedAt: new Date().toISOString(),
      notes: notes.trim() || undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-[95vw] max-w-md p-8 relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary-300">Start Production Shift</h2>
          <button
            type="button"
            onClick={onClose}
            className="bg-secondary-100 rounded-full p-2 text-sm"
          >
            <FaX className="text-background" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <Select
            label="Product"
            placeholder="Select product"
            options={products.map((p) => ({ value: p.id, label: p.name }))}
            defaultValue={productId}
            onChange={(e) => setProductId(e.target.value)}
            showRequiredAsterik
          />
          <Input
            label="Notes"
            placeholder="Optional notes for this shift"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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
              disabled={!productId}
              className="h-11 px-6"
            >
              Start Shift
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Complete shift modal ─────────────────────────────────────────────────────

interface CompleteShiftModalProps {
  shift: ProductionShift;
  onClose: () => void;
}

const CompleteShiftModal = ({ shift, onClose }: CompleteShiftModalProps) => {
  const [actualOutput, setActualOutput] = useState<number | "">("");
  const [notes, setNotes] = useState("");

  const { mutate, isPending } = useCompleteShift(onClose);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actualOutput) return;
    mutate({
      id: shift.id,
      payload: {
        actualOutputQuantity: Number(actualOutput),
        notes: notes.trim() || undefined,
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-[95vw] max-w-md p-8 relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary-300">Complete Shift</h2>
          <button
            type="button"
            onClick={onClose}
            className="bg-secondary-100 rounded-full p-2 text-sm"
          >
            <FaX className="text-background" />
          </button>
        </div>

        <p className="text-sm text-primary-500 font-light mb-4">
          Product: <span className="font-medium text-primary-300">{shift.product?.name}</span>
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Actual Output Quantity"
            type="number"
            placeholder="e.g. 48"
            min={0}
            value={actualOutput === "" ? "" : actualOutput}
            onChange={(e) =>
              setActualOutput(e.target.value === "" ? "" : Number(e.target.value))
            }
            showRequiredAsterik
          />
          <Input
            label="Notes"
            placeholder="Optional completion notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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
              disabled={!actualOutput}
              className="h-11 px-6"
            >
              Mark Complete
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Abort shift modal ────────────────────────────────────────────────────────

interface AbortShiftModalProps {
  shift: ProductionShift;
  onClose: () => void;
}

const AbortShiftModal = ({ shift, onClose }: AbortShiftModalProps) => {
  const [notes, setNotes] = useState("");
  const { mutate, isPending } = useAbortShift(onClose);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ id: shift.id, payload: { notes: notes.trim() || undefined } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-[95vw] max-w-md p-8 relative">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-primary-300">Abort Shift</h2>
          <button
            type="button"
            onClick={onClose}
            className="bg-secondary-100 rounded-full p-2 text-sm"
          >
            <FaX className="text-background" />
          </button>
        </div>

        <p className="text-sm text-primary-500 font-light mb-4">
          Are you sure you want to abort the shift for{" "}
          <span className="font-medium text-primary-300">{shift.product?.name}</span>?
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            label="Reason / Notes"
            placeholder="Optional reason for aborting"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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
              isLoading={isPending}
              className="h-11 px-6 bg-red-500 hover:bg-red-600 text-white border-0"
            >
              Abort Shift
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

type ActiveModal =
  | { type: "start" }
  | { type: "complete"; shift: ProductionShift }
  | { type: "abort"; shift: ProductionShift };

const ShiftsPage = () => {
  const { data: shifts = [], isLoading } = useShifts();
  const [modal, setModal] = useState<ActiveModal | null>(null);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-primary-300">Production Shifts</h1>
          <p className="font-light text-primary-500 text-sm md:text-base mt-1">
            Track and manage all production runs.
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setModal({ type: "start" })}
          className="gap-1 shrink-0"
        >
          + Start Shift
        </Button>
      </div>

      <div className="mt-8 bg-white rounded-tl-[15px] rounded-tr-[15px] overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-secondary-300 rounded animate-pulse" />
            ))}
          </div>
        ) : shifts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-16 text-center">
            <p className="text-primary-500 font-light mb-4">
              No shifts yet. Start your first production shift.
            </p>
            <Button variant="secondary" onClick={() => setModal({ type: "start" })}>
              + Start Shift
            </Button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary-500/20">
                <th className="text-left px-6 py-4 font-semibold text-primary-300">Product</th>
                <th className="text-left px-6 py-4 font-semibold text-primary-300">Started</th>
                <th className="text-left px-6 py-4 font-semibold text-primary-300">Completed</th>
                <th className="text-right px-6 py-4 font-semibold text-primary-300">
                  Actual Output
                </th>
                <th className="text-left px-6 py-4 font-semibold text-primary-300">Status</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {shifts.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-primary-500/10 hover:bg-secondary-300/20 transition-colors"
                >
                  <td className="px-6 py-4 font-light text-primary-300">
                    {s.product?.name ?? "—"}
                  </td>
                  <td className="px-6 py-4 font-light text-primary-500">
                    {formatDate(s.startedAt)}
                  </td>
                  <td className="px-6 py-4 font-light text-primary-500">
                    {s.completedAt ? formatDate(s.completedAt) : "—"}
                  </td>
                  <td className="px-6 py-4 font-light text-primary-500 text-right">
                    {s.actualOutputQuantity ?? "—"}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={s.status} />
                  </td>
                  <td className="px-6 py-4">
                    {s.status === "in_progress" && (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => setModal({ type: "complete", shift: s })}
                          className="text-xs px-3 h-8"
                        >
                          Complete
                        </Button>
                        <button
                          type="button"
                          onClick={() => setModal({ type: "abort", shift: s })}
                          className="text-xs text-red-500 hover:text-red-700 font-light underline transition-colors"
                        >
                          Abort
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal?.type === "start" && (
        <StartShiftModal onClose={() => setModal(null)} />
      )}
      {modal?.type === "complete" && (
        <CompleteShiftModal shift={modal.shift} onClose={() => setModal(null)} />
      )}
      {modal?.type === "abort" && (
        <AbortShiftModal shift={modal.shift} onClose={() => setModal(null)} />
      )}
    </div>
  );
};

export default ShiftsPage;
