import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleInit,
  UseFilters,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskService } from './interface/taskService.interface';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ByIdDto } from 'src/shared/dto/by-id.dto';
import { FilterTaskDto } from './dto/filter-task.dto';
import { RpcExceptionFilter } from 'src/shared/filter/rpc-exception.filter';
import { handleRpcError } from 'src/shared/utils/handle-rpc-error';
import { lastValueFrom } from 'rxjs';
import {
  SuccessPaginationResponse,
  SuccessResponse,
} from 'src/shared/dto/response/response.dto';
import { TaskDto } from './dto/response/task.dto';

@UseFilters(RpcExceptionFilter)
@Controller('task')
export class TaskController implements OnModuleInit {
  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'task',
      protoPath: join(__dirname, './task.proto'),
      url: '127.0.0.1:50051',
    },
  })
  client: ClientGrpc;

  private taskService: TaskService;

  onModuleInit() {
    this.taskService = this.client.getService<TaskService>('TaskService');
  }

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    return new SuccessResponse(
      new TaskDto(
        (await lastValueFrom(
          this.taskService.create(createTaskDto).pipe(handleRpcError()),
        )) as any,
      ),
    );
  }

  @Post('/list')
  async findAll(@Body() filterTaskDto: FilterTaskDto) {
    const { data, count } = (await lastValueFrom(
      this.taskService.findAll(filterTaskDto).pipe(handleRpcError()),
    )) as any;

    return new SuccessPaginationResponse(
      data ? data.map((x) => new TaskDto(x)) : [],
      filterTaskDto.pagination,
      count,
    );
  }

  @Get(':id')
  async findOne(@Param() id: ByIdDto) {
    return new SuccessResponse(
      new TaskDto(
        (await lastValueFrom(
          this.taskService.findOne(id).pipe(handleRpcError()),
        )) as any,
      ),
    );
  }

  @Patch(':id')
  async update(@Param() { id }: ByIdDto, @Body() updateTaskDto: UpdateTaskDto) {
    return new SuccessResponse(
      new TaskDto(
        (await lastValueFrom(
          this.taskService
            .update({ ...updateTaskDto, id })
            .pipe(handleRpcError()),
        )) as any,
      ),
    );
  }

  @Delete(':id')
  async remove(@Param() id: ByIdDto) {
    return new SuccessResponse(
      new TaskDto(
        (await lastValueFrom(
          this.taskService.remove(id).pipe(handleRpcError()),
        )) as any,
      ),
    );
  }
}
