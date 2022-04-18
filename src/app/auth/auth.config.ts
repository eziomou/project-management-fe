import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from 'src/environments/environment';

export const authConfig: AuthConfig = {
    issuer: 'http://localhost:8081/realms/quarkus',
    redirectUri: window.location.origin + '/projects',
    clientId: 'quarkus-app',
    scope: 'profile',
    responseType: 'code',
    disableAtHashCheck: true,
    showDebugInformation: true
}