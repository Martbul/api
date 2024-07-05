import { CampaignApplicationState, CampaignTypeCategory } from '@prisma/client'
import { CreateCampaignApplicationDto } from '../dto/create-campaign-application.dto'

export const mockNewCampaignApplication = {
  campaignName: 'Test Campaign',
  organizerName: 'Test Organizer',
  organizerEmail: 'testemail@gmail.com',
  organizerPhone: '123456789',
  beneficiary: 'Test beneficary',
  organizerBeneficiaryRel: 'Test organizerBeneficiaryRel',
  goal: 'Test goal',
  history: 'Test history',
  amount: '1000',
  description: 'Test description',
  campaignGuarantee: 'Test guarantee',
  otherFinanceSources: 'Test otherFinanceSources',
  otherNotes: 'Test otherNotes',
  category: CampaignTypeCategory.medical,
}

const dto: CreateCampaignApplicationDto = {
  ...mockNewCampaignApplication,
  //!bring back to normal when the task is done
  // acceptTermsAndConditions: true,
  // transparencyTermsAccepted: true,
  // personalInformationProcessingAccepted: true,
  toEntity: new CreateCampaignApplicationDto().toEntity,
}

export const mockCampaigns = [
  {
    id: '1',
    createdAt: new Date('2022-04-08T06:36:33.661Z'),
    updatedAt: new Date('2022-04-08T06:36:33.662Z'),
    description: 'Test description1',
    organizerId: 'testOrganizerId1',
    organizerName: 'Test Organizer1',
    organizerEmail: 'organizer1@example.com',
    beneficiary: 'test beneficary1',
    organizerPhone: '123456789',
    organizerBeneficiaryRel: 'Test Relation1',
    campaignName: 'Test Campaign1',
    goal: 'Test Goal1',
    history: 'test history1',
    amount: '1000',
    campaignGuarantee: 'test campaignGuarantee1',
    otherFinanceSources: 'test otherFinanceSources1',
    otherNotes: 'test otherNotes1',
    state: CampaignApplicationState.review,
    category: CampaignTypeCategory.medical,
    ticketURL: 'testsodifhso1',
    archived: false,
  },
  {
    id: '2',
    createdAt: new Date('2022-04-08T06:36:33.661Z'),
    updatedAt: new Date('2022-04-08T06:36:33.662Z'),
    description: 'Test description2',
    organizerId: 'testOrganizerId2',
    organizerName: 'Test Organizer2',
    organizerEmail: 'organizer2@example.com',
    beneficiary: 'test beneficary2',
    organizerPhone: '123456789',
    organizerBeneficiaryRel: 'Test Relation2',
    campaignName: 'Test Campaign2',
    goal: 'Test Goal2',
    history: 'test history2',
    amount: '1000',
    campaignGuarantee: 'test campaignGuarantee2',
    otherFinanceSources: 'test otherFinanceSources2',
    otherNotes: 'test otherNotes2',
    state: CampaignApplicationState.review,
    category: CampaignTypeCategory.medical,
    ticketURL: 'testsodifhso2',
    archived: false,
  },
]

export const mockCreatedCampaignApplication = {
  id: 'mockCampaignApplicationId',
  createdAt: new Date('2022-04-08T06:36:33.661Z'),
  updatedAt: new Date('2022-04-08T06:36:33.662Z'),
  ...dto,
  organizerId: 'mockOrganizerId',
  state: 'review',
  ticketURL: null,
  archived: false,
}
