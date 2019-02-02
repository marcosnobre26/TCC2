-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 02-Fev-2019 às 15:04
-- Versão do servidor: 10.1.37-MariaDB
-- versão do PHP: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simulador`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `exercicios`
--

CREATE TABLE `exercicios` (
  `id_exercicios` int(100) NOT NULL,
  `processos` text,
  `algoritmo` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `exercicios`
--

INSERT INTO `exercicios` (`id_exercicios`, `processos`, `algoritmo`) VALUES
(1, '[{\"processoSistema\":\"Fernando\",\"proximoCicloSistema\":\"12\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":0},{\"processoSistema\":\"B\",\"proximoCicloSistema\":\"7\",\"momentoTransicaoSistema\":\"3\",\"prioridadeSistema\":0},{\"processoSistema\":\"C\",\"proximoCicloSistema\":\"9\",\"momentoTransicaoSistema\":\"6\",\"prioridadeSistema\":0},{\"processoSistema\":\"D\",\"proximoCicloSistema\":\"19\",\"momentoTransicaoSistema\":\"15\",\"prioridadeSistema\":0}]', 'FIFO'),
(2, '[{\"processoSistema\":\"B\",\"proximoCicloSistema\":\"10\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":0},{\"processoSistema\":\"B\",\"proximoCicloSistema\":\"5\",\"momentoTransicaoSistema\":\"3\",\"prioridadeSistema\":0},{\"processoSistema\":\"C\",\"proximoCicloSistema\":\"9\",\"momentoTransicaoSistema\":\"6\",\"prioridadeSistema\":0},{\"processoSistema\":\"D\",\"proximoCicloSistema\":\"19\",\"momentoTransicaoSistema\":\"15\",\"prioridadeSistema\":0}]', 'FIFO'),
(3, '[{\"processoSistema\":\"SJF 1\",\"proximoCicloSistema\":\"10\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":0},{\"processoSistema\":\"SJF 2\",\"proximoCicloSistema\":\"5\",\"momentoTransicaoSistema\":\"3\",\"prioridadeSistema\":0},{\"processoSistema\":\"SJF 3\",\"proximoCicloSistema\":\"9\",\"momentoTransicaoSistema\":\"6\",\"prioridadeSistema\":0},{\"processoSistema\":\"SJF 4\",\"proximoCicloSistema\":\"19\",\"momentoTransicaoSistema\":\"15\",\"prioridadeSistema\":0}]', 'SJF'),
(4, '[{\"processoSistema\":\"Prioridade 1\",\"proximoCicloSistema\":\"6\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":1},{\"processoSistema\":\"Prioridade 2\",\"proximoCicloSistema\":\"3\",\"momentoTransicaoSistema\":\"2\",\"prioridadeSistema\":0},{\"processoSistema\":\"Prioridade 3\",\"proximoCicloSistema\":\"8\",\"momentoTransicaoSistema\":\"4\",\"prioridadeSistema\":3},{\"processoSistema\":\"Prioridade 4\",\"proximoCicloSistema\":\"7\",\"momentoTransicaoSistema\":\"6\",\"prioridadeSistema\":2}]', 'Prioridade'),
(5, '[{\"processoSistema\":\"Round-Robin 1\",\"proximoCicloSistema\":\"6\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":1},{\"processoSistema\":\"Round-Robin 2\",\"proximoCicloSistema\":\"3\",\"momentoTransicaoSistema\":\"2\",\"prioridadeSistema\":0},{\"processoSistema\":\"Round-Robin 3\",\"proximoCicloSistema\":\"8\",\"momentoTransicaoSistema\":\"4\",\"prioridadeSistema\":3},{\"processoSistema\":\"Round-Robin 4\",\"proximoCicloSistema\":\"7\",\"momentoTransicaoSistema\":\"6\",\"prioridadeSistema\":2}]', 'Round-Robin'),
(8, '[{\"processoSistema\":\"A\",\"proximoCicloSistema\":\"8\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":0},{\"processoSistema\":\"B\",\"proximoCicloSistema\":\"6\",\"momentoTransicaoSistema\":\"4\",\"prioridadeSistema\":0},{\"processoSistema\":\"C\",\"proximoCicloSistema\":\"13\",\"momentoTransicaoSistema\":\"10\",\"prioridadeSistema\":0},{\"processoSistema\":\"D\",\"proximoCicloSistema\":\"20\",\"momentoTransicaoSistema\":\"17\",\"prioridadeSistema\":0},{\"processoSistema\":\"E\",\"proximoCicloSistema\":\"30\",\"momentoTransicaoSistema\":\"29\",\"prioridadeSistema\":0}]', 'FIFO'),
(9, '[{\"processoSistema\":\"FIFO A\",\"proximoCicloSistema\":\"12\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":0},{\"processoSistema\":\"FIFO B\",\"proximoCicloSistema\":\"8\",\"momentoTransicaoSistema\":\"2\",\"prioridadeSistema\":0},{\"processoSistema\":\"FIFO C\",\"proximoCicloSistema\":\"15\",\"momentoTransicaoSistema\":\"3\",\"prioridadeSistema\":0},{\"processoSistema\":\"FIFO D\",\"proximoCicloSistema\":\"5\",\"momentoTransicaoSistema\":\"6\",\"prioridadeSistema\":0}]', 'FIFO'),
(10, '[{\"processoSistema\":\"SJF A\",\"proximoCicloSistema\":\"12\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":0},{\"processoSistema\":\"SJF B\",\"proximoCicloSistema\":\"8\",\"momentoTransicaoSistema\":\"2\",\"prioridadeSistema\":0},{\"processoSistema\":\"SJF C\",\"proximoCicloSistema\":\"15\",\"momentoTransicaoSistema\":\"3\",\"prioridadeSistema\":0},{\"processoSistema\":\"SJF D\",\"proximoCicloSistema\":\"5\",\"momentoTransicaoSistema\":\"6\",\"prioridadeSistema\":0}]', 'SJF'),
(11, '[{\"processoSistema\":\"AA\",\"proximoCicloSistema\":\"6\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":0},{\"processoSistema\":\"AB\",\"proximoCicloSistema\":\"5\",\"momentoTransicaoSistema\":\"4\",\"prioridadeSistema\":0},{\"processoSistema\":\"AC\",\"proximoCicloSistema\":\"9\",\"momentoTransicaoSistema\":\"7\",\"prioridadeSistema\":0},{\"processoSistema\":\"AD\",\"proximoCicloSistema\":\"2\",\"momentoTransicaoSistema\":\"8\",\"prioridadeSistema\":0},{\"processoSistema\":\"AE\",\"proximoCicloSistema\":\"10\",\"momentoTransicaoSistema\":\"10\",\"prioridadeSistema\":0},{\"processoSistema\":\"AF\",\"proximoCicloSistema\":\"12\",\"momentoTransicaoSistema\":\"15\",\"prioridadeSistema\":0}]', 'SJF'),
(12, '[{\"processoSistema\":\"A1\",\"proximoCicloSistema\":\"12\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":\"1\"},{\"processoSistema\":\"A2\",\"proximoCicloSistema\":\"15\",\"momentoTransicaoSistema\":\"7\",\"prioridadeSistema\":\"2\"},{\"processoSistema\":\"A3\",\"proximoCicloSistema\":\"20\",\"momentoTransicaoSistema\":\"10\",\"prioridadeSistema\":\"0\"}]', 'Prioridade'),
(13, '[{\"processoSistema\":\"A\",\"proximoCicloSistema\":\"20\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":0},{\"processoSistema\":\"B\",\"proximoCicloSistema\":\"17\",\"momentoTransicaoSistema\":\"14\",\"prioridadeSistema\":0}]', 'FIFO'),
(14, '[{\"processoSistema\":\"AAA\",\"proximoCicloSistema\":\"17\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":0},{\"processoSistema\":\"BBB\",\"proximoCicloSistema\":\"6\",\"momentoTransicaoSistema\":\"5\",\"prioridadeSistema\":0},{\"processoSistema\":\"CCC\",\"proximoCicloSistema\":\"7\",\"momentoTransicaoSistema\":\"10\",\"prioridadeSistema\":0}]', 'FIFO'),
(15, '[{\"processoSistema\":\"A\",\"proximoCicloSistema\":\"7\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":0},{\"processoSistema\":\"B\",\"proximoCicloSistema\":\"4\",\"momentoTransicaoSistema\":\"4\",\"prioridadeSistema\":0}]', 'SJF'),
(16, '[{\"processoSistema\":\"1\",\"proximoCicloSistema\":\"2\",\"momentoTransicaoSistema\":0,\"prioridadeSistema\":0},{\"processoSistema\":\"2\",\"proximoCicloSistema\":\"4\",\"momentoTransicaoSistema\":1,\"prioridadeSistema\":0}]', 'FIFO'),
(18, '[{\"processoSistema\":\"A\",\"proximoCicloSistema\":\"7\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":\"1\"},{\"processoSistema\":\"B\",\"proximoCicloSistema\":\"5\",\"momentoTransicaoSistema\":\"4\",\"prioridadeSistema\":\"0\"},{\"processoSistema\":\"C\",\"proximoCicloSistema\":\"10\",\"momentoTransicaoSistema\":\"10\",\"prioridadeSistema\":\"1\"},{\"processoSistema\":\"D\",\"proximoCicloSistema\":\"6\",\"momentoTransicaoSistema\":\"14\",\"prioridadeSistema\":\"2\"}]', 'Prioridade'),
(19, '[{\"processoSistema\":\"AA\",\"proximoCicloSistema\":\"10\",\"momentoTransicaoSistema\":0,\"prioridadeSistema\":\"1\"},{\"processoSistema\":\"BB\",\"proximoCicloSistema\":\"15\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":\"2\"},{\"processoSistema\":\"CC\",\"proximoCicloSistema\":\"4\",\"momentoTransicaoSistema\":\"5\",\"prioridadeSistema\":\"0\"},{\"processoSistema\":\"DD\",\"proximoCicloSistema\":\"5\",\"momentoTransicaoSistema\":6,\"prioridadeSistema\":\"0\"},{\"processoSistema\":\"EE\",\"proximoCicloSistema\":\"5\",\"momentoTransicaoSistema\":\"12\",\"prioridadeSistema\":\"1\"}]', 'Prioridade'),
(20, '[{\"processoSistema\":\"A\",\"proximoCicloSistema\":\"12\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":0},{\"processoSistema\":\"B\",\"proximoCicloSistema\":\"8\",\"momentoTransicaoSistema\":\"3\",\"prioridadeSistema\":0},{\"processoSistema\":\"C\",\"proximoCicloSistema\":\"10\",\"momentoTransicaoSistema\":\"8\",\"prioridadeSistema\":0},{\"processoSistema\":\"D\",\"proximoCicloSistema\":\"5\",\"momentoTransicaoSistema\":\"9\",\"prioridadeSistema\":0}]', 'Round-Robin'),
(21, '[{\"processoSistema\":\"A\",\"proximoCicloSistema\":\"12\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":0},{\"processoSistema\":\"B\",\"proximoCicloSistema\":\"2\",\"momentoTransicaoSistema\":\"2\",\"prioridadeSistema\":0},{\"processoSistema\":\"C\",\"proximoCicloSistema\":\"4\",\"momentoTransicaoSistema\":\"5\",\"prioridadeSistema\":0}]', 'SJF'),
(22, '[{\"processoSistema\":\"A\",\"proximoCicloSistema\":\"12\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":0},{\"processoSistema\":\"B\",\"proximoCicloSistema\":\"3\",\"momentoTransicaoSistema\":\"5\",\"prioridadeSistema\":0},{\"processoSistema\":\"C\",\"proximoCicloSistema\":\"10\",\"momentoTransicaoSistema\":\"9\",\"prioridadeSistema\":0}]', 'FIFO'),
(23, '[{\"processoSistema\":\"A\",\"proximoCicloSistema\":\"12\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":0},{\"processoSistema\":\"B\",\"proximoCicloSistema\":\"5\",\"momentoTransicaoSistema\":\"4\",\"prioridadeSistema\":0},{\"processoSistema\":\"C\",\"proximoCicloSistema\":\"3\",\"momentoTransicaoSistema\":\"10\",\"prioridadeSistema\":0},{\"processoSistema\":\"B1\",\"proximoCicloSistema\":\"3\",\"momentoTransicaoSistema\":\"12\",\"prioridadeSistema\":0}]', 'FIFO'),
(24, '[{\"processoSistema\":\"AA\",\"proximoCicloSistema\":\"4\",\"momentoTransicaoSistema\":\"0\",\"prioridadeSistema\":0},{\"processoSistema\":\"AB\",\"proximoCicloSistema\":\"6\",\"momentoTransicaoSistema\":\"2\",\"prioridadeSistema\":0},{\"processoSistema\":\"AC\",\"proximoCicloSistema\":\"4\",\"momentoTransicaoSistema\":\"6\",\"prioridadeSistema\":0}]', 'FIFO');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_login_facebook`
--

CREATE TABLE `tb_login_facebook` (
  `id` int(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `foto` varchar(100) NOT NULL,
  `id_facebook` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `tb_login_facebook`
--

INSERT INTO `tb_login_facebook` (`id`, `nome`, `foto`, `id_facebook`) VALUES
(29, 'Marcos Tepes', '111325383303445', 'https://graph.facebook.com/111325383303445/picture?type=large');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `exercicios`
--
ALTER TABLE `exercicios`
  ADD PRIMARY KEY (`id_exercicios`);

--
-- Indexes for table `tb_login_facebook`
--
ALTER TABLE `tb_login_facebook`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `exercicios`
--
ALTER TABLE `exercicios`
  MODIFY `id_exercicios` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `tb_login_facebook`
--
ALTER TABLE `tb_login_facebook`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
