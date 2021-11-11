import { Application } from "express";
import { UserController } from "./student.controller";

export class UserRoute {
  private userController: UserController = new UserController();

  public route(app: Application) {
    app.route('/v1/users')
      .get(this.userController.getAllUsers);
  }
}