import { Body, Controller, Patch, Post, UseInterceptors, UseGuards, Req, Get } from '@nestjs/common';
import { User } from 'src/infrastructure/database/postgres/models/user.model';
import { AuthService } from 'src/application/auth/auth.service';
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { RegisterDto } from 'src/domain/dto/auth/register.dto';
import { ForgotPasswordDto } from 'src/domain/dto/auth/forgotPassword.dto';
import { ChangePasswordDto } from 'src/domain/dto/auth/changePassword.dto';
import { LoginDto } from 'src/domain/dto/auth/login.dto';
import { Request } from 'express';
import { LocalAuthGuard } from 'src/shared/passport/local-auth.guard';
import { GoogleAuthGuard } from 'src/shared/passport/google-auth.guard';
import { ResponseSerialization } from 'src/shared/middlewares/responseSerialization.interceptor';

@ApiTags('Auth')
@ApiBearerAuth()
@Controller('auth')
@UseInterceptors(new ResponseSerialization([ 'password', 'salt', 'verificationCode', 'expirationDate' ]))
export class AuthController {
  constructor (private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  register (@Body() registerDto: RegisterDto): Promise<User> {
    return this.authService.register(registerDto);
  }


  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  login (@Body() loginDto: LoginDto, @Req() req: Request): Promise<{ token: string }> {
    return this.authService.login(req.user as User);
  }

  @Post('whoami')
  @ApiOperation({ summary: 'Refresh the Authentication token and retrieve the User info' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  whoami (@Req() req: Request): User {
    return this.authService.whoami(req.user as User);
  }

  @Post('forgotPassword')
  @ApiOperation({ summary: 'Forgot Password' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  forgotPassword (@Body() forgotPasswordDto: ForgotPasswordDto): Promise<string> {
    return this.authService.forgotPassword(forgotPasswordDto);
  }


  @Patch('changePassword')
  @ApiOperation({ summary: 'Change Password' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  changePassword (@Body() changePasswordDto: ChangePasswordDto): Promise<string> {
    return this.authService.changePassword(changePasswordDto);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({ summary: 'login with google' })
  @ApiResponse({ status: 200, description: 'Success' })
  googleAuth () {
    return 'success';
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  @ApiOperation({
    summary: 'login with google redirection',
    description: 'this api will give you the auth token but you should not call it. call `/auth/google` api.',
  })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  googleAuthRedirect (@Req() req: Request) {
    return this.authService.login(req.user as User);
  }
}
