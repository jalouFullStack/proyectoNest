import { Column } from 'typeorm/browser/decorator/columns/Column.js';
import { PrimaryGeneratedColumn } from 'typeorm/browser/decorator/columns/PrimaryGeneratedColumn.js';
import { Entity } from 'typeorm/browser/decorator/entity/Entity.js';

export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  name!: string;
  @Column()
  email!: string;
  @Column()
  password!: string;
}
