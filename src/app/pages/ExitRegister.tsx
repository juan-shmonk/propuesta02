import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Save, ArrowUpFromLine } from "lucide-react";
import { products, users } from "../data/mockData";

const ExitRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productId: '',
    quantity: 0,
    destination: '',
    responsible: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para registrar la salida
    navigate('/salidas');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseFloat(value) || 0 : value
    }));
  };

  const selectedProduct = products.find(p => p.id === formData.productId);
  const hasInsufficientStock = selectedProduct && formData.quantity > selectedProduct.currentStock;

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/salidas')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a salidas
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Registrar Salida</h1>
        <p className="text-gray-600">Registra la salida de productos del almacén</p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
        <div className="space-y-6">
          {/* Sección: Información de Salida */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <ArrowUpFromLine className="w-5 h-5" />
              Información de Salida
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label htmlFor="productId" className="block text-sm font-medium text-gray-700 mb-2">
                  Producto <span className="text-red-500">*</span>
                </label>
                <select
                  id="productId"
                  name="productId"
                  value={formData.productId}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Selecciona un producto</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.sku} - {product.name} (Stock: {product.currentStock})
                    </option>
                  ))}
                </select>
              </div>

              {selectedProduct && (
                <div className="md:col-span-2 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-blue-600 mb-1">Stock Actual</p>
                      <p className="font-semibold text-gray-900">{selectedProduct.currentStock} uds</p>
                    </div>
                    <div>
                      <p className="text-blue-600 mb-1">Stock Mínimo</p>
                      <p className="font-semibold text-gray-900">{selectedProduct.minStock} uds</p>
                    </div>
                    <div>
                      <p className="text-blue-600 mb-1">Categoría</p>
                      <p className="font-semibold text-gray-900">{selectedProduct.category}</p>
                    </div>
                    <div>
                      <p className="text-blue-600 mb-1">Precio</p>
                      <p className="font-semibold text-gray-900">${selectedProduct.price.toLocaleString('es-MX')}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity || ''}
                  onChange={handleChange}
                  min="1"
                  max={selectedProduct?.currentStock}
                  placeholder="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
                {hasInsufficientStock && (
                  <p className="text-sm text-red-600 mt-1">
                    ⚠️ La cantidad excede el stock disponible
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                  Destino <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="Ej: Sucursal Norte, Cliente XYZ..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="responsible" className="block text-sm font-medium text-gray-700 mb-2">
                  Responsable <span className="text-red-500">*</span>
                </label>
                <select
                  id="responsible"
                  name="responsible"
                  value={formData.responsible}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Selecciona un responsable</option>
                  {users.map(user => (
                    <option key={user} value={user}>{user}</option>
                  ))}
                </select>
              </div>

              <div className="md:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Observaciones
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Notas adicionales sobre esta salida..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Vista previa */}
          {formData.productId && formData.quantity > 0 && !hasInsufficientStock && (
            <>
              <div className="border-t border-gray-200"></div>
              <div className="bg-orange-50 rounded-lg p-6 border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-3">Resumen de la Salida</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Producto:</span>
                    <span className="font-medium text-gray-900">{selectedProduct?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cantidad a retirar:</span>
                    <span className="font-semibold text-orange-700">-{formData.quantity} unidades</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stock actual:</span>
                    <span className="font-medium text-gray-900">{selectedProduct?.currentStock} unidades</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-orange-200">
                    <span className="text-gray-600">Nuevo stock:</span>
                    <span className="font-bold text-gray-900">
                      {(selectedProduct?.currentStock || 0) - formData.quantity} unidades
                    </span>
                  </div>
                  {selectedProduct && ((selectedProduct.currentStock - formData.quantity) <= selectedProduct.minStock) && (
                    <div className="pt-2 border-t border-orange-200">
                      <p className="text-sm text-orange-700 font-medium">
                        ⚠️ El nuevo stock estará en o por debajo del stock mínimo
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Botones */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/salidas')}
              className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={hasInsufficientStock}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium shadow-md hover:shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              Registrar Salida
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExitRegister;
