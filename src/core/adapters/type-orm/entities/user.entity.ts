import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

import { TaskEntity } from "./task.entity";
import type { IUser } from "../../../../users/models/user";

@Entity("users")
export class UserEntity implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => TaskEntity, (task) => task.assignedUser)
  assignedTasks?: TaskEntity[];
}
