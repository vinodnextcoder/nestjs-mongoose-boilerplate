import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseFilters,
  UseGuards,
  Headers,
  Req
} from "@nestjs/common";
import { SignInDto } from './dto/signIn.dto'
import { Response, Request } from "express";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { HttpExceptionFilter } from "../utils/http-exception.filter";
import { AuthGuard } from "../common/guards/index";
import {
  sendResponse,
  loginSuccessResponse,
  loginErrorResponse,
} from "../utils/index";
import { statusMessage } from "../constant/statusMessage";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse(loginSuccessResponse)
  @ApiResponse(loginErrorResponse)
  @Public()
  @UseFilters(new HttpExceptionFilter())
  @Post("login")
  async signIn(@Body() signInDto: SignInDto, @Res() res: Response) {
    const token = await this.authService.signIn(
      signInDto.email,
      signInDto.password
    );
    console.log(token);

    res.cookie("access_token", token.access_token, {
      httpOnly: false,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: "/",
      sameSite: "none",
      secure: false,
    });

    res.cookie("refresh_token", token.refresh_token, {
      httpOnly: false,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: "/",
      sameSite: "none",
      secure: false,
    });


    return sendResponse(
      res,
      HttpStatus.OK,
      statusMessage[HttpStatus.OK],
      true,
      null
    );
  }


  // todo not implented yet
  // @Public()
  // @UseGuards(AuthGuard)
  @Public()
  @Post("/refresh")
  @UseFilters(new HttpExceptionFilter())
  async refreshTokens(@Req() request: Request, @Res() res: Response) {
    console.log('#############refreshToken',request.cookies.refresh_token)
    return res.sendStatus(200);
    // return await this.authService.refreshTokens(userId, refreshToken);
  }
}
