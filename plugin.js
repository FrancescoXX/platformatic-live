/// <reference path="./global.d.ts" />
'use strict'

/** @param {import('fastify').FastifyInstance} app */
module.exports = async function (app) {
  app.get('/hello', async (request, reply) => {
    return { hello: 'world' }
  })

  app.get('/titles', async (request, reply) => {
    // const movies = await app.platformatic.entities.movie.find();
    const {db, sql} = app.platformatic;
    
    const movies = await db.query(sql`
      SELECT * FROM movies`
    );

    return movies.map(movie => movie.title);
  })

  app.graphql.extendSchema(`
    extend type Query {
      hello: String
    }`)

  app.graphql.defineResolvers({
    Query: {
      hello: () => 'world'
    }
  })
}
