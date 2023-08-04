import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ByIdDto } from 'src/shared/dto/by-id.dto';
import { Task } from './entities/task.entity';
import { FilterTaskDto } from './dto/filter-task.dto';

@Controller()
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @GrpcMethod('TaskService')
  async create(createTaskDto: CreateTaskDto) {
    let parent: Task | null = null;
    if (createTaskDto.ParentId) {
      parent = await this.taskService.findOne(createTaskDto.ParentId);
    }
    return this.taskService.create(createTaskDto, parent);
  }

  @GrpcMethod('TaskService')
  async findAll(filtertaskDto: FilterTaskDto) {
    const [data, count] = await this.taskService.findAll(filtertaskDto);

    return { data, count };
  }

  @GrpcMethod('TaskService')
  findOne({ id }: ByIdDto) {
    console.log(id);

    return this.taskService.findOne(id);
  }

  @GrpcMethod('TaskService')
  async update(updateTaskDto: UpdateTaskDto) {
    const task = await this.taskService.findOne(updateTaskDto.id);

    let parent: Task | null = null;
    if (updateTaskDto.ParentId) {
      parent = await this.taskService.findOne(updateTaskDto.ParentId);
    }

    return this.taskService.update(task, updateTaskDto, parent);
  }

  @GrpcMethod('TaskService')
  async remove({ id }: ByIdDto) {
    const task = await this.taskService.findOne(id);

    await this.taskService.remove(task);
    return task;
  }
}
