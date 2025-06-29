"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disclosureLogsRelations = exports.vestingSchedulesRelations = exports.dealsRelations = exports.offersRelations = exports.usersRelations = exports.waitlist = exports.disclosureLogs = exports.vestingSchedules = exports.deals = exports.offers = exports.users = exports.vestingStatusEnum = exports.dealStatusEnum = exports.offerStatusEnum = exports.userTypeEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// Enums
exports.userTypeEnum = (0, pg_core_1.pgEnum)('user_type', ['kol', 'project']);
exports.offerStatusEnum = (0, pg_core_1.pgEnum)('offer_status', ['draft', 'active', 'expired', 'cancelled']);
exports.dealStatusEnum = (0, pg_core_1.pgEnum)('deal_status', ['pending', 'accepted', 'rejected', 'revoked']);
exports.vestingStatusEnum = (0, pg_core_1.pgEnum)('vesting_status', ['pending', 'active', 'completed', 'revoked']);
// Users table - stores both KOLs and Projects
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    type: (0, exports.userTypeEnum)('type').notNull(),
    // Auth fields
    twitterId: (0, pg_core_1.text)('twitter_id').unique(),
    twitterHandle: (0, pg_core_1.text)('twitter_handle'),
    twitterName: (0, pg_core_1.text)('twitter_name'),
    twitterProfileImage: (0, pg_core_1.text)('twitter_profile_image'),
    twitterFollowers: (0, pg_core_1.integer)('twitter_followers'),
    // Wallet
    walletAddress: (0, pg_core_1.text)('wallet_address').notNull().unique(),
    walletSignature: (0, pg_core_1.text)('wallet_signature'), // Proof of wallet ownership
    // Project-specific fields
    projectName: (0, pg_core_1.text)('project_name'),
    projectWebsite: (0, pg_core_1.text)('project_website'),
    projectLogoUrl: (0, pg_core_1.text)('project_logo_url'),
    // Metadata
    metadata: (0, pg_core_1.jsonb)('metadata').$type(),
    isActive: (0, pg_core_1.boolean)('is_active').default(true).notNull(),
    // Timestamps
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
    lastLoginAt: (0, pg_core_1.timestamp)('last_login_at'),
}, (table) => ({
    twitterIdIdx: (0, pg_core_1.index)('twitter_id_idx').on(table.twitterId),
    walletAddressIdx: (0, pg_core_1.index)('wallet_address_idx').on(table.walletAddress),
    typeIdx: (0, pg_core_1.index)('user_type_idx').on(table.type),
}));
// Offers table - created by projects
exports.offers = (0, pg_core_1.pgTable)('offers', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    projectId: (0, pg_core_1.uuid)('project_id').references(() => exports.users.id).notNull(),
    // Offer details
    title: (0, pg_core_1.text)('title').notNull(),
    description: (0, pg_core_1.text)('description'),
    tokenAddress: (0, pg_core_1.text)('token_address').notNull(),
    tokenSymbol: (0, pg_core_1.text)('token_symbol').notNull(),
    tokenAmount: (0, pg_core_1.decimal)('token_amount', { precision: 20, scale: 0 }).notNull(), // Raw token amount
    tokenDecimals: (0, pg_core_1.integer)('token_decimals').notNull(),
    // Vesting terms
    vestingCliffDays: (0, pg_core_1.integer)('vesting_cliff_days').notNull(),
    vestingDurationDays: (0, pg_core_1.integer)('vesting_duration_days').notNull(),
    vestingPercentUpfront: (0, pg_core_1.integer)('vesting_percent_upfront').default(0), // 0-100
    // Requirements
    minFollowers: (0, pg_core_1.integer)('min_followers').default(0),
    requiredDeliverables: (0, pg_core_1.jsonb)('required_deliverables').$type(),
    // Legal
    saatpTemplateHash: (0, pg_core_1.text)('saatp_template_hash').notNull(), // IPFS hash of legal template
    customTerms: (0, pg_core_1.text)('custom_terms'),
    // Status
    status: (0, exports.offerStatusEnum)('status').default('draft').notNull(),
    expiresAt: (0, pg_core_1.timestamp)('expires_at'),
    // Metadata
    metadata: (0, pg_core_1.jsonb)('metadata').$type(),
    // Timestamps
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
}, (table) => ({
    projectIdIdx: (0, pg_core_1.index)('offer_project_id_idx').on(table.projectId),
    statusIdx: (0, pg_core_1.index)('offer_status_idx').on(table.status),
    expiresAtIdx: (0, pg_core_1.index)('offer_expires_at_idx').on(table.expiresAt),
}));
// Deals table - accepted offers
exports.deals = (0, pg_core_1.pgTable)('deals', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    offerId: (0, pg_core_1.uuid)('offer_id').references(() => exports.offers.id).notNull(),
    kolId: (0, pg_core_1.uuid)('kol_id').references(() => exports.users.id).notNull(),
    projectId: (0, pg_core_1.uuid)('project_id').references(() => exports.users.id).notNull(),
    // Deal specifics
    agreedTokenAmount: (0, pg_core_1.decimal)('agreed_token_amount', { precision: 20, scale: 0 }).notNull(),
    // On-chain data
    vestingAccountAddress: (0, pg_core_1.text)('vesting_account_address').unique(),
    transactionSignature: (0, pg_core_1.text)('transaction_signature'),
    // Legal
    signedSaatpHash: (0, pg_core_1.text)('signed_saatp_hash'), // IPFS hash of signed agreement
    signedAt: (0, pg_core_1.timestamp)('signed_at'),
    // Status
    status: (0, exports.dealStatusEnum)('status').default('pending').notNull(),
    revokedAt: (0, pg_core_1.timestamp)('revoked_at'),
    revokedReason: (0, pg_core_1.text)('revoked_reason'),
    // Metadata
    metadata: (0, pg_core_1.jsonb)('metadata').$type(),
    // Timestamps
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
}, (table) => ({
    offerIdIdx: (0, pg_core_1.index)('deal_offer_id_idx').on(table.offerId),
    kolIdIdx: (0, pg_core_1.index)('deal_kol_id_idx').on(table.kolId),
    projectIdIdx: (0, pg_core_1.index)('deal_project_id_idx').on(table.projectId),
    statusIdx: (0, pg_core_1.index)('deal_status_idx').on(table.status),
    vestingAccountIdx: (0, pg_core_1.index)('vesting_account_idx').on(table.vestingAccountAddress),
}));
// Vesting schedules - tracks token unlocks
exports.vestingSchedules = (0, pg_core_1.pgTable)('vesting_schedules', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    dealId: (0, pg_core_1.uuid)('deal_id').references(() => exports.deals.id).notNull(),
    // Schedule details
    totalAmount: (0, pg_core_1.decimal)('total_amount', { precision: 20, scale: 0 }).notNull(),
    releasedAmount: (0, pg_core_1.decimal)('released_amount', { precision: 20, scale: 0 }).default('0').notNull(),
    // Timeline
    startDate: (0, pg_core_1.timestamp)('start_date').notNull(),
    cliffDate: (0, pg_core_1.timestamp)('cliff_date').notNull(),
    endDate: (0, pg_core_1.timestamp)('end_date').notNull(),
    // Status
    status: (0, exports.vestingStatusEnum)('status').default('pending').notNull(),
    // Last claim
    lastClaimedAt: (0, pg_core_1.timestamp)('last_claimed_at'),
    lastClaimSignature: (0, pg_core_1.text)('last_claim_signature'),
    // Timestamps
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
}, (table) => ({
    dealIdIdx: (0, pg_core_1.index)('vesting_deal_id_idx').on(table.dealId),
    statusIdx: (0, pg_core_1.index)('vesting_status_idx').on(table.status),
}));
// Disclosure logs - tracks compliance bot actions
exports.disclosureLogs = (0, pg_core_1.pgTable)('disclosure_logs', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    dealId: (0, pg_core_1.uuid)('deal_id').references(() => exports.deals.id).notNull(),
    kolId: (0, pg_core_1.uuid)('kol_id').references(() => exports.users.id).notNull(),
    // Tweet data
    tweetId: (0, pg_core_1.text)('tweet_id').notNull(),
    tweetUrl: (0, pg_core_1.text)('tweet_url').notNull(),
    tweetContent: (0, pg_core_1.text)('tweet_content'),
    // Disclosure action
    disclosureAdded: (0, pg_core_1.boolean)('disclosure_added').default(false).notNull(),
    disclosureType: (0, pg_core_1.text)('disclosure_type'), // 'reply', 'quote', 'manual'
    disclosureTweetId: (0, pg_core_1.text)('disclosure_tweet_id'),
    // Metadata
    metadata: (0, pg_core_1.jsonb)('metadata').$type(),
    // Timestamps
    detectedAt: (0, pg_core_1.timestamp)('detected_at').defaultNow().notNull(),
    processedAt: (0, pg_core_1.timestamp)('processed_at'),
}, (table) => ({
    dealIdIdx: (0, pg_core_1.index)('disclosure_deal_id_idx').on(table.dealId),
    kolIdIdx: (0, pg_core_1.index)('disclosure_kol_id_idx').on(table.kolId),
    tweetIdIdx: (0, pg_core_1.index)('disclosure_tweet_id_idx').on(table.tweetId),
}));
// Waitlist table - captures early interest
exports.waitlist = (0, pg_core_1.pgTable)('waitlist', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    // Contact info
    email: (0, pg_core_1.text)('email').notNull(),
    twitterHandle: (0, pg_core_1.text)('twitter_handle'),
    // Metadata
    referralSource: (0, pg_core_1.text)('referral_source'),
    userAgent: (0, pg_core_1.text)('user_agent'),
    ipAddress: (0, pg_core_1.text)('ip_address'),
    // Status
    isContacted: (0, pg_core_1.boolean)('is_contacted').default(false).notNull(),
    contactedAt: (0, pg_core_1.timestamp)('contacted_at'),
    // Timestamps
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
}, (table) => ({
    emailIdx: (0, pg_core_1.index)('waitlist_email_idx').on(table.email),
    twitterHandleIdx: (0, pg_core_1.index)('waitlist_twitter_handle_idx').on(table.twitterHandle),
}));
// Relations
exports.usersRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    createdOffers: many(exports.offers),
    kolDeals: many(exports.deals),
}));
exports.offersRelations = (0, drizzle_orm_1.relations)(exports.offers, ({ one, many }) => ({
    project: one(exports.users, {
        fields: [exports.offers.projectId],
        references: [exports.users.id],
    }),
    deals: many(exports.deals),
}));
exports.dealsRelations = (0, drizzle_orm_1.relations)(exports.deals, ({ one }) => ({
    offer: one(exports.offers, {
        fields: [exports.deals.offerId],
        references: [exports.offers.id],
    }),
    kol: one(exports.users, {
        fields: [exports.deals.kolId],
        references: [exports.users.id],
    }),
    project: one(exports.users, {
        fields: [exports.deals.projectId],
        references: [exports.users.id],
    }),
    vestingSchedule: one(exports.vestingSchedules, {
        fields: [exports.deals.id],
        references: [exports.vestingSchedules.dealId],
    }),
}));
exports.vestingSchedulesRelations = (0, drizzle_orm_1.relations)(exports.vestingSchedules, ({ one }) => ({
    deal: one(exports.deals, {
        fields: [exports.vestingSchedules.dealId],
        references: [exports.deals.id],
    }),
}));
exports.disclosureLogsRelations = (0, drizzle_orm_1.relations)(exports.disclosureLogs, ({ one }) => ({
    deal: one(exports.deals, {
        fields: [exports.disclosureLogs.dealId],
        references: [exports.deals.id],
    }),
    kol: one(exports.users, {
        fields: [exports.disclosureLogs.kolId],
        references: [exports.users.id],
    }),
}));
