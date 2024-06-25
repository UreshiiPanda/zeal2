-- Create `rps` table.
CREATE TABLE rps (
    `username` VARCHAR(255) NOT NULL COMMENT 'The unique save name of the user',
    `progress` INT NOT NULL COMMENT 'Which challenger the user is on',
    PRIMARY KEY (`username`)
)