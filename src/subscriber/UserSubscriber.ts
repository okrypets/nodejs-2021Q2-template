import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { Injectable } from "@nestjs/common"
import { User } from '../entities/User.entity';
import { getHashPassword } from "../helpers/hashHelpers";

@EventSubscriber()
@Injectable()
export class UserSubscriber implements EntitySubscriberInterface<User> {

  listenTo() {
    return User;
  }

  async hashPassword(entity: User): Promise<void> {
      if (entity.password) {
        entity.password = await getHashPassword(entity.password);
      }
  }

  beforeInsert(event: InsertEvent<User>): Promise<void> {
    return this.hashPassword(event.entity);
  }

  async beforeUpdate({ entity, databaseEntity }: UpdateEvent<User>): Promise<void> {
    if (entity.password !== databaseEntity?.password) {
      await this.hashPassword(entity);
    }
  }
}
