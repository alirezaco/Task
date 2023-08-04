import { BaseResponse } from 'src/shared/dto/response/base-response.dto';

export class TaskDto extends BaseResponse {
  ParentId?: TaskDto;
  title: string;
  description: string;

  constructor(initial: TaskDto) {
    super(initial);

    this.title = initial.title;
    this.description = initial.description;

    if (initial.ParentId) {
      this.ParentId = new TaskDto(initial.ParentId);
    }
  }
}
