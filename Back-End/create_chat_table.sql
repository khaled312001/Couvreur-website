-- Create chat_messages table
CREATE TABLE IF NOT EXISTS `chat_messages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `session_id` varchar(255) NOT NULL,
  `sender_type` varchar(255) NOT NULL,
  `sender_name` varchar(255) NOT NULL,
  `sender_email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `status` varchar(255) DEFAULT 'sent',
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `chat_messages_session_id_index` (`session_id`),
  KEY `chat_messages_session_id_created_at_index` (`session_id`, `created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Add session_id column to contact_messages table if it doesn't exist
ALTER TABLE `contact_messages` ADD COLUMN IF NOT EXISTS `session_id` varchar(255) NULL AFTER `admin_response`;
ALTER TABLE `contact_messages` ADD INDEX IF NOT EXISTS `contact_messages_session_id_index` (`session_id`); 