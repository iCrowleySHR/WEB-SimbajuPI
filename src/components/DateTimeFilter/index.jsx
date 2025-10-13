import React from "react";

export default function DateTimeFilter({ startDate, endDate, onChangeStart, onChangeEnd }) {
  return (
    <div className="flex gap-2 items-center mt-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Data Início</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onChangeStart(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Data Fim</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onChangeEnd(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        />
      </div>
    </div>
  );
}
