import * as express from 'express';
import teamsRouter from './api/routes/teamsRoutes';
import usersRouter from './api/routes/userRoutes';
import ErrorHandler from './api/middlewares/ErrorHandler';
import matchesRouter from './api/routes/matchesRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    // this.initRoutes();
    // this.initMiddlewares();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use(teamsRouter);
    this.app.use(usersRouter);
    this.app.use(matchesRouter);
    this.app.use(ErrorHandler.handle);
  }

  // private initRoutes(): void {
  //   this.app.use(teamsRouter);
  //   this.app.use(usersRouter);
  // }

  // private initMiddlewares() {
  //   this.app.use(ErrorHandler.handle);
  // }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
