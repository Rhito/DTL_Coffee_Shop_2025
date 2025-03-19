-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: dtl_coffeeshop_2025
-- ------------------------------------------------------
-- Server version	8.0.40

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtl_categories`
--

LOCK TABLES `dtl_categories` WRITE;
/*!40000 ALTER TABLE `dtl_categories` DISABLE KEYS */;
INSERT INTO `dtl_categories` VALUES (4,'Espresso','This is a very popular coffee in Italy and Spain. To get a cup of “genuine” Espresso, people have to roast those dark coffee beans and grind them very finely, then process them by using hot water compressed under high pressure. ','2025-03-07 19:09:29','2025-03-07 19:09:29','Active'),(5,'	Mocha Coffee','Mocha has a strong coffee flavor, a distinctive chocolate aroma and sometimes a hint of milk sweetness.','2025-03-08 09:54:35','2025-03-08 09:54:47','Active'),(6,'Latte','Latte has a light, soft coffee flavor, combined with the aroma of steamed milk and a layer of smooth milk foam.','2025-03-08 09:55:34','2025-03-08 09:55:34','Active'),(7,'Americano','Americano has a strong coffee flavor, similar to espresso but more diluted, without chocolate or milk.','2025-03-08 09:56:35','2025-03-08 09:56:35','Active'),(8,'Cappuccino','Cappuccino is a rich coffee drink, combining espresso, steamed milk and a generous layer of milk foam. It usually has a distinct coffee aroma and a light milky aroma.','2025-03-08 09:57:14','2025-03-08 09:57:14','Active');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtl_orderdetails`
--

LOCK TABLES `dtl_orderdetails` WRITE;
/*!40000 ALTER TABLE `dtl_orderdetails` DISABLE KEYS */;
INSERT INTO `dtl_orderdetails` VALUES (9,1,46,12,12.00,1.00,32.00,'2025-03-13 07:39:58','2025-03-13 07:39:58'),(10,1,48,1,1.00,1.00,1.00,'2025-03-13 07:43:55','2025-03-13 07:43:55');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtl_orders`
--

LOCK TABLES `dtl_orders` WRITE;
/*!40000 ALTER TABLE `dtl_orders` DISABLE KEYS */;
INSERT INTO `dtl_orders` VALUES (1,1,NULL,122.00,'Completed','333','2025-03-05 10:23:40','2025-03-05 10:23:40'),(3,1,NULL,1.00,'Completed','1','2025-03-13 11:27:15','2025-03-13 11:27:15');
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
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtl_products`
--

LOCK TABLES `dtl_products` WRITE;
/*!40000 ALTER TABLE `dtl_products` DISABLE KEYS */;
INSERT INTO `dtl_products` VALUES (45,' Mocha with crushed ice',5,'What could be better than sipping an iced mocha on a hot day? It quenches your thirst and clears your mind!',1.58,'/images/1bdcd791-eeb4-49e0-9a72-523d5b352291_cach-lam-mocha-da.jpg','2025-03-08 10:03:45','2025-03-08 10:03:45','Active'),(46,'Rich Americano',7,'If Italian Espresso is often quite strong and a bit difficult to drink, Americano cups are changed to help diners find it easier to drink.',0.99,'/images/fe1970b6-49ac-4b2c-b0c9-4690de8ce4ff_americano-la-gi-nguon-goc-cach-pha-americano-don-gian-va-avt-1200x676.jpg','2025-03-08 10:08:24','2025-03-08 10:09:05','Active'),(47,'Espresso Con Panna',4,'Cafe Espresso Con Panna is an espresso with whipping cream on top. The feeling is hard to describe when you start to taste the rich sweetness of fresh milk cream combined with the delicate caramel flavor of Espresso.',4.30,'/images/9d5942df-67f8-4fd7-9109-455ec86b483b_Espresso_con_panna.JPG','2025-03-08 10:11:56','2025-03-08 10:11:56','Active'),(48,'Cappuccino Viennese​',8,'Viennese Cappuccino is the perfect combination of Cappuccino and whipped cream for coffee lovers.',5.60,'/images/ae27cb69-3159-4acc-b478-1d3c5c9592c8_maxresdefault.jpg','2025-03-08 10:15:18','2025-03-18 17:25:24','Active'),(49,'Latte Coffee',6,'A drink of Italian origin consisting of coffee and whipped milk as its main ingredients, this drink is consumed regularly both at home and in cafes and bars.',3.20,'/images/a57159ec-30e2-4fda-a66e-b6cfb6b1f84a_Latte_at_Doppio_Ristretto_Chiang_Mai_01.jpg','2025-03-08 10:21:02','2025-03-08 10:21:02','Active'),(55,'Hot Mocha Coffee',5,'Hot Mocha coffee has the light bitterness of coffee, the sweetness of milk, the richness of fresh milk and the aroma of chocolate. This is a delicious, attractive drink, suitable for all ages.',2.30,'/images/f395aff8-4eef-40be-b0f0-5bbe69e6d6eb_cach-lam-mocha-nong.jpg','2025-03-12 21:43:26','2025-03-18 17:18:21','Active'),(56,'Ciamon Maple Capuchino',8,'There’s a new contender for the flavor-of-the-season crown.',6.80,'/images/7c2fbfd5-d0a0-4e28-b53f-129119de1e07_ciamon-maple-capuchino.jpg','2025-03-18 17:23:24','2025-03-18 17:23:24','Active'),(57,'Cappuccino Blend',8,'Cappuccino Blend give you a nice warm day',3.45,'/images/907919de-5593-4ac0-907a-286f510fc11a_Cappuccino-Blend.jpg','2025-03-18 17:30:12','2025-03-18 17:30:37','Active');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtl_reservations`
--

LOCK TABLES `dtl_reservations` WRITE;
/*!40000 ALTER TABLE `dtl_reservations` DISABLE KEYS */;
INSERT INTO `dtl_reservations` VALUES (7,NULL,NULL,'2025-03-17 11:17:00',1,NULL,'abc','2025-03-17 11:17:30','2025-03-17 11:17:30');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtl_tables`
--

