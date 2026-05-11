import { useState } from "react";
import { Link } from "react-router";
import { Search, Filter, AlertCircle, CheckCircle, Sliders, Package } from "lucide-react";
import { products } from "../data/mockData";

const StockView = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" ||
                         (statusFilter === "low" && product.currentStock <= product.minStock) ||
                         (statusFilter === "ok" && product.currentStock > product.minStock);
    
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(products.map(p => p.category)));
  const lowStockCount = products.filter(p => p.currentStock <= p.minStock).length;
  const okStockCount = products.filter(p => p.currentStock > p.minStock).length;
  const totalValue = products.reduce((sum, p) => sum + (p.currentStock * p.price), 0);

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Stock e Inventario</h1>
            <p className="text-gray-600">Vista general del inventario actual</p>
          </div>
          <Link
            to="/stock/ajuste"
            className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
          >
            <Sliders className="w-5 h-5" />
            <span className="hidden sm:inline">Ajustar Stock</span>
            <span className="sm:hidden">Ajustar</span>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Productos</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
              <Package className="w-10 h-10 text-blue-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Stock OK</p>
                <p className="text-2xl font-bold text-green-600">{okStockCount}</p>
              </div>
              <CheckCircle className="w-10 h-10 text-green-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Stock Bajo</p>
                <p className="text-2xl font-bold text-orange-600">{lowStockCount}</p>
              </div>
              <AlertCircle className="w-10 h-10 text-orange-600 opacity-20" />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Valor Total</p>
                <p className="text-2xl font-bold text-gray-900">${(totalValue / 1000).toFixed(0)}K</p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-blue-600">$</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-11 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white min-w-[150px]"
            >
              <option value="all">Todos los estados</option>
              <option value="ok">Stock OK</option>
              <option value="low">Stock Bajo</option>
            </select>
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="pl-11 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white min-w-[180px]"
            >
              <option value="all">Todas las categorías</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">SKU</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Producto</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Categoría</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Stock Actual</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Stock Mínimo</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Disponibilidad</th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredProducts.map(product => {
                const isLowStock = product.currentStock <= product.minStock;
                const percentage = (product.currentStock / (product.minStock * 3)) * 100;
                
                return (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-gray-900">{product.sku}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/productos/${product.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                        {product.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-gray-900">{product.currentStock}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-gray-600">{product.minStock}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all ${
                              isLowStock ? 'bg-orange-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 w-12 text-right">
                          {Math.round(percentage)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        {isLowStock ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700">
                            <AlertCircle className="w-3 h-3" />
                            Bajo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                            <CheckCircle className="w-3 h-3" />
                            OK
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards Mobile */}
      <div className="lg:hidden space-y-3">
        {filteredProducts.map(product => {
          const isLowStock = product.currentStock <= product.minStock;
          const percentage = (product.currentStock / (product.minStock * 3)) * 100;
          
          return (
            <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-gray-500">{product.sku}</span>
                    {isLowStock && <AlertCircle className="w-4 h-4 text-orange-500" />}
                  </div>
                  <Link to={`/productos/${product.id}`} className="font-semibold text-gray-900 hover:text-blue-600">
                    {product.name}
                  </Link>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 mt-1">
                    {product.category}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Stock actual</span>
                  <span className="font-semibold text-gray-900">{product.currentStock} uds</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Stock mínimo</span>
                  <span className="text-gray-600">{product.minStock} uds</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        isLowStock ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{Math.round(percentage)}%</span>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200">
                {isLowStock ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700">
                    <AlertCircle className="w-3 h-3" />
                    Stock Bajo - Requiere reabastecimiento
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                    <CheckCircle className="w-3 h-3" />
                    Stock OK
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron productos</h3>
          <p className="text-gray-600 mb-4">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
};

export default StockView;
