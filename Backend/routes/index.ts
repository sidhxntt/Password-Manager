import HomeRouter from "./home";
import AddAccountRouter from './AddAccountRouter'
import YourAccountRouter from "./YourAccountRouter"
import UsersRouter from "./UsersRouter"
import DeleteAccountRouter from "./DeleteAccount"
import UpdateAccountRouter from "./UpdateAccountRouter"
import { Application } from "express";

const allRoutes = (app: Application) => {
  app.use("/", HomeRouter);
  app.use("/add-account", AddAccountRouter)
  app.use("/your-accounts", YourAccountRouter)
  app.use("/users", UsersRouter)
  app.use("/delete-account", DeleteAccountRouter)
  app.use("/update-account", UpdateAccountRouter)
};

export default allRoutes;