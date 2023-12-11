import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Res, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/user.schema';
import { Response } from 'express';
import { sendResponse } from '../utils';
import {statusMessage} from '../constant/statusMessage'
import { HttpExceptionFilter } from 'src/utils/http-exception.filter';
import { responseData } from 'src/interface/common';

@Controller("v1/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createCatDto: CreateUserDto, @Res() res: Response):Promise<responseData> {
      const user = await this.userService.create(createCatDto);
      return sendResponse(res,HttpStatus.CREATED,statusMessage[HttpStatus.CREATED],true,user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    return this.userService.delete(id);
  }
}
