import {Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export interface ITask {
    id: string;
    title: string;
    order: number;
    description: string;
    userId: string | null;
    boardId: string | null;
    columnId: string | null; 
  }

@Entity({name: "Task"})
export class Task extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column('varchar')
    title = 'base string';

    @Column('int')
    order=0;

    @Column('varchar')
    description = 'base description';

    @Column({type: 'text',
    nullable: true,})
    userId!: string | null;

    @Column('varchar', {nullable: true})
    columnId: string | null = null;

    @Column( {type: 'text', nullable: true})
    boardId!: string ;
}