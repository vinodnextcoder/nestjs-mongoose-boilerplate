import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Res, UseFilters, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { sendResponse } from '../utils';
import {statusMessage} from '../constant/statusMessage'
import { HttpExceptionFilter } from '../utils/http-exception.filter';
import { responseData, userData } from '../interface/common';
import { AuthGuard } from '../common/guards/at.guard';
import { ApiResponse } from '@nestjs/swagger';



@Controller("v1/users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createCatDto: CreateUserDto, @Res() res: Response):Promise<responseData> {
      const user = await this.userService.create(createCatDto);
      return sendResponse(res,HttpStatus.CREATED,statusMessage[HttpStatus.CREATED],true,user);
  }
  
// get user
@ApiResponse({ status: 200, description: 'The record has been successfully fetch.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
  @UseGuards(AuthGuard)
  @Get()
  @UseFilters(new HttpExceptionFilter())
  async findAll(): Promise<userData[]> {
    return this.userService.findAll();
  }

}

