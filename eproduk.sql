-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 28, 2020 at 06:49 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eproduk`
--

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id` int(5) NOT NULL,
  `kd_brg` int(6) NOT NULL,
  `nama_brg` varchar(200) NOT NULL,
  `jenis_brg` varchar(200) NOT NULL,
  `harga_brg` varchar(15) NOT NULL,
  `jmlh_brg` int(20) NOT NULL,
  `img_brg` varchar(255) DEFAULT NULL,
  `updated_at` date NOT NULL,
  `created_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id`, `kd_brg`, `nama_brg`, `jenis_brg`, `harga_brg`, `jmlh_brg`, `img_brg`, `updated_at`, `created_at`) VALUES
(2, 1002, 'Weapon Stack 1', 'Weapon', '7000000', 5, 'd9f1pc6-76392d5d-1283-4be4-9093-ba6a0f68c81c.png', '2020-02-03', '0000-00-00'),
(4, 9000, 'Godzilla', 'Monster', '1000000000', 0, 'eb565675563326f790771a60ff0c99be.jpg', '2020-02-03', '2020-01-19'),
(5, 4, 'Hammer of Strength', 'Weapon', '1200000', 1, 'd9mcukm-251ab034-77ca-4a43-9520-9c1584877448.png', '2020-02-03', '2020-01-28'),
(6, 2222, 'Future F-331', 'Arena', '1000000', 4, '1020177.jpg', '2020-02-03', '2020-01-28'),
(8, 1, 'Plasma Double Blade', 'Weapon', '1500000', 1, 'd9hcki4-03837c43-6d1e-4228-815c-15493e2dbd6a.png', '2020-02-03', '2020-01-29');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id_user` int(5) NOT NULL,
  `nama_user` varchar(250) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(300) NOT NULL,
  `role` varchar(15) NOT NULL,
  `img_user` varchar(255) DEFAULT NULL,
  `nama_lengkap` varchar(255) DEFAULT NULL,
  `no_hp` varchar(13) DEFAULT NULL,
  `tanggal_lahir` date DEFAULT NULL,
  `jenis_kelamin` enum('laki-laki','perempuan') DEFAULT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `nama_user`, `email`, `password`, `role`, `img_user`, `nama_lengkap`, `no_hp`, `tanggal_lahir`, `jenis_kelamin`, `created_at`, `updated_at`) VALUES
(14, 'Ahmad ', 'dhany11@gmail.com', 'eyJpdiI6Iks4dEhpYTNBSGVLdjdCeVRuYzU2bmc9PSIsInZhbHVlIjoiMDhJd2xLclFiSDdRNmV2amFvaUxDQT09IiwibWFjIjoiYjI2ZTNhYjMzMjBhNTdlNzliMmFiZGRlYTFiNTc2N2ZmZWRlMjE0MzZjZDg4MTYzYmY2MmI2NDc5YTA3MGMwNSJ9', 'Admin', '', '', '0', '0000-00-00', 'laki-laki', '2020-01-29', '2020-02-05'),
(15, 'Dhany', 'adhany26@gmail.com', 'eyJpdiI6Imt3STVKbWR0R3BBcTNRTmJkeWFqUGc9PSIsInZhbHVlIjoieTdhWlkycldtZWZRTVFjZ2dDU1kyUT09IiwibWFjIjoiYjVkMmEwYzVlMTMxNmI3ZjI0ZGJkOWJjMDExY2ZlMmNhNzQ3NDA3MjAxNmU4ZmZmZGIyNWE0NTJjZDVjZmRhNCJ9', 'User', NULL, 'Fadillah Ahmad Dhany', '085331750113', '2002-12-03', 'laki-laki', '2020-02-05', '2020-02-28'),
(16, 'Aku', 'aku@aku.aku', 'eyJpdiI6InRaMFZYTnF2dVNXNGFROWRvbFRaaWc9PSIsInZhbHVlIjoidEhjWkl0R2lqc2tUUHlIZHNDd2dLUT09IiwibWFjIjoiYTY5OGJkNDdmMTlkNTIyZTIyYzM1OTIxYmNkM2Y4OGQ1ODhlMTBiYjc1NjZkMWYxMmM0MTE1ODhmOTJjN2E5YyJ9', 'User', NULL, '', '0', '0000-00-00', 'laki-laki', '2020-02-10', '2020-02-10'),
(35, 'Test1', 'test@t.t', 'eyJpdiI6IjJtclV2VEJ4dEVWcjNoaU85M0Z1UkE9PSIsInZhbHVlIjoidFFVNTlwUjJkXC82RzBOcVdhTTdJZnc9PSIsIm1hYyI6IjkyNmJiZDAyN2MwZjk2ODA1NWE5YWE3NGQ4NjAzODJkMWFmN2JhMzFhYTFlM2I2NGJkYjZiN2NhNWEyODcwYTAifQ==', 'User', NULL, '', '0', '0000-00-00', 'laki-laki', '2020-02-10', '2020-02-10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `produk`
--
ALTER TABLE `produk`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
