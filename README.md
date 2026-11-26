# KISHI TEC · Tienda web (HTML estático)

Tienda en HTML, CSS y JavaScript puros. No necesita servidor ni base de datos:
funciona en **GitHub Pages**. El cliente arma su carrito y envía el pedido por **WhatsApp**.

## Qué editar
Todo está en `js/data.js`:
- `CONFIG`: tu número de WhatsApp (con 51, sin + ni espacios), Yape, Plin, envío gratis desde S/ 150 y costo de envío.
- `PRODUCTS`: nombre, precio, stock (`stock`), descripción e imagen de cada producto.

Para cambiar una foto, reemplaza el archivo en `img/` (o cambia la ruta `image`).

## Publicar en GitHub Pages
1. Sube TODO el contenido de esta carpeta a la raíz del repositorio.
2. En el repositorio: Settings → Pages → Source: "Deploy from a branch" → Branch `main` / `(root)` → Save.
3. En 1–2 minutos tu tienda queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.
   (Con cuenta gratuita el repositorio debe ser Public.)

## Estructura
```
index.html  tienda.html  producto.html  carrito.html  nosotros.html  contacto.html
css/style.css     estilos
js/data.js        configuración y catálogo  ← lo que editas
js/app.js         carrito, cabecera y pie
img/              fotos
```
