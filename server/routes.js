import examplesRouter from './core/modules/example/routes';
import authRouter from './core/modules/auth/routes';

export default function routes(app) {
  app.use('/example', examplesRouter);
  app.use('/api/users', authRouter);
}
