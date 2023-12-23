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
  Req,
  UnauthorizedException
} from "@nestjs/common";
import { SignInDto } from './dto/signIn.dto'
import { Response, Request } from "express";
import { AuthService } from "./auth.service";
import { Public } from "./decorators/public.decorator";
import { HttpExceptionFilter } from "../utils/http-exception.filter";
import { AuthGuard } from "../common/guards/index";
import { JwtService } from '@nestjs/jwt';
import {
  sendResponse,
  loginSuccessResponse,
  loginErrorResponse,
} from "../utils/index";
import { statusMessage } from "../constant/statusMessage";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { jwtConstants } from "./constants";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  [x: string]: any;
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

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
    const tokens = null;
    let refreshToken = request?.cookies?.refresh_token;
    if (!refreshToken) {
      return res.sendStatus(403);
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.secret,
      });

      if (payload) {
        delete payload.iat;
        delete payload.exp;
      }

      const tokens = await this.getTokens(payload);
      console.log(tokens);
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
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
    return res.sendStatus(200);
  }

  async getTokens(user: any) {
    console.log(user);
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: user.userId,
          email: user.email,
          username: user.username,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: "24h",
        }
      ),
      this.jwtService.signAsync(
        {
          sub: user.userId,
          email: user.email,
          username: user.username,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: "30d",
        }
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}

