-- MySQL dump 10.13  Distrib 5.6.22, for osx10.9 (x86_64)
--
-- Host: localhost    Database: lark
-- ------------------------------------------------------
-- Server version	5.6.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lark_show`
--

DROP TABLE IF EXISTS `lark_show`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lark_show` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `url` varchar(2000) NOT NULL,
  `er` varchar(2000) NOT NULL,
  `img` varchar(2000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lark_show`
--

LOCK TABLES `lark_show` WRITE;
/*!40000 ALTER TABLE `lark_show` DISABLE KEYS */;
INSERT INTO `lark_show` VALUES (8,'俄罗斯方块','http://mlab2.meilishuo.com/lark/diamond/','','/diamond.png'),(9,'关灯游戏','http://mlab2.meilishuo.com/lark/close/','','/close.png'),(10,'找块快','http://mlab2.meilishuo.com/lark/cubeFind/','','/cubeFind.png'),(11,'记忆翻牌','http://mlab2.meilishuo.com/lark/memory/','','http://d04.res.meilishuo.net/pic/_o/3b/47/deabd0aa7a790f5968bbc136d0ca_580_344.cg.jpg'),(12,'疯狂的手指','http://mlab2.meilishuo.com/lark/crazyFinger/','','http://d04.res.meilishuo.net/pic/_o/1e/28/a2e4de228fb26f022cc3a5b4e099_550_280.ch.jpg'),(13,'一个都不能死','http://mlab2.meilishuo.com/lark/live/','','http://d02.res.meilishuo.net/pic/_o/33/b6/94bd4157f43d7ecd316b4ec50b06_537_307.cf.jpg'),(14,'摇一摇','http://mlab2.meilishuo.com/lark/shake/','','http://d05.res.meilishuo.net/pic/_o/e7/4f/a861cb152c0ea01d2a1e5121a3aa_552_245.cf.jpg'),(15,'点划高手','http://mlab2.meilishuo.com/lark/znm/','','http://d03.res.meilishuo.net/pic/_o/02/e3/3815971ae58f4cc6cd675ec1a4af_555_313.cg.jpg'),(16,'别踩白块','http://mlab2.meilishuo.com/lark/whiteBlock/','','http://d02.res.meilishuo.net/pic/_o/8f/35/59862c9a850009a598b19fa1c460_550_298.cg.jpg'),(17,'图片水印','http://mlab2.meilishuo.com/lark/filter/','','http://d04.res.meilishuo.net/pic/_o/da/71/d69f39f849990c12e06cd7a46a54_550_245.ch.jpg'),(18,'拼图','http://mlab2.meilishuo.com/lark/pt/','','http://d05.res.meilishuo.net/pic/_o/f5/41/bd31c33b28d143a0e818b48c9987_550_270.ch.jpg'),(19,'街霸','http://mlab2.meilishuo.com/lark/ko/','','http://d02.res.meilishuo.net/pic/_o/04/20/2f200853014ae4de645909aab7ee_548_240.cf.jpg'),(20,'文字游戏','http://mlab2.meilishuo.com/lark/textgame/','','http://d04.res.meilishuo.net/pic/_o/04/0c/1fad071b6b8935ab5d26dc967e54_550_253.cf.jpg'),(21,'打地鼠','http://mlab2.meilishuo.com/lark/ground/','','http://d04.res.meilishuo.net/pic/_o/4d/cf/80d0e005f1cfcf2c12fc6a700963_547_290.cf.jpg'),(22,'打篮球','http://mlab2.meilishuo.com/lark/basketball/','','http://d02.res.meilishuo.net/pic/_o/09/9b/6dec78223d8ae5247b1d8c261b61_551_335.cg.jpg'),(23,'画圆','http://mlab2.meilishuo.com/lark/circular/','','http://d03.res.meilishuo.net/pic/_o/b1/a6/b23d58dee3d34f1735934ed8de84_545_242.ch.jpg'),(24,'堆木棍','http://mlab2.meilishuo.com/lark/wood/','','http://d03.res.meilishuo.net/pic/_o/e1/c0/6fdf417a99a76e0fd21a4e6aa2ab_549_239.cg.jpg'),(25,'1024','http://mlab2.meilishuo.com/lark/1024/','','http://d01.res.meilishuo.net/pic/_o/e0/1e/8ad52a05b4e90ba36af5f100bf3a_550_251.ch.jpg'),(26,'平衡球','http://mlab2.meilishuo.com/lark/gravity/','','http://d05.res.meilishuo.net/pic/_o/a5/06/0cad8f0c03b5f2acb90b29309c62_550_237.ch.jpg'),(27,'踢足球','http://mlab2.meilishuo.com/lark/football/','','http://d02.res.meilishuo.net/pic/_o/01/8d/c18ba50232218dc9423946e63cd3_546_248.cf.jpg'),(28,'文字游戏-看字选色','http://mlab2.meilishuo.com/lark/color/','','http://d04.res.meilishuo.net/pic/_o/a6/d3/f7f647da4cbee0103785a95514e4_548_244.ch.jpg'),(30,'戳泡泡','http://mlab2.meilishuo.com/lark/bubble/','','http://d05.res.meilishuo.net/pic/_o/d4/32/c188afdde6ab81295b25bd94e864_549_313.cf.jpg'),(31,'图片特效','http://mlab2.meilishuo.com/lark/cssFilter/','','http://d01.res.meilishuo.net/pic/_o/52/77/e9516424db3c757f8804481c3f01_552_305.cg.jpg'),(32,'数钱','http://mlab2.meilishuo.com/lark/money/','','http://d02.res.meilishuo.net/pic/_o/40/39/833ddf627814849a4277307db7c3_547_263.ch.jpg');
/*!40000 ALTER TABLE `lark_show` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-02-16 18:57:58
