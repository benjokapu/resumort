CREATE TABLE `users` (
   `dni` INT AUTO_INCREMENT,
   `password` VARCHAR(255),
   `nombre` VARCHAR(255),
   `apellido` VARCHAR(255),
   `mail` VARCHAR(255),
   `admin` BIT,
   PRIMARY KEY (`dni`)
);

CREATE TABLE `files` (
   `id` INT AUTO_INCREMENT,
   `nombre` VARCHAR(255),
   `aclaraciones` TEXT,
   `fecha` DATETIME,
   `users_dni` INT,
   `subjectYearId` VARCHAR(255),
   `especialidad_id` INT,
   `status` BIT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `subjectsYear` (
   `id` INT AUTO_INCREMENT,
   `year` INT,
   `especialidad` VARCHAR(255),
   `nombre` VARCHAR(255),
   PRIMARY KEY (`id`)
);


ALTER TABLE `files` ADD CONSTRAINT `FK_81f0a4a9-5f52-4970-a2b3-2170ae35a665` FOREIGN KEY (`users_dni`) REFERENCES `users`(`dni`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `files` ADD CONSTRAINT `FK_1a83c299-ef1a-4281-8e7b-1328c2e75ccd` FOREIGN KEY (`subjectYearId`) REFERENCES `subjectsYear`(`id`)  ;
