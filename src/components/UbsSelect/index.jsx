import { useState } from "react";
import useAllUbs from "../../hook/useAllUbs";

export default function UbsSelect({ onSelectUbs, selectedUbsId }) {
    const [searchTerm, setSearchTerm] = useState("");
    const { ubsUsers, error } = useAllUbs(1, searchTerm, true);

    return (
        <div className="flex flex-col gap-1.5 w-full max-w-xs pb-4">
            <label 
                htmlFor="ubs-select" 
                className="text-sm font-medium text-slate-700"
            >
                Filtrar por UBS
            </label>
            
            <select
                id="ubs-select"
                value={selectedUbsId}
                onChange={(e) => onSelectUbs(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-800"
            >
                <option value="">Selecione uma UBS...</option>
                {ubsUsers.map((ubs) => (
                    <option key={ubs.id} value={ubs.id}>
                        {ubs.name} ({ubs.email})
                    </option>
                ))}
            </select>

            {error && (
                <span className="text-xs text-rose-600 mt-0.5">
                    {error}
                </span>
            )}
        </div>
    );
}