import HomeRouter from './home.js';
import AddAccountRouter from './AddAccountRouter.js'
import YourAccountRouter from "./YourAccountRouter.js"
import UsersRouter from "./UsersRouter.js"
import DeleteAccountRouter from "./DeleteAccount.js"
import UpdateAccountRouter from "./UpdateAccountRouter.js"

const allRoutes = (app) => {
  app.use("/", HomeRouter);
  app.use("/add-account", AddAccountRouter)
  app.use("/your-accounts", YourAccountRouter)
  app.use("/users", UsersRouter)
  app.use("/delete-account", DeleteAccountRouter)
  app.use("/update-account", UpdateAccountRouter)
};

export default allRoutes;