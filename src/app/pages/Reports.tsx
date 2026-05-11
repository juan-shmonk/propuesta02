import { useState } from "react";
import { Download, Calendar, TrendingUp, TrendingDown, Package, DollarSign } from "lucide-react";
import { products, entries, exits } from "../data/mockData";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Reports = () => {
  const [dateRange, setDateRange] = useState("week");
  const [reportType, setReportType] = useState("general");

  // Cálculos generales
  const totalProducts = products.length;
  const totalEntries = entries.reduce((sum, e) => sum + e.quantity, 0);
  const totalExits = exits.reduce((sum, e) => sum + e.quantity, 0);
  const totalValue = products.reduce((sum, p) => sum + (p.currentStock * p.price), 0);

  // Datos para gráfica de movimientos
  const movementData = [
    { fecha: '10 Abr', entradas: 25, salidas: 18 },
    { fecha: '11 Abr', entradas: 30, salidas: 22 },
    { fecha: '12 Abr', entradas: 15, salidas: 28 },
    { fecha: '13 Abr', entradas: 20, salidas: 15 },
    { fecha: '14 Abr', entradas: 35, salidas: 25 },
    { fecha: '15 Abr', entradas: 28, salidas: 32 },
    { fecha: '16 Abr', entradas: 22, salidas: 19 },
  ];

  // Datos por categoría
  const categoryData = Array.from(new Set(products.map(p => p.category))).map(category => {
    const categoryProducts = products.filter(p => p.category === category);
    return {
      name: category,
      cantidad: categoryProducts.reduce((sum, p) => sum + p.currentStock, 0),
      productos: categoryProducts.length,
    };
  });

  // Datos de valor por categoría
  const valueData = Array.from(new Set(products.map(p => p.category))).map(category => {
    const categoryProducts = products.filter(p => p.category === category);
    return {
      name: category,
      valor: categoryProducts.reduce((sum, p) => sum + (p.currentStock * p.price), 0),
    };
  });

  const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // Top productos con más movimientos
  const topMovedProducts = [
    { name: 'SSD Samsung 1TB', movimientos: 33, tipo: 'Entradas/Salidas' },
    { name: 'Laptop Dell Inspiron', movimientos: 15, tipo: 'Entradas/Salidas' },
    { name: 'Teclado Mecánico RGB', movimientos: 27, tipo: 'Entradas/Salidas' },
    { name: 'Mouse Logitech MX', movimientos: 10, tipo: 'Entradas/Salidas' },
    { name: 'Monitor LG 27"', movimientos: 12, tipo: 'Entradas/Salidas' },
  ];

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Reportes</h1>
            <p className="text-gray-600">Análisis y estadísticas del inventario</p>
          </div>
          <button className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg">
            <Download className="w-5 h-5" />
            <span className="hidden sm:inline">Exportar Reporte</span>
            <span className="sm:hidden">Exportar</span>
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full pl-11 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white"
            >
              <option value="today">Hoy</option>
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
              <option value="quarter">Último trimestre</option>
              <option value="year">Último año</option>
            </select>
          </div>
          <div className="relative">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none appearance-none bg-white min-w-[200px]"
            >
              <option value="general">Reporte General</option>
              <option value="movements">Movimientos</option>
              <option value="value">Valorización</option>
              <option value="categories">Por Categorías</option>
            </select>
          </div>
        </div>
      </div>

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Productos</p>
              <p className="text-3xl font-bold text-gray-900">{totalProducts}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-green-600">↑ 12% vs período anterior</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Entradas</p>
              <p className="text-3xl font-bold text-gray-900">{totalEntries}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-green-600">↑ 8% vs período anterior</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Salidas</p>
              <p className="text-3xl font-bold text-gray-900">{totalExits}</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-orange-600">↑ 15% vs período anterior</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="text-sm text-gray-600 mb-1">Valor Total</p>
              <p className="text-3xl font-bold text-gray-900">${(totalValue / 1000).toFixed(0)}K</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-green-600">↑ 5% vs período anterior</p>
        </div>
      </div>

      {/* Gráficas principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Movimientos en el tiempo */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Movimientos en el Tiempo</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={movementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="fecha" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="entradas" stroke="#10b981" strokeWidth={2} name="Entradas" />
              <Line type="monotone" dataKey="salidas" stroke="#f59e0b" strokeWidth={2} name="Salidas" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stock por categoría */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Stock por Categoría</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="cantidad" fill="#2563eb" name="Unidades" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Segunda fila de gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Distribución de valor */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Distribución de Valor por Categoría</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={valueData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry) => `${entry.name}: $${(entry.valor / 1000).toFixed(0)}K`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="valor"
              >
                {valueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `$${value.toLocaleString('es-MX')}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Top productos con más movimientos */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Productos con Más Movimientos</h2>
          <div className="space-y-3">
            {topMovedProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-blue-600">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.tipo}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{product.movimientos}</p>
                  <p className="text-xs text-gray-500">movimientos</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabla de resumen por categoría */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen por Categoría</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Categoría</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Productos</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Stock Total</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Valor Total</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Promedio/Producto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {categoryData.map((category, index) => {
                const categoryProducts = products.filter(p => p.category === category.name);
                const totalValue = categoryProducts.reduce((sum, p) => sum + (p.currentStock * p.price), 0);
                const avgValue = totalValue / category.productos;
                
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: COLORS[index % COLORS.length] + '20', color: COLORS[index % COLORS.length] }}>
                        {category.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">{category.productos}</td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">{category.cantidad} uds</td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">${totalValue.toLocaleString('es-MX')}</td>
                    <td className="px-6 py-4 text-right text-gray-600">${avgValue.toLocaleString('es-MX')}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
