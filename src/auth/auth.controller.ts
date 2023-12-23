import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  UseFilters,
  UseGuards
} from "@nestjs/common";
import { SignInDto } from "./dto/signIn.dto";
import { Response, Request } from "express";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { HttpExceptionFilter } from "../utils/http-exception.filter";
import { RtGuard } from "../common/guards/rt.guard";
import {
  sendResponse,
  loginSuccessResponse,
  loginErrorResponse,
} from "../utils/index";
import { statusMessage } from "../constant/statusMessage";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetCurrentUser, GetCurrentUserId } from "../common/decorators";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  [x: string]: any;
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

  @Public()
  @UseGuards(RtGuard)
  @Post("/refresh")
  @UseFilters(new HttpExceptionFilter())
  async refreshTokens(
    @GetCurrentUser("user") payload: any,
    @GetCurrentUser("user") userId: string,
    @Res() res: Response
  ) {
    const tokens = await this.authService.getTokens(payload);
    res.cookie("access_token", tokens.access_token, {
      httpOnly: false,
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      path: "/",
      sameSite: "none",
      secure: false,
    });

    res.cookie("refresh_token", tokens.refresh_token, {
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
}
