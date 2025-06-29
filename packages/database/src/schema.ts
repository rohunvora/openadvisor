import {
  pgTable,
  text,
  uuid,
  timestamp,
  integer,
  jsonb,
  boolean,
  decimal,
  index,
  pgEnum,
  PgEnum,
  serial,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";

// Enums
export const userTypeEnum: PgEnum<["kol", "project"]> = pgEnum("user_type", [
  "kol",
  "project",
]);
export const offerStatusEnum: PgEnum<
  ["draft", "active", "expired", "cancelled"]
> = pgEnum("offer_status", ["draft", "active", "expired", "cancelled"]);
export const dealStatusEnum: PgEnum<
  ["pending", "accepted", "rejected", "revoked"]
> = pgEnum("deal_status", ["pending", "accepted", "rejected", "revoked"]);
export const vestingStatusEnum: PgEnum<
  ["pending", "active", "completed", "revoked"]
> = pgEnum("vesting_status", ["pending", "active", "completed", "revoked"]);

// Users table - stores both KOLs and Projects
export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    type: userTypeEnum("type").notNull(),

    // Auth fields
    twitterId: text("twitter_id").unique(),
    twitterHandle: text("twitter_handle"),
    twitterName: text("twitter_name"),
    twitterProfileImage: text("twitter_profile_image"),
    twitterFollowers: integer("twitter_followers"),

    // Wallet
    walletAddress: text("wallet_address").notNull().unique(),
    walletSignature: text("wallet_signature"), // Proof of wallet ownership

    // Project-specific fields
    projectName: text("project_name"),
    projectWebsite: text("project_website"),
    projectLogoUrl: text("project_logo_url"),

    // Metadata
    metadata: jsonb("metadata").$type<Record<string, any>>(),
    isActive: boolean("is_active").default(true).notNull(),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    lastLoginAt: timestamp("last_login_at"),
  },
  (table) => ({
    twitterIdIdx: index("twitter_id_idx").on(table.twitterId),
    walletAddressIdx: index("wallet_address_idx").on(table.walletAddress),
    typeIdx: index("user_type_idx").on(table.type),
  })
);

// Offers table - created by projects
export const offers = pgTable(
  "offers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    projectId: uuid("project_id")
      .references(() => users.id)
      .notNull(),

    // Offer details
    title: text("title").notNull(),
    description: text("description"),
    tokenAddress: text("token_address").notNull(),
    tokenSymbol: text("token_symbol").notNull(),
    tokenAmount: decimal("token_amount", { precision: 20, scale: 0 }).notNull(), // Raw token amount
    tokenDecimals: integer("token_decimals").notNull(),

    // Vesting terms
    vestingCliffDays: integer("vesting_cliff_days").notNull(),
    vestingDurationDays: integer("vesting_duration_days").notNull(),
    vestingPercentUpfront: integer("vesting_percent_upfront").default(0), // 0-100

    // Requirements
    minFollowers: integer("min_followers").default(0),
    requiredDeliverables: jsonb("required_deliverables").$type<string[]>(),

    // Legal
    saatpTemplateHash: text("saatp_template_hash").notNull(), // IPFS hash of legal template
    customTerms: text("custom_terms"),

    // Status
    status: offerStatusEnum("status").default("draft").notNull(),
    expiresAt: timestamp("expires_at"),

    // Metadata
    metadata: jsonb("metadata").$type<Record<string, any>>(),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    projectIdIdx: index("offer_project_id_idx").on(table.projectId),
    statusIdx: index("offer_status_idx").on(table.status),
    expiresAtIdx: index("offer_expires_at_idx").on(table.expiresAt),
  })
);

// Deals table - accepted offers
export const deals = pgTable(
  "deals",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    offerId: uuid("offer_id")
      .references(() => offers.id)
      .notNull(),
    kolId: uuid("kol_id")
      .references(() => users.id)
      .notNull(),
    projectId: uuid("project_id")
      .references(() => users.id)
      .notNull(),

    // Deal specifics
    agreedTokenAmount: decimal("agreed_token_amount", {
      precision: 20,
      scale: 0,
    }).notNull(),

    // On-chain data
    vestingAccountAddress: text("vesting_account_address").unique(),
    transactionSignature: text("transaction_signature"),

    // Legal
    signedSaatpHash: text("signed_saatp_hash"), // IPFS hash of signed agreement
    signedAt: timestamp("signed_at"),

    // Status
    status: dealStatusEnum("status").default("pending").notNull(),
    revokedAt: timestamp("revoked_at"),
    revokedReason: text("revoked_reason"),

    // Metadata
    metadata: jsonb("metadata").$type<Record<string, any>>(),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    offerIdIdx: index("deal_offer_id_idx").on(table.offerId),
    kolIdIdx: index("deal_kol_id_idx").on(table.kolId),
    projectIdIdx: index("deal_project_id_idx").on(table.projectId),
    statusIdx: index("deal_status_idx").on(table.status),
    vestingAccountIdx: index("vesting_account_idx").on(
      table.vestingAccountAddress
    ),
  })
);

