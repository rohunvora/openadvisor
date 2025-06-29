CREATE TYPE "public"."deal_status" AS ENUM('pending', 'accepted', 'rejected', 'revoked');--> statement-breakpoint
CREATE TYPE "public"."offer_status" AS ENUM('draft', 'active', 'expired', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."user_type" AS ENUM('kol', 'project');--> statement-breakpoint
CREATE TYPE "public"."vesting_status" AS ENUM('pending', 'active', 'completed', 'revoked');--> statement-breakpoint
CREATE TABLE "deals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"offer_id" uuid NOT NULL,
	"kol_id" uuid NOT NULL,
	"project_id" uuid NOT NULL,
	"agreed_token_amount" numeric(20, 0) NOT NULL,
	"vesting_account_address" text,
	"transaction_signature" text,
	"signed_saatp_hash" text,
	"signed_at" timestamp,
	"status" "deal_status" DEFAULT 'pending' NOT NULL,
	"revoked_at" timestamp,
	"revoked_reason" text,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "deals_vesting_account_address_unique" UNIQUE("vesting_account_address")
);
--> statement-breakpoint
CREATE TABLE "disclosure_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"deal_id" uuid NOT NULL,
	"kol_id" uuid NOT NULL,
	"tweet_id" text NOT NULL,
	"tweet_url" text NOT NULL,
	"tweet_content" text,
	"disclosure_added" boolean DEFAULT false NOT NULL,
	"disclosure_type" text,
	"disclosure_tweet_id" text,
	"metadata" jsonb,
	"detected_at" timestamp DEFAULT now() NOT NULL,
	"processed_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "offers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"project_id" uuid NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"token_address" text NOT NULL,
	"token_symbol" text NOT NULL,
	"token_amount" numeric(20, 0) NOT NULL,
	"token_decimals" integer NOT NULL,
	"vesting_cliff_days" integer NOT NULL,
	"vesting_duration_days" integer NOT NULL,
	"vesting_percent_upfront" integer DEFAULT 0,
	"min_followers" integer DEFAULT 0,
	"required_deliverables" jsonb,
	"saatp_template_hash" text NOT NULL,
	"custom_terms" text,
	"status" "offer_status" DEFAULT 'draft' NOT NULL,
	"expires_at" timestamp,
	"metadata" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" "user_type" NOT NULL,
	"twitter_id" text,
	"twitter_handle" text,
	"twitter_name" text,
	"twitter_profile_image" text,
	"twitter_followers" integer,
	"wallet_address" text NOT NULL,
	"wallet_signature" text,
	"project_name" text,
	"project_website" text,
	"project_logo_url" text,
	"metadata" jsonb,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"last_login_at" timestamp,
	CONSTRAINT "users_twitter_id_unique" UNIQUE("twitter_id"),
	CONSTRAINT "users_wallet_address_unique" UNIQUE("wallet_address")
);
--> statement-breakpoint
CREATE TABLE "vesting_schedules" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"deal_id" uuid NOT NULL,
	"total_amount" numeric(20, 0) NOT NULL,
	"released_amount" numeric(20, 0) DEFAULT '0' NOT NULL,
	"start_date" timestamp NOT NULL,
	"cliff_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"status" "vesting_status" DEFAULT 'pending' NOT NULL,
	"last_claimed_at" timestamp,
	"last_claim_signature" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "deals" ADD CONSTRAINT "deals_offer_id_offers_id_fk" FOREIGN KEY ("offer_id") REFERENCES "public"."offers"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deals" ADD CONSTRAINT "deals_kol_id_users_id_fk" FOREIGN KEY ("kol_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "deals" ADD CONSTRAINT "deals_project_id_users_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "disclosure_logs" ADD CONSTRAINT "disclosure_logs_deal_id_deals_id_fk" FOREIGN KEY ("deal_id") REFERENCES "public"."deals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "disclosure_logs" ADD CONSTRAINT "disclosure_logs_kol_id_users_id_fk" FOREIGN KEY ("kol_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_project_id_users_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vesting_schedules" ADD CONSTRAINT "vesting_schedules_deal_id_deals_id_fk" FOREIGN KEY ("deal_id") REFERENCES "public"."deals"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "deal_offer_id_idx" ON "deals" USING btree ("offer_id");--> statement-breakpoint
CREATE INDEX "deal_kol_id_idx" ON "deals" USING btree ("kol_id");--> statement-breakpoint
CREATE INDEX "deal_project_id_idx" ON "deals" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "deal_status_idx" ON "deals" USING btree ("status");--> statement-breakpoint
CREATE INDEX "vesting_account_idx" ON "deals" USING btree ("vesting_account_address");--> statement-breakpoint
CREATE INDEX "disclosure_deal_id_idx" ON "disclosure_logs" USING btree ("deal_id");--> statement-breakpoint
CREATE INDEX "disclosure_kol_id_idx" ON "disclosure_logs" USING btree ("kol_id");--> statement-breakpoint
CREATE INDEX "disclosure_tweet_id_idx" ON "disclosure_logs" USING btree ("tweet_id");--> statement-breakpoint
CREATE INDEX "offer_project_id_idx" ON "offers" USING btree ("project_id");--> statement-breakpoint
CREATE INDEX "offer_status_idx" ON "offers" USING btree ("status");--> statement-breakpoint
CREATE INDEX "offer_expires_at_idx" ON "offers" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX "twitter_id_idx" ON "users" USING btree ("twitter_id");--> statement-breakpoint
CREATE INDEX "wallet_address_idx" ON "users" USING btree ("wallet_address");--> statement-breakpoint
CREATE INDEX "user_type_idx" ON "users" USING btree ("type");--> statement-breakpoint
CREATE INDEX "vesting_deal_id_idx" ON "vesting_schedules" USING btree ("deal_id");--> statement-breakpoint
CREATE INDEX "vesting_status_idx" ON "vesting_schedules" USING btree ("status");