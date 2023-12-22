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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('users')
@Controller("v1/users")
export class UserController {
  constructor(private readonly userService: UserService) {}
  
  @ApiOperation({
    summary: 'Create user',
    description: 'User signup app',
  })
  @ApiResponse({ 
    status: 200, 
    description: 'Success! Returns the data.',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 201 },
            isSuccess: { type: 'boolean', example: true},
            message: { type: 'string', example: 'Record Created' },
            data: { type: 'object', example: 'Record Created' }
          },
        },
        example: {
          "statusCode": 201,
          "isSuccess": true,
          "message": "Record Created",
          "data": {
              "username": "test username",
              "first_name": "pradip",
              "last_name": "patil",
              "email": "pradip@test.com",
              "email_code": "DAQJ1",
              "password": "4xeuIuIK3XGXHX3xtMBAM4uYeWlWsOg8RC",
              "password_reset_code": "122222",
              "createdAt": "2023-12-22T04:45:45.710Z",
              "updatedAt": "2023-12-22T04:45:45.710Z",
              "_id": "6585147f97b06"
          }
        },
      },
    },
  })
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

