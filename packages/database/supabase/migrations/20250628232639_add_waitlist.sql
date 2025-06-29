CREATE TABLE "waitlist" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"twitter_handle" text,
	"referral_source" text,
	"user_agent" text,
	"ip_address" text,
	"is_contacted" boolean DEFAULT false NOT NULL,
	"contacted_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "waitlist_email_idx" ON "waitlist" USING btree ("email");--> statement-breakpoint
CREATE INDEX "waitlist_twitter_handle_idx" ON "waitlist" USING btree ("twitter_handle");