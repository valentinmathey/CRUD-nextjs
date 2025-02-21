# 🚀 CRUD App con Next.js y MySQL
¡Bienvenido al repositorio de mi aplicación CRUD desarrollada con **Next.js** y **MySQL**! Esta aplicación permite gestionar productos de manera eficiente con operaciones básicas de creación, lectura, actualización y eliminación.

## 💫 Objetivo
El objetivo de este proyecto es implementar un sistema CRUD completo utilizando **Next.js** como framework principal y **MySQL** como base de datos. La aplicación demuestra buenas prácticas de desarrollo y una arquitectura moderna de aplicaciones web.

## ✨ Características
- **Operaciones CRUD completas para productos:**
  - Listar productos existentes
  - Agregar nuevos productos
  - Editar productos existentes
  - Eliminar productos
- **Interfaz de usuario intuitiva con componentes reutilizables**
- **Pantallas de carga para mejor experiencia de usuario**
- **API integrada en Next.js**
- **Persistencia de datos con MySQL**

## 🛠️ Instalación

```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]

# Instalar dependencias
npm install

# Configurar variables de entorno
# Crear archivo .env.local con las siguientes variables:
DATABASE_URL="mysql://usuario:contraseña@localhost:3306/nombre_db"

# Iniciar el servidor de desarrollo
npm run dev
```

## 📦 Estructura del Proyecto
```
/
├── public/          # Archivos estáticos
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── products/
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   ├── products/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   ├── edit/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   └── new/
│   │   │       └── page.tsx
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductDetail.tsx
│   │   │   ├── ProductEditForm.tsx
│   │   │   ├── ProductForm.tsx
│   │   │   └── ProductList.tsx
│   │   ├── libs/
│   │   │   └── db.js
│   │   ├── globals.css
│   │   └── layout.tsx
```

## 🚀 Rutas de la Aplicación

### API Endpoints
```
GET    /api/products     # Obtener todos los productos
GET    /api/products/id  # Obtener un producto específico
POST   /api/products     # Crear nuevo producto
PUT    /api/products/id  # Actualizar producto existente
DELETE /api/products/id  # Eliminar producto
```

### Páginas Frontend
```
/products            # Página principal (lista de productos)
/products/new        # Crear nuevo producto
/products/edit/[id]  # Editar producto existente
/products/[id]       # Ver detalles del producto
```

## 🔧 Tecnologías Utilizadas
<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" height="40" alt="nextjs logo" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" height="40" alt="mysql logo" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" height="40" alt="typescript logo" />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo" />
  <img width="12" />
  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Tailwind_CSS_Logo.svg/512px-Tailwind_CSS_Logo.svg.png" height="40" alt="tailwindcss logo" />
</div>


# 🧑🏻‍💻 Autor:

Valentin Mathey | <a href="https://github.com/valentinmathey">@valentinmathey</a>

[![Discord](https://img.shields.io/badge/Discord-%237289DA.svg?logo=discord&logoColor=white)](https://discord.gg/valentinmathey) [![Facebook](https://img.shields.io/badge/Facebook-%231877F2.svg?logo=Facebook&logoColor=white)](https://facebook.com/ValentinEzequielMathey) [![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://instagram.com/valen.mathey/) [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/valentin-mathey) [![X](https://img.shields.io/badge/X-%231DA1F2.svg?logo=X&logoColor=white)](https://twitter.com/valen_mathey)
