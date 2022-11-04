import { Injectable, BadRequestException, NotFoundException  } from '@nestjs/common';
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

  async findAll() {
    const user = await this.usersRepository.find();
     
    return user;
  }
  async findLogin(condition: any) : Promise<User>
{
  return this.usersRepository.findOne(condition);
}

    async findOne(id: number) {
      const user = await this.usersRepository.findOne({where : {id}});
      if(!user)
      throw new NotFoundException('El usuario no existe');
      return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
      const user = await this.findOne(id);
      const editUser = Object.assign(user, {...updateUserDto})
      return await this.usersRepository.save(editUser);
      
    }

    async remove(id: number) {
      const user = await this.findOne(id);
      return await this.usersRepository.remove(user);
     }
}
