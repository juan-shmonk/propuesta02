import { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, Calendar, ArrowDownToLine, Package } from "lucide-react";
import { entries } from "../data/mockData";

const EntryHistory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("all");

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         entry.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (dateFilter === "today") {
      const today = new Date().toDateString();
      const entryDate = new Date(entry.date).toDateString();
      return matchesSearch && today === entryDate;
    }
    
    return matchesSearch;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  const totalUnits = filteredEntries.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Entradas de Inventario</h1>
            <p className="text-gray-600">Historial de entradas al almacén</p>
          </div>
          <Link
            to="/entradas/nuevo"
            className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2.5 rounded-lg hover:bg-green-700 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Registrar Entrada</span>
            <span className="sm:hidden">Nueva</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Entradas</p>
                <p className="text-2xl font-bold text-gray-900">{filteredEntries.length}</p>
              </div>
              <ArrowDownToLine className="w-10 h-10 text-green-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Unidades</p>
                <p className="text-2xl font-bold text-gray-900">{totalUnits}</p>
              </div>
              <Package className="w-10 h-10 text-blue-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Hoy</p>
                <p className="text-2xl font-bold text-gray-900">
                  {entries.filter(e => new Date(e.date).toDateString() === new Date().toDateString()).length}
                </p>
              </div>
              <Calendar className="w-10 h-10 text-orange-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por producto o ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="pl-11 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white min-w-[180px]"
            >
              <option value="all">Todas las fechas</option>
              <option value="today">Hoy</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabla Desktop */}
      <div className="hidden lg:block bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Fecha</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Producto</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Cantidad</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Proveedor</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Responsable</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Observaciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEntries.map(entry => (
                <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-900">{entry.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{formatDate(entry.date)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{entry.productName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-semibold bg-green-50 text-green-700">
                      +{entry.quantity}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{entry.supplier || '-'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-900">{entry.responsible}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{entry.notes || '-'}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards Mobile */}
      <div className="lg:hidden space-y-3">
        {filteredEntries.map(entry => (
          <div key={entry.id} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <ArrowDownToLine className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-mono text-xs text-gray-500">{entry.id}</p>
                  <p className="font-semibold text-gray-900">{entry.productName}</p>
                </div>
              </div>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-semibold bg-green-50 text-green-700">
                +{entry.quantity}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
              <div>
                <p className="text-gray-500">Fecha</p>
                <p className="font-medium text-gray-900">{formatDate(entry.date)}</p>
              </div>
              <div>
                <p className="text-gray-500">Proveedor</p>
                <p className="font-medium text-gray-900">{entry.supplier || 'N/A'}</p>
              </div>
            </div>

            <div className="text-sm">
              <p className="text-gray-500">Responsable</p>
              <p className="font-medium text-gray-900">{entry.responsible}</p>
            </div>

            {entry.notes && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-600">{entry.notes}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEntries.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <ArrowDownToLine className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron entradas</h3>
          <p className="text-gray-600 mb-4">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default EntryHistory;
