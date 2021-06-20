import { v4 } from 'uuid';
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export interface IUser {
  id: string;
  name: string;
  login: string;
  password?: string;
  update: (data: IUpdateUserData) => void;
  toResponse?: (user: IUser) =>IUpdateUserData;  
}

export interface IUserDTO {
  id: string;
  name: string;
  login: string;
}

export interface IUpdateUserData {
  name?: string,
  login?: string,
  password?: string,
}

export interface IUserDTO {
  id: string;
  name: string,
  login: string,
}

/**
 * Class creates an User.
 * @class
 */
@Entity({name: "user"})
class User {  
  @PrimaryGeneratedColumn("increment")
  readonly id: string;
  @Column("varchar", {length: 25})
  name: string;
  @Column("varchar", {length: 25})
  login: string;
  @Column("varchar", {length: 25})
  password: string;

  /**
   * Constuctor of class User
   * @constructor
   * @typedef {{name: string, login: string, password: string}} user
   * @param {object.<string, user>} object with User data
   */
  constructor({
    id = v4(),
    name = 'USER',
    login = 'user',
    password = 'P@55w0rd',
  }: IUser) {
    this.id = id;
    this.name = name;
    this.login = login;
    this.password = password;
  }

  /**
   * This static method return User instance without password
   * @param {User} user User instance
   * @returns {User} User without password
   */
  static toResponse(user: IUser): IUserDTO {
    const { id, name, login } = user;
    return { id, name, login };
  }

  /**
   * This method update User data with new data.
   * @param {object.<string, user>} newdata object with keys and value to update User data by keys
   */
  update(newdata: IUpdateUserData): void {
    if (newdata.name) this.name = newdata.name;
    if (newdata.login) this.login = newdata.login;
    if (newdata.password) this.password = newdata.password;
  }
}

export default User;
