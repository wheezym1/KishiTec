/* KISHI TEC · datos de la tienda
   ============================================================
   EDITA AQUÍ: números de contacto y catálogo (precios y stock).
   Los precios deben ser iguales a los de tu Excel.
   ============================================================ */
const CONFIG = {
  nombre: 'KISHI TEC',
  eslogan: 'Eleva tu día',
  whatsapp: '51999999999',      // ← pon tu número con código de país, sin + ni espacios (ej. 51987654321)
  yape: '999 999 999',          // ← tu número de Yape
  plin: '999 999 999',          // ← tu número de Plin
  titular: 'KISHI TEC',         // ← nombre que aparece al pagar
  envioGratisDesde: 150,
  costoEnvio: 12
};

// stock = unidades disponibles (según tu plan de negocio: unidades por mes)
const PRODUCTS = [
  {
    "id": 1,
    "name": "Soporte para monitor",
    "category": "Setup",
    "price": 129,
    "stock": 8,
    "image": "img/p1.jpg",
    "badge": "",
    "rating": 4.5,
    "reviews": 24,
    "featured": 1,
    "description": "Elevador de escritorio en madera y metal negro. Libera espacio debajo del monitor y mejora tu postura. Soporta hasta 30 kg."
  },
  {
    "id": 2,
    "name": "Mousepad XL",
    "category": "Setup",
    "price": 79,
    "stock": 12,
    "image": "img/p2.jpg",
    "badge": "Nuevo",
    "rating": 5,
    "reviews": 32,
    "featured": 1,
    "description": "Superficie de tela suave con base antideslizante. Cubre teclado y mouse. Medidas 90 x 40 cm."
  },
  {
    "id": 3,
    "name": "Audífonos inalámbricos",
    "category": "Tecnología",
    "price": 159,
    "stock": 5,
    "image": "img/p3.jpg",
    "badge": "Nuevo",
    "rating": 4.5,
    "reviews": 18,
    "featured": 1,
    "description": "Over-ear con cancelación de ruido y hasta 30 horas de batería. Conexión Bluetooth 5.3 y cable de respaldo."
  },
  {
    "id": 4,
    "name": "Planner financiero",
    "category": "Finanzas",
    "price": 59,
    "stock": 14,
    "image": "img/p4.jpg",
    "badge": "",
    "rating": 4.5,
    "reviews": 27,
    "featured": 1,
    "description": "Cuaderno tapa dura para planificar ingresos, gastos y metas de ahorro mensuales. 160 páginas."
  },
  {
    "id": 5,
    "name": "Lámpara de escritorio LED",
    "category": "Setup",
    "price": 99,
    "stock": 8,
    "image": "img/p5.jpg",
    "badge": "",
    "rating": 4.5,
    "reviews": 15,
    "featured": 1,
    "description": "Luz cálida regulable en 3 intensidades, brazo articulado y base estable. Ideal para largas jornadas."
  },
  {
    "id": 6,
    "name": "Teclado mecánico compacto",
    "category": "Tecnología",
    "price": 249,
    "stock": 4,
    "image": "img/b1.jpg",
    "badge": "Nuevo",
    "rating": 4.8,
    "reviews": 9,
    "featured": 0,
    "description": "Formato 75% con switches lineales, retroiluminación y conexión inalámbrica o por cable."
  },
  {
    "id": 7,
    "name": "Funda para laptop 14\"",
    "category": "Accesorios",
    "price": 89,
    "stock": 8,
    "image": "img/b2.jpg",
    "badge": "",
    "rating": 4.4,
    "reviews": 11,
    "featured": 0,
    "description": "Funda acolchada repelente al agua con bolsillo frontal para cables y accesorios."
  },
  {
    "id": 8,
    "name": "Trading journal",
    "category": "Finanzas",
    "price": 69,
    "stock": 10,
    "image": "img/p4.jpg",
    "badge": "",
    "rating": 4.7,
    "reviews": 14,
    "featured": 0,
    "description": "Registra tus operaciones, emociones y resultados. Plantillas de análisis semanal incluidas."
  },
  {
    "id": 9,
    "name": "Agenda ejecutiva 2026",
    "category": "Trabajo",
    "price": 65,
    "stock": 8,
    "image": "img/p4.jpg",
    "badge": "",
    "rating": 4.3,
    "reviews": 8,
    "featured": 0,
    "description": "Agenda semanal con vista de objetivos, notas y calendario anual. Papel de 100 g/m²."
  },
  {
    "id": 10,
    "name": "Cuaderno de estudio",
    "category": "Estudio",
    "price": 39,
    "stock": 18,
    "image": "img/p4.jpg",
    "badge": "",
    "rating": 4.6,
    "reviews": 21,
    "featured": 0,
    "description": "Cuaderno punteado A5 con índice, numeración de páginas y marcador de cinta."
  },
  {
    "id": 11,
    "name": "Organizador de escritorio",
    "category": "Trabajo",
    "price": 74,
    "stock": 7,
    "image": "img/p1.jpg",
    "badge": "",
    "rating": 4.5,
    "reviews": 12,
    "featured": 0,
    "description": "Módulos en madera para lápices, notas, cargador y celular. Mantén tu escritorio ordenado."
  },
  {
    "id": 12,
    "name": "Hub USB-C 7 en 1",
    "category": "Accesorios",
    "price": 119,
    "stock": 6,
    "image": "img/b2.jpg",
    "badge": "",
    "rating": 4.4,
    "reviews": 16,
    "featured": 0,
    "description": "HDMI 4K, 3 puertos USB-A, lector SD y carga pass-through de 100 W."
  }
];
