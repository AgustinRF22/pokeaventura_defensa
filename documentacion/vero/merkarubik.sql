-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-05-2024 a las 21:07:31
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
-- Base de datos: `merkarubik`
--
CREATE DATABASE IF NOT EXISTS `merkarubik` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `merkarubik`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `idcarrito` int(11) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `impuesto` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`idcarrito`, `correo`, `impuesto`) VALUES
(1, 'vero@email.com', 0.21),
(2, 'osmel@email.com', 0.21),
(3, 'agus@email.com', 0.21),
(5, 'sergio@email.com', 0.21);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cubos`
--

CREATE TABLE `cubos` (
  `idcubo` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` varchar(500) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `categoria` varchar(50) NOT NULL,
  `precio` double NOT NULL,
  `stock` int(11) NOT NULL,
  `color` varchar(50) NOT NULL,
  `valoracion` int(1) NOT NULL,
  `imagen` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `cubos`
--

INSERT INTO `cubos` (`idcubo`, `nombre`, `descripcion`, `tipo`, `categoria`, `precio`, `stock`, `color`, `valoracion`, `imagen`) VALUES
(1, 'Qiyi Warrior 3x3 S', 'El QiYi Warrior 3x3 S es el nuevo speedcube económico de la marca qiyi. Es igual que el Qiyi Warrior W, con la diferencia de que la cantidad de plástico usado para la fabricación es menor, de esta forma se abarata el coste del producto haciéndolo más accesible.', 'speedcube', '3x3', 3.9, 0, 'stickerless', 5, 'cubos/speedcube/3x3/stickerless/qiyi-warrior-3x3-s.png'),
(2, 'QiYi Warrior W', 'Explora el QiYi Warrior W 3x3, un cubo mágico que redefine la relación calidad-precio en el mundo del speedcubing. Esta versión mejorada del clásico QiYi Warrior se destaca por su excelente corte de esquinas, estabilidad superior y un giro suave que satisface tanto a principiantes como a entusiastas avanzados del cubo 3x3. Su diseño ligero y estilizado hace que sea un compañero perfecto para largas sesiones de práctica.', 'speedcube', '3x3', 5.69, 100, 'stickerless', 5, 'cubos/speedcube/3x3/stickerless/qiyi-warrior-w-3x3.png'),
(3, 'ShengShou Legend', 'El Shengshou Legend 3x3 es un Cubo de Rubik low cost pero con un giro que te dejará con la boca abierta, tiene un giro rápido y controlable además de un buen corte de esquinas.', 'speedcube', '3x3', 6.35, 100, 'stickerless', 4, 'cubos/speedcube/3x3/stickerless/shengshou-legend-3x3.png'),
(4, 'QiYi Qimeng V3', 'El QiYi QiMeng 3x3 V3 (Tiles) se distingue en el mercado de los cubos 3x3 por ser una opción económica. En lugar de las tradicionales pegatinas, este cubo incorpora tiles o azulejos de plástico incrustados en las piezas, proporcionando una durabilidad y un aspecto visual mejorados.', 'speedcube', '3x3', 4.99, 100, 'black', 5, 'cubos/speedcube/3x3/black/qiyi-qimeng-3x3-v3-tiles.png'),
(5, 'ShengShou Aurora', 'El ShengShou Aurora 3x3 es una mejora del ya conocido ShengShou Wind, tiene muy buen corte inverso.', 'speedcube', '3x3', 8.2, 100, 'black', 4, 'cubos/speedcube/3x3/black/shengshou-aurora-3x3.png'),
(6, 'ShengShou Legend S', 'El Shengshou Legend 3x3 S es un cubo 3x3 muy económico y con buen giro. Shengshou ha actualizado su versión del SS 3x3 legend para lanzar al mercado un cubo 3x3 de velocidad muy económico. Para ello a eliminado mucho plástico del diseño original del legend, han conseguido un cubo realmente ligero y con muy buen giro, aunque un poco ruidoso. ', 'speedcube', '3x3', 2.99, 100, 'black', 5, 'cubos/speedcube/3x3/black/shengshou-legend-3x3-s.png'),
(7, 'Cyclone Boys Metallic M', 'Cyclone Boys Metallic 3x3 M es un cubo 3x3 tradicional, pero en lugar de tener los clásicos colores de pegatinas o stickerless tiene un acabado metalizado espejo, su aspecto es increíble, además como cubo magico de velocidad es muy bueno, tiene imanes de posicionamiento magnético y una tacto muy agradable. Sin duda es un cubo que muchos elegirán por su aspecto pero no pararán de usarlo por su giro. ¡Consigue ahora este cubo magico único en el mundo!. ', 'speedcube', '3x3', 14.99, 10, 'otro', 5, 'cubos/speedcube/3x3/otro/cyclone-boys-metallic-3x3-m.png'),
(8, 'GoCube 3x3', 'Con el GoCube Edge 3x3 modelo avanzado podrás disfrutar de todas las opciones que te ofrece este cubo 3x3 inteligente!. Experimenta un mundo completamente nuevo de cubear, incluye el kit completo de accesorios.', 'speedcube', '3x3', 96.8, 10, 'otro', 5, 'cubos/speedcube/3x3/otro/gocube-3x3.png'),
(9, 'QiYi Qiyuan W2', 'El QiYi Qiyuan 4x4 W2 es un cubo que tiene algunas características muy buenas, como su bajo precio, su giro rápido y controlable, y su tamaño de 59 milímetros que lo hace un poco más pequeño que un cubo magico 4x4 estándar.', 'speedcube', '4x4', 6.99, 100, 'black', 4, 'cubos/speedcube/4x4/black/qiyi-qiyuan-4x4-w2.png'),
(10, 'YJ Guansu', 'El YJ Guansu 4x4 es un muy buen cubo en relación calidad-precio, viene mejorando al YJ Yusu. ', 'speedcube', '4x4', 9.2, 100, 'black', 5, 'cubos/speedcube/4x4/black/yj-guansu-4x4.png'),
(11, 'QiYi Qiyuan S3', 'Descubre el QiYi QiYuan S3 4x4, la última evolución en la gama de rompecabezas de 4x4 de QiYi. Esta obra maestra redefinida no es solo un paso adelante en relación a su predecesor, sino un salto. Benefíciate de las avanzadas optimizaciones en las piezas internas, que no solo prometen un rendimiento superior, sino también una experiencia de giro excepcionalmente suave.', 'speedcube', '4x4', 6.99, 0, 'stickerless', 4, 'cubos/speedcube/4x4/stickerless/qiyi-qiyuan-s3-4x4.png'),
(12, 'Vin Cube 4x4', 'Entre las mejoras significativas del Vin Cube 4x4, se encuentran sus partes internas de color primario, diseñadas para optimizar las partes internas y dar al giro una mayor suavidad. La implementación de amplios espacios entre las esquinas y los centros facilita un corte de esquinas excepcional.', 'speedcube', '4x4', 19.99, 100, 'stickerless', 4, 'cubos/speedcube/4x4/stickerless/vin-cube-4x4.png'),
(13, 'Cyclone Boys Metallic M', 'El Cyclone Boys Metallic 4x4 M ofrece una emocionante variación en el clásico cubo de speedcubing. En lugar de los típicos colores de pegatinas o stickerless, este cubo presenta un acabado metalizado espejo que le confiere un aspecto verdaderamente sorprendente. Su estética llamativa captura la atención al instante, pero este cubo va mucho más allá de su apariencia.', 'speedcube', '4x4', 29.99, 0, 'otro', 5, 'cubos/speedcube/4x4/otro/cyclone-boys-metallic-4x4-m.png'),
(14, 'Fangshi Mini 4x4 40mm', 'El FangShi Mini 4x4 (40 mm) es uno de los Cubo 4x4 más pequeños que existen en el mundo, tan solo mide 4 centímetros, menos que un cubo 2x2 estándar, está realizado con impresión 3D por la marca Fangshi, a pesar de esta fabricado en impresión 3D las piezas tienen un post-procesado que le dan un acabado increíble, muy similar a la inyección de plástico. ', 'speedcube', '4x4', 24.2, 100, 'otro', 4, 'cubos/speedcube/4x4/otro/fangshi-mini-4x4-40-mm.png'),
(15, 'Mefferts Megaminx', 'El Megaminx de Mefferts es un rompecabezas de alta calidad, tiene 12 caras y 12 colores, ¿Serás capaz de resolverlo?', 'speedcube', 'megaminx', 22.9, 100, 'black', 4, 'cubos/speedcube/megaminx/black/mefferts-megaminx.png'),
(16, 'Dayan Megaminx Pro M', 'El DaYan Megaminx PRO M es un revolucionario megaminx diseñado para dominar el speedcubing. Con un núcleo magnético innovador, el primero en su tipo, consta de 40 imanes que proporcionan una estabilidad adicional esencial para un cubo de muchas capas.', 'speedcube', 'megaminx', 34.9, 99, 'stickerless', 5, 'cubos/speedcube/megaminx/stickerless/dayan-megaminx-pro-m.png'),
(17, 'Sengso Megaminx Mr. M', 'El SengSo Mr. M Megaminx es un megaminx de gama media. Tiene un movimiento muy bueno desde el primer giro y presenta una textura exterior mate. Su giro es muy interesante y adictivo, tiene imanes de potencia media - alta, estos imanes van colocados en ranuras, pero no van fijados ni a presión por lo que al girar las capas del megaminx se puede sentir y oír como estos imanes se mueven dentro de esas ranuras.', 'speedcube', 'megaminx', 13.99, 100, 'stickerless', 5, 'cubos/speedcube/megaminx/stickerless/sengso-megaminx-mr-m.png'),
(18, 'Shengshou Megaminx', 'El Megaminx de Shengshou es uno de los cubos de rubik mas populares del mercado, un cubo de rubik 3x3 convertido en dodecaedro, no lo dejes escapar!', 'speedcube', 'megaminx', 12.9, 98, 'otro', 5, 'cubos/speedcube/megaminx/white/megaminx-shengshou.png'),
(19, 'QiYi Qiheng Megaminx', 'A pesar de ser una opción económica, el QiYi QiHeng es un cubo mágico con una suavidad de giro que te sorprenderá. Además, sus stickers de alta calidad y la estabilidad en sus movimientos lo hacen comparable con modelos de mayor precio. Su diseño inteligente permite un excelente corte de esquinas, llevando tu experiencia de Speedcubing a un nuevo nivel.', 'speedcube', 'megaminx', 7.95, 100, 'otro', 4, 'cubos/speedcube/megaminx/white/qiyi-qiheng-megaminx.png'),
(20, 'Cuboide 5x6x7', 'La naturaleza del Cuboide 5x6x7, con diferentes números de capas en cada eje, hace que en algunos giros pueden resultar en estructuras bloqueadas, lo que añade una capa de estrategia en su mezcla y solución. La clave para un mezclado efectivo es evitar la creación de bloques indivisibles, separando cuidadosamente todas las piezas en las fases iniciales y después mezclarlo del todo.', 'coleccionismo', 'cuboide', 59.9, 100, 'black', 5, 'cubos/coleccionismo/cuboides/cuboide-5x6x7.png'),
(21, 'Hunter Pillow 2x4x6', 'Llega a Merkarubik uno de los cuboides mas famosos y divertidos, el Hunter Pillow 2x4x6 de Calvin\'s Puzzle. (Este es actualmente mi favorito, el \"niño de mamá\", el que me introdujo a este mundo de los cubos de rubik. Súbeme un punto si llegas a leer esto! =D)', 'coleccionismo', 'cuboide', 33.9, 10, 'black', 5, 'cubos/coleccionismo/cuboides/hunter-pillow-2x4x6.png'),
(22, 'Qiyi 3x3x1 Spinner V2', 'El QiYi 3x3x1 Spinner V2 es un cubo Floppy que además funciona como un spinner, toda una locura. Esta es la segunda versión que lanza qiyi de este rompecabezas, en lugar de tener las típicas pegatinas tiene Tiles, que son unos azulejos de plástico de colores, son muy resistentes y no se desgastan al manipularlos.', 'coleccionismo', 'cuboide', 5.99, 99, 'black', 4, 'cubos/coleccionismo/cuboides/qiyi-3x3x1-spinner-v2.png'),
(23, 'Tony Ball 5x5', 'El Tony Ball 5x5 tiene unos bonitos colores y una agradable sensación de giro, se nota un cubo de alta calidad que muchos disfrutaremos gracias al Tony Fisher y a Calvins. ¡No lo dejes escapar!', 'coleccionismo', 'esfera', 31.95, 99, 'stickerless', 4, 'cubos/coleccionismo/esferas/tony-ball-5x5.png'),
(24, 'Verypuzzle Megaminx Ball V10', 'El Verypuzzle Megaminx Ball V1.0 es un megaminx totalmente esférico, tiene nada mas y nada menos que 20 bonitos colores, debido a esto será más complicado de resolver que un megaminx tradicional ya que tiene orientación de centros.', 'coleccionismo', 'esfera', 24.9, 99, 'black', 5, 'cubos/coleccionismo/esferas/verypuzzle-megaminx-ball-v10.png'),
(25, 'MF8 Curvy Starminx', 'El MF8 Curvy Starminx es uno de los mas bonitos dodecaedros de MF8, tiene el mismo número de aristas y esquinas que un Megaminx pero en lugar de tener un centro fijo lo centros son intercambiables y además alrededor de cada centro hay 5 pétalos. ', 'coleccionismo', 'minx', 39.85, 99, 'black', 5, 'cubos/coleccionismo/minx/mf8-curvy-starminx.png'),
(26, 'MF8 Helicopter Dodecaedro', 'El MF8 Helicopter Dodecaedro es un puzzle impresionante, si te gusto el curvy copter esta es su versión en dodecaedro. Este rompecabezas está diseñado para ser un desafío emocionante para los entusiastas de los rompecabezas y los cuberos experimentados.', 'coleccionismo', 'minx', 37.2, 99, 'black', 5, 'cubos/coleccionismo/minx/mf8-helicopter-dodecaedro.png'),
(27, 'Verypuzzle Corner-only Megaminx', 'El VeryPuzzle Corner Only Megaminx es un cubo que representa tan solo las esquinas del megaminx, tiene 20 piezas a ordenar, en cada esquina encontramos 3 colores que al juntarse con los colores de sus piezas adyacentes hacen que el cubo en total tenga 12 colores. Es bastante sencillo de resolver.', 'coleccionismo', 'minx', 39.9, 0, 'black', 4, 'cubos/coleccionismo/minx/verypuzzle-corner-only-megaminx.png'),
(28, 'Lanlan Butterfly Cube', 'El LanLan Butterfly Cube sin duda es toda una obra de arte cubera por parte de LanLan. Es un cubo que tiene múltiples tipos de giros y varios tipos de piezas. Tenemos los clásicos giros de un curvy copter tanto normal como con jumbling, más los giros de vértices típicos de cubos dino, su giro es muy bueno a pesar de su patrón de corte extremo. Este cubo será un desafío incluso para los cuberos más expertos. ¿Te atreves con él?', 'coleccionismo', 'cubico', 26.95, 100, 'black', 2, 'cubos/coleccionismo/otro/lanlan-butterfly-cube.png'),
(29, 'Lanlan Clover Cube', 'El LanLan SunFlower o Clover Cube es como un curvy copter de 2 ejes por borde, la marca Verypuzzle ya lanzó en su día una versión de este cubo, pero esta fuera de producción y es muy dificil de conseguir. Esta versión de LanLan es un poco más sencilla debido a que por su geometría y tamaño no tiene esquinas, de forma que los tres bordes adyacentes confluyen en una misma esquina formando un vértice.', 'coleccionismo', 'cubico', 24.95, 100, 'black', 3, 'cubos/coleccionismo/otro/lanlan-clover-cube.png'),
(30, 'Lanlan Curvy Mosaic', 'Llega un cubo que mucho estaban esperando, el LanLan Curvy Mosaic. Este cubo es como el Mosaic de Meffert\'s diseñado por oskar, pero esta es la versión de LanLan, tiene las mismas piezas y el mismo tipo de giro pero algunos cambios en el diseño. Gira muy bien y es muy divertido de resolver. ¡Consigue el tuyo ahora!', 'coleccionismo', 'cubico', 17.99, 100, 'black', 5, 'cubos/coleccionismo/otro/lanlan-curvy-mosaic.png'),
(31, 'Meilong Puppet I', 'El MeiLong Puppet I es un cubo con un concepto de lo más interesante, puede parecer un cubo 2x2 desde ciertos ángulos, pero es algo mucho más complejo. Este cubo tiene piezas extra en su interior que se dejan ver con ciertos giros. Este cubo es una fusión entre un 2x2 y 3x3. Se desfasa, se bloquea, confunde mucho y como no te pondrá a prueba. ¿Serás capaz de resolverlo?', 'coleccionismo', 'cubico', 5.99, 0, 'stickerless', 1, 'cubos/coleccionismo/otro/meilong-puppet-i.png'),
(32, 'Naruto 2x2', 'Naruto 2x2 es mucho más que una modificación cubo de rubik 2x2, es un producto exclusivo, único y de colección para los amantes de la serie de manga Naruto. Es una cabeza de Naruto, siendo esta una modificación del cubo de rubik 2x2. Destacará en tu colección como ningún otro cubo. ¡Consigue ahora el Naruto 2x2 y obtén esta exclusiva pieza de colección!. ', '3d', 'cabeza', 29.99, 100, 'otro', 5, 'cubos/3d/cabeza/naruto-2x2.png'),
(33, 'RoboCop 2x2', 'Llega un cubo imprescindible para los amantes del cine de acción de finales de los 80 y los 90. El RoboCop 2x2 es una increíble modificación de uno de los policías más famosos del cine y la televisión. Está realizado con impresión 3D por cubotroon y tiene gran cantidad de detalles. ¡Consíguelo ahora y defiende tu colección de cualquier delincuente!.', '3d', 'cabeza', 29.99, 10, 'otro', 3, 'cubos/3d/cabeza/robocop-2x2.png'),
(34, 'Spiderman 2x2', 'Spiderman 2x2 es una cabeza 2x2 de uno de los personajes más populares del momento, ahora las películas de spiderman viven un nuevo auge gracias al estreno de las nuevas películas de Marvel con Tom Holland encarnando el papel del amado superhéroe, gracias a cubotroon podrás disfrutar de esta modificación realizada en impresión 3D y pintada a mano.', '3d', 'cabeza', 29.99, 98, 'otro', 5, 'cubos/3d/cabeza/spiderman-2x2.png'),
(35, 'Koffing 2x2', 'La esencia de Koffing se captura en el plástico morado con detalles realistas en relieve: boca, ojos, colmillos y más. Además, su montaje sobre la base del renombrado cubo 2x2 yj yupo garantiza un giro suave y preciso.', '3d', 'esfera', 43.99, 10, 'otro', 5, 'cubos/3d/esfera/cubo-koffing-2x2.png'),
(36, 'Pokeball Mirror 3x3', 'Llega a kubekings un nuevo diseño de impresión 3D, en esta ocasión hemos creado una Pokeball Mirror 3x3 magnética. Un cubo con una gran cantidad de detalles y características que lo hacen único y asombroso. Algunas de sus características son: gran tamaño y peso, realizada con un 3x3 magnético, la mejor técnica de impresión, soporte para exponerla incluido.', '3d', 'esfera', 49.95, 100, 'otro', 5, 'cubos/3d/esfera/pokeball-mirror-3x3.png'),
(37, 'Snitch Dorada 2x2', 'La Snitch Dorada 2x2 es la tercera y más pequeña pelota usada en el juego del Quidditch. Ahora podrás conseguirla en cubo de rubik 2x2. Debido a que las piezas son muy similares entre sí, cuesta un poco resolverla. Las alas son extraíbles y es conveniente tener cuidado con ellas debido a que son muy finas.', '3d', 'esfera', 29.99, 99, 'otro', 5, 'cubos/3d/esfera/snitch-dorada-2x2.png'),
(38, 'Bandaged 4x4 AI Cube', 'El Bandaged 4x4 AI Cube es una fusión entre un cubo de rubik 2x2 y un cubo 4x4, es realmente un cubo de rubik 4x4 al que se le han bloqueado 4 esquinas del 2x2, de esta forma su giro está restringido. Para desbloquear el giro de la parte 4x4 hay que colocar las 4 esquinas bloqueadas en una misma capa, de esta forma las otras 4 esquinas quedan en la otra capa y obtenemos los giros de la parte 4x4.', '3d', 'otro', 19.99, 0, 'black', 5, 'cubos/3d/otro/bandaged-4x4-ai-cube.png'),
(39, 'Fangshi Limcube Hexagram Octahedron', 'Es un cubo bastante complicado de resolver. Combina los giros de un cubo 3x3 con los giros de un skewb, por lo que tenemos un octaedro muy completo, a pesar de tener múltiples ejes de giro no se deforma, por lo que siempre mantiene forma de octaedro. ', '3d', 'otro', 119.9, 100, 'black', 4, 'cubos/3d/otro/fangshi-limcube-hexagram-octahedron.png'),
(40, 'Fanshi Limcube Kaleidoscope Hexaprism', 'El cubo gira como un 2x2 justo por el centro, para liberar los giros de skewb hay que hacer un pequeño para poner las caras de un mismo color de forma alternada, esto hace que confunda todavía más a la hora de resolverlo.', '3d', 'otro', 75.99, 100, 'black', 4, 'cubos/3d/otro/fangshi-limcube-kaleidoscope-hex-prism.png'),
(41, 'LEE Ghost Cube 4x4', 'Llega una nueva modificación de LEE realizada con impresión 3D, en esta ocasión tenemos el increíble Ghost Cube 4x4, un cubo que ninguna marca se a atrevido a comercializar, esta es la versión de 6 colores, pero aunque los colores estén definidos es bastante complejo de resolver, ya que se deforma muchísimo, y hay que resolverlo en un estado de capas desfasado.', '3d', 'otro', 55.9, 100, 'black', 4, 'cubos/3d/otro/lee-ghost-cube-4x4.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `idpedido` int(11) NOT NULL,
  `carrito` int(11) NOT NULL,
  `cubo` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

CREATE TABLE `registro` (
  `idregistro` int(11) NOT NULL,
  `correo` varchar(255) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `total` double NOT NULL,
  `articulos` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`idregistro`, `correo`, `fecha`, `total`, `articulos`) VALUES
(10, 'vero@email.com', '2024-05-25 16:12:29', 85.6, '22:1;25:1;24:1'),
(11, 'vero@email.com', '2024-05-25 16:15:20', 110.03, '7:1;35:1;23:1'),
(12, 'vero@email.com', '2024-05-25 16:34:45', 200.84, '2:2;8:1;15:1;16:1'),
(13, 'agus@email.com', '2024-05-25 16:36:41', 89.52, '35:1;33:1'),
(14, 'agus@email.com', '2024-05-25 16:59:34', 93.71, '21:1;26:1;3:1'),
(15, 'vero@email.com', '2024-05-25 17:06:30', 36.29, '34:1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `correo` varchar(255) NOT NULL,
  `contrasena` varchar(30) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `direccion` varchar(300) NOT NULL,
  `telefono` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`correo`, `contrasena`, `nombre`, `apellidos`, `direccion`, `telefono`) VALUES
('agus@email.com', 'Agus1234', 'Agustín', 'Ramírez Figueredo', 'C/Zafra 1234', 123456789),
('osmel@email.com', 'Osmel1234', 'Osmel', 'Navarro Montesdeoca', 'C/Badajoz, 29C', 888666444),
('sergio@email.com', 'Sergio1234', 'Sergio', 'Holguera', 'C/Badajoz 99', 9988776),
('vero@email.com', 'Vero1234', 'Verónica', 'Ramírez Figueredo', 'C/Badajoz, 29 B', 999777555);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`idcarrito`),
  ADD KEY `FK_correo` (`correo`);

--
-- Indices de la tabla `cubos`
--
ALTER TABLE `cubos`
  ADD PRIMARY KEY (`idcubo`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`idpedido`),
  ADD KEY `FK_carrito` (`carrito`),
  ADD KEY `FK_cubo` (`cubo`);

--
-- Indices de la tabla `registro`
--
ALTER TABLE `registro`
  ADD PRIMARY KEY (`idregistro`),
  ADD KEY `FK_correo` (`correo`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `idcarrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `cubos`
--
ALTER TABLE `cubos`
  MODIFY `idcubo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `idpedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `registro`
--
ALTER TABLE `registro`
  MODIFY `idregistro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`correo`) REFERENCES `usuarios` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`carrito`) REFERENCES `carrito` (`idcarrito`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`cubo`) REFERENCES `cubos` (`idcubo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `registro`
--
ALTER TABLE `registro`
  ADD CONSTRAINT `registro_ibfk_1` FOREIGN KEY (`correo`) REFERENCES `usuarios` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
