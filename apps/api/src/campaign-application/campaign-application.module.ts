import { Module } from '@nestjs/common'
import { CampaignApplicationService } from './campaign-application.service'
import { CampaignApplicationController } from './campaign-application.controller'

import { PrismaModule } from '../prisma/prisma.module'
import { OrganizerService } from '../organizer/organizer.service'
import { PersonService } from '../person/person.service'
import { EmailService } from '../email/email.service'
import { TemplateService } from '../email/template.service'
@Module({
  imports: [PrismaModule],
  controllers: [CampaignApplicationController],
  providers: [
    CampaignApplicationService,
    OrganizerService,
    PersonService,
    EmailService,
    TemplateService,
  ],
})
export class CampaignApplicationModule {}
