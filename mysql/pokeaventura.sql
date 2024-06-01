-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-05-2024 a las 19:09:52
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `pokeaventura`
--
CREATE DATABASE IF NOT EXISTS `pokeaventura` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `pokeaventura`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compi`
--

CREATE TABLE `compi` (
  `id_compi` int(11) NOT NULL,
  `id_cuenta` int(11) NOT NULL,
  `id_raza` int(11) NOT NULL,
  `mote` varchar(30) NOT NULL,
  `nivel` int(11) NOT NULL,
  `exp` int(11) NOT NULL,
  `exp_next` int(11) NOT NULL,
  `hp_actual` int(11) NOT NULL,
  `hp_max` int(11) NOT NULL,
  `atk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `compi`
--

INSERT INTO `compi` (`id_compi`, `id_cuenta`, `id_raza`, `mote`, `nivel`, `exp`, `exp_next`, `hp_actual`, `hp_max`, `atk`) VALUES
(1, 1, 2, 'Koni', 3, 10, 80, 40, 40, 24),
(2, 16, 5, 'aaaaa', 3, 12, 80, 49, 49, 26),
(3, 17, 3, 'Pensionista', 5, 0, 120, 82, 82, 40),
(4, 18, 2, 'bbbbbbb', 3, 20, 80, 17, 40, 24),
(5, 15, 1, 'Agüita', 1, 0, 40, 20, 20, 12),
(6, 15, 2, 'Agüita', 3, 12, 80, 17, 40, 24),
(7, 19, 5, 'Darki', 5, 0, 120, 32, 63, 36);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cuenta`
--

CREATE TABLE `cuenta` (
  `id_cuenta` int(11) NOT NULL,
  `username` varchar(25) NOT NULL,
  `password` varchar(50) NOT NULL,
  `correo` varchar(60) NOT NULL,
  `nombre` varchar(25) NOT NULL,
  `fecha_creacion` date NOT NULL,
  `avatar` varchar(250) NOT NULL,
  `money` int(11) NOT NULL,
  `admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cuenta`
--

INSERT INTO `cuenta` (`id_cuenta`, `username`, `password`, `correo`, `nombre`, `fecha_creacion`, `avatar`, `money`, `admin`) VALUES
(1, 'admin', 'admin1995', 'admin@gmail.com', 'Admin', '2024-05-07', './img/av6.png', 12130, 1),
(14, 'Vero', 'vero', 'vero@vero.com', 'Nicky', '2024-05-18', './img/av2.png', 200, 0),
(15, 'Osmel', 'osmel', 'osmel@hablarmucho.com', 'CanaryEne', '2024-05-18', './img/av4.png', 720, 0),
(16, 'aaaa', 'aaaa', 'aaa@aa.a', 'aaaa', '2024-05-19', './img/av8.png', 835, 0),
(17, 'Abuelito', 'abuelito', 'abu@abu.abu', 'Abue', '2024-05-19', './img/av7.png', 2220, 0),
(18, 'bbbb', 'bbbb', 'bbbb@bbbb.bbb', 'bbbb', '2024-05-27', './img/av5.png', 430, 0),
(19, 'cccc', 'cccc', 'cccc@ccc.cc', 'C', '2024-05-29', './img/av4.png', 320, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enemigo`
--

CREATE TABLE `enemigo` (
  `id_enemigo` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `hp_max` int(11) NOT NULL,
  `atk` int(11) NOT NULL,
  `nivel` int(11) NOT NULL,
  `exp_yield` int(11) NOT NULL,
  `money_yield` int(11) NOT NULL,
  `ruta_img` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `enemigo`
--

INSERT INTO `enemigo` (`id_enemigo`, `nombre`, `hp_max`, `atk`, `nivel`, `exp_yield`, `money_yield`, `ruta_img`) VALUES
(1, 'Rattata', 15, 4, 1, 12, 40, './img/en1.gif'),
(2, 'Snorunt', 20, 5, 2, 14, 50, './img/en2.gif'),
(3, 'Ursaring', 42, 7, 3, 23, 75, './img/en3.gif'),
(4, 'Snorlax', 60, 5, 4, 28, 80, './img/en4.gif'),
(5, 'Sharpedo', 38, 8, 4, 24, 75, './img/en5.gif'),
(6, 'Chansey', 90, 2, 5, 50, 250, './img/en6.gif');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `id_cuenta` int(11) NOT NULL,
  `id_item` int(11) NOT NULL,
  `cantidad` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`id_cuenta`, `id_item`, `cantidad`) VALUES
