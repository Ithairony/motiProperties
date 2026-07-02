-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: moti_properties_db
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `applicationID` int NOT NULL AUTO_INCREMENT,
  `tenantID` int DEFAULT NULL,
  `propertyID` int DEFAULT NULL,
  `status` varchar(255) DEFAULT 'pending',
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `occupation` varchar(255) NOT NULL,
  `monthlyIncome` decimal(10,2) NOT NULL,
  PRIMARY KEY (`applicationID`),
  KEY `tenantID` (`tenantID`),
  KEY `propertyID` (`propertyID`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`tenantID`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`propertyID`) REFERENCES `properties` (`propertyID`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (1,NULL,NULL,'pending','Igor ','Tha','ithairony21@gmail.com','+3530830110692','Chef',3000.00),(2,NULL,NULL,'pending','Igor','Oliveira','ithairony21@gmail.com','+353 83 011 0692','Developer',3000.00);
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `properties`
--

DROP TABLE IF EXISTS `properties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `properties` (
  `propertyID` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `price` int NOT NULL,
  `landlordID` int NOT NULL,
  `propertyType` enum('House','Apartment') DEFAULT NULL,
  `imageURL` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`propertyID`),
  KEY `landlordID` (`landlordID`),
  CONSTRAINT `properties_ibfk_1` FOREIGN KEY (`landlordID`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `properties`
--

LOCK TABLES `properties` WRITE;
/*!40000 ALTER TABLE `properties` DISABLE KEYS */;
INSERT INTO `properties` VALUES (10,'123 Main Street, Dublin','Modern 2-bedroom apartment in the city center.',1500,100,'Apartment','apartmentOne.jpg'),(11,'45 Oak Drive, Galway','Spacious 3-bedroom house with garden and garage.',2200,100,'House','houseOne.jpg'),(12,'78 River Road, Cork','Cozy 1-bedroom apartment near riverbank.',900,101,'Apartment','apartmentTwo.jpg'),(13,'90 Greenway Lane, Limerick','Detached 4-bedroom family house with backyard.',2800,101,'House','houseTwo.jpg'),(14,'22 Castle Street, Kilkenny','Historic 2-bedroom apartment with modern features.',1700,102,'Apartment','apartmentThree.jpg'),(15,'7 Seaside Ave, Waterford','3-bedroom house with sea view and large garden.',2500,103,'House','houseThree.jpg');
/*!40000 ALTER TABLE `properties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('landlord','tenant','admin') NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (100,'Igor','ithairony21@gmail.com','$2b$10$ZAWe9TNfDVilgNo17DxBzu46iJZ5i4Ldbn3xiTfVIyhRvK37aMemi','landlord'),(101,'Ana Costa','ana@example.com','$2b$10$eImG6OX5D3rHTLALFx4uieLwOKujx9fEK7JeN7XY7PtOtrgh51J2G','landlord'),(102,'Bruno Silva','bruno@example.com','$2b$10$eImG6OX5D3rHTLALFx4uieLwOKujx9fEK7JeN7XY7PtOtrgh51J2G','landlord'),(103,'Carla Mendes','carla@example.com','$2b$10$eImG6OX5D3rHTLALFx4uieLwOKujx9fEK7JeN7XY7PtOtrgh51J2G','landlord'),(104,'Joao','joao12@gmail.com','$2b$10$Aij71rIus.M4k.rHYFPS/OrsPfAGqlgEMSaJLyJOOSnMnPZr7QHuq','tenant'),(105,'Magu','imagu10@gmail.com','$2b$10$lU1ZJvbC8n/x8N9pmfCO1ehzh6AR65UKKMpLOGuRk2kLeJrjBYoJC','tenant');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-12 21:30:41
