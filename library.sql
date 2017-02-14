-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Фев 14 2017 г., 13:23
-- Версия сервера: 5.7.17-0ubuntu0.16.04.1
-- Версия PHP: 7.0.8-0ubuntu0.16.04.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `library`
--

-- --------------------------------------------------------

--
-- Структура таблицы `authors`
--

CREATE TABLE `authors` (
  `id_author` int(10) NOT NULL,
  `name_a` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `authors`
--

INSERT INTO `authors` (`id_author`, `name_a`) VALUES
(20, 'asd'),
(21, 'ddd'),
(22, 'dfd'),
(23, 'sdc'),
(24, 'rrrsasaas'),
(25, 'sdc'),
(26, 'sdcsdcsd'),
(27, 'fgfgfgf'),
(28, 'yuyu'),
(29, 'sdfsfd'),
(30, 'we'),
(31, 'yyy'),
(32, 'rtyrr'),
(33, 'ds'),
(34, 'fgrert'),
(35, 'yy'),
(36, 'rf'),
(37, 'dg'),
(38, 'werwer'),
(39, 'gfg'),
(40, 'ssss'),
(41, 'trtrtrtrt'),
(42, 'ascasc'),
(43, 'dsf'),
(44, 'wfef'),
(45, 'sdf'),
(46, 'sdfsdf');

-- --------------------------------------------------------

--
-- Структура таблицы `book`
--

CREATE TABLE `book` (
  `id_book` int(10) NOT NULL,
  `name_b` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `book`
--

INSERT INTO `book` (`id_book`, `name_b`) VALUES
(16, 'asd'),
(17, 'dfd'),
(18, 'df'),
(19, 'ds'),
(20, 'rrr'),
(21, 'sds'),
(22, 'sdcsdc'),
(23, 'gggg'),
(24, 'uyu'),
(25, 'sgd'),
(26, 'fe'),
(27, 'ttrt'),
(28, 'ttey'),
(29, 'sdc'),
(30, 'sf'),
(31, 'gfetert'),
(32, 'rtrt'),
(33, 'sr'),
(34, 'fgdg'),
(35, 'asdds'),
(36, 'werwe'),
(37, 'dfgg'),
(38, 'dsssss'),
(39, 'rrrasfd'),
(40, 'caac'),
(41, 'fg'),
(42, 'sfd'),
(43, 'dsfsdf');

-- --------------------------------------------------------

--
-- Структура таблицы `repositoryLib`
--

CREATE TABLE `repositoryLib` (
  `id` int(11) NOT NULL,
  `id_book` int(10) NOT NULL,
  `id_author` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `repositoryLib`
--

INSERT INTO `repositoryLib` (`id`, `id_book`, `id_author`) VALUES
(14, 23, 27),
(30, 30, 29),
(34, 33, 36),
(38, 20, 24),
(39, 35, 24),
(40, 36, 38),
(41, 37, 39),
(42, 37, 39),
(43, 38, 40),
(44, 20, 41),
(45, 39, 41),
(46, 39, 41),
(47, 40, 42),
(48, 30, 43),
(49, 30, 43),
(50, 30, 43),
(52, 41, 44),
(53, 42, 45),
(54, 43, 46);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id_author`);

--
-- Индексы таблицы `book`
--
ALTER TABLE `book`
  ADD PRIMARY KEY (`id_book`);

--
-- Индексы таблицы `repositoryLib`
--
ALTER TABLE `repositoryLib`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `authors`
--
ALTER TABLE `authors`
  MODIFY `id_author` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- AUTO_INCREMENT для таблицы `book`
--
ALTER TABLE `book`
  MODIFY `id_book` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;
--
-- AUTO_INCREMENT для таблицы `repositoryLib`
--
ALTER TABLE `repositoryLib`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
