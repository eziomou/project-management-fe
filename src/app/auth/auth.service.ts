import { Injectable } from '@angular/core';
import { NullValidationHandler, OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { authConfig } from './auth.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private oauthService: OAuthService) {
    this.configure();
  }

  private configure() {
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
    this.oauthService.setupAutomaticSilentRefresh();
  }

  login(): void {
    this.oauthService.initLoginFlow();
  }

  logout(): void {
    this.oauthService.logOut();
  }

  isLogged(): Observable<boolean> {
    return this.oauthService.events.pipe(
      map(({ type }: OAuthEvent) => this.oauthService.hasValidAccessToken()),
      distinctUntilChanged()
    );
  }
}
