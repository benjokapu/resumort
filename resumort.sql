-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-07-2024 a las 01:01:09
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `resumort`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `files`
--

CREATE TABLE `files` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `aclaraciones` text DEFAULT NULL,
  `fecha` datetime DEFAULT NULL,
  `users_dni` int(11) DEFAULT NULL,
  `subjectYearId` int(11) DEFAULT NULL,
  `status` bit(1) DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `files`
--

INSERT INTO `files` (`id`, `nombre`, `aclaraciones`, `fecha`, `users_dni`, `subjectYearId`, `status`, `file_name`) VALUES
(7, 'Resumen Ingles Last Topic Corregido', 'Profesora: Marianela', '2024-07-24 20:04:08', 48245643, 1, b'1', '1721684098187.cue'),
(9, 'English Resumen Nuevo y Editado TEST', 'Profesora: Marianela', '2024-07-25 18:48:39', 48245643, 1, b'1', '1721944119014.docx');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `subjectsyear`
--

CREATE TABLE `subjectsyear` (
  `id` int(11) NOT NULL,
  `year` int(11) DEFAULT NULL,
  `especialidad` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `subjectsyear`
--

INSERT INTO `subjectsyear` (`id`, `year`, `especialidad`, `nombre`) VALUES
(1, 1, '0', 'Ingles');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `dni` int(11) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `mail` varchar(255) DEFAULT NULL,
  `admin` bit(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`dni`, `password`, `nombre`, `apellido`, `mail`, `admin`) VALUES
(48245643, 'Oliver123', 'Oliver', 'Safdieh', 'oliversafdieh@gmail.com', b'0');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `files`
--
ALTER TABLE `files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_81f0a4a9-5f52-4970-a2b3-2170ae35a665` (`users_dni`),
  ADD KEY `FK_1a83c299-ef1a-4281-8e7b-1328c2e75ccd` (`subjectYearId`);

--
-- Indices de la tabla `subjectsyear`
--
ALTER TABLE `subjectsyear`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`dni`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `files`
--
ALTER TABLE `files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `subjectsyear`
--
ALTER TABLE `subjectsyear`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `dni` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48245644;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `files`
--
ALTER TABLE `files`
  ADD CONSTRAINT `FK_1a83c299-ef1a-4281-8e7b-1328c2e75ccd` FOREIGN KEY (`subjectYearId`) REFERENCES `subjectsyear` (`id`),
  ADD CONSTRAINT `FK_81f0a4a9-5f52-4970-a2b3-2170ae35a665` FOREIGN KEY (`users_dni`) REFERENCES `users` (`dni`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
