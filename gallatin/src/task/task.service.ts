import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { FilterTaskDto } from './dto/filter-task.dto';
import { TaskMessageEnum } from './enum/message.enum';
import { MyExeption } from 'src/shared/exeption/my-exception';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, parent?: Task) {
    const newTask = this.taskRepository.create({
      ...createTaskDto,
      ParentId: parent,
    });
    await this.taskRepository.insert(newTask);

    return newTask;
  }

  findAll({ filter, pagination, sort }: FilterTaskDto) {
    const where: any = filter;
    if (filter.ParentId) {
      where.ParentId = { id: filter.ParentId };
    }

    const sortItems = {};
    sort.map((item) => {
      sortItems[item.field] = item.order;
    });

    return this.taskRepository.findAndCount({
      where,
      order: sortItems,
      take: pagination.limit,
      skip: (pagination.page - 1) * pagination.limit,
      relations: {
        ParentId: true,
      },
    });
  }

  async findOne(id: string) {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: { ParentId: true },
    });

    if (!task) {
      throw new MyExeption(new NotFoundException(TaskMessageEnum.NOT_FOUNT));
    }

    return task;
  }

  async update(task: Task, updateTaskDto: UpdateTaskDto, parent?: Task) {
    const newTask = this.taskRepository.create({
      ...task,
      ...updateTaskDto,
      ParentId: parent,
    });
    await this.taskRepository.save(newTask);
    return newTask;
  }

  remove(task: Task) {
    return this.taskRepository.remove(task);
  }
}
