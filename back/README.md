# BiblioTech - Backend GraphQL & SQLite

Servidor GraphQL desarrollado con **Apollo Server 4** y **SQLite** (usando el motor integrado de Node.js) para la **Practica P2-6** de **Programacion Web II**.

## Caracteristicas
- **Endpoint unico**: `http://localhost:4000/` (o `/graphql`).
- **Base de datos real**: SQLite relacional (`ecommerce.db`) poblada desde `db.sql`.
- **Esquema SDL completo**: Entidades `Categoria`, `Producto`, `Usuario`, `Pedido` y `DetallePedido`.
- **Operaciones CRUD**: Consultas y mutaciones para productos y categorias.
- **Mutacion de Negocio `crearPedido`**: Valida existencias en tiempo real, descuenta stock de los libros y genera la orden en una transaccion atomica ACID.

## Instalacion y Ejecucion

```bash
# 1. Entrar al directorio
cd back

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor
npm start
```

El servidor estara disponible en `http://localhost:4000/`. Puedes abrirlo en tu navegador para interactuar con **Apollo Sandbox**.
