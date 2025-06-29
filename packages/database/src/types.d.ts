import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import type { users, offers, deals, vestingSchedules, disclosureLogs } from './schema';
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type Offer = InferSelectModel<typeof offers>;
export type NewOffer = InferInsertModel<typeof offers>;
export type Deal = InferSelectModel<typeof deals>;
export type NewDeal = InferInsertModel<typeof deals>;
export type VestingSchedule = InferSelectModel<typeof vestingSchedules>;
export type NewVestingSchedule = InferInsertModel<typeof vestingSchedules>;
export type DisclosureLog = InferSelectModel<typeof disclosureLogs>;
export type NewDisclosureLog = InferInsertModel<typeof disclosureLogs>;
export type UserType = 'kol' | 'project';
export type OfferStatus = 'draft' | 'active' | 'expired' | 'cancelled';
export type DealStatus = 'pending' | 'accepted' | 'rejected' | 'revoked';
export type VestingStatus = 'pending' | 'active' | 'completed' | 'revoked';
//# sourceMappingURL=types.d.ts.map