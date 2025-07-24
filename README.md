# Proyecto Gestor medigroup

Este proyecto es una aplicación web que permite a los usuarios gestionar los medicamentos, desde ver el listado de medicamentos existentes, agregar,editar, y eliminar registros

---

## 🚀 Tecnologías utilizadas

**Frontend:**

- Next js
- Javascript
- Tailwind

**Backend:**

- Next Api


---

## 📁 Estructura del proyecto

MEDIGROUP_INVENTARIO_V2/
├── src/                       # Código fuente principal
│   ├── components/            # Componentes reutilizables 
│   ├── App/                   # Páginas principales del proyecto
│   │   └── api/               # Rutas API (Next.js API Routes)
│
├── prisma/                   # Archivos de esquema de base de datos Prisma
│   └── schema.prisma         # Definición del modelo de datos
│
├── query.sql                 # Script SQL de creación de base de datos y tablas



## Intrucciones para ejecutar el proyecto


### Requisitos

- [Node.js] v24.4
- [npm] 11.4.2

### 1. Clonar repositorio

    bash
    git clone https://github.com/carlos-283/medigroupV2.git

### 2. Instalar dependencias 

    npm install

### 3. Añadir variables de ambiente 

    Crear un archivo .env en la carpeta raiz y agregar la siguiente variable
    
    DATABASE_URL="sqlserver://localhost;database=medigroup;user=abc;password=123;trustServerCertificate=true;"

### 3. Crear base de datos

    ejecutar archivo query.sql almacenado en la carpeta raiz

### 3. Corre proyecto localmente

    npm run dev

### 3. Ingresa al sitio

   http://localhost:3000/medicamentos

