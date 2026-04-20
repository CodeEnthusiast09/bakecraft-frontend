// src/app/[tenant-slug]/(internal-routes)/(protected)/production/reports/page.tsx
"use client";

import { useProductionReport } from "@/hooks/services/production";

interface StatCardProps {
  label: string;
  value: number;
  accent?: boolean;
}

const StatCard = ({ label, value, accent = false }: StatCardProps) => (
  <div
    className={`rounded-[15px] p-6 flex flex-col gap-2 ${
      accent ? "bg-secondary-100 text-white" : "bg-white"
    }`}
  >
    <span
      className={`text-sm font-light ${accent ? "text-white/80" : "text-primary-500"}`}
    >
      {label}
    </span>
    <span
      className={`text-4xl font-bold ${accent ? "text-white" : "text-primary-300"}`}
    >
      {value}
    </span>
  </div>
);

const ReportsPage = () => {
  const { data: report, isLoading } = useProductionReport();

  if (isLoading) {
    return (
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-300 mb-3">
          Production Reports
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-secondary-300 rounded-[15px] animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-secondary-300 rounded-[15px] animate-pulse" />
      </div>
    );
  }

  if (!report) {
    return (
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-primary-300 mb-3">
          Production Reports
        </h1>
        <p className="text-primary-500 font-light">No report data available.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl lg:text-3xl font-bold mb-3 text-primary-300">
        Production Reports
      </h1>
      <p className="font-light text-primary-500 text-sm md:text-lg mb-8">
        A summary of all production activity across your bakery.
      </p>

      {/* Summary stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard label="Total Shifts" value={report.totalShifts} accent />
        <StatCard label="Completed" value={report.completedShifts} />
        <StatCard label="In Progress" value={report.inProgressShifts} />
        <StatCard label="Aborted" value={report.abortedShifts} />
      </div>

      {/* Per-product breakdown */}
      <div className="bg-white rounded-tl-[15px] rounded-tr-[15px] overflow-hidden">
        <div className="px-6 py-5 border-b border-primary-500/20">
          <h2 className="text-lg font-semibold text-primary-300">Output by Product</h2>
        </div>

        {report.byProduct.length === 0 ? (
          <div className="flex items-center justify-center p-12">
            <p className="text-primary-500 font-light text-sm">
              No completed shifts to report on yet.
            </p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary-500/20">
                <th className="text-left px-6 py-4 font-semibold text-primary-300">Product</th>
                <th className="text-right px-6 py-4 font-semibold text-primary-300">
                  Shifts
                </th>
                <th className="text-right px-6 py-4 font-semibold text-primary-300">
                  Total Output
                </th>
                <th className="text-right px-6 py-4 font-semibold text-primary-300">
                  Avg. Output / Shift
                </th>
              </tr>
            </thead>
            <tbody>
              {report.byProduct.map((row) => (
                <tr
                  key={row.productId}
                  className="border-b border-primary-500/10 hover:bg-secondary-300/20 transition-colors"
                >
                  <td className="px-6 py-4 font-light text-primary-300">{row.productName}</td>
                  <td className="px-6 py-4 font-light text-primary-500 text-right">
                    {row.shiftCount}
                  </td>
                  <td className="px-6 py-4 font-light text-primary-500 text-right">
                    {row.totalOutput}
                  </td>
                  <td className="px-6 py-4 font-light text-primary-500 text-right">
                    {row.shiftCount > 0
                      ? (row.totalOutput / row.shiftCount).toFixed(1)
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
