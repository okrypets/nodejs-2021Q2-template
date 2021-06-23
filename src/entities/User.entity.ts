import {Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export interface IUser {
    id: string;
    name: string;
    login: string;
    password: string;
  }

@Entity({name: "User"})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string | undefined;

  @Column('varchar', {length: 35, nullable: true})
  name = 'USER';

  @Column('varchar', {length: 35, nullable: true})
  login = 'user';

  @Column('varchar', {length: 500, select: false, nullable: false})
  password: string | undefined;
}