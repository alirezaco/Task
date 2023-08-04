import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', width: 11, nullable: true, readonly: true })
  createAt: number;

  @Column({ type: 'int', width: 11, nullable: true })
  updateAt: number;

  @BeforeUpdate()
  setUpdatedAt() {
    this.updateAt = Math.floor(Date.now() / 1000);
  }

  @BeforeInsert()
  setCreatedAt() {
    this.createAt = Math.floor(Date.now() / 1000);
    this.updateAt = Math.floor(Date.now() / 1000);
  }
}
