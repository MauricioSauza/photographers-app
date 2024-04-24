import { BadRequestException, HttpStatus, Injectable, NotFoundException, Param, ParseUUIDPipe } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 ),
      });
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
      throw new NotFoundException(`User with id ${userId} doesn't exists`);
    }
    
    return user;
  }
  
  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      userId: id,
      ...updateUserDto
    });

    if (!user) {
      throw new NotFoundException(`Uawe with id ${id} doesn't exists`);
    }

    try {
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new BadRequestException({
        status: HttpStatus.BAD_REQUEST,
        error: error.detail,
      })
    }
  }

  async remove(userId: string) {
    const user = await this.findOne(userId);
    await this.userRepository.remove(user);

    return user;
  }
}
