import { IUpdateTask } from "@avicenne/shared/tasks";
import { IsOptional, IsBoolean, IsString } from "class-validator";

export class UpdateTaskDto implements IUpdateTask {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @IsOptional()
  @IsString()
  assigneeId?: string;
}
