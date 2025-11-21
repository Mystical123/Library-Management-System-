-- MySQL dump 10.13  Distrib 9.5.0, for macos15.4 (arm64)
--
-- Host: localhost    Database: book_catalog
-- ------------------------------------------------------
-- Server version	9.5.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '25eb57a8-c186-11f0-897b-ca69b036005c:1-14';

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) DEFAULT NULL,
  `genre` varchar(100) DEFAULT NULL,
  `year_published` int DEFAULT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,'Can\'t Hurt Me','David Goggins','Motivational',2018,'9781544512280','For David Goggins, childhood was a nightmare -- poverty, prejudice, and physical abuse colored his days and haunted his nights. But through self-discipline, mental toughness, and hard work, Goggins transformed himself from a depressed, overweight young man with no future into a U.S. Armed Forces icon and one of the world\'s top endurance athletes.','https://m.media-amazon.com/images/I/81YJFNc54lL._SY522_.jpg'),(2,'Atomic Habits','James Clear','Self Help',2018,'9780735211292','If you\'re having trouble changing your habits, the problem isn\'t you. The problem is your system. Bad habits repeat themselves again and again not because you don\'t want to change, but because you have the wrong system for change. You do not rise to the level of your goals. You fall to the level of your systems. Here, you\'ll get a proven system that can take you to new heights.','https://m.media-amazon.com/images/I/71F4+7rk2eL._AC_UY436_FMwebp_QL65_.jpg'),(3,'No Longer Human','Osamu Dazai','Fiction',1973,'9780811204811','The poignant and fascinating story of a young man who is caught between the breakup of the traditions of a northern Japanese aristocratic family and the impact of Western ideas. Portraying himself as a failure, the protagonist of Osamu Dazai\'s No Longer Human narrates a seemingly normal','https://m.media-amazon.com/images/I/31mY8ZQ+jEL._SY445_SX342_FMwebp_.jpg'),(4,'Crime and Punishment','Fyodor Dostoevsky','Crime Fiction',1993,'9780679734505','In Crime and Punishment, when Raskolnikov, an impoverished student living in the St. Petersburg of the tsars, commits an act of murder and theft, he sets into motion a story that is almost unequalled in world literature for its excruciating suspense, its atmospheric vividness, and its depth of characterization and vision.','https://m.media-amazon.com/images/I/31Q3Lt4ir3L._SY445_SX342_FMwebp_.jpg'),(5,'The Psychology of Money','Morgan Housel','Business',2020,'9780857197689','Doing well with money isn\'t necessarily about what you know. It\'s about how you behave. And behavior is hard to teach, even to really smart people. Money―investing, personal finance, and business decisions―is typically taught as a math-based field, where data and formulas tell us exactly what to do. But in the real world people don’t make financial decisions on a spreadsheet. They make them at the dinner table, or in a meeting room, where personal history, your own unique view of the world, ego, pride, marketing, and odd incentives are scrambled together.','https://m.media-amazon.com/images/I/81gC3mdNi5L._SY522_.jpg'),(6,'Head First Java, 2nd Edition','Kathy Sierra, Bert Bates','Computer Science',2005,'9780596009205','Head First Java combines puzzles, strong visuals, mysteries, and soul-searching interviews with famous Java objects to engage you in many different ways. It\'s fast, it\'s fun, and it\'s effective. The new second edition focuses on Java 5.0, the latest version of the Java language and development platform.','https://m.media-amazon.com/images/I/9155wsDnIFL._SY466_.jpg'),(7,'Python Crash Course, 2nd Edition','Eric Matthes','Computer Science',2019,'9781593279288','Even if you have no experience whatsoever, Python Crash Course, 2nd Edition, will have you writing programs, solving problems, building computer games, and creating data visualizations in no time. You\'ll begin with basic concepts like variables, lists, classes, and loops—with fun skill-strengthening exercises for every topic.','https://m.media-amazon.com/images/I/71pys4B4OVL._SY522_.jpg'),(8,'The Innovators','Walter Isaacson','Autobiography',2015,'9781476708706','The Innovators is a masterly saga of collaborative genius destined to be the standard history of the digital revolution—and an indispensable guide to how innovation really happens. Isaacson explores fascinating personalities who created our current digital revolution, such as Ada Lovelace, Alan Turing, Bill Gates, Steve Jobs, and more.','https://m.media-amazon.com/images/I/71zcV2aQrQL._SY522_.jpg'),(9,'Outlive','Peter Attia MD','Health',2023,'9780593236598','Wouldn’t you like to live longer? In this operating manual for longevity, Dr. Peter Attia draws on the latest science to deliver innovative nutritional interventions, techniques for optimizing exercise and sleep, and tools for addressing emotional and mental health.','https://m.media-amazon.com/images/I/71X9FMy66NL._SY522_.jpg'),(10,'The Alchemist','Paulo Coelho','Adventure',2014,'9780062315007','This story, dazzling in its powerful simplicity and soul-stirring wisdom, is about an Andalusian shepherd boy named Santiago who travels to the Egyptian desert in search of treasure. Along the way, he meets a Gypsy woman, a king, and an alchemist, discovering the treasure within.','https://m.media-amazon.com/images/I/71+2-t7M35L._SY522_.jpg');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `book_id` int NOT NULL,
  `added_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ux_book` (`book_id`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'book_catalog'
--

--
-- Dumping routines for database 'book_catalog'
--
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-20 16:36:41
