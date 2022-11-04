import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return{message: 'Usuario Registrado' , user};
  }

  @Get()
  async findAll() {
    const data =  await this.userService.findAll();
    return {data};
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.userService.findOne(id);
    return {data};
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.userService.update(id, updateUserDto);
   return {message: 'Usuario Actualizado', data};
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.userService.remove(id);
    return {message: 'Usuario Eliminado', data};
  }
}
