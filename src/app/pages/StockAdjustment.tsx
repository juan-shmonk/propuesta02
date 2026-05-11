import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Save, Sliders } from "lucide-react";
import { products, users } from "../data/mockData";

const StockAdjustment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    productId: '',
    adjustmentType: 'add',
    quantity: 0,
    reason: '',
    responsible: '',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para ajustar el stock
    navigate('/stock');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' ? parseFloat(value) || 0 : value
    }));
  };

  const selectedProduct = products.find(p => p.id === formData.productId);
  
  const newStock = selectedProduct ? (
    formData.adjustmentType === 'add' 
      ? selectedProduct.currentStock + formData.quantity
      : formData.adjustmentType === 'subtract'
      ? selectedProduct.currentStock - formData.quantity
      : formData.quantity
  ) : 0;

  const adjustmentReasons = [
    'Inventario físico',
    'Corrección por error',
    'Producto dañado',
    'Producto vencido',
    'Merma',
    'Donación',
    'Otro',
  ];

  return (
    <div className="p-4 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate('/stock')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver a stock
        </button>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ajuste de Stock</h1>
        <p className="text-gray-600">Realiza ajustes manuales al inventario</p>
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 p-6 lg:p-8">
        <div className="space-y-6">
          {/* Sección: Información del Ajuste */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Sliders className="w-5 h-5" />
              Información del Ajuste
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
                <label htmlFor="adjustmentType" className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Ajuste <span className="text-red-500">*</span>
                </label>
                <select
                  id="adjustmentType"
                  name="adjustmentType"
                  value={formData.adjustmentType}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="add">Sumar cantidad</option>
                  <option value="subtract">Restar cantidad</option>
                  <option value="set">Establecer cantidad exacta</option>
                </select>
              </div>

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
                  min="0"
                  placeholder="0"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                  Motivo del Ajuste <span className="text-red-500">*</span>
                </label>
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                >
                  <option value="">Selecciona un motivo</option>
                  {adjustmentReasons.map(reason => (
                    <option key={reason} value={reason}>{reason}</option>
                  ))}
                </select>
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
                  placeholder="Detalles adicionales sobre este ajuste..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Vista previa del ajuste */}
          {formData.productId && formData.quantity > 0 && (
            <>
              <div className="border-t border-gray-200"></div>
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-3">Resumen del Ajuste</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Producto:</span>
                    <span className="font-medium text-gray-900">{selectedProduct?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tipo de ajuste:</span>
                    <span className="font-medium text-gray-900">
                      {formData.adjustmentType === 'add' && 'Sumar cantidad'}
                      {formData.adjustmentType === 'subtract' && 'Restar cantidad'}
                      {formData.adjustmentType === 'set' && 'Establecer cantidad exacta'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cantidad del ajuste:</span>
                    <span className="font-semibold text-blue-700">
                      {formData.adjustmentType === 'add' && `+${formData.quantity}`}
                      {formData.adjustmentType === 'subtract' && `-${formData.quantity}`}
                      {formData.adjustmentType === 'set' && formData.quantity}
                      {' unidades'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Stock actual:</span>
                    <span className="font-medium text-gray-900">{selectedProduct?.currentStock} unidades</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-blue-200">
                    <span className="text-gray-600">Nuevo stock:</span>
                    <span className="font-bold text-gray-900">{newStock} unidades</span>
                  </div>
                  {selectedProduct && newStock <= selectedProduct.minStock && (
                    <div className="pt-2 border-t border-blue-200">
                      <p className="text-sm text-orange-700 font-medium">
                        ⚠️ El nuevo stock estará en o por debajo del stock mínimo
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Alerta de advertencia */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-800">Importante</p>
                <p className="text-sm text-yellow-700 mt-1">
                  Los ajustes manuales modifican directamente el stock. Asegúrate de que la información sea correcta antes de continuar.
                </p>
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate('/stock')}
              className="flex-1 sm:flex-none px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
            >
              <Save className="w-5 h-5" />
              Aplicar Ajuste
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StockAdjustment;
