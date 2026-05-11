export interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  price: number;
  supplier?: string;
  description?: string;
  lastUpdated: string;
}

export interface Entry {
  id: string;
  date: string;
  productId: string;
  productName: string;
  quantity: number;
  supplier?: string;
  responsible: string;
  notes?: string;
}

export interface Exit {
  id: string;
  date: string;
  productId: string;
  productName: string;
  quantity: number;
  destination: string;
  responsible: string;
  notes?: string;
}

export interface StockMovement {
  id: string;
  date: string;
  product: string;
  type: 'entry' | 'exit' | 'adjustment';
  quantity: number;
  responsible: string;
}

export const products: Product[] = [
  {
    id: '1',
    sku: 'LAP-001',
    name: 'Laptop Dell Inspiron 15',
    category: 'Electrónica',
    currentStock: 15,
    minStock: 5,
    price: 12500,
    supplier: 'Dell México',
    description: 'Laptop empresarial 15", Intel i5, 8GB RAM',
    lastUpdated: '2026-04-14',
  },
  {
    id: '2',
    sku: 'MOU-002',
    name: 'Mouse Logitech MX Master 3',
    category: 'Accesorios',
    currentStock: 3,
    minStock: 10,
    price: 850,
    supplier: 'Logitech',
    description: 'Mouse inalámbrico ergonómico',
    lastUpdated: '2026-04-15',
  },
  {
    id: '3',
    sku: 'TEC-003',
    name: 'Teclado Mecánico RGB',
    category: 'Accesorios',
    currentStock: 28,
    minStock: 8,
    price: 1200,
    supplier: 'HyperX',
    description: 'Teclado mecánico switches rojos',
    lastUpdated: '2026-04-12',
  },
  {
    id: '4',
    sku: 'MON-004',
    name: 'Monitor LG 27" 4K',
    category: 'Electrónica',
    currentStock: 8,
    minStock: 5,
    price: 6800,
    supplier: 'LG Electronics',
    description: 'Monitor 27 pulgadas resolución 4K',
    lastUpdated: '2026-04-13',
  },
  {
    id: '5',
    sku: 'AUD-005',
    name: 'Audífonos Sony WH-1000XM5',
    category: 'Audio',
    currentStock: 12,
    minStock: 6,
    price: 5200,
    supplier: 'Sony',
    description: 'Audífonos con cancelación de ruido',
    lastUpdated: '2026-04-16',
  },
  {
    id: '6',
    sku: 'CAM-006',
    name: 'Webcam Logitech C920',
    category: 'Accesorios',
    currentStock: 2,
    minStock: 5,
    price: 980,
    supplier: 'Logitech',
    description: 'Cámara web Full HD 1080p',
    lastUpdated: '2026-04-14',
  },
  {
    id: '7',
    sku: 'SSD-007',
    name: 'SSD Samsung 1TB',
    category: 'Almacenamiento',
    currentStock: 45,
    minStock: 15,
    price: 1850,
    supplier: 'Samsung',
    description: 'Disco sólido NVMe 1TB',
    lastUpdated: '2026-04-11',
  },
  {
    id: '8',
    sku: 'RAM-008',
    name: 'Memoria RAM 16GB DDR4',
    category: 'Componentes',
    currentStock: 32,
    minStock: 20,
    price: 1100,
    supplier: 'Kingston',
    description: 'Memoria RAM 16GB 3200MHz',
    lastUpdated: '2026-04-15',
  },
];

export const entries: Entry[] = [
  {
    id: 'E001',
    date: '2026-04-15T10:30:00',
    productId: '1',
    productName: 'Laptop Dell Inspiron 15',
    quantity: 10,
    supplier: 'Dell México',
    responsible: 'Juan Pérez',
    notes: 'Pedido mensual programado',
  },
  {
    id: 'E002',
    date: '2026-04-14T14:20:00',
    productId: '7',
    productName: 'SSD Samsung 1TB',
    quantity: 25,
    supplier: 'Samsung',
    responsible: 'María García',
    notes: 'Restock por demanda alta',
  },
  {
    id: 'E003',
    date: '2026-04-13T09:15:00',
    productId: '3',
    productName: 'Teclado Mecánico RGB',
    quantity: 15,
    supplier: 'HyperX',
    responsible: 'Carlos Ruiz',
  },
  {
    id: 'E004',
    date: '2026-04-12T11:45:00',
    productId: '5',
    productName: 'Audífonos Sony WH-1000XM5',
    quantity: 8,
    supplier: 'Sony',
    responsible: 'Juan Pérez',
  },
  {
    id: 'E005',
    date: '2026-04-11T16:00:00',
    productId: '8',
    productName: 'Memoria RAM 16GB DDR4',
    quantity: 30,
    supplier: 'Kingston',
    responsible: 'María García',
    notes: 'Promoción trimestral',
  },
];

export const exits: Exit[] = [
  {
    id: 'S001',
    date: '2026-04-16T08:30:00',
    productId: '1',
    productName: 'Laptop Dell Inspiron 15',
    quantity: 5,
    destination: 'Sucursal Norte',
    responsible: 'Ana López',
    notes: 'Equipamiento nuevo equipo',
  },
  {
    id: 'S002',
    date: '2026-04-15T13:45:00',
    productId: '3',
    productName: 'Teclado Mecánico RGB',
    quantity: 12,
    destination: 'Cliente Corporativo ABC',
    responsible: 'Carlos Ruiz',
  },
  {
    id: 'S003',
    date: '2026-04-14T10:20:00',
    productId: '7',
    productName: 'SSD Samsung 1TB',
    quantity: 8,
    destination: 'Sucursal Sur',
    responsible: 'Juan Pérez',
  },
  {
    id: 'S004',
    date: '2026-04-13T15:30:00',
    productId: '2',
    productName: 'Mouse Logitech MX Master 3',
    quantity: 7,
    destination: 'Oficina Central',
    responsible: 'María García',
    notes: 'Renovación equipos',
  },
  {
    id: 'S005',
    date: '2026-04-12T09:00:00',
    productId: '4',
    productName: 'Monitor LG 27" 4K',
    quantity: 4,
    destination: 'Cliente VIP',
    responsible: 'Ana López',
  },
];

export const categories = [
  'Electrónica',
  'Accesorios',
  'Audio',
  'Almacenamiento',
  'Componentes',
  'Periféricos',
  'Redes',
  'Software',
];

export const suppliers = [
  'Dell México',
  'Logitech',
  'HyperX',
  'LG Electronics',
  'Sony',
  'Samsung',
  'Kingston',
  'HP',
  'Lenovo',
  'Asus',
];

export const users = [
  'Juan Pérez',
  'María García',
  'Carlos Ruiz',
  'Ana López',
  'Roberto Sánchez',
];
