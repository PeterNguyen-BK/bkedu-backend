import { Application } from 'express';
import mongoose from 'mongoose';
import { UserController } from './student.controller';

export class UserRoute {
  private userController: UserController = new UserController();

  public route(app: Application) {
    app.route('/v1/students').get(this.userController.getAllStudents).post(this.userController.createStudent);
    app
      .route('/v1/students/:id')
      .get(this.userController.getStudent)
      .put(this.userController.updateStudent)
      .delete(this.userController.deleteStudent);
  }
}
