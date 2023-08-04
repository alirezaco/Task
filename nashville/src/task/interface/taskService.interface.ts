import { Observable } from 'rxjs';
import { CreateTaskDto } from '../dto/create-task.dto';
import { ByIdDto } from 'src/shared/dto/by-id.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { FilterTaskDto } from '../dto/filter-task.dto';

export interface TaskService {
  create(createTaskDto: CreateTaskDto): Observable<any>;
  findOne(data: ByIdDto): Observable<any>;
  update(updateTaskDto: UpdateTaskDto & { id: string }): Observable<any>;
  remove(data: ByIdDto): Observable<any>;
  findAll(data: FilterTaskDto): Observable<any>;
}
