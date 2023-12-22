import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseFilters,
  UseGuards,
} from "@nestjs/common";
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
import { ApiResponse } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiResponse(loginSuccessResponse)
  @ApiResponse(loginErrorResponse)
  @Public()
  @UseFilters(new HttpExceptionFilter())
  @Post("login")
  async signIn(@Body() signInDto: Record<string, any>, @Res() res: Response) {
    const token = await this.authService.signIn(
      signInDto.email,
      signInDto.password
    );
    console.log(token);

    res.cookie("access_token", token.access_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: "/",
      sameSite: "none",
      secure: true,
    });

    res.cookie("refresh_token", token.refresh_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: "/",
      sameSite: "none",
      secure: true,
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
  @UseGuards(AuthGuard)
  @Post("/refresh")
  @UseFilters(new HttpExceptionFilter())
  async refreshTokens(@Res() request: Request, @Res() res: Response) {
    // console.log(request);
    return res.sendStatus(200);
    // return await this.authService.refreshTokens(userId, refreshToken);
  }
}
