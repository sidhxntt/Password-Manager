import HomeRouter from './home.js';
import AddAccountRouter from './AddAccountRouter.js'

const allRoutes = (app) => {
  app.use("/", HomeRouter);
  app.use("/add-account", AddAccountRouter)
};

export default allRoutes;