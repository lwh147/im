/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50728
Source Host           : localhost:3306
Source Database       : imdb

Target Server Type    : MYSQL
Target Server Version : 50728
File Encoding         : 65001

Date: 2020-07-22 15:12:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for commodity
-- ----------------------------
DROP TABLE IF EXISTS `commodity`;
CREATE TABLE `commodity` (
  `cid` varchar(32) NOT NULL,
  `brand` varchar(64) DEFAULT NULL,
  `name` varchar(64) NOT NULL,
  `model` varchar(64) DEFAULT NULL,
  `standard` varchar(64) DEFAULT NULL,
  `stock` int(8) NOT NULL,
  `oprice` decimal(8,2) NOT NULL,
  `iprice` decimal(8,2) NOT NULL,
  PRIMARY KEY (`cid`),
  KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of commodity
-- ----------------------------
INSERT INTO `commodity` VALUES ('#1595072233658', '美的', '空调', '乐库', '1.0p', '0', '4000.00', '2000.00');
INSERT INTO `commodity` VALUES ('#1595145993620', '奥克斯', '空调', '荣升', '三门', '4', '4000.00', '2000.00');
INSERT INTO `commodity` VALUES ('#1595146034628', '奥克斯', '冰箱', '阿斯蒂芬', '两门', '0', '2000.00', '1000.00');
INSERT INTO `commodity` VALUES ('#1595146062936', '美的', '油烟机', 'asfsad', '撒地方', '1', '2000.00', '1000.00');
INSERT INTO `commodity` VALUES ('#1595146073124', '奥克斯', '油烟机', 'as', '撒地', '6', '2000.00', '1005.00');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `oid` varchar(32) NOT NULL,
  `time` varchar(32) NOT NULL,
  `clist` varchar(2048) NOT NULL,
  `plist` varchar(2048) NOT NULL,
  `mark` varchar(512) DEFAULT NULL,
  `tprice` decimal(8,2) NOT NULL,
  `tdisprice` decimal(8,2) NOT NULL,
  `income` decimal(8,2) NOT NULL,
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('#20200718230746', '1595084866106', '#14564165—美的—空调—月湖—1.5p_#1595072233658—美的—空调—乐库—1.0p', '2000 * 1.0 * 1 = 2000（-0.00）_4000 * 1.0 * 1 = 4000（-0.00）', '', '6000.00', '0.00', '2999.00');
INSERT INTO `order` VALUES ('#20200718231004', '1595085004873', '#14564165—美的—空调—月湖—1.5p', '2000 * 1.00 * 1 = 2000（-0.00）', '', '2000.00', '0.00', '999.00');
INSERT INTO `order` VALUES ('#20200718232830', '1595086110112', '#14564165—美的—空调—月湖—1.5p', '2000 * 0.5 * 8 = 8000.00（-8000.00）', '', '8000.00', '8000.00', '-8.00');
INSERT INTO `order` VALUES ('#20200719102659', '1595125619066', '#1595072233658—美的—空调—乐库—1.0p', '4000 * 1.00 * 1 = 4000（-0.00）', '', '4000.00', '0.00', '2000.00');
INSERT INTO `order` VALUES ('#20200719102728', '1595125648282', '#1595072233658—美的—空调—乐库—1.0p', '4000 * 1.00 * 1 = 4000（-0.00）', '', '4000.00', '0.00', '2000.00');
INSERT INTO `order` VALUES ('#20200719102802', '1595125682673', '#1595072233658—美的—空调—乐库—1.0p', '4000 * 1.00 * 1 = 4000（-0.00）', '', '4000.00', '0.00', '2000.00');
INSERT INTO `order` VALUES ('#20200719103029', '1595125829913', '#1595072233658—美的—空调—乐库—1.0p', '4000 * 1.00 * 1 = 4000（-0.00）', '', '4000.00', '0.00', '2000.00');
INSERT INTO `order` VALUES ('#20200719103127', '1595125887961', '#1595072233658—美的—空调—乐库—1.0p', '4000 * 1.00 * 1 = 4000（-0.00）', '', '4000.00', '0.00', '2000.00');
INSERT INTO `order` VALUES ('#20200719103207', '1595125927777', '#1595072233658—美的—空调—乐库—1.0p', '4000 * 1.00 * 1 = 4000（-0.00）', '', '4000.00', '0.00', '2000.00');
INSERT INTO `order` VALUES ('#20200719103420', '1595126060225', '#1595072233658—美的—空调—乐库—1.0p', '4000 * 1.00 * 1 = 4000（-0.00）', '', '4000.00', '0.00', '2000.00');
INSERT INTO `order` VALUES ('#20200719103444', '1595126084753', '#1595072233658—美的—空调—乐库—1.0p', '4000 * 0.7 * 1 = 2800.00（-1200.00）', '', '2800.00', '1200.00', '800.00');
INSERT INTO `order` VALUES ('#20200719103623', '1595126183441', '#1595072233658—美的—空调—乐库—1.0p', '4000 * 1.00 * 1 = 4000（-0.00）', '', '4000.00', '0.00', '2000.00');
INSERT INTO `order` VALUES ('#20200719103713', '1595126233224', '#14564165—美的—空调—月湖—1.5p_#1595072233658—美的—空调—乐库—1.0p', '2000 * 1.00 * 1 = 2000（-0.00）_4000 * 1.00 * 1 = 4000（-0.00）', '', '6000.00', '0.00', '2999.00');
INSERT INTO `order` VALUES ('#20200719103824', '1595126304073', '#14564165—美的—空调—月湖—1.5p', '2000 * 1.00 * 1 = 2000（-0.00）', '', '2000.00', '0.00', '999.00');
INSERT INTO `order` VALUES ('#20200719104031', '1595126431328', '#14564165—美的—空调—月湖—1.5p', '2000 * 1.00 * 1 = 2000（-0.00）', '', '2000.00', '0.00', '999.00');
INSERT INTO `order` VALUES ('#20200719104102', '1595126462017', '#14564165—美的—空调—月湖—1.5p', '2000 * 1.00 * 1 = 2000（-0.00）', '', '2000.00', '0.00', '999.00');
INSERT INTO `order` VALUES ('#20200719104240', '1595126560896', '#14564165—美的—空调—月湖—1.5p', '2000 * 1.00 * 1 = 2000（-0.00）', '', '2000.00', '0.00', '999.00');
INSERT INTO `order` VALUES ('#20200719104346', '1595126626272', '#14564165—美的—空调—月湖—1.5p', '2000 * 1.00 * 1 = 2000（-0.00）', '', '2000.00', '0.00', '999.00');
INSERT INTO `order` VALUES ('#20200719104439', '1595126679016', '#1595072233658—美的—空调—乐库—1.0p', '4000 * 1.00 * 1 = 4000（-0.00）', '', '4000.00', '0.00', '2000.00');
INSERT INTO `order` VALUES ('#20200719104508', '1595126708504', '#14564165—美的—空调—月湖—1.5p', '2000 * 1.00 * 1 = 2000（-0.00）', '', '2000.00', '0.00', '999.00');
INSERT INTO `order` VALUES ('#20200719104735', '1595126855760', '#1595072233658—美的—空调—乐库—1.0p', '4000 * 1.00 * 1 = 4000（-0.00）', '', '4000.00', '0.00', '2000.00');
INSERT INTO `order` VALUES ('#20200719105350', '1595127230528', '#1595072233658—美的—空调—乐库—1.0p', '4000 * 1.00 * 1 = 4000（-0.00）', '', '4000.00', '0.00', '2000.00');
INSERT INTO `order` VALUES ('#20200719110043', '1595127643542', '#1595072233658—美的—空调—乐库—1.0p', '4000 * 0.5 * 6 = 12000.00（-12000.00）', '', '12000.00', '12000.00', '0.00');
INSERT INTO `order` VALUES ('#20200719112605', '1595129165723', '#14564165—美的—空调—月湖—1.5p', '2000 * 1.00 * 1 = 2000（-0.00）', '', '2000.00', '0.00', '999.00');
INSERT INTO `order` VALUES ('#20200719120031', '1595131231517', '#14564165—美的—空调—月湖—1.5p', '2000 * 1.00 * 1 = 2000（-0.00）', '', '2000.00', '0.00', '999.00');
INSERT INTO `order` VALUES ('#20200719120105', '1595131265429', '#14564165—美的—空调—月湖—1.5p', '2000 * 1.00 * 1 = 2000（-0.00）', '', '2000.00', '0.00', '999.00');
INSERT INTO `order` VALUES ('#20200719161203', '1595146323257', '#1595146073124—奥克斯—油烟机—as—撒地_#1595146034628—奥克斯—冰箱—阿斯蒂芬—两门_#1595145993620—奥克斯—空调—荣升—三门', '2000 * 0.7 * 3 = 4200.00（-1800.00）_2000 * 0.9 * 3 = 5400.00（-600.00）_4000 * 0.8 * 4 = 12800.00（-3200.00）', '啊手动阀手动阀尽量克服', '22400.00', '5600.00', '8385.00');
INSERT INTO `order` VALUES ('#20200719162942', '1595147382254', '#1595146062936—美的—油烟机—asfsad—撒地方_#1595146073124—奥克斯—油烟机—as—撒地', '2000 * 0.65 * 1 = 1300.00（-700.00）_2000 * 0.9 * 1 = 1800.00（-200.00）', '', '3100.00', '900.00', '1095.00');
INSERT INTO `order` VALUES ('#2020071991504', '1595121304299', '#1595072233658—美的—空调—乐库—1.0p', '4000 * 1.00 * 1 = 4000（- 0.00）', '', '4000.00', '0.00', '2000.00');
INSERT INTO `order` VALUES ('#2020072200222', '1595347342143', '#1595145993620—奥克斯—空调—荣升—三门_#1595146062936—美的—油烟机—asfsad—撒地方', '4000 * 0.9 * 2 = 7200.00（-800.00）_2000 * 0.85 * 1 = 1700.00（-300.00）', 'dddd', '8900.00', '1100.00', '3900.00');

-- ----------------------------
-- Table structure for outrecord
-- ----------------------------
DROP TABLE IF EXISTS `outrecord`;
CREATE TABLE `outrecord` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `time` varchar(32) NOT NULL,
  `cid` varchar(32) NOT NULL,
  `num` int(8) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `cid` (`cid`),
  CONSTRAINT `cid` FOREIGN KEY (`cid`) REFERENCES `commodity` (`cid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of outrecord
-- ----------------------------
INSERT INTO `outrecord` VALUES ('2', '1595084866106', '#1595072233658', '1');
INSERT INTO `outrecord` VALUES ('5', '1595121304299', '#1595072233658', '1');
INSERT INTO `outrecord` VALUES ('6', '1595125619066', '#1595072233658', '1');
INSERT INTO `outrecord` VALUES ('7', '1595125648282', '#1595072233658', '1');
INSERT INTO `outrecord` VALUES ('8', '1595125682673', '#1595072233658', '1');
INSERT INTO `outrecord` VALUES ('9', '1595125829913', '#1595072233658', '1');
INSERT INTO `outrecord` VALUES ('10', '1595125887961', '#1595072233658', '1');
INSERT INTO `outrecord` VALUES ('11', '1595125927777', '#1595072233658', '1');
INSERT INTO `outrecord` VALUES ('12', '1595126060225', '#1595072233658', '1');
INSERT INTO `outrecord` VALUES ('13', '1595126084753', '#1595072233658', '1');
INSERT INTO `outrecord` VALUES ('14', '1595126183441', '#1595072233658', '1');
INSERT INTO `outrecord` VALUES ('16', '1595126233224', '#1595072233658', '1');
INSERT INTO `outrecord` VALUES ('22', '1595126679016', '#1595072233658', '1');
INSERT INTO `outrecord` VALUES ('24', '1595126855760', '#1595072233658', '1');
INSERT INTO `outrecord` VALUES ('25', '1595127230528', '#1595072233658', '1');
INSERT INTO `outrecord` VALUES ('26', '1595127643542', '#1595072233658', '6');
INSERT INTO `outrecord` VALUES ('30', '1595146323257', '#1595146073124', '3');
INSERT INTO `outrecord` VALUES ('31', '1595146323257', '#1595146034628', '3');
INSERT INTO `outrecord` VALUES ('32', '1595146323257', '#1595145993620', '4');
INSERT INTO `outrecord` VALUES ('33', '1595147382254', '#1595146062936', '1');
INSERT INTO `outrecord` VALUES ('34', '1595147382254', '#1595146073124', '1');
INSERT INTO `outrecord` VALUES ('35', '1595347342143', '#1595145993620', '2');
INSERT INTO `outrecord` VALUES ('36', '1595347342143', '#1595146062936', '1');
DROP TRIGGER IF EXISTS `updatestock`;
DELIMITER ;;
CREATE TRIGGER `updatestock` AFTER INSERT ON `outrecord` FOR EACH ROW begin
update commodity set commodity.stock=commodity.stock-new.num where commodity.cid=new.cid;
end
;;
DELIMITER ;
