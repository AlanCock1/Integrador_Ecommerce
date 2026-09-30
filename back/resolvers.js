import { dbRepo } from './db.js';

export const resolvers = {
  Query: {
    productos: (_, { categoriaId, busqueda, limite, desde }) => {
      return dbRepo.getProductos({ categoriaId, busqueda, limite, desde });
    },
    producto: (_, { id }) => {
      return dbRepo.getProductoById(id);
    },
    categorias: () => {
      return dbRepo.getCategorias();
    },
    categoria: (_, { id }) => {
      return dbRepo.getCategoriaById(id);
    },
    usuarios: () => {
      return dbRepo.getUsuarios();
    },
    usuario: (_, { id }) => {
      return dbRepo.getUsuarioById(id);
    },
    pedidos: () => {
      return dbRepo.getPedidos();
    },
    pedido: (_, { id }) => {
      return dbRepo.getPedidoById(id);
    }
  },

  Producto: {
    categoria: (parent) => {
      return dbRepo.getCategoriaById(parent.categoriaId);
    }
  },

  Categoria: {
    productos: (parent) => {
      return dbRepo.getProductosByCategoriaId(parent.id);
    }
  },

  Usuario: {
    pedidos: (parent) => {
      return dbRepo.getPedidosByUsuarioId(parent.id);
    }
  },

  Pedido: {
    usuario: (parent) => {
      if (!parent.usuarioId) return null;
      return dbRepo.getUsuarioById(parent.usuarioId);
    },
    detalles: (parent) => {
      return dbRepo.getDetallesByPedidoId(parent.id);
    }
  },

  DetallePedido: {
    producto: (parent) => {
      return dbRepo.getProductoById(parent.productoId);
    }
  },

  Mutation: {
    crearProducto: (_, { datos }) => {
      return dbRepo.crearProducto(datos);
    },
    actualizarProducto: (_, { id, datos }) => {
      return dbRepo.actualizarProducto(id, datos);
    },
    eliminarProducto: (_, { id }) => {
      return dbRepo.eliminarProducto(id);
    },
    crearPedido: (_, { datos }) => {
      return dbRepo.crearPedido(datos);
    },
    actualizarEstadoPedido: (_, { id, status }) => {
      return dbRepo.actualizarEstadoPedido(id, status);
    }
  }
};
