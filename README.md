# BiblioTech Store — E-Commerce de Libros (Proyecto Integrador Dual)

Plataforma full-stack de comercio electrónico especializada en libros, con **Arquitectura Dual de Backend** que permite ejecutar la API tanto en **Node.js (Apollo Server v4)** como en **Python (FastAPI + Strawberry GraphQL)** sobre una base de datos relacional **SQLite (`ecommerce.db`)**, consumida por una Single Page Application en **React 18** con **Zustand**.

---

## Información del Proyecto

- **Institución:** Centro de Enseñanza Técnica Industrial (CETI)
- **Materia:** Programación Web II / Proyecto Integrador de Desarrollo de Software I
- **Docente:** Villavicencio Cruz Octavio
- **Equipo de Desarrollo:**
  - Reyes González Héctor Emiliano (Registro: 23100134)
  - Covarrubias Alvarez Hugo Emmanuel (Registro: 23100080)
  - Pérez Velázquez Rafael (Registro: 22100165)
  - Yáñez Rodríguez Alan Omar (Registro: 22300896)
- **Fecha:** Septiembre de 2026

---

## Arquitectura del Sistema

```text
Integrador Web/
├── package.json               # Scripts de orquestación (npm run dev:...)
├── README.md                  # Este documento
├── Guia_Exposicion_BiblioTech_ECommerce.docx  # Guía de defensa para el docente
├── db.sql                     # Script SQL semilla (15 libros, 5 categorías)
├── back/                      # BACKEND 1: Node.js + Apollo Server v4 (Puerto 4000)
│   ├── index.js               # Servidor Apollo Server standalone
│   ├── schema.js              # SDL de tipos, consultas y mutaciones
│   ├── resolvers.js           # Resolvers y mapeo relacional
│   ├── db.js                  # Conexión nativa node:sqlite
│   └── ecommerce.db           # Base de datos SQLite compartida
├── back-python/               # BACKEND 2: Python + FastAPI + Strawberry GraphQL (Puerto 8000)
│   ├── app/
│   │   ├── main.py            # FastAPI + CORS + GraphQLRouter (/graphql)
│   │   ├── database.py        # SQLAlchemy con soporte SQLite (ecommerce.db) y PostgreSQL
│   │   ├── models.py          # Modelos ORM (Categoria, Producto, Usuario, Pedido)
│   │   └── schema.py          # Strawberry Schema SDL compatible con el frontend
│   └── requirements.txt       # fastapi, uvicorn, strawberry-graphql, sqlalchemy
├── front/                     # CLIENTE WEB: React 18 + Vite + Zustand (Puerto 5173)
│   ├── src/
│   │   ├── api/graphqlClient.js # Cliente HTTP conmutable (puerto 4000 u 8000)
│   │   ├── store/useCartStore.js# Store global de Zustand con cupones y localStorage
│   │   ├── components/        # Portales (Vista Rápida, Toasts), Skeletons, Glassmorphism
│   │   └── App.jsx            # Máquina de estados FSM sin URLs
│   └── .env.example           # Configuración de URL del backend
└── reportes/                  # Documentación académica formal
    ├── reporte-p2.md          # Reporte P2: React, FSM y Zustand
    ├── reporte-p6.md          # Reporte P6: Backend GraphQL, SDL y DER
    └── assets/                # Logotipo CETI y diagramas
```

---

## Puesta en Marcha (Instrucciones)

Abre terminales en la carpeta raíz `Integrador Web`:

### Paso 1: Elegir y arrancar un Backend (Node.js o Python)

* **Opción A — Backend en Node.js (Puerto 4000):**
  ```powershell
  npm run dev:back
  ```
  *GraphQL Sandbox:* `http://localhost:4000/`

* **Opción B — Backend en Python FastAPI (Puerto 8000):**
  ```powershell
  npm run dev:back-py
  ```
  *GraphQL Sandbox:* `http://127.0.0.1:8000/graphql`  
  *Swagger Docs:* `http://127.0.0.1:8000/docs`

---

### Paso 2: Iniciar el Frontend (React 18 + Vite)

En otra terminal:
```powershell
npm run dev:front
```
La tienda abrirá en: `http://localhost:5173/`

> **Nota para cambiar el backend al que apunta el frontend:**  
> Por defecto, el frontend apunta al backend de Node.js (`http://localhost:4000/`).  
> Si deseas que apunte al backend de Python, crea un archivo `.env` en la carpeta `front/` con:  
> `VITE_GRAPHQL_URL=http://127.0.0.1:8000/graphql`
