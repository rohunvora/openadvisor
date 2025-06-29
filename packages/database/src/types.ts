import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import type { users, offers, deals, vestingSchedules, disclosureLogs } from './schema';

// User types
export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;

// Offer types
export type Offer = InferSelectModel<typeof offers>;
export type NewOffer = InferInsertModel<typeof offers>;

// Deal types
export type Deal = InferSelectModel<typeof deals>;
export type NewDeal = InferInsertModel<typeof deals>;

// Vesting schedule types
export type VestingSchedule = InferSelectModel<typeof vestingSchedules>;
export type NewVestingSchedule = InferInsertModel<typeof vestingSchedules>;

// Disclosure log types
export type DisclosureLog = InferSelectModel<typeof disclosureLogs>;
export type NewDisclosureLog = InferInsertModel<typeof disclosureLogs>;

// Enum types
export type UserType = 'kol' | 'project';
export type OfferStatus = 'draft' | 'active' | 'expired' | 'cancelled';
export type DealStatus = 'pending' | 'accepted' | 'rejected' | 'revoked';
export type VestingStatus = 'pending' | 'active' | 'completed' | 'revoked'; 