(1, 1, 6),
(1, 2, 3),
(18, 1, 1),
(19, 1, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item`
--

CREATE TABLE `item` (
  `id_item` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `efecto` varchar(250) NOT NULL,
  `precio` int(11) NOT NULL,
  `ruta_img` varchar(250) NOT NULL,
  `descripcion` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `item`
--

INSERT INTO `item` (`id_item`, `nombre`, `efecto`, `precio`, `ruta_img`, `descripcion`) VALUES
(1, 'Pocion', 'pocion', 100, './img/it1.png', 'Una refrescante bebida que cura 20HP.'),
(2, 'MaxiPocion', 'healFull', 500, './img/it2.png', 'Un brebaje místico que restaura toda la salud por completo.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `starter`
--

CREATE TABLE `starter` (
  `id_raza` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `hp_base` int(11) NOT NULL,
  `hp_onlvl` int(11) NOT NULL,
  `atk_base` int(11) NOT NULL,
  `atk_onlvl` int(11) NOT NULL,
  `evolucion_lvl` int(11) NOT NULL,
  `evolucion_id` int(11) NOT NULL,
  `ruta_img` varchar(250) NOT NULL,
  `ruta_img_fullbody` varchar(250) NOT NULL,
  `descripcion` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `starter`
--

INSERT INTO `starter` (`id_raza`, `nombre`, `hp_base`, `hp_onlvl`, `atk_base`, `atk_onlvl`, `evolucion_lvl`, `evolucion_id`, `ruta_img`, `ruta_img_fullbody`, `descripcion`) VALUES
(1, 'Totodile', 20, 4, 12, 3, 3, 2, './img/st1.png', './img/st1_full.gif', 'Este simpático reptil tiene unas poderosas fauces y un fuerte mordisco. Si come bien, crecerá sano y fuerte.'),
(2, 'Croconaw', 30, 5, 16, 4, 5, 3, './img/st2.png', './img/st2_full.gif', 'Este reptil ha estado perfeccionando su técnica de mordisco, y cada vez es más fuerte, aunque algo perezoso.'),
(3, 'Feraligatr', 50, 8, 20, 5, 0, 0, './img/st3.png', './img/st3_full.gif', 'Este poderoso reptil ha alcanzado su madurez y su fuerza máxima tras un riguroso entrenamiento y una buena alimentación. Protege a su entrenador fielmente.'),
(4, 'Cubone', 18, 3, 11, 3, 3, 5, './img/st4.png', './img/st4_full.gif', 'Este pequeño perdió a su madre, y lleva su calavera como único recuerdo. Si se queda solo, pasa mucho tiempo llorando.'),
(5, 'Marowak', 35, 7, 16, 5, 0, 0, './img/st5.png', './img/st5_full.gif', 'La forma madura de Cubone. Intentará cuidar a sus pequeños para evitar que pasen por un trauma como el suyo.'),
(6, 'Pikachu', 30, 6, 15, 4, 0, 0, './img/st6.png', './img/st6_full.gif', 'Este adorable roedor está listo para darlo todo, haciendo honor a su increíble fama. Te puede cargar el móvil en un aprieto.');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `compi`
--
ALTER TABLE `compi`
  ADD PRIMARY KEY (`id_compi`),
  ADD KEY `id_cuenta` (`id_cuenta`),
  ADD KEY `id_raza` (`id_raza`);

--
-- Indices de la tabla `cuenta`
--
ALTER TABLE `cuenta`
  ADD PRIMARY KEY (`id_cuenta`);

--
-- Indices de la tabla `enemigo`
--
ALTER TABLE `enemigo`
  ADD PRIMARY KEY (`id_enemigo`);

--
-- Indices de la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD PRIMARY KEY (`id_cuenta`,`id_item`),
  ADD KEY `id_item` (`id_item`);

--
-- Indices de la tabla `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id_item`);

--
-- Indices de la tabla `starter`
--
ALTER TABLE `starter`
  ADD PRIMARY KEY (`id_raza`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `compi`
--
ALTER TABLE `compi`
  MODIFY `id_compi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `cuenta`
--
ALTER TABLE `cuenta`
  MODIFY `id_cuenta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `enemigo`
--
ALTER TABLE `enemigo`
  MODIFY `id_enemigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `item`
--
ALTER TABLE `item`
  MODIFY `id_item` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `starter`
--
ALTER TABLE `starter`
  MODIFY `id_raza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `compi`
--
ALTER TABLE `compi`
  ADD CONSTRAINT `compi_ibfk_1` FOREIGN KEY (`id_cuenta`) REFERENCES `cuenta` (`id_cuenta`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `compi_ibfk_2` FOREIGN KEY (`id_raza`) REFERENCES `starter` (`id_raza`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `inventario`
--
ALTER TABLE `inventario`
  ADD CONSTRAINT `inventario_ibfk_1` FOREIGN KEY (`id_cuenta`) REFERENCES `cuenta` (`id_cuenta`),
  ADD CONSTRAINT `inventario_ibfk_2` FOREIGN KEY (`id_item`) REFERENCES `item` (`id_item`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
