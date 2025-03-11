-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dtl_coffeeshop_2025
-- ------------------------------------------------------
-- Server version	8.0.40
CREATE DATABASE IF NOT EXISTS `dtl_coffeeshop_2025`;

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
-- Table structure for table `dtl_categories`
--

DROP TABLE IF EXISTS `dtl_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtl_categories` (
  `CategoryID` int NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`CategoryID`),
  UNIQUE KEY `CategoryName` (`CategoryName`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtl_categories`
--

LOCK TABLES `dtl_categories` WRITE;
/*!40000 ALTER TABLE `dtl_categories` DISABLE KEYS */;
INSERT INTO `dtl_categories` VALUES (1,'Cà phê 127','Các loại cà phê truyền thống và đặc biệt','2025-02-26 21:07:35','2025-03-05 07:19:02','Inactive'),(2,'Trà','Các loại trà thơm ngon','2025-02-26 21:07:35','2025-02-26 21:07:35','Active');
/*!40000 ALTER TABLE `dtl_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dtl_inventory`
--

DROP TABLE IF EXISTS `dtl_inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtl_inventory` (
  `InventoryID` int NOT NULL AUTO_INCREMENT,
  `ProductID` int DEFAULT NULL,
  `Quantity` int NOT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`InventoryID`),
  UNIQUE KEY `ProductID` (`ProductID`),
  CONSTRAINT `dtl_inventory_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `dtl_products` (`ProductID`) ON DELETE CASCADE,
  CONSTRAINT `dtl_inventory_chk_1` CHECK ((`Quantity` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtl_inventory`
--

LOCK TABLES `dtl_inventory` WRITE;
/*!40000 ALTER TABLE `dtl_inventory` DISABLE KEYS */;
/*!40000 ALTER TABLE `dtl_inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dtl_orderdetails`
--

DROP TABLE IF EXISTS `dtl_orderdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtl_orderdetails` (
  `OrderDetailID` int NOT NULL AUTO_INCREMENT,
  `OrderID` int DEFAULT NULL,
  `ProductID` int DEFAULT NULL,
  `Quantity` int NOT NULL,
  `UnitPrice` decimal(38,2) NOT NULL,
  `Discount` decimal(38,2) DEFAULT NULL,
  `Subtotal` decimal(38,2) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`OrderDetailID`),
  KEY `OrderID` (`OrderID`),
  KEY `ProductID` (`ProductID`),
  CONSTRAINT `dtl_orderdetails_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `dtl_orders` (`OrderID`) ON DELETE CASCADE,
  CONSTRAINT `dtl_orderdetails_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `dtl_products` (`ProductID`) ON DELETE CASCADE,
  CONSTRAINT `dtl_orderdetails_chk_1` CHECK ((`Quantity` > 0)),
  CONSTRAINT `dtl_orderdetails_chk_2` CHECK ((`UnitPrice` >= 0)),
  CONSTRAINT `dtl_orderdetails_chk_3` CHECK ((`Discount` between 0 and 100))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtl_orderdetails`
--

LOCK TABLES `dtl_orderdetails` WRITE;
/*!40000 ALTER TABLE `dtl_orderdetails` DISABLE KEYS */;
/*!40000 ALTER TABLE `dtl_orderdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dtl_orders`
--

DROP TABLE IF EXISTS `dtl_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtl_orders` (
  `OrderID` int NOT NULL AUTO_INCREMENT,
  `UserID` int DEFAULT NULL,
  `OrderDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `TotalAmount` decimal(38,2) NOT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `Notes` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`OrderID`),
  KEY `UserID` (`UserID`),
  CONSTRAINT `dtl_orders_ibfk_2` FOREIGN KEY (`UserID`) REFERENCES `dtl_users` (`UserID`) ON DELETE SET NULL,
  CONSTRAINT `dtl_orders_chk_1` CHECK ((`TotalAmount` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtl_orders`
--

LOCK TABLES `dtl_orders` WRITE;
/*!40000 ALTER TABLE `dtl_orders` DISABLE KEYS */;
INSERT INTO `dtl_orders` VALUES (1,1,NULL,122.00,'Completed','333','2025-03-05 10:23:40','2025-03-05 10:23:40');
/*!40000 ALTER TABLE `dtl_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dtl_products`
--

DROP TABLE IF EXISTS `dtl_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtl_products` (
  `ProductID` int NOT NULL AUTO_INCREMENT,
  `ProductName` varchar(255) NOT NULL,
  `CategoryID` int DEFAULT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `Price` decimal(38,2) NOT NULL,
  `ImageURL` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ProductID`),
  KEY `CategoryID` (`CategoryID`),
  CONSTRAINT `dtl_products_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `dtl_categories` (`CategoryID`) ON DELETE SET NULL,
  CONSTRAINT `dtl_products_chk_1` CHECK ((`Price` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtl_products`
--

LOCK TABLES `dtl_products` WRITE;
/*!40000 ALTER TABLE `dtl_products` DISABLE KEYS */;
/*!40000 ALTER TABLE `dtl_products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dtl_promotions`
--

DROP TABLE IF EXISTS `dtl_promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtl_promotions` (
  `PromotionID` int NOT NULL AUTO_INCREMENT,
  `PromotionName` varchar(255) NOT NULL,
  `Description` varchar(255) DEFAULT NULL,
  `DiscountRate` decimal(38,2) NOT NULL,
  `StartDate` date DEFAULT NULL,
  `EndDate` date DEFAULT NULL,
  `Status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`PromotionID`),
  UNIQUE KEY `PromotionName` (`PromotionName`),
  CONSTRAINT `dtl_promotions_chk_1` CHECK ((`DiscountRate` between 0 and 100)),
  CONSTRAINT `dtl_promotions_chk_2` CHECK ((`EndDate` > `StartDate`))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtl_promotions`
--

LOCK TABLES `dtl_promotions` WRITE;
/*!40000 ALTER TABLE `dtl_promotions` DISABLE KEYS */;
INSERT INTO `dtl_promotions` VALUES (1,'2','33',2.00,'2025-03-03','2025-03-28','Active');
/*!40000 ALTER TABLE `dtl_promotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dtl_reservations`
--

DROP TABLE IF EXISTS `dtl_reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtl_reservations` (
  `ReservationID` int NOT NULL AUTO_INCREMENT,
  `CustomerID` int DEFAULT NULL,
  `TableID` int DEFAULT NULL,
  `ReservationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `NumberOfGuests` int NOT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `Notes` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ReservationID`),
  KEY `CustomerID` (`CustomerID`),
  KEY `TableID` (`TableID`),
  CONSTRAINT `dtl_reservations_ibfk_1` FOREIGN KEY (`CustomerID`) REFERENCES `dtl_users` (`UserID`) ON DELETE SET NULL,
  CONSTRAINT `dtl_reservations_ibfk_2` FOREIGN KEY (`TableID`) REFERENCES `dtl_tables` (`TableID`) ON DELETE CASCADE,
  CONSTRAINT `dtl_reservations_chk_1` CHECK ((`NumberOfGuests` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtl_reservations`
--

LOCK TABLES `dtl_reservations` WRITE;
/*!40000 ALTER TABLE `dtl_reservations` DISABLE KEYS */;
/*!40000 ALTER TABLE `dtl_reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dtl_tables`
--

DROP TABLE IF EXISTS `dtl_tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtl_tables` (
  `TableID` int NOT NULL AUTO_INCREMENT,
  `TableName` varchar(255) NOT NULL,
  `Capacity` int NOT NULL,
  `Status` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`TableID`),
  UNIQUE KEY `TableName` (`TableName`),
  CONSTRAINT `dtl_tables_chk_1` CHECK ((`Capacity` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtl_tables`
--

LOCK TABLES `dtl_tables` WRITE;
/*!40000 ALTER TABLE `dtl_tables` DISABLE KEYS */;
/*!40000 ALTER TABLE `dtl_tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dtl_users`
--

DROP TABLE IF EXISTS `dtl_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dtl_users` (
  `UserID` int NOT NULL AUTO_INCREMENT,
  `Username` varchar(255) NOT NULL,
  `PasswordHash` varchar(255) NOT NULL,
  `FullName` varchar(255) NOT NULL,
  `Role` enum('CUSTOMER','ADMIN','EMPLOYEE') NOT NULL,
  `PhoneNumber` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Status` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `PhoneNumber` (`PhoneNumber`),
  UNIQUE KEY `Email` (`Email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtl_users`
--

LOCK TABLES `dtl_users` WRITE;
/*!40000 ALTER TABLE `dtl_users` DISABLE KEYS */;
INSERT INTO `dtl_users` VALUES (1,'admin','hashed_password_1','Nguyễn Văn Admin','ADMIN','0911111111','admin@gmail.com','Hà Nội','2025-02-26 21:07:35','2025-02-28 09:21:36','Active'),(2,'staff1','hashed_password_2','Trần Thị Nhân Viên 1','EMPLOYEE','0922222222','staff1@gmail.com','TP.HCM','2025-02-26 21:07:35','2025-02-28 09:39:36','Active'),(3,'customer1','hashed_password_3','Lê Thị Khách Hàng','CUSTOMER','0933333333','customer1@gmail.com','Đà Nẵng','2025-02-26 21:07:35','2025-02-28 09:21:36','Active'),(4,'testuser','$2a$10$XRJP4dfrhsYHYOD6AF.u0eyBeOqroF0iUA55T.ZQYCiBacHpYq8WS','Test User','CUSTOMER',NULL,'testuser@example.com',NULL,'2025-02-27 20:20:04','2025-02-27 20:20:04','Active'),(5,'LongAdminmeomeo','$2a$10$XnTWVh/OuHYJS4t85w02NuNpt9ZpyqRYbqStjHokKSKleFuX79c8C','Long','ADMIN',NULL,'LongMeoMeo@gmail.com',NULL,'2025-02-27 20:48:32','2025-02-27 20:48:32','Active'),(6,'Lanlala','$2a$10$pgQOjnTH1/zj8uYUUe8p8O5kpPhdxeJXv1/9uAAbVBmcvqtuzZ0zW','Long','ADMIN',NULL,'Lanlala@gmail.com',NULL,'2025-03-02 13:59:49','2025-03-02 13:59:49','Active'),(7,'lasnguyen06','$2a$10$LwUpV7uATc.4ezeopZ7.Uuu8UZd8xHNcNvPuOob9fxxBDZ9oIjn3a','Rhito','ADMIN',NULL,'lasnguyen06@gmail.com',NULL,'2025-03-02 18:34:02','2025-03-03 08:59:13','Active'),(8,'las','$2a$10$PzDnqkkZGdP5Mf38oAA84.2k6xfyWqNdS8XHx5Mljk18xTnpwTYey','Rhito123','ADMIN',NULL,'lasnguyen@gmail.com',NULL,'2025-03-03 09:03:31','2025-03-05 00:05:50',NULL);
/*!40000 ALTER TABLE `dtl_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-07  9:57:10
