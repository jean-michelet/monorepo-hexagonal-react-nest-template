import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

import { UserEntity } from "./user.entity";
import type { ITask } from "../../../../tasks/models/task";

@Entity("tasks")
export class TaskEntity implements ITask {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column({ default: false })
  isCompleted!: boolean;

  @ManyToOne(() => UserEntity, (user) => user.assignedTasks, {
    nullable: true,
    onDelete: "SET NULL",
  })
  assignedUser?: UserEntity | null;
}
