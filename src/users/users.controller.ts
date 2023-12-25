import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Public } from "../auth/decorators/public.decorator";
import { LoggerService } from '../common/service/logger.service';
import { UserService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Response } from "express";
import {
  sendResponse,
  userErrorResponse,
  userListSuccessResponse,
  userSuccessResponse,
} from "../utils";
import { statusMessage } from "../constant/statusMessage";
import { HttpExceptionFilter } from "../utils/http-exception.filter";
import { responseData, userData } from "../interface/common";
import { AuthGuard } from "../common/guards/at.guard";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller("v1/users")
export class UserController {
  constructor(private readonly userService: UserService,
    private readonly logger: LoggerService) {}

  @ApiOperation({
    summary: "Create user",
    description: "User signup app",
  })
  @ApiResponse(userSuccessResponse)
  @ApiResponse(userErrorResponse)
  @Public()
  @Post()
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(
    @Body() createCatDto: CreateUserDto,
    @Res() res: Response
  ): Promise<responseData> {
    this.logger.log('User creation api called');
    const user = await this.userService.create(createCatDto);
    return sendResponse(
      res,
      HttpStatus.CREATED,
      statusMessage[HttpStatus.CREATED],
      true,
      user
    );
  }

  // get user
  @ApiOperation({
    summary: "User List",
    description: "Get User List",
  })
  @ApiResponse(userListSuccessResponse)
  @ApiResponse({ status: 403, description: "Forbidden." })
  @UseGuards(AuthGuard)
  @Get()
  @UseFilters(new HttpExceptionFilter())
  async findAll(@Res() res: Response): Promise<userData[]> {
    this.logger.log('User list api called');
    const userList = await this.userService.findAll();
    return sendResponse(
      res,
      HttpStatus.OK,
      statusMessage[HttpStatus.OK],
      true,
      userList
    );
  }
}
