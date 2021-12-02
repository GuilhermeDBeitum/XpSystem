BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "schema_migrations" (
	"version"	varchar NOT NULL,
	PRIMARY KEY("version")
);
CREATE TABLE IF NOT EXISTS "ar_internal_metadata" (
	"key"	varchar NOT NULL,
	"value"	varchar,
	"created_at"	datetime(6) NOT NULL,
	"updated_at"	datetime(6) NOT NULL,
	PRIMARY KEY("key")
);
CREATE TABLE IF NOT EXISTS "users" (
	"id"	integer NOT NULL,
	"username"	varchar,
	"email"	varchar,
	"created_at"	datetime(6) NOT NULL,
	"updated_at"	datetime(6) NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "schema_migrations" VALUES ('20210114015101');
INSERT INTO "ar_internal_metadata" VALUES ('environment','development','2021-01-15 05:39:04.321007','2021-01-15 05:39:04.321007');
INSERT INTO "users" VALUES (1,'aaa','aaa@aa.com','2021-01-15 05:39:14.085847','2021-01-15 05:39:14.085847');
INSERT INTO "users" VALUES (2,'dddd','ddd@hotmail.com','2021-01-15 05:39:23.531500','2021-01-15 05:39:23.531500');
COMMIT;
