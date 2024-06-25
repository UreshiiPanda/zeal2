-- Create `groceries` table
DROP TABLE IF EXISTS groceries;
CREATE TABLE groceries (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT 'The unique row id of the table',
    `user_id` VARCHAR(255) NOT NULL COMMENT 'The unique id of each user',
    `grocery` VARCHAR(255) NOT NULL COMMENT 'The name of the grocery item',
    `quantity` INT NOT NULL COMMENT 'The number of that grocery item to be purcahsed',
    `units` VARCHAR(255) COMMENT 'The units of the purchase, e.g. oz, lbs, bushels, etc...',
    `tags` VARCHAR(255) COMMENT 'The tags associated with the grocery',
    `posted` VARCHAR(255) NOT NULL COMMENT 'The date and time the grocery item was added to the list',
    `pickup` VARCHAR(255) COMMENT 'The date and time the grocery item is to be picked up',
    `assigned` VARCHAR(255) COMMENT 'The person who is assigned to purchas the grocery item',
    `completed` BOOLEAN NOT NULL COMMENT 'Whether or not the item has been purchased',
    PRIMARY KEY (`id`)
)