LOCK TABLES `dtl_tables` WRITE;
/*!40000 ALTER TABLE `dtl_tables` DISABLE KEYS */;
INSERT INTO `dtl_tables` VALUES (2,'01',6,'Available','2025-03-12 19:57:43','2025-03-12 19:57:43');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dtl_users`
--

LOCK TABLES `dtl_users` WRITE;
/*!40000 ALTER TABLE `dtl_users` DISABLE KEYS */;
INSERT INTO `dtl_users` VALUES (1,'admin','hashed_password_1','Nguyễn Văn Admin','ADMIN','0911111111','admin@gmail.com','Hà Nội','2025-02-26 21:07:35','2025-02-28 09:21:36','Active'),(2,'staff1','hashed_password_2','Trần Thị Nhân Viên 1','EMPLOYEE','0922222222','staff1@gmail.com','TP.HCM','2025-02-26 21:07:35','2025-02-28 09:39:36','Active'),(3,'customer1','hashed_password_3','Lê Thị Khách Hàng','CUSTOMER','0933333333','customer1@gmail.com','Đà Nẵng','2025-02-26 21:07:35','2025-02-28 09:21:36','Active'),(4,'testuser','$2a$10$XRJP4dfrhsYHYOD6AF.u0eyBeOqroF0iUA55T.ZQYCiBacHpYq8WS','Test User','CUSTOMER',NULL,'testuser@example.com',NULL,'2025-02-27 20:20:04','2025-02-27 20:20:04','Active'),(5,'LongAdminmeomeo','$2a$10$XnTWVh/OuHYJS4t85w02NuNpt9ZpyqRYbqStjHokKSKleFuX79c8C','Long','ADMIN',NULL,'LongMeoMeo@gmail.com',NULL,'2025-02-27 20:48:32','2025-02-27 20:48:32','Active'),(6,'Lanlala','$2a$10$pgQOjnTH1/zj8uYUUe8p8O5kpPhdxeJXv1/9uAAbVBmcvqtuzZ0zW','Long','ADMIN',NULL,'Lanlala@gmail.com',NULL,'2025-03-02 13:59:49','2025-03-02 13:59:49','Active'),(7,'lasnguyen06','$2a$10$LwUpV7uATc.4ezeopZ7.Uuu8UZd8xHNcNvPuOob9fxxBDZ9oIjn3a','Rhito','ADMIN',NULL,'lasnguyen06@gmail.com',NULL,'2025-03-02 18:34:02','2025-03-03 08:59:13','Active'),(8,'las','$2a$10$PzDnqkkZGdP5Mf38oAA84.2k6xfyWqNdS8XHx5Mljk18xTnpwTYey','Rhito123','ADMIN',NULL,'lasnguyen@gmail.com',NULL,'2025-03-03 09:03:31','2025-03-05 00:05:50',NULL),(10,'lalala','$2a$10$tKPsJ5Pt5RP6SYMKVKJy2udwjMrhPoYf97NqFNvOMCzMulaVAUwaG','lalala','CUSTOMER',NULL,'lalala123@gmail.com',NULL,'2025-03-17 11:37:33','2025-03-17 11:37:33','Active');
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

-- Dump completed on 2025-03-19  7:44:50
