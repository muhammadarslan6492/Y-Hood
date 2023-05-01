import './config/env';
import Server from './config/server';
import routes from './routes';

const main = async () => {
  const server = new Server().router(routes);
  await server.setupSwagger();
  server.listen(process.env.PORT);
};

main();
