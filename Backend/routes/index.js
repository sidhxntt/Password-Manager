import HomeRouter from './home.js';
import AddAccountRouter from './AddAccountRouter.js'
import YourAccountRouter from "./YourAccountRouter.js"

const allRoutes = (app) => {
  app.use("/", HomeRouter);
  app.use("/add-account", AddAccountRouter)
  app.use("/your-accounts", YourAccountRouter)
};

export default allRoutes;