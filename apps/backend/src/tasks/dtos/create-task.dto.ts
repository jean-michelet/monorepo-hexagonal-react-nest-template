import { ICreateTask } from "@avicenne/shared/tasks";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto implements ICreateTask {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsOptional()
  @IsString()
  assigneeId?: string;
}
