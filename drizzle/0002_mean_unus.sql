CREATE TABLE "libraries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"owner_id" uuid NOT NULL,
	CONSTRAINT "libraries_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "recipes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"owner_id" uuid NOT NULL,
	"library_id" uuid NOT NULL,
	"description" text,
	"image_url" text,
	"prep_time_minutes" integer,
	"cook_time_minutes" integer,
	"servings" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"steps" jsonb NOT NULL,
	CONSTRAINT "recipes_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_library_id_libraries_id_fk" FOREIGN KEY ("library_id") REFERENCES "public"."libraries"("id") ON DELETE cascade ON UPDATE no action;