-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-05-2018 a las 12:00:49
-- Versión del servidor: 10.1.28-MariaDB
-- Versión de PHP: 7.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `datoschatbot`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `webchat_lines`
--

CREATE TABLE `webchat_lines` (
  `id` int(10) UNSIGNED NOT NULL,
  `author` varchar(16) NOT NULL,
  `gravatar` varchar(32) NOT NULL,
  `text` varchar(255) NOT NULL,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `peso` int(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `webchat_lines`
--

INSERT INTO `webchat_lines` (`id`, `author`, `gravatar`, `text`, `ts`, `peso`) VALUES
(1, 'jose', '5ca4136a060a2574a936cdf6881f733c', 'hola', '2018-04-14 21:29:04', 100),
(2, 'manu', 'bb5be9b7c05a64cc49c948dbeac685f8', 'Buenas noches ', '2018-04-14 21:29:38', 100),
(3, 'manu', 'bb5be9b7c05a64cc49c948dbeac685f8', 'jajaja', '2018-04-14 21:29:40', 100),
(4, 'jose', '5ca4136a060a2574a936cdf6881f733c', 'yeeee manu', '2018-04-14 21:29:50', 100),
(5, 'manu', 'bb5be9b7c05a64cc49c948dbeac685f8', 'una m mayus que verguenza jajaja ', '2018-04-14 21:30:01', 100),
(6, 'Fran', 'f303ffa05e1fa72b58b95b470c2db7b1', 'Esto es un movil', '2018-04-14 21:32:55', 100),
(7, 'Aaa', '5ca4136a060a2574a936cdf6881f733c', 'Ola aki sasen amijos?? ', '2018-04-14 21:37:57', 100),
(8, 'asdasd', '86251430842dbf4be26b6efd5e945815', 'vamossss Jimmy', '2018-04-14 21:38:21', 100),
(9, 'Aaa', '5ca4136a060a2574a936cdf6881f733c', 'POLE ', '2018-04-14 21:39:06', 100),
(10, 'asdasd', '86251430842dbf4be26b6efd5e945815', 'REINICIE SU COMPUTADORA AHORA O SU CELULAR PODRÁ SER RALENTIZADO', '2018-04-14 21:41:23', 100),
(11, 'asdasd', '86251430842dbf4be26b6efd5e945815', '*SELULAR', '2018-04-14 21:41:42', 100),
(12, 'Andrea', '96024b1c82887709cbf13373bb4921b2', 'Hola muy buenas soy Andrea ', '2018-04-14 22:36:56', 100),
(13, 'Andrea', '96024b1c82887709cbf13373bb4921b2', '¿En teoria alguien me tiene que contestar?', '2018-04-14 22:37:37', 100),
(14, 'Trebor', 'f303ffa05e1fa72b58b95b470c2db7b1', 'No tiene por que, si no hay nadie conectado no', '2018-04-15 10:49:41', 100),
(15, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', '¡Buenos días a todos!', '2018-04-16 17:29:03', 100),
(16, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', '¿Empezamos a completar esta base de datos?', '2018-04-16 17:29:20', 100),
(17, 'manu', 'bb5be9b7c05a64cc49c948dbeac685f8', 'buenas tardes nenes ! ', '2018-04-16 17:32:05', 100),
(18, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'Vamos a escribir bien, que si no tendremos una IA Cani', '2018-04-16 17:32:36', 100),
(19, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'Pues parece que Git no es la solucion para todo jajaja', '2018-04-16 17:36:39', 100),
(20, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'Raul dice :&quot;Una cosa es una cosa y otra cosa es otra cosa&quot;(16/04/2018)', '2018-04-16 17:44:47', 100),
(21, 'gabri', 'eb8218437f7e847f3cf26d45702c007a', 'hola', '2018-04-16 17:44:49', 100),
(22, 'gabri', 'eb8218437f7e847f3cf26d45702c007a', 'fdzsdgh', '2018-04-16 17:45:02', 100),
(23, 'gabri', 'eb8218437f7e847f3cf26d45702c007a', 'dfg', '2018-04-16 17:45:06', 100),
(24, 'gabri', 'eb8218437f7e847f3cf26d45702c007a', 'dfg', '2018-04-16 17:45:08', 100),
(25, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'A ver, la cosa es poner cosas utiles jajaja', '2018-04-16 17:45:20', 100),
(26, 'gabri', 'eb8218437f7e847f3cf26d45702c007a', 'estaba escribiendo y viendo tu pantalla para ver si se actualizaba solo', '2018-04-16 17:45:45', 100),
(27, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'si jajaja', '2018-04-16 17:45:53', 100),
(28, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'Lo que no me salen son los usuarios conectados, que para eso es la tabla negra de la derecha', '2018-04-16 17:46:13', 100),
(29, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'Pero bueno...', '2018-04-16 17:46:17', 100),
(30, 'gabri', 'eb8218437f7e847f3cf26d45702c007a', 'os ha quedado muy guapo igualmente', '2018-04-16 17:51:31', 100),
(31, 'gabri', 'eb8218437f7e847f3cf26d45702c007a', ' ', '2018-04-16 17:51:55', 100),
(32, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'Gracias, pero es un copy paste de un chat online solo que modificando lo que necesitabamos', '2018-04-16 17:53:00', 100),
(33, 'gabri', 'eb8218437f7e847f3cf26d45702c007a', 'yo hasta lo veo de puta madre para meter en el juego', '2018-04-16 18:07:25', 100),
(34, 'gabri', 'eb8218437f7e847f3cf26d45702c007a', 'sin interfaz tan grande y que salga en una esquina', '2018-04-16 18:07:50', 100),
(35, 'Salva', '172b85dda9a7638c181ad80608d2fd59', 'Hola a todos', '2018-04-16 18:50:15', 100),
(36, 'Salva', '172b85dda9a7638c181ad80608d2fd59', 'Hola gente decid algo', '2018-04-16 18:58:20', 100),
(37, 'Salva', '172b85dda9a7638c181ad80608d2fd59', 'Sois todos bots o sois personas?', '2018-04-16 18:59:05', 100),
(38, 'Salva', '172b85dda9a7638c181ad80608d2fd59', 'De qué queréis que hablemos?', '2018-04-16 18:59:26', 100),
(39, 'Algo', 'e25595d5eb6e9b8ff1b612454d0d4942', 'Algo', '2018-04-16 19:01:23', 100),
(40, 'Raúl', 'e25595d5eb6e9b8ff1b612454d0d4942', 'Ahora soy yo', '2018-04-16 19:01:39', 100),
(41, 'Raúl', 'e25595d5eb6e9b8ff1b612454d0d4942', 'Esto guarda las conversaciones?', '2018-04-16 19:01:50', 100),
(42, 'manu', 'bb5be9b7c05a64cc49c948dbeac685f8', 'Si ', '2018-04-16 19:31:59', 100),
(43, 'Raúl', 'e25595d5eb6e9b8ff1b612454d0d4942', 'Yo soy yo y mis circustancias', '2018-04-16 19:47:01', 100),
(44, 'manu', 'bb5be9b7c05a64cc49c948dbeac685f8', 'Hola ', '2018-04-16 19:47:44', 100),
(45, 'Raúl', 'e25595d5eb6e9b8ff1b612454d0d4942', 'Hola Manu', '2018-04-16 19:48:02', 100),
(46, 'Raúl', 'e25595d5eb6e9b8ff1b612454d0d4942', 'cómo estás?', '2018-04-16 19:48:05', 100),
(47, 'Raúl', 'e25595d5eb6e9b8ff1b612454d0d4942', 'yo bien', '2018-04-16 19:48:07', 100),
(48, 'manu', 'bb5be9b7c05a64cc49c948dbeac685f8', 'Me alegro tio ', '2018-04-16 19:48:13', 100),
(49, 'manu', 'bb5be9b7c05a64cc49c948dbeac685f8', 'Send nudes ', '2018-04-16 19:48:22', 100),
(50, 'Raúl', 'e25595d5eb6e9b8ff1b612454d0d4942', 'a ver si sale bien el chat bot este!!!', '2018-04-16 19:48:22', 100),
(51, 'Raúl', 'e25595d5eb6e9b8ff1b612454d0d4942', 'mola mogollón :D', '2018-04-16 19:48:26', 100),
(52, 'Raúl', 'e25595d5eb6e9b8ff1b612454d0d4942', 'tienes mis dieses', '2018-04-16 19:48:31', 100),
(53, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'Vamos a ver Manuel, tu te vas a encargar de hacer una funcion publica que dibuje una linea entre dos puntos que le pasemos por parametro', '2018-04-17 19:07:24', 100),
(54, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', '¿Ok?', '2018-04-17 19:07:28', 100),
(55, 'ok ', '857cf6dcb85bbffb35cd56ed924bdcdd', 'ok ', '2018-04-17 19:08:00', 100),
(56, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'Yo mientras voy a hacer una funcion que recoja los datos de Raul y gabri y devuelva posx y posy', '2018-04-17 19:08:10', 100),
(57, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'asi luego alimentare tu funcion con los datos de mi funcion', '2018-04-17 19:08:24', 100),
(58, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'Ejemplo: Function dibujarLinea(vector2Origen,vector2Final){//Y aqui va el codigo}', '2018-04-17 19:10:31', 100),
(59, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'Esta san en el despacho el director', '2018-04-17 19:51:21', 100),
(60, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'y se ve que lo estan grabando en video o algo', '2018-04-17 19:51:37', 100),
(61, 'ok ', '857cf6dcb85bbffb35cd56ed924bdcdd', 'Que estan grabando ', '2018-04-17 19:52:02', 100),
(62, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'he visto al chati este que tengo detras viendo un video donde aparece san(can el pelo azul) hablando algo', '2018-04-17 19:52:22', 100),
(63, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'y el director y el otro chico peleando con las espadas laser de fondo', '2018-04-17 19:52:35', 100),
(64, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'ahora esta jugando al yi gi oh', '2018-04-17 19:53:02', 100),
(65, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', 'en plan cocatrice', '2018-04-17 19:53:07', 100),
(66, 'Trebor', '395cfec124749326975bb8bb45c159fc', 'Buenas Tardes a todos!', '2018-04-18 17:08:05', 100),
(67, 'Trebor', '395cfec124749326975bb8bb45c159fc', '¡Madre mia, este chat es la leche!', '2018-04-18 17:17:32', 100),
(68, 'Trebor', '395cfec124749326975bb8bb45c159fc', 'Michel!', '2018-04-18 17:17:54', 100),
(69, 'Michel', '1da2acc8255b6985835b61a4259ffda8', 'Dime Trebor', '2018-04-18 17:18:41', 100),
(70, 'Trebor', '395cfec124749326975bb8bb45c159fc', '¿Conseguiste ya el coche para el atraco?', '2018-04-18 17:20:21', 110),
(71, 'Michel', '1da2acc8255b6985835b61a4259ffda8', 'No, todavia no a aparecido, esta Franklin ocupandose de la vigilancia', '2018-04-18 17:20:52', 100),
(72, 'Michel', '1da2acc8255b6985835b61a4259ffda8', 'En cuanto aparezca avisara', '2018-04-18 17:21:05', 100),
(73, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', '¡Hey!', '2018-04-19 17:11:14', 100);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `webchat_users`
--

CREATE TABLE `webchat_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(16) NOT NULL,
  `gravatar` varchar(32) NOT NULL,
  `last_activity` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `webchat_users`
--

INSERT INTO `webchat_users` (`id`, `name`, `gravatar`, `last_activity`) VALUES
(1, 'jose', '5ca4136a060a2574a936cdf6881f733c', '2018-04-14 21:28:19'),
(2, 'manu', 'bb5be9b7c05a64cc49c948dbeac685f8', '2018-04-14 21:29:34'),
(3, 'Fran', 'f303ffa05e1fa72b58b95b470c2db7b1', '2018-04-14 21:33:23'),
(4, 'Aaa', '5ca4136a060a2574a936cdf6881f733c', '2018-04-14 21:36:42'),
(5, 'asdasd', '86251430842dbf4be26b6efd5e945815', '2018-04-14 21:38:16'),
(6, 'Andrea', '96024b1c82887709cbf13373bb4921b2', '2018-04-14 22:36:45'),
(7, 'Trebor', 'f303ffa05e1fa72b58b95b470c2db7b1', '2018-04-18 17:17:45'),
(8, 'Frank', '8ee22e067cf0c513041bdcc0b17cf035', '2018-04-18 13:57:37'),
(9, 'gabri', 'eb8218437f7e847f3cf26d45702c007a', '2018-04-16 17:44:46'),
(10, 'Salva', '172b85dda9a7638c181ad80608d2fd59', '2018-04-16 18:50:09'),
(11, 'Algo', 'e25595d5eb6e9b8ff1b612454d0d4942', '2018-04-16 19:01:18'),
(12, 'Raúl', 'e25595d5eb6e9b8ff1b612454d0d4942', '2018-04-17 08:33:28'),
(13, 'ok ', '857cf6dcb85bbffb35cd56ed924bdcdd', '2018-04-17 19:52:22'),
(14, 'Michel', '1da2acc8255b6985835b61a4259ffda8', '2018-04-18 17:18:31');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `webchat_lines`
--
ALTER TABLE `webchat_lines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ts` (`ts`);

--
-- Indices de la tabla `webchat_users`
--
ALTER TABLE `webchat_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `last_activity` (`last_activity`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `webchat_lines`
--
ALTER TABLE `webchat_lines`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT de la tabla `webchat_users`
--
ALTER TABLE `webchat_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
