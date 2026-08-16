CREATE TABLE "puzzles" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "puzzles_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"name" varchar NOT NULL,
	"color" varchar(7) DEFAULT '#ffffff' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "solves" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "solves_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" integer NOT NULL,
	"puzzle_id" integer NOT NULL,
	"time" integer NOT NULL,
	"scramble" varchar,
	"is_penalty" boolean DEFAULT false NOT NULL,
	"is_dnf" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"discord_id" varchar UNIQUE,
	"google_id" varchar UNIQUE,
	"email" varchar NOT NULL UNIQUE,
	"username" varchar NOT NULL UNIQUE,
	"display_name" varchar,
	"avatar" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "puzzles" ADD CONSTRAINT "puzzles_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "solves" ADD CONSTRAINT "solves_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "solves" ADD CONSTRAINT "solves_puzzle_id_puzzles_id_fkey" FOREIGN KEY ("puzzle_id") REFERENCES "puzzles"("id");