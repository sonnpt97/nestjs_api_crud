import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { UserParams } from 'src/user/userparams';
import { UserDTO } from 'src/user/model/user.model';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async create(createUserDto: UserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: {
          profile: true,
      },
  });
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: {
        id: id,
      }
    })
  }

  async update(id: number, updateUserDto: UserDto): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    const updatedUser = this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async getUsersWithProfiles(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['profile'] });
  }
  async getUserById(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });

    return user;
}

createUser(user: UserParams): Promise<User> {
  const userCreate = this.usersRepository.create(user);
    return this.usersRepository.save(userCreate);
}
}
