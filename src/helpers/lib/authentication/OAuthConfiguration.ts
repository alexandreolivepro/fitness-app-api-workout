import OAuthServer from 'express-oauth-server';
import { Express } from 'express';
import AuthService from './services/AuthService';
import { Logger } from '../..';
import Constants from '../../../config/constants/Constants';

export default class OAuthConfiguration {
  static readonly logger: Logger = new Logger(Constants.LOG_CONF);

  static getConfiguration(app: Express): OAuthServer {
    return new OAuthServer({
      model: {
        getAccessToken: AuthService.getAccessToken,
        getRefreshToken: AuthService.getRefreshToken,
        verifyScope: AuthService.verifyScope,
      } as any,
    });
  }
}
