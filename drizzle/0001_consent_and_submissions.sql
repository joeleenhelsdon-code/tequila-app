CREATE TABLE IF NOT EXISTS `user_consents` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `user_id` text NOT NULL UNIQUE,
  `terms_version` text NOT NULL,
  `privacy_version` text NOT NULL,
  `accepted_at` text NOT NULL,
  `marketing_opt_in` integer DEFAULT false NOT NULL
);

CREATE TABLE IF NOT EXISTS `bottle_submissions` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `user_id` text NOT NULL,
  `brand` text NOT NULL,
  `expression` text NOT NULL,
  `style` text NOT NULL,
  `abv` text,
  `nom` text,
  `notes` text,
  `photo_url` text,
  `licence_version` text NOT NULL,
  `licence_accepted_at` text NOT NULL,
  `status` text DEFAULT 'pending' NOT NULL,
  `created_at` text NOT NULL
);
CREATE INDEX IF NOT EXISTS `bottle_submissions_user_idx` ON `bottle_submissions` (`user_id`);
CREATE INDEX IF NOT EXISTS `bottle_submissions_status_idx` ON `bottle_submissions` (`status`);
