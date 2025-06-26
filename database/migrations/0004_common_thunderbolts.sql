ALTER TABLE "embeddings" RENAME COLUMN "content" TO "description";--> statement-breakpoint
ALTER TABLE "startups" ALTER COLUMN "id" SET DATA TYPE varchar(191);--> statement-breakpoint
ALTER TABLE "startups" ALTER COLUMN "name" SET DATA TYPE text;