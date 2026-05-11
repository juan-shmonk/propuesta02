import { Package, TrendingUp, TrendingDown, AlertTriangle, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import StatCard from "../components/StatCard";
import { products, entries, exits } from "../data/mockData";
import { Link } from "react-router";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const Dashboard = () => {
  const totalProducts = products.length;
  const lowStockProducts = products.filter(p => p.currentStock <= p.minStock).length;
  const totalStock = products.reduce((acc, p) => acc + p.currentStock, 0);
  const recentEntries = entries.slice(0, 3);
  const recentExits = exits.slice(0, 3);

  // Datos para gráfica de movimientos
  const movementData = [
    { name: 'Lun', entradas: 12, salidas: 8 },
    { name: 'Mar', entradas: 15, salidas: 10 },
    { name: 'Mié', entradas: 8, salidas: 14 },
    { name: 'Jue', entradas: 20, salidas: 12 },
    { name: 'Vie', entradas: 18, salidas: 15 },
    { name: 'Sáb', entradas: 5, salidas: 3 },
    { name: 'Dom', entradas: 3, salidas: 2 },
  ];

  // Productos por categoría
  const categoryData = [
    { name: 'Electrónica', value: 23 },
    { name: 'Accesorios', value: 41 },
    { name: 'Audio', value: 12 },
    { name: 'Componentes', value: 32 },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Resumen general del inventario</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        <StatCard
          title="Total de Productos"
          value={totalProducts}
          icon={Package}
          color="blue"
          trend={{ value: "12% vs mes anterior", isPositive: true }}
        />
        <StatCard
          title="Stock Total"
          value={totalStock}
          icon={TrendingUp}
          color="green"
          trend={{ value: "8% vs mes anterior", isPositive: true }}
        />
        <StatCard
          title="Stock Bajo"
          value={lowStockProducts}
          icon={AlertTriangle}
          color="orange"
        />
        <StatCard
          title="Movimientos Hoy"
          value="24"
          icon={TrendingDown}
          color="blue"
        />
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Movimientos Semanales */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Movimientos Semanales</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={movementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="entradas" stroke="#10b981" strokeWidth={2} name="Entradas" />
              <Line type="monotone" dataKey="salidas" stroke="#f59e0b" strokeWidth={2} name="Salidas" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stock por Categoría */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock por Categoría</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" name="Unidades" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Alertas de Stock Bajo */}
      {lowStockProducts > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-orange-900 mb-2">
                Productos con Stock Bajo
              </h3>
              <p className="text-sm text-orange-700 mb-4">
                {lowStockProducts} productos requieren reabastecimiento
              </p>
              <div className="space-y-2">
                {products
                  .filter(p => p.currentStock <= p.minStock)
                  .slice(0, 3)
                  .map(product => (
                    <div key={product.id} className="bg-white rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-600">
                          Stock: {product.currentStock} / Mínimo: {product.minStock}
                        </p>
                      </div>
                      <Link
                        to={`/productos/${product.id}`}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Ver detalles →
                      </Link>
                    </div>
                  ))}
              </div>
              <Link
                to="/stock"
                className="inline-block mt-4 text-sm text-orange-700 hover:text-orange-800 font-medium"
              >
                Ver todos los productos →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Actividad Reciente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Entradas Recientes */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Entradas Recientes</h3>
            <Link to="/entradas" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Ver todas →
            </Link>
          </div>
          <div className="space-y-3">
            {recentEntries.map(entry => (
              <div key={entry.id} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ArrowDownToLine className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{entry.productName}</p>
                  <p className="text-sm text-gray-600">+{entry.quantity} unidades</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(entry.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Salidas Recientes */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Salidas Recientes</h3>
            <Link to="/salidas" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Ver todas →
            </Link>
          </div>
          <div className="space-y-3">
            {recentExits.map(exit => (
              <div key={exit.id} className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-100">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <ArrowUpFromLine className="w-5 h-5 text-orange-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900">{exit.productName}</p>
                  <p className="text-sm text-gray-600">-{exit.quantity} unidades</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(exit.date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
