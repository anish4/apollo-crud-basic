import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';

import { PostResolver } from './resolvers/PostResolver';

(async () => {
	const app = express();

	await createConnection();

	const schema = await buildSchema({
		resolvers: [PostResolver],
	});

	const apolloServer = new ApolloServer({
		schema,
	});
	apolloServer.applyMiddleware({ app });

	app.listen(5000, () => {
		console.log('server started ');
	});
})();
