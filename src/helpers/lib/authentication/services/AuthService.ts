import * as OAuth2Server from 'oauth2-server';
import { NextFunction, Request, Response } from 'express';
import { Query } from 'mongoose';
import OAuthTokens from '../schemas/OAuthToken';
import OAuthTokensModel from '../models/OAuthTokensModel';

class AuthService {
  public static async authenticate(req: Request, res: Response, next: NextFunction): Promise<OAuth2Server.Token> {
    return req.app.get('oauth').authenticate()(req, res, next);
  }

  public static getAccessToken(bearerToken: string): Promise<OAuthTokensModel> {
    return OAuthTokens.findOne({ accessToken: bearerToken }).lean().exec() as Promise<OAuthTokensModel>;
  }

  public static verifyScope(token: OAuthTokensModel, scope: string): boolean {
    if (!token.scope) {
      return false;
    }
    const requestedScopes = scope.split(' ');
    const authorizedScopes = token.scope.split(' ');
    return requestedScopes.every((s) => authorizedScopes.indexOf(s) >= 0);
  }

  public static getRefreshToken(refreshToken: string): Query<typeof OAuthTokens, OAuthTokensModel> {
    return OAuthTokens.findOne({ refreshToken }).lean();
  }

  /**
   * Get the connected user ID from the authorisation header token
   * @param bearerToken The full authorization header (Bearer xxxxx)
   * @returns {Promise<string>} The user id in a promise
   */
  public static async getUserIdFromAccessToken(bearerToken: string): Promise<string> {
    const [, token] = bearerToken.split(' ');
    const accessToken = await AuthService.getAccessToken(token);
    return accessToken.userId;
  }
}
export default AuthService;
