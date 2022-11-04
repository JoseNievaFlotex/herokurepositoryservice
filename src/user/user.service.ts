import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) 
    private usersRepository: Repository<User>,
  ) {}

  async create(userDetail: CreateUserDto) {
    const userExist = await this.usersRepository.findOne({ where: {email: userDetail.email} });
    if(userExist) throw new BadRequestException("Ya existe un correo registrado");
    
   const newUser =  this.usersRepository.create(
    {
      ...userDetail
    }
   ) ;
   const user = await this.usersRepository.save(newUser);
   delete user.password;
   return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
