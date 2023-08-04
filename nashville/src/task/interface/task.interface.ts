export class Task {
  id: string;
  createAt: number;
  updateAt: number;
  title: string;
  description: string;
  ParentId?: Task;
}
