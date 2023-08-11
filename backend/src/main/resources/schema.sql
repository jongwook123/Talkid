-- MySQL Script generated by MySQL Workbench
-- Thu Aug 10 17:24:46 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema s09p12d106
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema s09p12d106
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `s09p12d106` DEFAULT CHARACTER SET utf8mb4 ;
USE `s09p12d106` ;

-- -----------------------------------------------------
-- Table `s09p12d106`.`bad_words`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`bad_words` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`bad_words` (
  `badwords_id` INT(11) NOT NULL AUTO_INCREMENT,
  `words` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`badwords_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3566
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`member_type`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`member_type` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`member_type` (
  `member_type_id` INT(11) NOT NULL,
  `member_type_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`member_type_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`country`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`country` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`country` (
  `country_id` INT(11) NOT NULL,
  `country_code` VARCHAR(10) NOT NULL,
  `country_name` VARCHAR(100) NOT NULL,
  `country_image` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`country_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`language`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`language` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`language` (
  `language_id` INT(11) NOT NULL,
  `language_code` VARCHAR(10) NOT NULL,
  `language_eng` VARCHAR(50) NOT NULL,
  `language_ori` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`language_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`time_zone`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`time_zone` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`time_zone` (
  `hour` INT(11) NULL DEFAULT NULL,
  `minute` INT(11) NULL DEFAULT NULL,
  `time_zone_id` INT(11) NOT NULL AUTO_INCREMENT,
  `time_zone_name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`time_zone_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`school`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`school` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`school` (
  `country_id` INT(11) NULL DEFAULT NULL,
  `school_id` INT(11) NOT NULL AUTO_INCREMENT,
  `school_lat` DOUBLE NOT NULL,
  `school_lng` DOUBLE NOT NULL,
  `time_zone_id` INT(11) NULL DEFAULT NULL,
  `school_address` VARCHAR(100) NOT NULL,
  `school_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`school_id`),
  INDEX `FKmmw63q4abgfsybnahm1q9we80` (`country_id` ASC),
  INDEX `FKsu0573khpx70tpi2qbcl2t3gs` (`time_zone_id` ASC),
  CONSTRAINT `FKmmw63q4abgfsybnahm1q9we80`
    FOREIGN KEY (`country_id`)
    REFERENCES `s09p12d106`.`country` (`country_id`),
  CONSTRAINT `FKsu0573khpx70tpi2qbcl2t3gs`
    FOREIGN KEY (`time_zone_id`)
    REFERENCES `s09p12d106`.`time_zone` (`time_zone_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`member`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`member` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`member` (
  `country_id` INT(11) NULL DEFAULT NULL,
  `deleted_at` BIT(1) NULL DEFAULT b'0',
  `language_id` INT(11) NULL DEFAULT NULL,
  `member_active` BIT(1) NULL DEFAULT b'0',
  `member_filter_count` INT(11) NULL DEFAULT NULL,
  `member_id` INT(11) NOT NULL AUTO_INCREMENT,
  `member_type_id` INT(11) NULL DEFAULT NULL,
  `school_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME(6) NULL DEFAULT NULL,
  `updated_at` DATETIME(6) NULL DEFAULT NULL,
  `member_mail` VARCHAR(45) NOT NULL,
  `member_name` VARCHAR(100) NOT NULL,
  `member_password` VARCHAR(100) NOT NULL,
  `refresh_token` VARCHAR(100) NULL DEFAULT NULL,
  `member_introduce` VARCHAR(200) NULL DEFAULT NULL,
  `member_image` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`member_id`),
  INDEX `FKimgxpbvyco1xw2gw8nia3f9kv` (`country_id` ASC),
  INDEX `FKpri7c3h75h17hga2383pa7m9f` (`language_id` ASC),
  INDEX `FKhy7vopt86e2jdoovh4dw4us4i` (`member_type_id` ASC),
  INDEX `FKsxpmhkgwynlgsa63v3xle1ct1` (`school_id` ASC),
  CONSTRAINT `FKhy7vopt86e2jdoovh4dw4us4i`
    FOREIGN KEY (`member_type_id`)
    REFERENCES `s09p12d106`.`member_type` (`member_type_id`),
  CONSTRAINT `FKimgxpbvyco1xw2gw8nia3f9kv`
    FOREIGN KEY (`country_id`)
    REFERENCES `s09p12d106`.`country` (`country_id`),
  CONSTRAINT `FKpri7c3h75h17hga2383pa7m9f`
    FOREIGN KEY (`language_id`)
    REFERENCES `s09p12d106`.`language` (`language_id`),
  CONSTRAINT `FKsxpmhkgwynlgsa63v3xle1ct1`
    FOREIGN KEY (`school_id`)
    REFERENCES `s09p12d106`.`school` (`school_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`book_mark`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`book_mark` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`book_mark` (
  `book_mark_id` INT(11) NOT NULL AUTO_INCREMENT,
  `member_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME(6) NULL DEFAULT NULL,
  `book_mark_ori_content` LONGTEXT NULL DEFAULT NULL,
  `book_mark_trans_content` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`book_mark_id`),
  INDEX `FKl0894dc2yqctftjaqgqyhpb34` (`member_id` ASC),
  CONSTRAINT `FKl0894dc2yqctftjaqgqyhpb34`
    FOREIGN KEY (`member_id`)
    REFERENCES `s09p12d106`.`member` (`member_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`class`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`class` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`class` (
  `group_id` INT(11) NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NULL DEFAULT NULL,
  `group_name` VARCHAR(45) NOT NULL,
  `group_image` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`group_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`dm_room`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`dm_room` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`dm_room` (
  `created_at` DATETIME(6) NULL DEFAULT NULL,
  `dm_room_id` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`dm_room_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`dm_join_member`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`dm_join_member` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`dm_join_member` (
  `dm_join_member_id` INT(11) NOT NULL AUTO_INCREMENT,
  `member_id` INT(11) NULL DEFAULT NULL,
  `dm_room_id` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`dm_join_member_id`),
  INDEX `FKra39ndqsndi8pqrvwljjpk19n` (`dm_room_id` ASC),
  INDEX `FK767semgfmmg3gtg1521plkkdg` (`member_id` ASC),
  CONSTRAINT `FK767semgfmmg3gtg1521plkkdg`
    FOREIGN KEY (`member_id`)
    REFERENCES `s09p12d106`.`member` (`member_id`),
  CONSTRAINT `FKra39ndqsndi8pqrvwljjpk19n`
    FOREIGN KEY (`dm_room_id`)
    REFERENCES `s09p12d106`.`dm_room` (`dm_room_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`exp`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`exp` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`exp` (
  `created_at` DATE NULL DEFAULT NULL,
  `exp_id` INT(11) NOT NULL AUTO_INCREMENT,
  `exp_point` INT(11) NULL DEFAULT NULL,
  `member_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`exp_id`),
  INDEX `FKhmpbd8s8xovphhc0u5v7lx5d3` (`member_id` ASC),
  CONSTRAINT `FKhmpbd8s8xovphhc0u5v7lx5d3`
    FOREIGN KEY (`member_id`)
    REFERENCES `s09p12d106`.`member` (`member_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`follower`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`follower` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`follower` (
  `follower_id` INT(11) NOT NULL AUTO_INCREMENT,
  `follower_member` INT(11) NULL DEFAULT NULL,
  `member_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME(6) NULL DEFAULT NULL,
  PRIMARY KEY (`follower_id`),
  INDEX `FKo4spd33e10w381vvfyhkt1rly` (`follower_member` ASC),
  INDEX `FKqpvsfhjepk6hom344fkmr8io5` (`member_id` ASC),
  CONSTRAINT `FKo4spd33e10w381vvfyhkt1rly`
    FOREIGN KEY (`follower_member`)
    REFERENCES `s09p12d106`.`member` (`member_id`),
  CONSTRAINT `FKqpvsfhjepk6hom344fkmr8io5`
    FOREIGN KEY (`member_id`)
    REFERENCES `s09p12d106`.`member` (`member_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`group_join_member`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`group_join_member` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`group_join_member` (
  `group_id` INT(11) NULL DEFAULT NULL,
  `group_join_member_id` INT(11) NOT NULL AUTO_INCREMENT,
  `member_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME(6) NULL DEFAULT NULL,
  PRIMARY KEY (`group_join_member_id`),
  INDEX `FKl363rfubt7ftomwxcl2rofyhq` (`group_id` ASC),
  INDEX `FK70n0orw13vynl9i33o47cv28l` (`member_id` ASC),
  CONSTRAINT `FK70n0orw13vynl9i33o47cv28l`
    FOREIGN KEY (`member_id`)
    REFERENCES `s09p12d106`.`member` (`member_id`),
  CONSTRAINT `FKl363rfubt7ftomwxcl2rofyhq`
    FOREIGN KEY (`group_id`)
    REFERENCES `s09p12d106`.`class` (`group_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`groups`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`groups` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`groups` (
  `group_id` INT(11) NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NULL DEFAULT NULL,
  `group_name` VARCHAR(45) NOT NULL,
  `group_image` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`group_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 10
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`meeting`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`meeting` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`meeting` (
  `group_req` INT(11) NULL DEFAULT NULL,
  `group_res` INT(11) NULL DEFAULT NULL,
  `meeting_id` INT(11) NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NULL DEFAULT NULL,
  `meeting_end` DATETIME(6) NULL DEFAULT NULL,
  `meeting_start` DATETIME(6) NULL DEFAULT NULL,
  PRIMARY KEY (`meeting_id`),
  INDEX `FKlswbhob9102kwtb2kymcmyrx1` (`group_req` ASC),
  INDEX `FK825oeebbag02u8gsghjvhge8q` (`group_res` ASC),
  CONSTRAINT `FK825oeebbag02u8gsghjvhge8q`
    FOREIGN KEY (`group_res`)
    REFERENCES `s09p12d106`.`class` (`group_id`),
  CONSTRAINT `FKlswbhob9102kwtb2kymcmyrx1`
    FOREIGN KEY (`group_req`)
    REFERENCES `s09p12d106`.`class` (`group_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`meeting_schedule`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`meeting_schedule` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`meeting_schedule` (
  `group_id` INT(11) NULL DEFAULT NULL,
  `meeting_schedule_id` INT(11) NOT NULL AUTO_INCREMENT,
  `meeting_schedule_end` DATETIME(6) NULL DEFAULT NULL,
  `meeting_schedule_start` DATETIME(6) NULL DEFAULT NULL,
  PRIMARY KEY (`meeting_schedule_id`),
  INDEX `FKkhpjkvd05wwpfme4s59dwhos7` (`group_id` ASC),
  CONSTRAINT `FKkhpjkvd05wwpfme4s59dwhos7`
    FOREIGN KEY (`group_id`)
    REFERENCES `s09p12d106`.`class` (`group_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`meeting_join_req`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`meeting_join_req` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`meeting_join_req` (
  `group_id` INT(11) NULL DEFAULT NULL,
  `meeting_join_req_id` INT(11) NOT NULL AUTO_INCREMENT,
  `meeting_schedule_id` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`meeting_join_req_id`),
  INDEX `FK986o5v7iuuhwvbi1q6igx1ag6` (`group_id` ASC),
  INDEX `FK2ss81ulb5a7urbwrrvc9s4092` (`meeting_schedule_id` ASC),
  CONSTRAINT `FK2ss81ulb5a7urbwrrvc9s4092`
    FOREIGN KEY (`meeting_schedule_id`)
    REFERENCES `s09p12d106`.`meeting_schedule` (`meeting_schedule_id`),
  CONSTRAINT `FK986o5v7iuuhwvbi1q6igx1ag6`
    FOREIGN KEY (`group_id`)
    REFERENCES `s09p12d106`.`class` (`group_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`member_apply`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`member_apply` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`member_apply` (
  `group_id` INT(11) NULL DEFAULT NULL,
  `member_apply_id` INT(11) NOT NULL AUTO_INCREMENT,
  `member_id` INT(11) NULL DEFAULT NULL,
  `created_at` DATETIME(6) NULL DEFAULT NULL,
  PRIMARY KEY (`member_apply_id`),
  INDEX `FKdb0nllx3p2dmuimhqxuurett` (`group_id` ASC),
  INDEX `FK6n5p4t1gue8fxwgm531s7rew8` (`member_id` ASC),
  CONSTRAINT `FK6n5p4t1gue8fxwgm531s7rew8`
    FOREIGN KEY (`member_id`)
    REFERENCES `s09p12d106`.`member` (`member_id`),
  CONSTRAINT `FKdb0nllx3p2dmuimhqxuurett`
    FOREIGN KEY (`group_id`)
    REFERENCES `s09p12d106`.`class` (`group_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`message` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`message` (
  `member_id` INT(11) NULL DEFAULT NULL,
  `message_id` INT(11) NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NULL DEFAULT NULL,
  `dm_room_id` VARCHAR(100) NULL DEFAULT NULL,
  `message_content` LONGTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`message_id`),
  INDEX `FKtc0hp7tse676xfow0ym0jegax` (`dm_room_id` ASC),
  INDEX `FK4msccpwmxulmw875edu7p352d` (`member_id` ASC),
  CONSTRAINT `FK4msccpwmxulmw875edu7p352d`
    FOREIGN KEY (`member_id`)
    REFERENCES `s09p12d106`.`member` (`member_id`),
  CONSTRAINT `FKtc0hp7tse676xfow0ym0jegax`
    FOREIGN KEY (`dm_room_id`)
    REFERENCES `s09p12d106`.`dm_room` (`dm_room_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`small_group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`small_group` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`small_group` (
  `meeting_id` INT(11) NULL DEFAULT NULL,
  `small_group_id` INT(11) NOT NULL AUTO_INCREMENT,
  `small_group_name` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`small_group_id`),
  INDEX `FK9s5nifp0k8afqaktgaihk8a35` (`meeting_id` ASC),
  CONSTRAINT `FK9s5nifp0k8afqaktgaihk8a35`
    FOREIGN KEY (`meeting_id`)
    REFERENCES `s09p12d106`.`meeting` (`meeting_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`small_group_member`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`small_group_member` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`small_group_member` (
  `member_id` INT(11) NULL DEFAULT NULL,
  `small_group_id` INT(11) NULL DEFAULT NULL,
  `small_group_member_id` INT(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`small_group_member_id`),
  INDEX `FKauygn55gve3ey7kww1mh21m3m` (`member_id` ASC),
  INDEX `FKn235iv75x7wcqe1hnvpapyryh` (`small_group_id` ASC),
  CONSTRAINT `FKauygn55gve3ey7kww1mh21m3m`
    FOREIGN KEY (`member_id`)
    REFERENCES `s09p12d106`.`member` (`member_id`),
  CONSTRAINT `FKn235iv75x7wcqe1hnvpapyryh`
    FOREIGN KEY (`small_group_id`)
    REFERENCES `s09p12d106`.`small_group` (`small_group_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `s09p12d106`.`uncheck_message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12d106`.`uncheck_message` ;

CREATE TABLE IF NOT EXISTS `s09p12d106`.`uncheck_message` (
  `member_id` INT(11) NULL DEFAULT NULL,
  `message_id` INT(11) NULL DEFAULT NULL,
  `uncheck_message_id` INT(11) NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME(6) NULL DEFAULT NULL,
  `dm_room_id` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`uncheck_message_id`),
  INDEX `FK2gjd7p4ak9csb50egqi82ahki` (`dm_room_id` ASC),
  INDEX `FK6n99f63b0uh85mmfqdet2yrfa` (`member_id` ASC),
  INDEX `FKqga7bm43x9jhgoy86frgu2v` (`message_id` ASC),
  CONSTRAINT `FK2gjd7p4ak9csb50egqi82ahki`
    FOREIGN KEY (`dm_room_id`)
    REFERENCES `s09p12d106`.`dm_room` (`dm_room_id`),
  CONSTRAINT `FK6n99f63b0uh85mmfqdet2yrfa`
    FOREIGN KEY (`member_id`)
    REFERENCES `s09p12d106`.`member` (`member_id`),
  CONSTRAINT `FKqga7bm43x9jhgoy86frgu2v`
    FOREIGN KEY (`message_id`)
    REFERENCES `s09p12d106`.`message` (`message_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
