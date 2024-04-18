import { BadRequestException, HttpStatus, Injectable, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.userRepository.create(createUserDto);
      await this.userRepository.save(user);
      return user;
    } catch(error) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: error.detail,
      })
    }
  }

  async findAll() {
    const user = this.userRepository.find();
    return await user;
  }

  async findOne(userId: string) {
    const user = await this.userRepository.findOneBy({userId});
      if (!user) {
        throw new NotFoundException(`User with id ${userId} doesn't exists`)
      }

      return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
