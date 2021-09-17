import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { KeycloakConfigService } from './keycloak-config.service'

@Module({
  providers: [
    {
      provide: KeycloakConfigService,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) =>
        new KeycloakConfigService(
          config.get<string>('keycloak.serverUrl'),
          config.get<string>('keycloak.realm'),
          config.get<string>('keycloak.clientId'),
          config.get<string>('keycloak.secret'),
        ),
    },
  ],
  exports: [KeycloakConfigService],
})
export class AppConfigModule {}