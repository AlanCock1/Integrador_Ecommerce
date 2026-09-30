import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import { initDB } from './db.js';

// Inicializar la base de datos relacional
initDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (formattedError, error) => {
    console.error('[GraphQL Error]', formattedError.message);
    return formattedError;
  }
});

const PORT = Number(process.env.PORT) || 4000;

const { url } = await startStandaloneServer(server, {
  listen: { port: PORT },
  context: async ({ req }) => ({   //Omg con esta línea el backend ya está preparado para recibir el Authorization header, para el que le toque la parte de mandar tokens.
    token: req.headers.authorization || ''  
  })
});

console.log(`
===========================================================
   SERVIDOR GRAPHQL INICIADO CON EXITO
   Endpoint GraphQL: ${url}
   E-commerce: BiblioTech Store (E-Commerce de Libros)
   Equipo de Desarrollo:
     - Reyes Gonzalez Hector Emiliano (23100134)
     - Covarrubias Alvarez Hugo Emmanuel (23100080)
     - Yañez Rodríguez Alan Omar (22300896)
     - Perez Velazquez Rafael (22100161)

   Docente: Villavicencio Cruz Octavio
   Proyecto: E-Commerce Integrado (React + Zustand + GraphQL + SQLite)
===========================================================
`);
