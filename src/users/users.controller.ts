import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Res, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { sendResponse } from '../utils';
import {statusMessage} from '../constant/statusMessage'
import { HttpExceptionFilter } from '../utils/http-exception.filter';
import { responseData, userData } from '../interface/common';


@Public()
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
// get user
  @Get()
  async findAll(): Promise<userData[]> {
    return this.userService.findAll();
  }

}