// Vesting schedules - tracks token unlocks
export const vestingSchedules = pgTable(
  "vesting_schedules",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    dealId: uuid("deal_id")
      .references(() => deals.id)
      .notNull(),

    // Schedule details
    totalAmount: decimal("total_amount", { precision: 20, scale: 0 }).notNull(),
    releasedAmount: decimal("released_amount", { precision: 20, scale: 0 })
      .default("0")
      .notNull(),

    // Timeline
    startDate: timestamp("start_date").notNull(),
    cliffDate: timestamp("cliff_date").notNull(),
    endDate: timestamp("end_date").notNull(),

    // Status
    status: vestingStatusEnum("status").default("pending").notNull(),

    // Last claim
    lastClaimedAt: timestamp("last_claimed_at"),
    lastClaimSignature: text("last_claim_signature"),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => ({
    dealIdIdx: index("vesting_deal_id_idx").on(table.dealId),
    statusIdx: index("vesting_status_idx").on(table.status),
  })
);

// Disclosure logs - tracks compliance bot actions
export const disclosureLogs = pgTable(
  "disclosure_logs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    dealId: uuid("deal_id")
      .references(() => deals.id)
      .notNull(),
    kolId: uuid("kol_id")
      .references(() => users.id)
      .notNull(),

    // Tweet data
    tweetId: text("tweet_id").notNull(),
    tweetUrl: text("tweet_url").notNull(),
    tweetContent: text("tweet_content"),

    // Disclosure action
    disclosureAdded: boolean("disclosure_added").default(false).notNull(),
    disclosureType: text("disclosure_type"), // 'reply', 'quote', 'manual'
    disclosureTweetId: text("disclosure_tweet_id"),

    // Metadata
    metadata: jsonb("metadata").$type<Record<string, any>>(),

    // Timestamps
    detectedAt: timestamp("detected_at").defaultNow().notNull(),
    processedAt: timestamp("processed_at"),
  },
  (table) => ({
    dealIdIdx: index("disclosure_deal_id_idx").on(table.dealId),
    kolIdIdx: index("disclosure_kol_id_idx").on(table.kolId),
    tweetIdIdx: index("disclosure_tweet_id_idx").on(table.tweetId),
  })
);

// Waitlist table - captures early interest
export const waitlist = pgTable(
  "waitlist",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    // Contact info
    email: text("email").notNull(),
    twitterHandle: text("twitter_handle"),

    // Metadata
    referralSource: text("referral_source"),
    userAgent: text("user_agent"),
    ipAddress: text("ip_address"),

    // Status
    isContacted: boolean("is_contacted").default(false).notNull(),
    contactedAt: timestamp("contacted_at"),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    emailIdx: index("waitlist_email_idx").on(table.email),
    twitterHandleIdx: index("waitlist_twitter_handle_idx").on(
      table.twitterHandle
    ),
  })
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  createdOffers: many(offers),
  kolDeals: many(deals),
  disclosureLogs: many(disclosureLogs),
}));

export const offersRelations = relations(offers, ({ one, many }) => ({
  project: one(users, {
    fields: [offers.projectId],
    references: [users.id],
  }),
  deals: many(deals),
}));

export const dealsRelations = relations(deals, ({ one }) => ({
  offer: one(offers, {
    fields: [deals.offerId],
    references: [offers.id],
  }),
  kol: one(users, {
    fields: [deals.kolId],
    references: [users.id],
  }),
  project: one(users, {
    fields: [deals.projectId],
    references: [users.id],
  }),
  vestingSchedule: one(vestingSchedules, {
    fields: [deals.id],
    references: [vestingSchedules.dealId],
  }),
}));

export const vestingSchedulesRelations = relations(
  vestingSchedules,
  ({ one }) => ({
    deal: one(deals, {
      fields: [vestingSchedules.dealId],
      references: [deals.id],
    }),
  })
);

export const disclosureLogsRelations = relations(disclosureLogs, ({ one }) => ({
  deal: one(deals, {
    fields: [disclosureLogs.dealId],
    references: [deals.id],
  }),
  kol: one(users, {
    fields: [disclosureLogs.kolId],
    references: [users.id],
  }),
}));

// Type exports
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
export type WaitlistEntry = InferSelectModel<typeof waitlist>;
export type NewWaitlistEntry = InferInsertModel<typeof waitlist>;
