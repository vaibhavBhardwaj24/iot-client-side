CREATE TABLE IF NOT EXISTS "efficiencyPoint" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"iotID" uuid,
	"minVal" real,
	"q20" real,
	"q40" real,
	"q60" real,
	"q80" real,
	"maxVal" real
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "efficiencyPoint" ADD CONSTRAINT "efficiencyPoint_iotID_iot_id_fk" FOREIGN KEY ("iotID") REFERENCES "public"."iot"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
