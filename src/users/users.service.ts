import { User } from '../entities/User.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskService } from '../tasks/tasks.service';

export class UserService {
  constructor(
    private readonly taskRepositary: TaskService,
    @InjectRepository(User)
    private readonly userRepositary: Repository<User>,
  ){}

  getAll = async (): Promise<User[]> => this.userRepositary.find();

  get = async (id: string): Promise<User | null> => {
    const user = await this.userRepositary.findOne(id);
    if (user === undefined) return null;
    return user
  };

  getByLogin = async (login: string): Promise<User|null> => {
    const user = await this.userRepositary.findOne({where: { login: login }})
    if (user === undefined) return null;
    return user
  }

  create = async (data: User): Promise<User> => {
    const newUser = this.userRepositary.create(data);
    const savedUser = await this.userRepositary.save(newUser);
    return savedUser;
  }

  deleteUser = async (id: string): Promise<number> => {
    const res = await this.userRepositary.findOne(id)
    if (res === undefined || id === undefined) return -1;
    await this.taskRepositary.update(id, { userId: null });
    const user = await this.userRepositary.delete(id);
    if (user.affected) {
        return 1;
    };
    return -1 
  }

  update = async (id: string, data: User): Promise<User | null> => {
    const user = this.userRepositary.findOne(id);
    if (user === undefined) return null;
    const updatedUser = await this.userRepositary.update(id, data);
    return updatedUser.raw
  }
}