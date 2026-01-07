import { Injectable } from '@nestjs/common';

import { User } from './user.entity';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getByUsername(username: string): Promise<User | null> {
    return this.userRepository.getByUsername(username);
  }
}
