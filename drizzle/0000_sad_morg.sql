CREATE TABLE `passport_states` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`client_id` text NOT NULL,
	`shelf_json` text DEFAULT '[]' NOT NULL,
	`tastings_json` text DEFAULT '[]' NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `passport_states_client_id_unique` ON `passport_states` (`client_id`);