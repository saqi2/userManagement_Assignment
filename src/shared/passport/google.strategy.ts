import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback, Profile } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { AuthService } from 'src/application/auth/auth.service';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor (private authService: AuthService) {
    super({
      clientID: process.env.USER_MANAGEMENT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.USER_MANAGEMENT_GOOGLE_SECRET,
      callbackURL: process.env.USER_MANAGEMENT_GOOGLE_CALLBACK_URL,
      scope: [ 'email', 'profile' ],
    });
  }

  async validate (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback): Promise<any> {
    const userInfo = {
      email: profile.emails[ 0 ].value,
      fullName: `${ profile.name.givenName } ${ profile.name.familyName }`,
      googleId: profile.id,
    };
    const user = await this.authService.validateUserForGoogleStrategy(userInfo);
    done(null, user);
  }
}
