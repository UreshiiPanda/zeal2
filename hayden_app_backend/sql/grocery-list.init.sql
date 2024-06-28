-- Create `groceries` table
DROP TABLE IF EXISTS groceries;
CREATE TABLE groceries (
    `id` INT NOT NULL AUTO_INCREMENT COMMENT 'The unique row id of the table',
    `user_id` VARCHAR(255) NOT NULL COMMENT 'The unique id of each user',
    `image_url` VARCHAR(255) NOT NULL COMMENT 'The url of the grocery image',
    `grocery` VARCHAR(255) NOT NULL COMMENT 'The name of the grocery item',
    `quantity` INT NOT NULL COMMENT 'The number of that grocery item to be purcahsed',
    `completed` BOOLEAN NOT NULL COMMENT 'Whether or not the item has been purchased',
    PRIMARY KEY (`id`)
)