-- MySQL dump 10.13  Distrib 8.0.25, for Linux (x86_64)
--
-- Host: localhost    Database: gallery_db
-- ------------------------------------------------------
-- Server version	8.0.25-0ubuntu0.20.10.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `gallery_images`
--

CREATE SCHEMA `gallery_db`;

USE `gallery_db`;

--
-- Dumping data for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(80) NOT NULL,
  `is_active` int DEFAULT 1,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
    `access_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'asmshaon','$2y$13$P7EJ3TYdf3.uTCsUTSGeTuf4wtfsFXHmmPgMIKZwU9ps.qV9Wi0tK','test.php@gmail.com',1,'2021-06-03 00:00:00','2021-06-03 00:00:00','null');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

CREATE TABLE `gallery_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `url` varchar(255) NOT NULL,
  `user_id` int NOT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `gallery_images` WRITE;
/*!40000 ALTER TABLE `gallery_images` DISABLE KEYS */;
INSERT INTO `gallery_images` VALUES (37,'img_1623391939.jpg','https://dev-speshe-assets.s3.ap-southeast-1.amazonaws.com/gallery/1/img_1623391939.jpg',1,'2021-06-11 06:12:24'),(38,'img_1623392154.jpeg','https://dev-speshe-assets.s3.ap-southeast-1.amazonaws.com/gallery/1/img_1623392154.jpeg',1,'2021-06-11 06:15:57'),(39,'img_1623393412.jpeg','https://dev-speshe-assets.s3.ap-southeast-1.amazonaws.com/gallery/1/img_1623393412.jpeg',1,'2021-06-11 06:36:53'),(40,'img_1623393865.jpeg','https://dev-speshe-assets.s3.ap-southeast-1.amazonaws.com/gallery/1/img_1623393865.jpeg',1,'2021-06-11 06:44:27'),(41,'img_1623397972.jpeg','https://dev-speshe-assets.s3.ap-southeast-1.amazonaws.com/gallery/1/img_1623397972.jpeg',1,'2021-06-11 07:52:53'),(42,'img_1623398255.jpeg','https://dev-speshe-assets.s3.ap-southeast-1.amazonaws.com/gallery/1/img_1623398255.jpeg',1,'2021-06-11 07:57:35'),(43,'img_1623398352.jpeg','https://dev-speshe-assets.s3.ap-southeast-1.amazonaws.com/gallery/1/img_1623398352.jpeg',1,'2021-06-11 07:59:13'),(44,'img_1623398473.jpeg','https://dev-speshe-assets.s3.ap-southeast-1.amazonaws.com/gallery/1/img_1623398473.jpeg',1,'2021-06-11 08:01:14');
/*!40000 ALTER TABLE `gallery_images` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-11 15:51:05
