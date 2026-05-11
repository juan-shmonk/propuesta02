import { useNavigate, useParams, Link } from "react-router";
import { ArrowLeft, Edit, Package, TrendingUp, TrendingDown, AlertCircle, Calendar } from "lucide-react";
import { products, entries, exits } from "../data/mockData";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="p-8 text-center">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Producto no encontrado</h2>
        <button
          onClick={() => navigate('/productos')}
          className="text-blue-600 hover:text-blue-700"
        >
          Volver a productos
        </button>
      </div>
    );
  }

  const isLowStock = product.currentStock <= product.minStock;
  const productEntries = entries.filter(e => e.productId === id);
  const productExits = exits.filter(e => e.productId === id);

  // Datos para gráfica de movimientos
  const stockHistory = [
    { date: '10 Abr', stock: 8 },
    { date: '11 Abr', stock: 12 },
    { date: '12 Abr', stock: 10 },
    { date: '13 Abr', stock: 14 },
    { date: '14 Abr', stock: 11 },
    { date: '15 Abr', stock: 15 },
    { date: '16 Abr', stock: product.currentStock },
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
      <div className="mb-6">
        <button
          onClick={() => navigate('/productos')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a productos
        </button>
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              {isLowStock && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-orange-50 text-orange-700">
                  <AlertCircle className="w-4 h-4" />
                  Stock bajo
                </span>
              )}
            </div>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <Link
            to={`/productos/editar/${product.id}`}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            <Edit className="w-5 h-5" />
            Editar
          </Link>
        </div>
      </div>

      {/* Información Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm text-gray-600">Stock Actual</p>
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{product.currentStock}</p>
          <p className="text-sm text-gray-500">unidades disponibles</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm text-gray-600">Stock Mínimo</p>
            <AlertCircle className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">{product.minStock}</p>
          <p className="text-sm text-gray-500">nivel de reorden</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-2">
            <p className="text-sm text-gray-600">Precio Unitario</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-1">
            ${product.price.toLocaleString('es-MX')}
          </p>
          <p className="text-sm text-gray-500">MXN</p>
        </div>
      </div>

      {/* Detalles del Producto */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Información del Producto</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">SKU / Código</p>
              <p className="font-mono font-semibold text-gray-900">{product.sku}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Categoría</p>
              <p className="font-semibold text-gray-900">{product.category}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Proveedor</p>
              <p className="font-semibold text-gray-900">{product.supplier || 'No asignado'}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Última Actualización</p>
              <p className="font-semibold text-gray-900">
                {new Date(product.lastUpdated).toLocaleDateString('es-MX')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Resumen de Movimientos</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Entradas</p>
                  <p className="font-semibold text-gray-900">{productEntries.length}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <TrendingDown className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Salidas</p>
                  <p className="font-semibold text-gray-900">{productExits.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráfica de Stock */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Histórico de Stock (7 días)</h2>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={stockHistory}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Area type="monotone" dataKey="stock" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.2} name="Stock" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Historial de Movimientos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimas Entradas */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Últimas Entradas</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {productEntries.length > 0 ? (
              productEntries.slice(0, 3).map(entry => (
                <div key={entry.id} className="p-3 bg-green-50 rounded-lg border border-green-100">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium text-gray-900">+{entry.quantity} unidades</p>
                    <span className="text-xs text-gray-500">{formatDate(entry.date)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{entry.responsible}</p>
                  {entry.notes && <p className="text-xs text-gray-500 mt-1">{entry.notes}</p>}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No hay entradas registradas</p>
            )}
          </div>
        </div>

        {/* Últimas Salidas */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Últimas Salidas</h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {productExits.length > 0 ? (
              productExits.slice(0, 3).map(exit => (
                <div key={exit.id} className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <div className="flex items-start justify-between mb-1">
                    <p className="font-medium text-gray-900">-{exit.quantity} unidades</p>
                    <span className="text-xs text-gray-500">{formatDate(exit.date)}</span>
                  </div>
                  <p className="text-sm text-gray-600">{exit.destination}</p>
                  {exit.notes && <p className="text-xs text-gray-500 mt-1">{exit.notes}</p>}
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">No hay salidas registradas</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
