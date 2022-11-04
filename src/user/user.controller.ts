import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './jwt-auth.guard';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return { message: 'Usuario Registrado', user };
  }

  @Post('login')
  async login(@Body() userObjectLogin: CreateUserDto) {
    return this.userService.login(userObjectLogin);
  }

  // const user = await this.userService.findLogin({where: {email}});

  // if(!user)
  // {
  //    throw new BadRequestException('correo y/o contraseña incorrecta ');
  // }

  // if(!await bcrypt.compare(password, user.password))
  // {
  //   throw new BadRequestException('correo y/o contraseña incorrecta ');
  // }
  // const jwt = await this.jwtService.signAsync({id: user.id});

  // response.cookie('jwt', jwt, {httpOnly: true});
  // return {message: `Bienvenido ${user.name}`  };

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');
    return { message: 'Satisfactorio' };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    const user = await this.userService.findAll();
    return user;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const data = await this.userService.findOne(id);
    return { data };
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.userService.update(id, updateUserDto);
    return { message: 'Usuario Actualizado', data };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    const data = await this.userService.remove(id);
    return { message: 'Usuario Eliminado', data };
  }
}
