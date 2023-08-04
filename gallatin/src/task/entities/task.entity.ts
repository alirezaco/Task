import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'Task' })
export class Task extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  title: string;

  @Column({ type: 'varchar', length: 300 })
  description: string;

  @OneToOne((_) => Task)
  @JoinColumn()
  ParentId?: Task;
}
