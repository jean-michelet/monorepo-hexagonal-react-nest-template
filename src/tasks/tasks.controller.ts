import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";

import { AssignTaskDto } from "./dtos/assign-task.dto";
import { CreateTaskDto } from "./dtos/create-task.dto";
import { UpdateTaskDto } from "./dtos/update-task.dto";
import { TasksService } from "./tasks.service";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get(":id")
  async getTask(@Param("id") id: string) {
    return await this.tasksService.get(id);
  }

  @Get()
  async getIncompleteTasks() {
    return await this.tasksService.getIncompleteTasks();
  }

  @Post()
  async createTask(@Body() data: CreateTaskDto) {
    return await this.tasksService.create(data);
  }

  @Patch(":id")
  async updateTask(
    @Param("id") id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    await this.tasksService.update(id, updateTaskDto);
  }

  @Patch("assign/:id")
  async assignTask(
    @Param("id") id: string,
    @Body() assignTaskDto: AssignTaskDto,
  ) {
    await this.tasksService.assign(id, assignTaskDto.assigneeId);
  }

  @Patch("unassign/:id")
  async unassignTask(@Param("id") id: string) {
    await this.tasksService.unassign(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    await this.tasksService.delete(id);
  }
}
