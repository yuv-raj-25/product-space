import { Task } from "./Task";
import { User } from "./User";

User.hasMany(Task, {
  foreignKey: "userId",
  as: "tasks",
});

Task.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export { User, Task };

