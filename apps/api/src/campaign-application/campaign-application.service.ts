import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common'
import { CreateCampaignApplicationDto } from './dto/create-campaign-application.dto'
import { UpdateCampaignApplicationDto } from './dto/update-campaign-application.dto'
import { PrismaService } from '../prisma/prisma.service'
import { OrganizerService } from '../organizer/organizer.service'
import { Person } from '@prisma/client'
import { EmailService } from '../email/email.service'
import { CreateCampaignApplicationEmailDto} from '../email/template.interface'
import { EmailData } from '../email/email.interface'

@Injectable()
export class CampaignApplicationService {
  constructor(
    private prisma: PrismaService,
    private organizerService: OrganizerService,
    private sendEmail: EmailService,
  ) {}
  async getCampaignByIdWithPersonIds(id: string): Promise<UpdateCampaignApplicationDto> {
    throw new Error('Method not implemented.')
  }

  async create(createCampaignApplicationDto: CreateCampaignApplicationDto, person: Person) {
    try {
      if (
        createCampaignApplicationDto.acceptTermsAndConditions === false ||
        createCampaignApplicationDto.transparencyTermsAccepted === false ||
        createCampaignApplicationDto.personalInformationProcessingAccepted === false
      ) {
        throw new BadRequestException('All agreements must be checked')
      }
      

      let organizer = await this.prisma.organizer.findUnique({
        where: { personId: person.id },
      })

      if (!organizer) {
        organizer = await this.organizerService.create({
          personId: person.id,
        })
      }

      const sanitizedData = {
        campaignName: createCampaignApplicationDto.campaignName.trim(),
        organizerName: createCampaignApplicationDto.organizerName.trim(),
        organizerEmail: createCampaignApplicationDto.organizerEmail.trim(),
        organizerPhone: createCampaignApplicationDto.organizerPhone.trim(),
        beneficiary: createCampaignApplicationDto.beneficiary.trim(),
        organizerBeneficiaryRel: createCampaignApplicationDto.organizerBeneficiaryRel.trim(),
        goal: createCampaignApplicationDto.goal.trim(),
        history: createCampaignApplicationDto.history?.trim(),
        amount: createCampaignApplicationDto.amount.trim(),
        description: createCampaignApplicationDto.description?.trim(),
        campaignGuarantee: createCampaignApplicationDto.campaignGuarantee?.trim(),
        otherFinanceSources: createCampaignApplicationDto.otherFinanceSources?.trim(),
        otherNotes: createCampaignApplicationDto.otherNotes?.trim(),
        category: createCampaignApplicationDto.category,
        organizerId: organizer.id,
      }

      const newCampaignApplication = await this.prisma.campaignApplication.create({
        data: sanitizedData,
      })


      //Attaching files to S3
      const userEmail = { to: [person.email]  as EmailData[]}

      const emailData = {
      campaignApplicationName:newCampaignApplication.campaignName,
      editLink: 'https://www.formula1.com/',
}
      
      const mail = new CreateCampaignApplicationEmailDto(emailData)
      
      await this.sendEmail.sendFromTemplate(mail, userEmail, {
      
        bypassUnsubscribeManagement: { enable: true },
      })

      return newCampaignApplication
    } catch (error) {
      Logger.error('Error in create():', error)
      throw error
    }
  }

  findAll() {
    return this.prisma.campaignApplication.findMany()
  }

  findOne(id: string) {
    return `This action returns a #${id} campaignApplication`
  }

  update(id: string, updateCampaignApplicationDto: UpdateCampaignApplicationDto) {
   if(
        updateCampaignApplicationDto.acceptTermsAndConditions === false ||
        updateCampaignApplicationDto.transparencyTermsAccepted === false ||
        updateCampaignApplicationDto.personalInformationProcessingAccepted === false
      ) {
        throw new BadRequestException('All agreements must be checked')
      }
      
    

      const sanitizedData = {
        campaignName:updateCampaignApplicationDto.campaignName?.trim(),
        organizerName:updateCampaignApplicationDto.organizerName?.trim(),
        organizerEmail:updateCampaignApplicationDto.organizerEmail?.trim(),
        organizerPhone:updateCampaignApplicationDto.organizerPhone?.trim(),
        beneficiary:updateCampaignApplicationDto.beneficiary?.trim(),
        organizerBeneficiaryRel:updateCampaignApplicationDto  .organizerBeneficiaryRel?.trim(),
        goal:updateCampaignApplicationDto.goal?.trim(),
        history:updateCampaignApplicationDto.history?.trim(),
        amount:updateCampaignApplicationDto .amount?.trim(),
        description:updateCampaignApplicationDto .description?.trim(),
        campaignGuarantee:updateCampaignApplicationDto .campaignGuarantee?.trim(),
        otherFinanceSources:updateCampaignApplicationDto .otherFinanceSources?.trim(),
        otherNotes:updateCampaignApplicationDto .otherNotes?.trim(),
        category:updateCampaignApplicationDto .category,
      }

    return `This action updates a #${id} campaignApplication`

  }

  remove(id: string) {
    return `This action removes a #${id} campaignApplication`
  }
}
