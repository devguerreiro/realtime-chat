import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { AppDataSource } from '@/data-source';

import { User } from './user.entity';

@Injectable()
export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  getByUsername(username: string): Promise<User | null> {
    return this.repository.findOneBy({
      username,
    });
  }
}
