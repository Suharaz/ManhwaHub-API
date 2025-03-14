-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th3 14, 2025 lúc 07:30 PM
-- Phiên bản máy phục vụ: 10.11.10-MariaDB-log
-- Phiên bản PHP: 8.3.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `g`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `authors`
--

CREATE TABLE `authors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `thumbnail` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `authors`
--

INSERT INTO `authors` (`id`, `name`, `slug`, `description`, `thumbnail`, `created_at`, `updated_at`) VALUES
(1, 'Takahashi Rumiko', 'takahashi-rumiko', 'Mangaka nổi tiếng với các tác phẩm như Inuyasha, Ranma 1/2.', 'https://picsum.photos/200/300', '2025-03-09 04:14:08', '2025-03-09 04:14:08'),
(2, 'Oda Eiichiro', 'oda-eiichiro', 'Tác giả của bộ truyện One Piece đình đám.', 'https://picsum.photos/200/300', '2025-03-09 04:14:08', '2025-03-09 04:14:08'),
(3, 'Toriyama Akira', 'toriyama-akira', 'Cha đẻ của Dragon Ball và Dr. Slump.', 'https://picsum.photos/200/300', '2025-03-09 04:14:08', '2025-03-09 04:14:08'),
(4, 'Fujiko F. Fujio', 'fujiko-f-fujio', 'Đồng tác giả Doraemon huyền thoại.', 'https://picsum.photos/200/300', '2025-03-09 04:14:08', '2025-03-09 04:14:08'),
(5, 'Arakawa Hiromu', 'arakawa-hiromu', 'Tác giả của Fullmetal Alchemist.', 'https://picsum.photos/200/300', '2025-03-09 04:14:08', '2025-03-09 04:14:08'),
(6, 'Miura Kentaro', 'miura-kentaro', 'Tác giả của bộ manga kinh điển Berserk.', 'https://picsum.photos/200/300', '2025-03-09 04:14:08', '2025-03-09 04:14:08'),
(7, 'Togashi Yoshihiro', 'togashi-yoshihiro', 'Tác giả của Hunter x Hunter và Yu Yu Hakusho.', 'https://picsum.photos/200/300', '2025-03-09 04:14:08', '2025-03-09 04:14:08'),
(8, 'Inoue Takehiko', 'inoue-takehiko', 'Người đứng sau Slam Dunk và Vagabond.', 'https://picsum.photos/200/300', '2025-03-09 04:14:08', '2025-03-09 04:14:08'),
(9, 'Isayama Hajime', 'isayama-hajime', 'Tác giả của Attack on Titan.', 'https://picsum.photos/200/300', '2025-03-09 04:14:08', '2025-03-09 04:14:08'),
(10, 'Matsui Yuusei', 'matsui-yuusei', 'Tác giả của Assassination Classroom.', 'https://picsum.photos/200/300', '2025-03-09 04:14:08', '2025-03-09 04:14:08');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Action', 'action', 'Thể loại hành động với nhiều cảnh chiến đấu.', '2025-03-09 04:13:27', '2025-03-09 04:13:27'),
(2, 'Adventure', 'adventure', 'Thể loại phiêu lưu khám phá thế giới.', '2025-03-09 04:13:27', '2025-03-09 04:13:27'),
(3, 'Fantasy', 'fantasy', 'Thể loại giả tưởng với phép thuật và sinh vật huyền bí.', '2025-03-09 04:13:27', '2025-03-09 04:13:27'),
(4, 'Romance', 'romance', 'Thể loại lãng mạn với những câu chuyện tình yêu.', '2025-03-09 04:13:27', '2025-03-09 04:13:27'),
(5, 'Horror', 'horror', 'Thể loại kinh dị với các yếu tố đáng sợ.', '2025-03-09 04:13:27', '2025-03-09 04:13:27'),
(6, 'Sci-Fi', 'sci-fi', 'Thể loại khoa học viễn tưởng với công nghệ tương lai.', '2025-03-09 04:13:27', '2025-03-09 04:13:27'),
(7, 'Comedy', 'comedy', 'Thể loại hài hước mang lại tiếng cười.', '2025-03-09 04:13:27', '2025-03-09 04:13:27'),
(8, 'Drama', 'drama', 'Thể loại tâm lý với các câu chuyện cảm động.', '2025-03-09 04:13:27', '2025-03-09 04:13:27'),
(9, 'Mystery', 'mystery', 'Thể loại bí ẩn với nhiều tình tiết bất ngờ.', '2025-03-09 04:13:27', '2025-03-09 04:13:27'),
(10, 'Thriller', 'thriller', 'Thể loại giật gân với nhịp độ nhanh.', '2025-03-09 04:13:27', '2025-03-09 04:13:27');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `chapters`
--

CREATE TABLE `chapters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `translator_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(191) NOT NULL,
  `title` varchar(191) DEFAULT NULL,
  `slug` varchar(191) NOT NULL,
  `price` double(8,2) NOT NULL DEFAULT 0.00,
  `chapter_number` double(8,2) NOT NULL,
  `volume` varchar(191) DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `comic_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `server_name` varchar(5) NOT NULL DEFAULT 'vn'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `chapters`
--

INSERT INTO `chapters` (`id`, `translator_id`, `name`, `title`, `slug`, `price`, `chapter_number`, `volume`, `content`, `status`, `comic_id`, `user_id`, `created_at`, `updated_at`, `server_name`) VALUES
(1, NULL, 'Chapter 1', 'Title 1', 'chapter-1', 0.00, 1.00, 'Vol 2', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 1, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(2, NULL, 'Chapter 2', 'Title 2', 'chapter-2', 0.00, 2.00, 'Vol 1', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 2, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(3, NULL, 'Chapter 3', 'Title 3', 'chapter-3', 0.00, 3.00, 'Vol 8', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 3, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(4, NULL, 'Chapter 4', 'Title 4', 'chapter-4', 0.00, 4.00, 'Vol 8', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 4, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(5, NULL, 'Chapter 5', 'Title 5', 'chapter-5', 0.00, 5.00, 'Vol 6', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 5, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(6, NULL, 'Chapter 6', 'Title 6', 'chapter-6', 0.00, 6.00, 'Vol 3', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 6, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(7, NULL, 'Chapter 7', 'Title 7', 'chapter-7', 0.00, 7.00, 'Vol 7', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 7, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(8, NULL, 'Chapter 8', 'Title 8', 'chapter-8', 0.00, 8.00, 'Vol 5', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 8, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(9, NULL, 'Chapter 9', 'Title 9', 'chapter-9', 0.00, 9.00, 'Vol 5', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 9, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(10, NULL, 'Chapter 10', 'Title 10', 'chapter-10', 0.00, 10.00, 'Vol 10', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 10, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(11, NULL, 'Chapter 11', 'Title 11', 'chapter-11', 0.00, 11.00, 'Vol 3', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 11, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(12, NULL, 'Chapter 12', 'Title 12', 'chapter-12', 0.00, 12.00, 'Vol 4', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 12, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(13, NULL, 'Chapter 13', 'Title 13', 'chapter-13', 0.00, 13.00, 'Vol 1', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 13, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(14, NULL, 'Chapter 14', 'Title 14', 'chapter-14', 0.00, 14.00, 'Vol 1', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 14, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(15, NULL, 'Chapter 15', 'Title 15', 'chapter-15', 0.00, 15.00, 'Vol 1', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 15, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(16, NULL, 'Chapter 16', 'Title 16', 'chapter-16', 0.00, 16.00, 'Vol 1', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 16, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(17, NULL, 'Chapter 17', 'Title 17', 'chapter-17', 0.00, 17.00, 'Vol 2', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 17, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(18, NULL, 'Chapter 18', 'Title 18', 'chapter-18', 0.00, 18.00, 'Vol 8', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 18, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(19, NULL, 'Chapter 19', 'Title 19', 'chapter-19', 0.00, 19.00, 'Vol 4', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 19, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(20, NULL, 'Chapter 20', 'Title 20', 'chapter-20', 0.00, 20.00, 'Vol 3', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 20, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(21, NULL, 'Chapter 21', 'Title 21', 'chapter-21', 0.00, 21.00, 'Vol 5', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 21, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(22, NULL, 'Chapter 22', 'Title 22', 'chapter-22', 0.00, 22.00, 'Vol 4', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 22, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(23, NULL, 'Chapter 23', 'Title 23', 'chapter-23', 0.00, 23.00, 'Vol 6', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 23, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(24, NULL, 'Chapter 24', 'Title 24', 'chapter-24', 0.00, 24.00, 'Vol 8', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 24, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(25, NULL, 'Chapter 25', 'Title 25', 'chapter-25', 0.00, 25.00, 'Vol 2', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 25, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(26, NULL, 'Chapter 26', 'Title 26', 'chapter-26', 0.00, 26.00, 'Vol 4', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 26, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(27, NULL, 'Chapter 27', 'Title 27', 'chapter-27', 0.00, 27.00, 'Vol 6', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 27, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(28, NULL, 'Chapter 28', 'Title 28', 'chapter-28', 0.00, 28.00, 'Vol 5', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 28, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(29, NULL, 'Chapter 29', 'Title 29', 'chapter-29', 0.00, 29.00, 'Vol 7', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 29, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(30, NULL, 'Chapter 30', 'Title 30', 'chapter-30', 0.00, 30.00, 'Vol 1', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 30, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(31, NULL, 'Chapter 31', 'Title 31', 'chapter-31', 0.00, 31.00, 'Vol 4', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 31, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(32, NULL, 'Chapter 32', 'Title 32', 'chapter-32', 0.00, 32.00, 'Vol 7', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 32, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(33, NULL, 'Chapter 33', 'Title 33', 'chapter-33', 0.00, 33.00, 'Vol 2', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 33, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(34, NULL, 'Chapter 34', 'Title 34', 'chapter-34', 0.00, 34.00, 'Vol 10', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 34, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(35, NULL, 'Chapter 35', 'Title 35', 'chapter-35', 0.00, 35.00, 'Vol 10', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 35, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(36, NULL, 'Chapter 36', 'Title 36', 'chapter-36', 0.00, 36.00, 'Vol 3', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 36, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(37, NULL, 'Chapter 37', 'Title 37', 'chapter-37', 0.00, 37.00, 'Vol 2', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 37, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(38, NULL, 'Chapter 38', 'Title 38', 'chapter-38', 0.00, 38.00, 'Vol 9', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 38, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(39, NULL, 'Chapter 39', 'Title 39', 'chapter-39', 0.00, 39.00, 'Vol 1', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 39, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(40, NULL, 'Chapter 40', 'Title 40', 'chapter-40', 0.00, 40.00, 'Vol 9', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 40, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(41, NULL, 'Chapter 41', 'Title 41', 'chapter-41', 0.00, 41.00, 'Vol 8', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 41, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(42, NULL, 'Chapter 42', 'Title 42', 'chapter-42', 0.00, 42.00, 'Vol 4', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 42, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(43, NULL, 'Chapter 43', 'Title 43', 'chapter-43', 0.00, 43.00, 'Vol 4', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 43, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(44, NULL, 'Chapter 44', 'Title 44', 'chapter-44', 0.00, 44.00, 'Vol 8', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 44, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(45, NULL, 'Chapter 45', 'Title 45', 'chapter-45', 0.00, 45.00, 'Vol 7', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 45, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(46, NULL, 'Chapter 46', 'Title 46', 'chapter-46', 0.00, 46.00, 'Vol 1', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 46, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(47, NULL, 'Chapter 47', 'Title 47', 'chapter-47', 0.00, 47.00, 'Vol 3', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 47, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(48, NULL, 'Chapter 48', 'Title 48', 'chapter-48', 0.00, 48.00, 'Vol 2', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 48, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(49, NULL, 'Chapter 49', 'Title 49', 'chapter-49', 0.00, 49.00, 'Vol 2', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 49, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(50, NULL, 'Chapter 50', 'Title 50', 'chapter-50', 0.00, 50.00, 'Vol 3', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 50, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(51, NULL, 'Chapter 51', 'Title 51', 'chapter-51', 0.00, 51.00, 'Vol 8', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 51, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(52, NULL, 'Chapter 52', 'Title 52', 'chapter-52', 0.00, 52.00, 'Vol 3', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 52, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(53, NULL, 'Chapter 53', 'Title 53', 'chapter-53', 0.00, 53.00, 'Vol 7', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 53, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(54, NULL, 'Chapter 54', 'Title 54', 'chapter-54', 0.00, 54.00, 'Vol 7', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 54, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(55, NULL, 'Chapter 55', 'Title 55', 'chapter-55', 0.00, 55.00, 'Vol 2', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 55, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(56, NULL, 'Chapter 56', 'Title 56', 'chapter-56', 0.00, 56.00, 'Vol 10', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 56, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(57, NULL, 'Chapter 57', 'Title 57', 'chapter-57', 0.00, 57.00, 'Vol 2', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 57, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(58, NULL, 'Chapter 58', 'Title 58', 'chapter-58', 0.00, 58.00, 'Vol 1', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 58, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(59, NULL, 'Chapter 59', 'Title 59', 'chapter-59', 0.00, 59.00, 'Vol 8', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 59, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(60, NULL, 'Chapter 60', 'Title 60', 'chapter-60', 0.00, 60.00, 'Vol 5', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 60, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(61, NULL, 'Chapter 61', 'Title 61', 'chapter-61', 0.00, 61.00, 'Vol 2', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 61, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(62, NULL, 'Chapter 62', 'Title 62', 'chapter-62', 0.00, 62.00, 'Vol 4', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 62, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(63, NULL, 'Chapter 63', 'Title 63', 'chapter-63', 0.00, 63.00, 'Vol 2', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 63, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(64, NULL, 'Chapter 64', 'Title 64', 'chapter-64', 0.00, 64.00, 'Vol 8', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 64, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(65, NULL, 'Chapter 65', 'Title 65', 'chapter-65', 0.00, 65.00, 'Vol 3', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 65, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(66, NULL, 'Chapter 66', 'Title 66', 'chapter-66', 0.00, 66.00, 'Vol 9', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 66, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(67, NULL, 'Chapter 67', 'Title 67', 'chapter-67', 0.00, 67.00, 'Vol 9', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 67, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(68, NULL, 'Chapter 68', 'Title 68', 'chapter-68', 0.00, 68.00, 'Vol 6', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 68, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(69, NULL, 'Chapter 69', 'Title 69', 'chapter-69', 0.00, 69.00, 'Vol 1', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 69, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(70, NULL, 'Chapter 70', 'Title 70', 'chapter-70', 0.00, 70.00, 'Vol 9', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 70, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(71, NULL, 'Chapter 71', 'Title 71', 'chapter-71', 0.00, 71.00, 'Vol 9', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 71, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(72, NULL, 'Chapter 72', 'Title 72', 'chapter-72', 0.00, 72.00, 'Vol 9', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 72, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(73, NULL, 'Chapter 73', 'Title 73', 'chapter-73', 0.00, 73.00, 'Vol 9', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 73, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(74, NULL, 'Chapter 74', 'Title 74', 'chapter-74', 0.00, 74.00, 'Vol 7', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 74, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(75, NULL, 'Chapter 75', 'Title 75', 'chapter-75', 0.00, 75.00, 'Vol 6', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 75, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(76, NULL, 'Chapter 76', 'Title 76', 'chapter-76', 0.00, 76.00, 'Vol 10', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 76, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(77, NULL, 'Chapter 77', 'Title 77', 'chapter-77', 0.00, 77.00, 'Vol 2', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 77, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(78, NULL, 'Chapter 78', 'Title 78', 'chapter-78', 0.00, 78.00, 'Vol 9', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 78, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(79, NULL, 'Chapter 79', 'Title 79', 'chapter-79', 0.00, 79.00, 'Vol 7', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 79, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(80, NULL, 'Chapter 80', 'Title 80', 'chapter-80', 0.00, 80.00, 'Vol 8', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 80, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(81, NULL, 'Chapter 81', 'Title 81', 'chapter-81', 0.00, 81.00, 'Vol 7', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 81, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(82, NULL, 'Chapter 82', 'Title 82', 'chapter-82', 0.00, 82.00, 'Vol 2', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 82, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(83, NULL, 'Chapter 83', 'Title 83', 'chapter-83', 0.00, 83.00, 'Vol 9', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 83, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(84, NULL, 'Chapter 84', 'Title 84', 'chapter-84', 0.00, 84.00, 'Vol 7', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 84, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(85, NULL, 'Chapter 85', 'Title 85', 'chapter-85', 0.00, 85.00, 'Vol 10', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 85, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(86, NULL, 'Chapter 86', 'Title 86', 'chapter-86', 0.00, 86.00, 'Vol 6', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 86, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(87, NULL, 'Chapter 87', 'Title 87', 'chapter-87', 0.00, 87.00, 'Vol 1', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 87, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(88, NULL, 'Chapter 88', 'Title 88', 'chapter-88', 0.00, 88.00, 'Vol 8', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 88, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(89, NULL, 'Chapter 89', 'Title 89', 'chapter-89', 0.00, 89.00, 'Vol 3', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 89, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(90, NULL, 'Chapter 90', 'Title 90', 'chapter-90', 0.00, 90.00, 'Vol 3', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 90, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(91, NULL, 'Chapter 91', 'Title 91', 'chapter-91', 0.00, 91.00, 'Vol 4', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 91, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(92, NULL, 'Chapter 92', 'Title 92', 'chapter-92', 0.00, 92.00, 'Vol 2', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 92, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(93, NULL, 'Chapter 93', 'Title 93', 'chapter-93', 0.00, 93.00, 'Vol 6', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 93, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(94, NULL, 'Chapter 94', 'Title 94', 'chapter-94', 0.00, 94.00, 'Vol 5', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 94, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(95, NULL, 'Chapter 95', 'Title 95', 'chapter-95', 0.00, 95.00, 'Vol 5', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 95, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(96, NULL, 'Chapter 96', 'Title 96', 'chapter-96', 0.00, 96.00, 'Vol 8', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 96, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(97, NULL, 'Chapter 97', 'Title 97', 'chapter-97', 0.00, 97.00, 'Vol 8', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 97, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(98, NULL, 'Chapter 98', 'Title 98', 'chapter-98', 0.00, 98.00, 'Vol 3', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 98, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(99, NULL, 'Chapter 99', 'Title 99', 'chapter-99', 0.00, 99.00, 'Vol 3', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 99, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn'),
(100, NULL, 'Chapter 100', 'Title 100', 'chapter-100', 0.00, 100.00, 'Vol 2', '[\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\",\"https://picsum.photos/200/300\"]', 1, 100, 1, '2025-03-09 04:10:54', '2025-03-09 04:10:54', 'vn');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comics`
--

CREATE TABLE `comics` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `origin_name` text DEFAULT NULL,
  `slug` varchar(191) NOT NULL,
  `content` text DEFAULT NULL,
  `thumbnail` varchar(191) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `is_recommend` int(11) NOT NULL DEFAULT 0,
  `is_public` int(11) NOT NULL DEFAULT 0,
  `view_total` bigint(20) NOT NULL DEFAULT 0,
  `view_day` bigint(20) NOT NULL DEFAULT 0,
  `view_week` bigint(20) NOT NULL DEFAULT 0,
  `view_month` bigint(20) NOT NULL DEFAULT 0,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `upview_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comics`
--

INSERT INTO `comics` (`id`, `name`, `origin_name`, `slug`, `content`, `thumbnail`, `status`, `is_recommend`, `is_public`, `view_total`, `view_day`, `view_week`, `view_month`, `user_id`, `created_at`, `updated_at`, `upview_at`) VALUES
(1, 'Shadow Realm ', 'Shadow Realm  Gốc', 'shadow-realm-8800', 'Nội dung của Shadow Realm ', 'https://picsum.photos/200/300', 1, 0, 1, 10600, 1060, 3230, 4640, 1, '2025-03-09 04:08:20', NULL, NULL),
(2, 'Blade Dancers ', 'Blade Dancers  Gốc', 'blade-dancers-4901', 'Nội dung của Blade Dancers ', 'https://picsum.photos/200/300', 0, 0, 1, 10700, 1070, 3260, 4680, 1, '2025-03-09 04:08:20', NULL, NULL),
(3, 'Ethereal Knights ', 'Ethereal Knights  Gốc', 'ethereal-knights-1554', 'Nội dung của Ethereal Knights ', 'https://picsum.photos/200/300', 1, 0, 1, 10800, 1080, 3290, 4720, 1, '2025-03-09 04:08:20', NULL, NULL),
(4, 'Astral Guardians ', 'Astral Guardians  Gốc', 'astral-guardians-1611', 'Nội dung của Astral Guardians ', 'https://picsum.photos/200/300', 0, 0, 1, 10900, 1090, 3320, 4760, 1, '2025-03-09 04:08:20', NULL, NULL),
(5, 'Storm Warriors ', 'Storm Warriors  Gốc', 'storm-warriors-4840', 'Nội dung của Storm Warriors ', 'https://picsum.photos/200/300', 1, 0, 1, 11000, 1100, 3350, 4800, 1, '2025-03-09 04:08:20', NULL, NULL),
(6, 'Demon Slayer Chronicles ', 'Demon Slayer Chronicles  Gốc', 'demon-slayer-chronicles-5838', 'Nội dung của Demon Slayer Chronicles ', 'https://picsum.photos/200/300', 0, 0, 1, 11100, 1110, 3380, 4840, 1, '2025-03-09 04:08:20', NULL, NULL),
(7, 'Celestial Blade ', 'Celestial Blade  Gốc', 'celestial-blade-3698', 'Nội dung của Celestial Blade ', 'https://picsum.photos/200/300', 1, 0, 1, 11200, 1120, 3410, 4880, 1, '2025-03-09 04:08:20', NULL, NULL),
(8, 'Arcane Warlocks ', 'Arcane Warlocks  Gốc', 'arcane-warlocks-3006', 'Nội dung của Arcane Warlocks ', 'https://picsum.photos/200/300', 0, 0, 1, 11300, 1130, 3440, 4920, 1, '2025-03-09 04:08:20', NULL, NULL),
(9, 'Silent Moon ', 'Silent Moon  Gốc', 'silent-moon-5644', 'Nội dung của Silent Moon ', 'https://picsum.photos/200/300', 1, 0, 1, 11400, 1140, 3470, 4960, 1, '2025-03-09 04:08:20', NULL, NULL),
(10, 'Cosmic Samurai ', 'Cosmic Samurai  Gốc', 'cosmic-samurai-3151', 'Nội dung của Cosmic Samurai ', 'https://picsum.photos/200/300', 0, 0, 1, 11500, 1150, 3500, 5000, 1, '2025-03-09 04:08:20', NULL, NULL),
(11, 'Ghost Hunters ', 'Ghost Hunters  Gốc', 'ghost-hunters-9922', 'Nội dung của Ghost Hunters ', 'https://picsum.photos/200/300', 1, 0, 1, 11600, 1160, 3530, 5040, 1, '2025-03-09 04:08:20', NULL, NULL),
(12, 'Spectral Shadows ', 'Spectral Shadows  Gốc', 'spectral-shadows-1195', 'Nội dung của Spectral Shadows ', 'https://picsum.photos/200/300', 0, 0, 1, 11700, 1170, 3560, 5080, 1, '2025-03-09 04:08:20', NULL, NULL),
(13, 'Phoenix Warriors ', 'Phoenix Warriors  Gốc', 'phoenix-warriors-9840', 'Nội dung của Phoenix Warriors ', 'https://picsum.photos/200/300', 1, 0, 1, 11800, 1180, 3590, 5120, 1, '2025-03-09 04:08:20', NULL, NULL),
(14, 'Infernal Blades ', 'Infernal Blades  Gốc', 'infernal-blades-8107', 'Nội dung của Infernal Blades ', 'https://picsum.photos/200/300', 0, 0, 1, 11900, 1190, 3620, 5160, 1, '2025-03-09 04:08:20', NULL, NULL),
(15, 'Dragonborn Reign ', 'Dragonborn Reign  Gốc', 'dragonborn-reign-2868', 'Nội dung của Dragonborn Reign ', 'https://picsum.photos/200/300', 1, 0, 1, 12000, 1200, 3650, 5200, 1, '2025-03-09 04:08:20', NULL, NULL),
(16, 'Dystopian Samurai ', 'Dystopian Samurai  Gốc', 'dystopian-samurai-7854', 'Nội dung của Dystopian Samurai ', 'https://picsum.photos/200/300', 0, 0, 1, 12100, 1210, 3680, 5240, 1, '2025-03-09 04:08:20', NULL, NULL),
(17, 'Neo-Arcadia ', 'Neo-Arcadia  Gốc', 'neo-arcadia-8692', 'Nội dung của Neo-Arcadia ', 'https://picsum.photos/200/300', 1, 0, 1, 12200, 1220, 3710, 5280, 1, '2025-03-09 04:08:20', NULL, NULL),
(18, 'Moonlight Assassins ', 'Moonlight Assassins  Gốc', 'moonlight-assassins-5423', 'Nội dung của Moonlight Assassins ', 'https://picsum.photos/200/300', 0, 0, 1, 12300, 1230, 3740, 5320, 1, '2025-03-09 04:08:20', NULL, NULL),
(19, 'Starborn Empire ', 'Starborn Empire  Gốc', 'starborn-empire-8823', 'Nội dung của Starborn Empire ', 'https://picsum.photos/200/300', 1, 0, 1, 12400, 1240, 3770, 5360, 1, '2025-03-09 04:08:20', NULL, NULL),
(20, 'Frostbound Chronicles ', 'Frostbound Chronicles  Gốc', 'frostbound-chronicles-9843', 'Nội dung của Frostbound Chronicles ', 'https://picsum.photos/200/300', 0, 0, 1, 12500, 1250, 3800, 5400, 1, '2025-03-09 04:08:20', NULL, NULL),
(21, 'Titanfall War ', 'Titanfall War  Gốc', 'titanfall-war-2234', 'Nội dung của Titanfall War ', 'https://picsum.photos/200/300', 1, 0, 1, 12600, 1260, 3830, 5440, 1, '2025-03-09 04:08:20', NULL, NULL),
(22, 'Skyward Saga ', 'Skyward Saga  Gốc', 'skyward-saga-784', 'Nội dung của Skyward Saga ', 'https://picsum.photos/200/300', 0, 0, 1, 12700, 1270, 3860, 5480, 1, '2025-03-09 04:08:20', NULL, NULL),
(23, 'Ancient Legends ', 'Ancient Legends  Gốc', 'ancient-legends-1121', 'Nội dung của Ancient Legends ', 'https://picsum.photos/200/300', 1, 0, 1, 12800, 1280, 3890, 5520, 1, '2025-03-09 04:08:20', NULL, NULL),
(24, 'Mystic Chronicles ', 'Mystic Chronicles  Gốc', 'mystic-chronicles-1482', 'Nội dung của Mystic Chronicles ', 'https://picsum.photos/200/300', 0, 0, 1, 12900, 1290, 3920, 5560, 1, '2025-03-09 04:08:20', NULL, NULL),
(25, 'Omega Guardians ', 'Omega Guardians  Gốc', 'omega-guardians-8742', 'Nội dung của Omega Guardians ', 'https://picsum.photos/200/300', 1, 0, 1, 13000, 1300, 3950, 5600, 1, '2025-03-09 04:08:20', NULL, NULL),
(26, 'Doom Knights ', 'Doom Knights  Gốc', 'doom-knights-3565', 'Nội dung của Doom Knights ', 'https://picsum.photos/200/300', 0, 0, 1, 13100, 1310, 3980, 5640, 1, '2025-03-09 04:08:20', NULL, NULL),
(27, 'Solar Warriors ', 'Solar Warriors  Gốc', 'solar-warriors-5185', 'Nội dung của Solar Warriors ', 'https://picsum.photos/200/300', 1, 0, 1, 13200, 1320, 4010, 5680, 1, '2025-03-09 04:08:20', NULL, NULL),
(28, 'Heavenly Blades ', 'Heavenly Blades  Gốc', 'heavenly-blades-7522', 'Nội dung của Heavenly Blades ', 'https://picsum.photos/200/300', 0, 0, 1, 13300, 1330, 4040, 5720, 1, '2025-03-09 04:08:20', NULL, NULL),
(29, 'Twilight Reapers ', 'Twilight Reapers  Gốc', 'twilight-reapers-3023', 'Nội dung của Twilight Reapers ', 'https://picsum.photos/200/300', 1, 0, 1, 13400, 1340, 4070, 5760, 1, '2025-03-09 04:08:20', NULL, NULL),
(30, 'Runeborn Heroes ', 'Runeborn Heroes  Gốc', 'runeborn-heroes-4474', 'Nội dung của Runeborn Heroes ', 'https://picsum.photos/200/300', 0, 0, 1, 13500, 1350, 4100, 5800, 1, '2025-03-09 04:08:20', NULL, NULL),
(31, 'Cosmic Eclipse ', 'Cosmic Eclipse  Gốc', 'cosmic-eclipse-4610', 'Nội dung của Cosmic Eclipse ', 'https://picsum.photos/200/300', 1, 0, 1, 13600, 1360, 4130, 5840, 1, '2025-03-09 04:08:20', NULL, NULL),
(32, 'Darklight Knights ', 'Darklight Knights  Gốc', 'darklight-knights-4097', 'Nội dung của Darklight Knights ', 'https://picsum.photos/200/300', 0, 0, 1, 13700, 1370, 4160, 5880, 1, '2025-03-09 04:08:20', NULL, NULL),
(33, 'Eternal Blades ', 'Eternal Blades  Gốc', 'eternal-blades-2713', 'Nội dung của Eternal Blades ', 'https://picsum.photos/200/300', 1, 0, 1, 13800, 1380, 4190, 5920, 1, '2025-03-09 04:08:20', NULL, NULL),
(34, 'Samurai Phantom ', 'Samurai Phantom  Gốc', 'samurai-phantom-1120', 'Nội dung của Samurai Phantom ', 'https://picsum.photos/200/300', 0, 0, 1, 13900, 1390, 4220, 5960, 1, '2025-03-09 04:08:20', NULL, NULL),
(35, 'Netherworld Assassins ', 'Netherworld Assassins  Gốc', 'netherworld-assassins-9444', 'Nội dung của Netherworld Assassins ', 'https://picsum.photos/200/300', 1, 0, 1, 14000, 1400, 4250, 6000, 1, '2025-03-09 04:08:20', NULL, NULL),
(36, 'Void Reapers ', 'Void Reapers  Gốc', 'void-reapers-4794', 'Nội dung của Void Reapers ', 'https://picsum.photos/200/300', 0, 0, 1, 14100, 1410, 4280, 6040, 1, '2025-03-09 04:08:20', NULL, NULL),
(37, 'Starborn Dynasty ', 'Starborn Dynasty  Gốc', 'starborn-dynasty-9148', 'Nội dung của Starborn Dynasty ', 'https://picsum.photos/200/300', 1, 0, 1, 14200, 1420, 4310, 6080, 1, '2025-03-09 04:08:20', NULL, NULL),
(38, 'Solar Reign ', 'Solar Reign  Gốc', 'solar-reign-4819', 'Nội dung của Solar Reign ', 'https://picsum.photos/200/300', 0, 0, 1, 14300, 1430, 4340, 6120, 1, '2025-03-09 04:08:20', NULL, NULL),
(39, 'Dragonfire Chronicles ', 'Dragonfire Chronicles  Gốc', 'dragonfire-chronicles-9513', 'Nội dung của Dragonfire Chronicles ', 'https://picsum.photos/200/300', 1, 0, 1, 14400, 1440, 4370, 6160, 1, '2025-03-09 04:08:20', NULL, NULL),
(40, 'Neon Samurai ', 'Neon Samurai  Gốc', 'neon-samurai-6512', 'Nội dung của Neon Samurai ', 'https://picsum.photos/200/300', 0, 0, 1, 14500, 1450, 4400, 6200, 1, '2025-03-09 04:08:20', NULL, NULL),
(41, 'Quantum Knights ', 'Quantum Knights  Gốc', 'quantum-knights-9978', 'Nội dung của Quantum Knights ', 'https://picsum.photos/200/300', 1, 0, 1, 14600, 1460, 4430, 6240, 1, '2025-03-09 04:08:20', NULL, NULL),
(42, 'Cyber Blades ', 'Cyber Blades  Gốc', 'cyber-blades-600', 'Nội dung của Cyber Blades ', 'https://picsum.photos/200/300', 0, 0, 1, 14700, 1470, 4460, 6280, 1, '2025-03-09 04:08:20', NULL, NULL),
(43, 'Shinobi Reign ', 'Shinobi Reign  Gốc', 'shinobi-reign-9900', 'Nội dung của Shinobi Reign ', 'https://picsum.photos/200/300', 1, 0, 1, 14800, 1480, 4490, 6320, 1, '2025-03-09 04:08:20', NULL, NULL),
(44, 'Blood Moon Warriors ', 'Blood Moon Warriors  Gốc', 'blood-moon-warriors-1490', 'Nội dung của Blood Moon Warriors ', 'https://picsum.photos/200/300', 0, 0, 1, 14900, 1490, 4520, 6360, 1, '2025-03-09 04:08:20', NULL, NULL),
(45, 'Spectral Ronin ', 'Spectral Ronin  Gốc', 'spectral-ronin-551', 'Nội dung của Spectral Ronin ', 'https://picsum.photos/200/300', 1, 0, 1, 15000, 1500, 4550, 6400, 1, '2025-03-09 04:08:20', NULL, NULL),
(46, 'Lost Order ', 'Lost Order  Gốc', 'lost-order-9943', 'Nội dung của Lost Order ', 'https://picsum.photos/200/300', 0, 0, 1, 15100, 1510, 4580, 6440, 1, '2025-03-09 04:08:20', NULL, NULL),
(47, 'Demonborn Empire ', 'Demonborn Empire  Gốc', 'demonborn-empire-5239', 'Nội dung của Demonborn Empire ', 'https://picsum.photos/200/300', 1, 0, 1, 15200, 1520, 4610, 6480, 1, '2025-03-09 04:08:20', NULL, NULL),
(48, 'Silent Guardians ', 'Silent Guardians  Gốc', 'silent-guardians-7776', 'Nội dung của Silent Guardians ', 'https://picsum.photos/200/300', 0, 0, 1, 15300, 1530, 4640, 6520, 1, '2025-03-09 04:08:20', NULL, NULL),
(49, 'Fallen Kings ', 'Fallen Kings  Gốc', 'fallen-kings-8630', 'Nội dung của Fallen Kings ', 'https://picsum.photos/200/300', 1, 0, 1, 15400, 1540, 4670, 6560, 1, '2025-03-09 04:08:20', NULL, NULL),
(50, 'Shattered Blades ', 'Shattered Blades  Gốc', 'shattered-blades-5539', 'Nội dung của Shattered Blades ', 'https://picsum.photos/200/300', 0, 0, 1, 15500, 1550, 4700, 6600, 1, '2025-03-09 04:08:20', NULL, NULL),
(51, 'Galactic Sentinels ', 'Galactic Sentinels  Gốc', 'galactic-sentinels-8582', 'Nội dung của Galactic Sentinels ', 'https://picsum.photos/200/300', 1, 0, 1, 15600, 1560, 4730, 6640, 1, '2025-03-09 04:08:20', NULL, NULL),
(52, 'Phantom Thieves ', 'Phantom Thieves  Gốc', 'phantom-thieves-9186', 'Nội dung của Phantom Thieves ', 'https://picsum.photos/200/300', 0, 0, 1, 15700, 1570, 4760, 6680, 1, '2025-03-09 04:08:20', NULL, NULL),
(53, 'Eclipse Warriors ', 'Eclipse Warriors  Gốc', 'eclipse-warriors-5526', 'Nội dung của Eclipse Warriors ', 'https://picsum.photos/200/300', 1, 0, 1, 15800, 1580, 4790, 6720, 1, '2025-03-09 04:08:20', NULL, NULL),
(54, 'Nightmare Legion ', 'Nightmare Legion  Gốc', 'nightmare-legion-5321', 'Nội dung của Nightmare Legion ', 'https://picsum.photos/200/300', 0, 0, 1, 15900, 1590, 4820, 6760, 1, '2025-03-09 04:08:20', NULL, NULL),
(55, 'Celestial Guardians ', 'Celestial Guardians  Gốc', 'celestial-guardians-4636', 'Nội dung của Celestial Guardians ', 'https://picsum.photos/200/300', 1, 0, 1, 16000, 1600, 4850, 6800, 1, '2025-03-09 04:08:20', NULL, NULL),
(56, 'Abyssal Knights ', 'Abyssal Knights  Gốc', 'abyssal-knights-2704', 'Nội dung của Abyssal Knights ', 'https://picsum.photos/200/300', 0, 0, 1, 16100, 1610, 4880, 6840, 1, '2025-03-09 04:08:20', NULL, NULL),
(57, 'Thunderclap Samurai ', 'Thunderclap Samurai  Gốc', 'thunderclap-samurai-9513', 'Nội dung của Thunderclap Samurai ', 'https://picsum.photos/200/300', 1, 0, 1, 16200, 1620, 4910, 6880, 1, '2025-03-09 04:08:20', NULL, NULL),
(58, 'Mystic Voyagers ', 'Mystic Voyagers  Gốc', 'mystic-voyagers-3422', 'Nội dung của Mystic Voyagers ', 'https://picsum.photos/200/300', 0, 0, 1, 16300, 1630, 4940, 6920, 1, '2025-03-09 04:08:20', NULL, NULL),
(59, 'Shadow Reapers ', 'Shadow Reapers  Gốc', 'shadow-reapers-8163', 'Nội dung của Shadow Reapers ', 'https://picsum.photos/200/300', 1, 0, 1, 16400, 1640, 4970, 6960, 1, '2025-03-09 04:08:20', NULL, NULL),
(60, 'Starlight Assassins ', 'Starlight Assassins  Gốc', 'starlight-assassins-4291', 'Nội dung của Starlight Assassins ', 'https://picsum.photos/200/300', 0, 0, 1, 16500, 1650, 5000, 7000, 1, '2025-03-09 04:08:20', NULL, NULL),
(61, 'Inferno Knights ', 'Inferno Knights  Gốc', 'inferno-knights-4951', 'Nội dung của Inferno Knights ', 'https://picsum.photos/200/300', 1, 0, 1, 16600, 1660, 5030, 7040, 1, '2025-03-09 04:08:20', NULL, NULL),
(62, 'Crystal Dragons ', 'Crystal Dragons  Gốc', 'crystal-dragons-4885', 'Nội dung của Crystal Dragons ', 'https://picsum.photos/200/300', 0, 0, 1, 16700, 1670, 5060, 7080, 1, '2025-03-09 04:08:20', NULL, NULL),
(63, 'Eternal Shadows ', 'Eternal Shadows  Gốc', 'eternal-shadows-30', 'Nội dung của Eternal Shadows ', 'https://picsum.photos/200/300', 1, 0, 1, 16800, 1680, 5090, 7120, 1, '2025-03-09 04:08:20', NULL, NULL),
(64, 'Sky Pirates ', 'Sky Pirates  Gốc', 'sky-pirates-5466', 'Nội dung của Sky Pirates ', 'https://picsum.photos/200/300', 0, 0, 1, 16900, 1690, 5120, 7160, 1, '2025-03-09 04:08:20', NULL, NULL),
(65, 'Void Hunters ', 'Void Hunters  Gốc', 'void-hunters-8856', 'Nội dung của Void Hunters ', 'https://picsum.photos/200/300', 1, 0, 1, 17000, 1700, 5150, 7200, 1, '2025-03-09 04:08:20', NULL, NULL),
(66, 'Arcane Sentinels ', 'Arcane Sentinels  Gốc', 'arcane-sentinels-9358', 'Nội dung của Arcane Sentinels ', 'https://picsum.photos/200/300', 0, 0, 1, 17100, 1710, 5180, 7240, 1, '2025-03-09 04:08:20', NULL, NULL),
(67, 'Phantom Blades ', 'Phantom Blades  Gốc', 'phantom-blades-3176', 'Nội dung của Phantom Blades ', 'https://picsum.photos/200/300', 1, 0, 1, 17200, 1720, 5210, 7280, 1, '2025-03-09 04:08:20', NULL, NULL),
(68, 'Eclipse Hunters ', 'Eclipse Hunters  Gốc', 'eclipse-hunters-9279', 'Nội dung của Eclipse Hunters ', 'https://picsum.photos/200/300', 0, 0, 1, 17300, 1730, 5240, 7320, 1, '2025-03-09 04:08:20', NULL, NULL),
(69, 'Nightmare Reapers ', 'Nightmare Reapers  Gốc', 'nightmare-reapers-6808', 'Nội dung của Nightmare Reapers ', 'https://picsum.photos/200/300', 1, 0, 1, 17400, 1740, 5270, 7360, 1, '2025-03-09 04:08:20', NULL, NULL),
(70, 'Celestial Assassins ', 'Celestial Assassins  Gốc', 'celestial-assassins-7372', 'Nội dung của Celestial Assassins ', 'https://picsum.photos/200/300', 0, 0, 1, 17500, 1750, 5300, 7400, 1, '2025-03-09 04:08:20', NULL, NULL),
(71, 'Abyssal Samurai ', 'Abyssal Samurai  Gốc', 'abyssal-samurai-4788', 'Nội dung của Abyssal Samurai ', 'https://picsum.photos/200/300', 1, 0, 1, 17600, 1760, 5330, 7440, 1, '2025-03-09 04:08:20', NULL, NULL),
(72, 'Thunderclap Guardians ', 'Thunderclap Guardians  Gốc', 'thunderclap-guardians-9521', 'Nội dung của Thunderclap Guardians ', 'https://picsum.photos/200/300', 0, 0, 1, 17700, 1770, 5360, 7480, 1, '2025-03-09 04:08:20', NULL, NULL),
(73, 'Mystic Reapers ', 'Mystic Reapers  Gốc', 'mystic-reapers-1826', 'Nội dung của Mystic Reapers ', 'https://picsum.photos/200/300', 1, 0, 1, 17800, 1780, 5390, 7520, 1, '2025-03-09 04:08:20', NULL, NULL),
(74, 'Shadow Voyagers ', 'Shadow Voyagers  Gốc', 'shadow-voyagers-8010', 'Nội dung của Shadow Voyagers ', 'https://picsum.photos/200/300', 0, 0, 1, 17900, 1790, 5420, 7560, 1, '2025-03-09 04:08:20', NULL, NULL),
(75, 'Starlight Knights ', 'Starlight Knights  Gốc', 'starlight-knights-1451', 'Nội dung của Starlight Knights ', 'https://picsum.photos/200/300', 1, 0, 1, 18000, 1800, 5450, 7600, 1, '2025-03-09 04:08:20', NULL, NULL),
(76, 'Inferno Dragons ', 'Inferno Dragons  Gốc', 'inferno-dragons-4099', 'Nội dung của Inferno Dragons ', 'https://picsum.photos/200/300', 0, 0, 1, 18100, 1810, 5480, 7640, 1, '2025-03-09 04:08:20', NULL, NULL),
(77, 'Crystal Shadows ', 'Crystal Shadows  Gốc', 'crystal-shadows-5502', 'Nội dung của Crystal Shadows ', 'https://picsum.photos/200/300', 1, 0, 1, 18200, 1820, 5510, 7680, 1, '2025-03-09 04:08:20', NULL, NULL),
(78, 'Eternal Pirates ', 'Eternal Pirates  Gốc', 'eternal-pirates-5173', 'Nội dung của Eternal Pirates ', 'https://picsum.photos/200/300', 0, 0, 1, 18300, 1830, 5540, 7720, 1, '2025-03-09 04:08:20', NULL, NULL),
(79, 'Sky Hunters ', 'Sky Hunters  Gốc', 'sky-hunters-2099', 'Nội dung của Sky Hunters ', 'https://picsum.photos/200/300', 1, 0, 1, 18400, 1840, 5570, 7760, 1, '2025-03-09 04:08:20', NULL, NULL),
(80, 'Void Sentinels ', 'Void Sentinels  Gốc', 'void-sentinels-2444', 'Nội dung của Void Sentinels ', 'https://picsum.photos/200/300', 0, 0, 1, 18500, 1850, 5600, 7800, 1, '2025-03-09 04:08:20', NULL, NULL),
(81, 'Arcane Blades ', 'Arcane Blades  Gốc', 'arcane-blades-9016', 'Nội dung của Arcane Blades ', 'https://picsum.photos/200/300', 1, 0, 1, 18600, 1860, 5630, 7840, 1, '2025-03-09 04:08:20', NULL, NULL),
(82, 'Phantom Hunters ', 'Phantom Hunters  Gốc', 'phantom-hunters-3817', 'Nội dung của Phantom Hunters ', 'https://picsum.photos/200/300', 0, 0, 1, 18700, 1870, 5660, 7880, 1, '2025-03-09 04:08:20', NULL, NULL),
(83, 'Eclipse Reapers ', 'Eclipse Reapers  Gốc', 'eclipse-reapers-3719', 'Nội dung của Eclipse Reapers ', 'https://picsum.photos/200/300', 1, 0, 1, 18800, 1880, 5690, 7920, 1, '2025-03-09 04:08:20', NULL, NULL),
(84, 'Nightmare Assassins ', 'Nightmare Assassins  Gốc', 'nightmare-assassins-6578', 'Nội dung của Nightmare Assassins ', 'https://picsum.photos/200/300', 0, 0, 1, 18900, 1890, 5720, 7960, 1, '2025-03-09 04:08:20', NULL, NULL),
(85, 'Celestial Samurai ', 'Celestial Samurai  Gốc', 'celestial-samurai-8281', 'Nội dung của Celestial Samurai ', 'https://picsum.photos/200/300', 1, 0, 1, 19000, 1900, 5750, 8000, 1, '2025-03-09 04:08:20', NULL, NULL),
(86, 'Abyssal Guardians ', 'Abyssal Guardians  Gốc', 'abyssal-guardians-3770', 'Nội dung của Abyssal Guardians ', 'https://picsum.photos/200/300', 0, 0, 1, 19100, 1910, 5780, 8040, 1, '2025-03-09 04:08:20', NULL, NULL),
(87, 'Thunderclap Reapers ', 'Thunderclap Reapers  Gốc', 'thunderclap-reapers-9042', 'Nội dung của Thunderclap Reapers ', 'https://picsum.photos/200/300', 1, 0, 1, 19200, 1920, 5810, 8080, 1, '2025-03-09 04:08:20', NULL, NULL),
(88, 'Mystic Knights ', 'Mystic Knights  Gốc', 'mystic-knights-4690', 'Nội dung của Mystic Knights ', 'https://picsum.photos/200/300', 0, 0, 1, 19300, 1930, 5840, 8120, 1, '2025-03-09 04:08:20', NULL, NULL),
(89, 'Shadow Dragons ', 'Shadow Dragons  Gốc', 'shadow-dragons-6963', 'Nội dung của Shadow Dragons ', 'https://picsum.photos/200/300', 1, 0, 1, 19400, 1940, 5870, 8160, 1, '2025-03-09 04:08:20', NULL, NULL),
(90, 'Starlight Shadows ', 'Starlight Shadows  Gốc', 'starlight-shadows-8619', 'Nội dung của Starlight Shadows ', 'https://picsum.photos/200/300', 0, 0, 1, 19500, 1950, 5900, 8200, 1, '2025-03-09 04:08:20', NULL, NULL),
(91, 'Inferno Pirates ', 'Inferno Pirates  Gốc', 'inferno-pirates-8483', 'Nội dung của Inferno Pirates ', 'https://picsum.photos/200/300', 1, 0, 1, 19600, 1960, 5930, 8240, 1, '2025-03-09 04:08:20', NULL, NULL),
(92, 'Crystal Hunters ', 'Crystal Hunters  Gốc', 'crystal-hunters-1332', 'Nội dung của Crystal Hunters ', 'https://picsum.photos/200/300', 0, 0, 1, 19700, 1970, 5960, 8280, 1, '2025-03-09 04:08:20', NULL, NULL),
(93, 'Eternal Sentinels ', 'Eternal Sentinels  Gốc', 'eternal-sentinels-5018', 'Nội dung của Eternal Sentinels ', 'https://picsum.photos/200/300', 1, 0, 1, 19800, 1980, 5990, 8320, 1, '2025-03-09 04:08:20', NULL, NULL),
(94, 'Sky Blades ', 'Sky Blades  Gốc', 'sky-blades-3704', 'Nội dung của Sky Blades ', 'https://picsum.photos/200/300', 0, 0, 1, 19900, 1990, 6020, 8360, 1, '2025-03-09 04:08:20', NULL, NULL),
(95, 'Void Reapers ', 'Void Reapers  Gốc', 'void-reapers-7362', 'Nội dung của Void Reapers ', 'https://picsum.photos/200/300', 1, 0, 1, 20000, 2000, 6050, 8400, 1, '2025-03-09 04:08:20', NULL, NULL),
(96, 'Arcane Assassins ', 'Arcane Assassins  Gốc', 'arcane-assassins-6139', 'Nội dung của Arcane Assassins ', 'https://picsum.photos/200/300', 0, 0, 1, 20100, 2010, 6080, 8440, 1, '2025-03-09 04:08:20', NULL, NULL),
(97, 'Phantom Samurai ', 'Phantom Samurai  Gốc', 'phantom-samurai-9254', 'Nội dung của Phantom Samurai ', 'https://picsum.photos/200/300', 1, 0, 1, 20200, 2020, 6110, 8480, 1, '2025-03-09 04:08:20', NULL, NULL),
(98, 'Eclipse Guardians ', 'Eclipse Guardians  Gốc', 'eclipse-guardians-7272', 'Nội dung của Eclipse Guardians ', 'https://picsum.photos/200/300', 0, 0, 1, 20300, 2030, 6140, 8520, 1, '2025-03-09 04:08:20', NULL, NULL),
(99, 'Nightmare Knights ', 'Nightmare Knights  Gốc', 'nightmare-knights-2213', 'Nội dung của Nightmare Knights ', 'https://picsum.photos/200/300', 1, 0, 1, 20400, 2040, 6170, 8560, 1, '2025-03-09 04:08:20', NULL, NULL),
(100, 'Celestial Dragons ', 'Celestial Dragons  Gốc', 'celestial-dragons-1886', 'Nội dung của Celestial Dragons ', 'https://picsum.photos/200/300', 0, 0, 1, 20500, 2050, 6200, 8600, 1, '2025-03-09 04:08:20', NULL, NULL),
(101, 'Abyssal Shadows ', 'Abyssal Shadows  Gốc', 'abyssal-shadows-970', 'Nội dung của Abyssal Shadows ', 'https://picsum.photos/200/300', 1, 0, 1, 20600, 2060, 6230, 8640, 1, '2025-03-09 04:08:20', NULL, NULL),
(102, 'Thunderclap Pirates ', 'Thunderclap Pirates  Gốc', 'thunderclap-pirates-2932', 'Nội dung của Thunderclap Pirates ', 'https://picsum.photos/200/300', 0, 0, 1, 20700, 2070, 6260, 8680, 1, '2025-03-09 04:08:20', NULL, NULL),
(103, 'Mystic Hunters ', 'Mystic Hunters  Gốc', 'mystic-hunters-3174', 'Nội dung của Mystic Hunters ', 'https://picsum.photos/200/300', 1, 0, 1, 20800, 2080, 6290, 8720, 1, '2025-03-09 04:08:20', NULL, NULL),
(104, 'Shadow Sentinels ', 'Shadow Sentinels  Gốc', 'shadow-sentinels-5859', 'Nội dung của Shadow Sentinels ', 'https://picsum.photos/200/300', 0, 0, 1, 20900, 2090, 6320, 8760, 1, '2025-03-09 04:08:20', NULL, NULL),
(105, 'Starlight Blades ', 'Starlight Blades  Gốc', 'starlight-blades-891', 'Nội dung của Starlight Blades ', 'https://picsum.photos/200/300', 1, 0, 1, 21000, 2100, 6350, 8800, 1, '2025-03-09 04:08:20', NULL, NULL),
(106, 'Inferno Reapers ', 'Inferno Reapers  Gốc', 'inferno-reapers-1409', 'Nội dung của Inferno Reapers ', 'https://picsum.photos/200/300', 0, 0, 1, 21100, 2110, 6380, 8840, 1, '2025-03-09 04:08:20', NULL, NULL),
(107, 'Crystal Assassins ', 'Crystal Assassins  Gốc', 'crystal-assassins-7248', 'Nội dung của Crystal Assassins ', 'https://picsum.photos/200/300', 1, 0, 1, 21200, 2120, 6410, 8880, 1, '2025-03-09 04:08:20', NULL, NULL),
(108, 'Eternal Samurai ', 'Eternal Samurai  Gốc', 'eternal-samurai-9393', 'Nội dung của Eternal Samurai ', 'https://picsum.photos/200/300', 0, 0, 1, 21300, 2130, 6440, 8920, 1, '2025-03-09 04:08:20', NULL, NULL),
(109, 'Sky Guardians ', 'Sky Guardians  Gốc', 'sky-guardians-6180', 'Nội dung của Sky Guardians ', 'https://picsum.photos/200/300', 1, 0, 1, 21400, 2140, 6470, 8960, 1, '2025-03-09 04:08:20', NULL, NULL),
(110, 'Void Knights ', 'Void Knights  Gốc', 'void-knights-2274', 'Nội dung của Void Knights ', 'https://picsum.photos/200/300', 0, 0, 1, 21500, 2150, 6500, 9000, 1, '2025-03-09 04:08:20', NULL, NULL),
(111, 'Arcane Dragons ', 'Arcane Dragons  Gốc', 'arcane-dragons-8687', 'Nội dung của Arcane Dragons ', 'https://picsum.photos/200/300', 1, 0, 1, 21600, 2160, 6530, 9040, 1, '2025-03-09 04:08:20', NULL, NULL),
(112, 'Phantom Shadows ', 'Phantom Shadows  Gốc', 'phantom-shadows-7420', 'Nội dung của Phantom Shadows ', 'https://picsum.photos/200/300', 0, 0, 1, 21700, 2170, 6560, 9080, 1, '2025-03-09 04:08:20', NULL, NULL),
(113, 'Eclipse Pirates ', 'Eclipse Pirates  Gốc', 'eclipse-pirates-8385', 'Nội dung của Eclipse Pirates ', 'https://picsum.photos/200/300', 1, 0, 1, 21800, 2180, 6590, 9120, 1, '2025-03-09 04:08:20', NULL, NULL),
(114, 'Nightmare Hunters ', 'Nightmare Hunters  Gốc', 'nightmare-hunters-4205', 'Nội dung của Nightmare Hunters ', 'https://picsum.photos/200/300', 0, 0, 1, 21900, 2190, 6620, 9160, 1, '2025-03-09 04:08:20', NULL, NULL),
(115, 'Celestial Sentinels ', 'Celestial Sentinels  Gốc', 'celestial-sentinels-867', 'Nội dung của Celestial Sentinels ', 'https://picsum.photos/200/300', 1, 0, 1, 22000, 2200, 6650, 9200, 1, '2025-03-09 04:08:20', NULL, NULL),
(116, 'Abyssal Blades ', 'Abyssal Blades  Gốc', 'abyssal-blades-3722', 'Nội dung của Abyssal Blades ', 'https://picsum.photos/200/300', 0, 0, 1, 22100, 2210, 6680, 9240, 1, '2025-03-09 04:08:20', NULL, NULL),
(117, 'Thunderclap Assassins ', 'Thunderclap Assassins  Gốc', 'thunderclap-assassins-9413', 'Nội dung của Thunderclap Assassins ', 'https://picsum.photos/200/300', 1, 0, 1, 22200, 2220, 6710, 9280, 1, '2025-03-09 04:08:20', NULL, NULL),
(118, 'Mystic Samurai ', 'Mystic Samurai  Gốc', 'mystic-samurai-1387', 'Nội dung của Mystic Samurai ', 'https://picsum.photos/200/300', 0, 0, 1, 22300, 2230, 6740, 9320, 1, '2025-03-09 04:08:20', NULL, NULL),
(119, 'Shadow Guardians ', 'Shadow Guardians  Gốc', 'shadow-guardians-8724', 'Nội dung của Shadow Guardians ', 'https://picsum.photos/200/300', 1, 0, 1, 22400, 2240, 6770, 9360, 1, '2025-03-09 04:08:20', NULL, NULL),
(120, 'Starlight Knights ', 'Starlight Knights  Gốc', 'starlight-knights-4967', 'Nội dung của Starlight Knights ', 'https://picsum.photos/200/300', 0, 0, 1, 22500, 2250, 6800, 9400, 1, '2025-03-09 04:08:20', NULL, NULL),
(121, 'Inferno Shadows ', 'Inferno Shadows  Gốc', 'inferno-shadows-7161', 'Nội dung của Inferno Shadows ', 'https://picsum.photos/200/300', 1, 0, 1, 22600, 2260, 6830, 9440, 1, '2025-03-09 04:08:20', NULL, NULL),
(122, 'Crystal Pirates ', 'Crystal Pirates  Gốc', 'crystal-pirates-6835', 'Nội dung của Crystal Pirates ', 'https://picsum.photos/200/300', 0, 0, 1, 22700, 2270, 6860, 9480, 1, '2025-03-09 04:08:20', NULL, NULL),
(123, 'Eternal Hunters ', 'Eternal Hunters  Gốc', 'eternal-hunters-1909', 'Nội dung của Eternal Hunters ', 'https://picsum.photos/200/300', 1, 0, 1, 22800, 2280, 6890, 9520, 1, '2025-03-09 04:08:20', NULL, NULL),
(124, 'Sky Sentinels ', 'Sky Sentinels  Gốc', 'sky-sentinels-9539', 'Nội dung của Sky Sentinels ', 'https://picsum.photos/200/300', 0, 0, 1, 22900, 2290, 6920, 9560, 1, '2025-03-09 04:08:20', NULL, NULL),
(125, 'Void Blades ', 'Void Blades  Gốc', 'void-blades-9924', 'Nội dung của Void Blades ', 'https://picsum.photos/200/300', 1, 0, 1, 23000, 2300, 6950, 9600, 1, '2025-03-09 04:08:20', NULL, NULL),
(126, 'Arcane Reapers ', 'Arcane Reapers  Gốc', 'arcane-reapers-7664', 'Nội dung của Arcane Reapers ', 'https://picsum.photos/200/300', 0, 0, 1, 23100, 2310, 6980, 9640, 1, '2025-03-09 04:08:20', NULL, NULL),
(127, 'Phantom Assassins ', 'Phantom Assassins  Gốc', 'phantom-assassins-5792', 'Nội dung của Phantom Assassins ', 'https://picsum.photos/200/300', 1, 0, 1, 23200, 2320, 7010, 9680, 1, '2025-03-09 04:08:20', NULL, NULL),
(128, 'Eclipse Samurai ', 'Eclipse Samurai  Gốc', 'eclipse-samurai-8382', 'Nội dung của Eclipse Samurai ', 'https://picsum.photos/200/300', 0, 0, 1, 23300, 2330, 7040, 9720, 1, '2025-03-09 04:08:20', NULL, NULL),
(129, 'Nightmare Guardians ', 'Nightmare Guardians  Gốc', 'nightmare-guardians-4641', 'Nội dung của Nightmare Guardians ', 'https://picsum.photos/200/300', 1, 0, 1, 23400, 2340, 7070, 9760, 1, '2025-03-09 04:08:20', NULL, NULL),
(130, 'Celestial Knights ', 'Celestial Knights  Gốc', 'celestial-knights-492', 'Nội dung của Celestial Knights ', 'https://picsum.photos/200/300', 0, 0, 1, 23500, 2350, 7100, 9800, 1, '2025-03-09 04:08:20', NULL, NULL),
(131, 'Abyssal Dragons ', 'Abyssal Dragons  Gốc', 'abyssal-dragons-2447', 'Nội dung của Abyssal Dragons ', 'https://picsum.photos/200/300', 1, 0, 1, 23600, 2360, 7130, 9840, 1, '2025-03-09 04:08:20', NULL, NULL),
(132, 'Thunderclap Shadows ', 'Thunderclap Shadows  Gốc', 'thunderclap-shadows-8488', 'Nội dung của Thunderclap Shadows ', 'https://picsum.photos/200/300', 0, 0, 1, 23700, 2370, 7160, 9880, 1, '2025-03-09 04:08:20', NULL, NULL),
(133, 'Mystic Pirates ', 'Mystic Pirates  Gốc', 'mystic-pirates-7723', 'Nội dung của Mystic Pirates ', 'https://picsum.photos/200/300', 1, 0, 1, 23800, 2380, 7190, 9920, 1, '2025-03-09 04:08:20', NULL, NULL),
(134, 'Shadow Hunters ', 'Shadow Hunters  Gốc', 'shadow-hunters-7331', 'Nội dung của Shadow Hunters ', 'https://picsum.photos/200/300', 0, 0, 1, 23900, 2390, 7220, 9960, 1, '2025-03-09 04:08:20', NULL, NULL),
(135, 'Starlight Sentinels ', 'Starlight Sentinels  Gốc', 'starlight-sentinels-9443', 'Nội dung của Starlight Sentinels ', 'https://picsum.photos/200/300', 1, 0, 1, 24000, 2400, 7250, 10000, 1, '2025-03-09 04:08:20', NULL, NULL),
(136, 'Inferno Blades ', 'Inferno Blades  Gốc', 'inferno-blades-5716', 'Nội dung của Inferno Blades ', 'https://picsum.photos/200/300', 0, 0, 1, 24100, 2410, 7280, 10040, 1, '2025-03-09 04:08:20', NULL, NULL),
(137, 'Crystal Reapers ', 'Crystal Reapers  Gốc', 'crystal-reapers-7441', 'Nội dung của Crystal Reapers ', 'https://picsum.photos/200/300', 1, 0, 1, 24200, 2420, 7310, 10080, 1, '2025-03-09 04:08:20', NULL, NULL),
(138, 'Eternal Assassins ', 'Eternal Assassins  Gốc', 'eternal-assassins-2796', 'Nội dung của Eternal Assassins ', 'https://picsum.photos/200/300', 0, 0, 1, 24300, 2430, 7340, 10120, 1, '2025-03-09 04:08:20', NULL, NULL),
(139, 'Sky Samurai ', 'Sky Samurai  Gốc', 'sky-samurai-8334', 'Nội dung của Sky Samurai ', 'https://picsum.photos/200/300', 1, 0, 1, 24400, 2440, 7370, 10160, 1, '2025-03-09 04:08:20', NULL, NULL),
(140, 'Void Guardians ', 'Void Guardians  Gốc', 'void-guardians-2643', 'Nội dung của Void Guardians ', 'https://picsum.photos/200/300', 0, 0, 1, 24500, 2450, 7400, 10200, 1, '2025-03-09 04:08:20', NULL, NULL),
(141, 'Arcane Knights ', 'Arcane Knights  Gốc', 'arcane-knights-8397', 'Nội dung của Arcane Knights ', 'https://picsum.photos/200/300', 1, 0, 1, 24600, 2460, 7430, 10240, 1, '2025-03-09 04:08:20', NULL, NULL),
(142, 'Phantom Dragons ', 'Phantom Dragons  Gốc', 'phantom-dragons-4437', 'Nội dung của Phantom Dragons ', 'https://picsum.photos/200/300', 0, 0, 1, 24700, 2470, 7460, 10280, 1, '2025-03-09 04:08:20', NULL, NULL),
(143, 'Eclipse Shadows ', 'Eclipse Shadows  Gốc', 'eclipse-shadows-319', 'Nội dung của Eclipse Shadows ', 'https://picsum.photos/200/300', 1, 0, 1, 24800, 2480, 7490, 10320, 1, '2025-03-09 04:08:20', NULL, NULL),
(144, 'Nightmare Pirates ', 'Nightmare Pirates  Gốc', 'nightmare-pirates-3375', 'Nội dung của Nightmare Pirates ', 'https://picsum.photos/200/300', 0, 0, 1, 24900, 2490, 7520, 10360, 1, '2025-03-09 04:08:20', NULL, NULL),
(145, 'Celestial Hunters ', 'Celestial Hunters  Gốc', 'celestial-hunters-1232', 'Nội dung của Celestial Hunters ', 'https://picsum.photos/200/300', 1, 0, 1, 25000, 2500, 7550, 10400, 1, '2025-03-09 04:08:20', NULL, NULL),
(146, 'Abyssal Sentinels ', 'Abyssal Sentinels  Gốc', 'abyssal-sentinels-7145', 'Nội dung của Abyssal Sentinels ', 'https://picsum.photos/200/300', 0, 0, 1, 25100, 2510, 7580, 10440, 1, '2025-03-09 04:08:20', NULL, NULL),
(147, 'Thunderclap Blades ', 'Thunderclap Blades  Gốc', 'thunderclap-blades-8535', 'Nội dung của Thunderclap Blades ', 'https://picsum.photos/200/300', 1, 0, 1, 25200, 2520, 7610, 10480, 1, '2025-03-09 04:08:20', NULL, NULL),
(148, 'Mystic Reapers ', 'Mystic Reapers  Gốc', 'mystic-reapers-584', 'Nội dung của Mystic Reapers ', 'https://picsum.photos/200/300', 0, 0, 1, 25300, 2530, 7640, 10520, 1, '2025-03-09 04:08:20', NULL, NULL),
(149, 'Shadow Assassins ', 'Shadow Assassins  Gốc', 'shadow-assassins-7974', 'Nội dung của Shadow Assassins ', 'https://picsum.photos/200/300', 1, 0, 1, 25400, 2540, 7670, 10560, 1, '2025-03-09 04:08:20', NULL, NULL),
(150, 'Starlight Samurai ', 'Starlight Samurai  Gốc', 'starlight-samurai-6763', 'Nội dung của Starlight Samurai ', 'https://picsum.photos/200/300', 0, 0, 1, 25500, 2550, 7700, 10600, 1, '2025-03-09 04:08:20', NULL, NULL),
(151, 'Inferno Guardians ', 'Inferno Guardians  Gốc', 'inferno-guardians-3949', 'Nội dung của Inferno Guardians ', 'https://picsum.photos/200/300', 1, 0, 1, 25600, 2560, 7730, 10640, 1, '2025-03-09 04:08:20', NULL, NULL),
(152, 'Crystal Knights ', 'Crystal Knights  Gốc', 'crystal-knights-4766', 'Nội dung của Crystal Knights ', 'https://picsum.photos/200/300', 0, 0, 1, 25700, 2570, 7760, 10680, 1, '2025-03-09 04:08:20', NULL, NULL),
(153, 'Eternal Dragons ', 'Eternal Dragons  Gốc', 'eternal-dragons-7693', 'Nội dung của Eternal Dragons ', 'https://picsum.photos/200/300', 1, 0, 1, 25800, 2580, 7790, 10720, 1, '2025-03-09 04:08:20', NULL, NULL),
(154, 'Sky Shadows ', 'Sky Shadows  Gốc', 'sky-shadows-6183', 'Nội dung của Sky Shadows ', 'https://picsum.photos/200/300', 0, 0, 1, 25900, 2590, 7820, 10760, 1, '2025-03-09 04:08:20', NULL, NULL),
(155, 'Void Pirates ', 'Void Pirates  Gốc', 'void-pirates-2006', 'Nội dung của Void Pirates ', 'https://picsum.photos/200/300', 1, 0, 1, 26000, 2600, 7850, 10800, 1, '2025-03-09 04:08:20', NULL, NULL),
(156, 'Arcane Hunters ', 'Arcane Hunters  Gốc', 'arcane-hunters-9848', 'Nội dung của Arcane Hunters ', 'https://picsum.photos/200/300', 0, 0, 1, 26100, 2610, 7880, 10840, 1, '2025-03-09 04:08:20', NULL, NULL),
(157, 'Phantom Sentinels ', 'Phantom Sentinels  Gốc', 'phantom-sentinels-4199', 'Nội dung của Phantom Sentinels ', 'https://picsum.photos/200/300', 1, 0, 1, 26200, 2620, 7910, 10880, 1, '2025-03-09 04:08:20', NULL, NULL),
(158, 'Eclipse Blades ', 'Eclipse Blades  Gốc', 'eclipse-blades-6689', 'Nội dung của Eclipse Blades ', 'https://picsum.photos/200/300', 0, 0, 1, 26300, 2630, 7940, 10920, 1, '2025-03-09 04:08:20', NULL, NULL),
(159, 'Nightmare Reapers ', 'Nightmare Reapers  Gốc', 'nightmare-reapers-3132', 'Nội dung của Nightmare Reapers ', 'https://picsum.photos/200/300', 1, 0, 1, 26400, 2640, 7970, 10960, 1, '2025-03-09 04:08:20', NULL, NULL),
(160, 'Celestial Assassins ', 'Celestial Assassins  Gốc', 'celestial-assassins-3104', 'Nội dung của Celestial Assassins ', 'https://picsum.photos/200/300', 0, 0, 1, 26500, 2650, 8000, 11000, 1, '2025-03-09 04:08:20', NULL, NULL),
(161, 'Abyssal Samurai ', 'Abyssal Samurai  Gốc', 'abyssal-samurai-5873', 'Nội dung của Abyssal Samurai ', 'https://picsum.photos/200/300', 1, 0, 1, 26600, 2660, 8030, 11040, 1, '2025-03-09 04:08:20', NULL, NULL),
(162, 'Thunderclap Dragons ', 'Thunderclap Dragons  Gốc', 'thunderclap-dragons-3620', 'Nội dung của Thunderclap Dragons ', 'https://picsum.photos/200/300', 0, 0, 1, 26700, 2670, 8060, 11080, 1, '2025-03-09 04:08:20', NULL, NULL),
(163, 'Mystic Shadows ', 'Mystic Shadows  Gốc', 'mystic-shadows-6877', 'Nội dung của Mystic Shadows ', 'https://picsum.photos/200/300', 1, 0, 1, 26800, 2680, 8090, 11120, 1, '2025-03-09 04:08:20', NULL, NULL),
(164, 'Shadow Pirates ', 'Shadow Pirates  Gốc', 'shadow-pirates-3362', 'Nội dung của Shadow Pirates ', 'https://picsum.photos/200/300', 0, 0, 1, 26900, 2690, 8120, 11160, 1, '2025-03-09 04:08:20', NULL, NULL),
(165, 'Starlight Hunters ', 'Starlight Hunters  Gốc', 'starlight-hunters-8938', 'Nội dung của Starlight Hunters ', 'https://picsum.photos/200/300', 1, 0, 1, 27000, 2700, 8150, 11200, 1, '2025-03-09 04:08:20', NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comic_authors`
--

CREATE TABLE `comic_authors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `comic_id` bigint(20) UNSIGNED NOT NULL,
  `author_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comic_authors`
--

INSERT INTO `comic_authors` (`id`, `comic_id`, `author_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2025-03-14 11:27:16', '2025-03-14 11:27:16'),
(2, 2, 2, '2025-03-14 11:27:16', '2025-03-14 11:27:16'),
(3, 3, 3, '2025-03-14 11:27:16', '2025-03-14 11:27:16'),
(4, 165, 5, '2025-03-14 11:27:16', '2025-03-14 11:27:16');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comic_categories`
--

CREATE TABLE `comic_categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `comic_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comic_categories`
--

INSERT INTO `comic_categories` (`id`, `comic_id`, `category_id`, `created_at`, `updated_at`) VALUES
(1, 1, 1, '2025-03-14 11:27:05', '2025-03-14 11:27:05'),
(2, 1, 3, '2025-03-14 11:27:05', '2025-03-14 11:27:05'),
(3, 2, 1, '2025-03-14 11:27:05', '2025-03-14 11:27:05'),
(4, 2, 2, '2025-03-14 11:27:05', '2025-03-14 11:27:05'),
(5, 165, 7, '2025-03-14 11:27:05', '2025-03-14 11:27:05'),
(6, 165, 10, '2025-03-14 11:27:05', '2025-03-14 11:27:05');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comic_translators`
--

CREATE TABLE `comic_translators` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `comic_id` bigint(20) UNSIGNED NOT NULL,
  `translator_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comic_translators`
--

INSERT INTO `comic_translators` (`id`, `comic_id`, `translator_id`, `created_at`, `updated_at`) VALUES
(5, 1, 1, '2025-03-14 11:26:54', '2025-03-14 11:26:54'),
(6, 2, 1, '2025-03-14 11:26:54', '2025-03-14 11:26:54'),
(7, 50, 1, '2025-03-14 11:26:54', '2025-03-14 11:26:54');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `content` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `comic_id` bigint(20) UNSIGNED DEFAULT NULL,
  `chapter_id` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `total_like` int(11) NOT NULL DEFAULT 0,
  `total_dislike` int(11) NOT NULL DEFAULT 0,
  `total_report` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `comments`
--

INSERT INTO `comments` (`id`, `content`, `status`, `comic_id`, `chapter_id`, `user_id`, `parent_id`, `total_like`, `total_dislike`, `total_report`, `created_at`, `updated_at`) VALUES
(63, 'Truyện này thật sự quá hay!', 1, 49, '34', 151, NULL, 10, 0, 1, '2025-02-21 04:52:12', '2025-02-21 04:52:12'),
(65, 'Tôi thấy chương này hơi nhàm.', 0, 129, '90', 85, NULL, 3, 5, 1, '2025-02-16 04:52:12', '2025-02-16 04:52:12'),
(66, 'Cốt truyện cuốn hút quá.', 1, 27, '9', 151, NULL, 12, 1, 0, '2025-03-03 04:52:12', '2025-03-03 04:52:12'),
(67, 'Tôi thích nhân vật phản diện!', 1, 161, '60', 148, 63, 5, 0, 2, '2025-03-01 04:52:12', '2025-03-01 04:52:12'),
(68, 'Chương này hơi ngắn nhỉ?', 0, 10, '50', 85, 3, 4, 1, 0, '2025-02-22 04:52:12', '2025-02-22 04:52:12'),
(69, 'Hóng chương tiếp theo quá!', 1, 54, '13', 151, NULL, 18, 0, 0, '2025-03-05 04:52:12', '2025-03-05 04:52:12'),
(70, 'Tác giả thật sáng tạo!', 1, 112, '98', 148, NULL, 9, 1, 0, '2025-02-27 04:52:12', '2025-02-27 04:52:12'),
(71, 'Chương này nhiều thoại ghê.', 0, 142, '36', 85, 7, 2, 3, 1, '2025-02-11 04:52:12', '2025-02-11 04:52:12'),
(72, 'Bình luận này để kiểm tra.', 0, 38, '5', 151, NULL, 1, 0, 0, '2025-02-06 04:52:12', '2025-02-06 04:52:12'),
(73, 'Nhân vật chính bá đạo quá!', 1, 95, '72', 148, NULL, 20, 0, 0, '2025-03-06 04:52:12', '2025-03-06 04:52:12'),
(74, 'Mình thích phong cách vẽ.', 1, 140, '9', 85, 63, 7, 0, 0, '2025-02-18 04:52:12', '2025-02-18 04:52:12'),
(76, 'Chương này cảm động quá.', 1, 146, '18', 148, 13, 10, 0, 1, '2025-02-24 04:52:12', '2025-02-24 04:52:12'),
(77, 'Tôi thích phản diện hơn chính diện.', 0, 35, '53', 85, 15, 3, 2, 0, '2025-02-14 04:52:12', '2025-02-14 04:52:12'),
(78, 'Không biết bao giờ ra chương mới!', 1, 3, '51', 151, NULL, 17, 1, 0, '2025-02-28 04:52:12', '2025-02-28 04:52:12'),
(79, 'Ai thích nhân vật phụ không?', 1, 74, '74', 148, NULL, 6, 0, 0, '2025-02-25 04:52:12', '2025-02-25 04:52:12'),
(80, 'Bối cảnh truyện rất đẹp.', 1, 59, '56', 85, 17, 4, 1, 0, '2025-02-08 04:52:12', '2025-02-08 04:52:12'),
(81, 'Tác giả spoil trước hơi nhiều.', 0, 116, '86', 151, NULL, 2, 5, 1, '2025-02-20 04:52:12', '2025-02-20 04:52:12'),
(82, 'Chương mới có gì hot không?', 1, 28, '27', 148, 19, 9, 0, 0, '2025-03-04 04:52:12', '2025-03-04 04:52:12'),
(83, '<p><img src=\"http://4.bp.blogspot.com/_1Jw2fzSntT0/TZDLBB9cMqI/AAAAAAAABPo/aEOUmUAfhNY/w1600/001.gif\" alt=\"emo\" /></p>', 0, 137, '34', 151, NULL, 0, 0, 0, '2025-03-08 09:26:33', '2025-03-08 09:26:33'),
(84, '<p><img src=\"http://4.bp.blogspot.com/_1Jw2fzSntT0/TZDLBB9cMqI/AAAAAAAABPo/aEOUmUAfhNY/w1600/001.gif\" alt=\"emo\" /></p>', 0, 35, '3', 151, NULL, 0, 0, 0, '2025-03-08 09:28:57', '2025-03-08 09:28:57'),
(85, '<p><img src=\"http://4.bp.blogspot.com/_1Jw2fzSntT0/TZDLBB9cMqI/AAAAAAAABPo/aEOUmUAfhNY/w1600/001.gif\" alt=\"emo\" /></p>', 0, 82, '39', 151, NULL, 0, 0, 0, '2025-03-08 09:29:49', '2025-03-08 09:29:49'),
(87, '<p><i</p>', 0, 79, '20', 151, 85, 0, 0, 0, '2025-03-08 09:32:52', '2025-03-08 09:32:52'),
(88, '<p><i</p>', 0, 94, '25', 151, 85, 0, 0, 0, '2025-03-08 09:33:53', '2025-03-08 09:33:53'),
(89, '<p><i</p>', 0, 84, '82', 151, 83, 0, 0, 0, '2025-03-08 09:35:47', '2025-03-08 09:35:47');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `follows`
--

CREATE TABLE `follows` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `comic_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `follows`
--

INSERT INTO `follows` (`id`, `user_id`, `comic_id`, `created_at`, `updated_at`) VALUES
(22, 151, 47, '2025-01-18 20:29:05', '2025-01-18 20:29:05'),
(23, 151, 83, '2025-01-18 21:09:13', '2025-01-18 21:09:13'),
(25, 151, 108, '2025-01-18 21:10:12', '2025-01-18 21:10:12'),
(26, 151, 124, '2025-01-18 21:10:27', '2025-01-18 21:10:27'),
(27, 151, 130, '2025-01-18 21:10:34', '2025-01-18 21:10:34'),
(988, 151, 115, '2025-03-08 02:30:14', '2025-03-08 02:30:14');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `histories`
--

CREATE TABLE `histories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `comic_id` bigint(20) UNSIGNED DEFAULT NULL,
  `story_id` bigint(20) UNSIGNED DEFAULT NULL,
  `list_chapter` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `histories`
--

INSERT INTO `histories` (`id`, `user_id`, `comic_id`, `story_id`, `list_chapter`, `created_at`, `updated_at`) VALUES
(30, 151, 12, NULL, '[1, 2, 3]', '2025-01-18 20:22:35', '2025-03-07 16:35:31'),
(31, 151, 65, NULL, '[1, 2, 3]', '2025-01-18 20:29:20', '2025-01-19 00:06:26');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(191) NOT NULL,
  `content` text DEFAULT NULL,
  `type` varchar(191) NOT NULL DEFAULT 'user',
  `link` varchar(191) DEFAULT NULL,
  `status` bit(1) NOT NULL DEFAULT b'0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `title`, `content`, `type`, `link`, `status`, `created_at`, `updated_at`) VALUES
(197, 151, 'Chương mới của Shadow Realm', 'Chapter 2 đã ra mắt!', 'user', '/comic/shadow-realm-8800/chapter-2', b'0', '2025-03-14 11:20:28', '2025-03-14 11:20:28');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `guard_name` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'create comic', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(2, 'edit comic', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(3, 'delete comic', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(4, 'create chapter', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(5, 'edit chapter', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(6, 'delete chapter', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(7, 'create blog', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(8, 'edit blog', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(9, 'delete blog', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(10, 'create comment', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(11, 'edit comment', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(12, 'delete comment', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(13, 'create user', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(14, 'edit user', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(15, 'delete user', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(16, 'create role', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(17, 'edit role', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(18, 'delete role', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(19, 'create category', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(20, 'edit category', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(21, 'delete category', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(22, 'create author', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(23, 'edit author', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(24, 'delete author', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(25, 'create level', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(26, 'edit level', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(27, 'delete level', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(28, 'create translator', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(29, 'edit translator', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(30, 'delete translator', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(31, 'create price', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(32, 'edit price', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(33, 'delete price', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(34, 'create notification', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(35, 'edit notification', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(36, 'delete notification', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(37, 'create ads', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(38, 'edit ads', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(39, 'delete ads', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(40, 'create setting', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(41, 'edit setting', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(42, 'delete setting', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(43, 'create calender', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(44, 'edit calender', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(45, 'delete calender', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(46, 'create email', 'web', '2025-01-08 11:34:58', '2025-01-08 11:34:58'),
(47, 'edit email', 'web', '2025-01-08 11:34:59', '2025-01-08 11:34:59'),
(48, 'delete email', 'web', '2025-01-08 11:34:59', '2025-01-08 11:34:59'),
(49, 'create seo', 'web', '2025-01-08 11:34:59', '2025-01-08 11:34:59'),
(50, 'edit seo', 'web', '2025-01-08 11:34:59', '2025-01-08 11:34:59'),
(51, 'delete seo', 'web', '2025-01-08 11:34:59', '2025-01-08 11:34:59'),
(52, 'create backup', 'web', '2025-01-08 11:34:59', '2025-01-08 11:34:59'),
(53, 'edit backup', 'web', '2025-01-08 11:34:59', '2025-01-08 11:34:59'),
(54, 'delete backup', 'web', '2025-01-08 11:34:59', '2025-01-08 11:34:59'),
(55, 'crawl', 'web', '2025-01-08 11:34:59', '2025-01-08 11:34:59');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `pricelists`
--

CREATE TABLE `pricelists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `price` double(8,2) NOT NULL,
  `number_of_coins` double(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `pricelists`
--

INSERT INTO `pricelists` (`id`, `name`, `price`, `number_of_coins`, `created_at`, `updated_at`) VALUES
(1, 'Gói cơ bản', 1.99, 100.00, '2025-03-14 11:20:40', '2025-03-14 11:20:40'),
(2, 'Gói cao cấp', 4.99, 500.00, '2025-03-14 11:20:40', '2025-03-14 11:20:40');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `purchases`
--

CREATE TABLE `purchases` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `chapter_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(191) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `purchases`
--

INSERT INTO `purchases` (`id`, `user_id`, `chapter_id`, `type`, `created_at`, `updated_at`) VALUES
(1, 151, 5, NULL, '2025-03-09 03:23:56', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `transactions`
--

CREATE TABLE `transactions` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `type` enum('deposit','withdraw','purchase') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('pending','completed','failed') NOT NULL DEFAULT 'pending',
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Đang đổ dữ liệu cho bảng `transactions`
--

INSERT INTO `transactions` (`id`, `user_id`, `type`, `amount`, `status`, `description`, `created_at`, `updated_at`) VALUES
(1, 148, 'deposit', 237.28, 'pending', 'Test transaction', '2025-03-09 02:24:00', '2025-03-09 02:31:07'),
(2, 148, 'withdraw', 150.89, 'completed', 'Test transaction', '2025-03-09 02:24:00', '2025-03-14 11:21:57'),
(3, 148, 'purchase', 231.44, 'failed', 'Test transaction', '2025-03-09 02:24:00', '2025-03-14 11:21:57'),
(4, 148, 'deposit', 39.26, 'completed', 'Test transaction', '2025-03-09 02:24:00', '2025-03-14 11:21:57'),
(5, 148, 'withdraw', 163.07, 'pending', 'Test transaction', '2025-03-09 02:24:00', '2025-03-14 11:21:57'),
(6, 148, 'purchase', 244.90, 'completed', 'Test transaction', '2025-03-09 02:24:00', '2025-03-14 11:21:57'),
(7, 148, 'deposit', 185.44, 'failed', 'Test transaction', '2025-03-09 02:24:00', '2025-03-14 11:21:57'),
(8, 148, 'withdraw', 319.27, 'pending', 'Test transaction', '2025-03-09 02:24:00', '2025-03-14 11:21:57'),
(9, 148, 'purchase', 397.23, 'completed', 'Test transaction', '2025-03-09 02:24:00', '2025-03-14 11:21:57'),
(10, 148, 'deposit', 173.90, 'failed', 'Test transaction', '2025-03-09 02:24:00', '2025-03-14 11:21:57'),
(12, 151, 'deposit', 10000.00, 'pending', 'Yêu cầu nạp tiền', '2025-03-09 03:14:44', '2025-03-09 03:14:44'),
(13, 151, 'deposit', 10000.00, 'pending', 'Yêu cầu nạp tiền từ Bakâa', '2025-03-09 03:17:19', '2025-03-09 03:17:19'),
(14, 151, 'purchase', 100.00, 'completed', 'Purchased chapter 40912', '2025-03-09 03:19:31', '2025-03-09 03:19:31'),
(15, 151, 'purchase', 100.00, 'completed', 'Purchased chapter 40912', '2025-03-09 03:23:55', '2025-03-09 03:23:55');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `translators`
--

CREATE TABLE `translators` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `description` text DEFAULT NULL,
  `thumbnail` varchar(191) DEFAULT NULL,
  `title_seo` varchar(191) DEFAULT NULL,
  `meta_keywords` varchar(191) DEFAULT NULL,
  `meta_description` varchar(191) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `translators`
--

INSERT INTO `translators` (`id`, `name`, `slug`, `description`, `thumbnail`, `title_seo`, `meta_keywords`, `meta_description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Scan Translation', 'scan-translation', '<p><br></p>', NULL, 'Scan Translation Group', 'Scan Translation Group', 'Scan Translation Group', 1, '2025-02-09 15:10:00', '2025-02-09 15:10:00'),
(2, 'FanSub VN', 'fansub-vn', 'Nhóm dịch manga tiếng Việt', 'https://picsum.photos/200/300', 'FanSub VN', 'manga, dịch', 'Nhóm dịch manga tiếng Việt', 1, '2025-03-14 11:22:13', '2025-03-14 11:22:13');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `role_id` int(11) NOT NULL DEFAULT 0,
  `status` int(11) NOT NULL DEFAULT 1,
  `password` varchar(191) NOT NULL,
  `exp` int(11) NOT NULL DEFAULT 0,
  `google_id` varchar(191) DEFAULT NULL,
  `avatar` varchar(191) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `total_point` double(8,2) NOT NULL DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `role_id`, `status`, `password`, `exp`, `google_id`, `avatar`, `remember_token`, `created_at`, `updated_at`, `total_point`) VALUES
(1, 'Admin', 'ad@saucemanhwa.com', NULL, 1, 1, '$2y$12$1fCxeLjNkOmSBwZ.MuoYnOiq.8e4JyPQPIKb3cvYskO/lw3KsjnYW', 999999, NULL, 'http://img.saucemanhwa.com/images/avatars/default.jpg', 'SMc8K7tlnNAJJWIzTBm1gEEKosqrN7cdqYtm2D9AdlIsquNzG3fe1y0NPGWd', '2025-01-08 11:35:15', '2025-03-09 03:19:31', 100.00),
(85, 'dau@thankinhcac.com', 'dau@thankinhcac.com', NULL, 0, 1, '$2y$12$S5nzNCGr3YoV6HmIo1ecYeEJ7RYEMLLuGPTHxqSf.pSUN3vP2/QsC', 999999, NULL, 'https://saucemanhwa.org/images/avatars/default.jpg', 'aWXnKhgY1InwY6p6y2z24HH7PHOCiP1Ziy0ox2NHXI8qYAhfWtS00DavMrcZ', '2025-02-03 15:29:51', '2025-02-03 15:29:51', 0.00),
(148, 'Test User', 'testuser@example.com', NULL, 1, 0, '$2b$10$jSgeQwRO4YbK105MztzlruZrbDqkmyctvoUjgFMdPhcK27igNl02.', 0, NULL, NULL, 'aef8cb2eadd6a7384c2ee243631c5a7c01c13589a7c48fc60ba021fd3aa6e70478a95edd237ce17bcf8f2a137a9d1d37', '2025-03-04 15:02:28', '2025-03-09 03:23:55', 100.00),
(151, 'Bakâa', 'admin@example.com', NULL, 2, 1, '$2b$10$2vWph7rl3dJlM9dGD.JONuKd.yHXR9pBKOcKurzOzSaOsnXJBZV.m', 5, NULL, NULL, '6a538d7a735f38d276dbc0c0cf2519bd1e246bfaa105dbe1965532ea2484e034242d1e15e836339d205397d32044314d', '2025-03-07 10:03:32', '2025-03-09 03:23:54', 300.00);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `votes`
--

CREATE TABLE `votes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `comic_id` bigint(20) UNSIGNED NOT NULL,
  `value` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `votes`
--

INSERT INTO `votes` (`id`, `user_id`, `comic_id`, `value`, `content`, `created_at`, `updated_at`) VALUES
(4, 151, 159, 1, 'The story is good, but it’s moving painfully slow. We’re 35 chapters in, and all we see is the MC trying to mimic the fiancée\'s lover with her and other women, which feels like he’s forcing himself to be someone he’s not.\n\nMeanwhile, the fiancée is still cheating with her long-time lover, making the MC\'s efforts seem pointless. Despite everything, the MC remains intimate with her, and the revenge plot—what everyone wants to see—feels completely stagnant.\n\nI’ve decided to give it until chapter 40 to see some real progress. If nothing changes, I’ll drop the story.', '2025-01-23 01:51:02', '2025-01-23 01:51:02'),
(5, 151, 88, 3, 'Good', '2025-02-02 05:56:06', '2025-02-02 05:56:06'),
(6, 151, 127, 5, 'Sugoii', '2025-02-02 13:09:57', '2025-02-02 13:09:57'),
(9, 151, 39, 1, 'cudcyhdskbhdscgfn', '2025-03-08 02:34:46', '2025-03-08 02:35:09'),
(10, 151, 146, 1, 'cudcyhdskbhdscgfn', '2025-03-08 02:38:53', '2025-03-08 02:38:53');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `authors_slug_unique` (`slug`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`);

--
-- Chỉ mục cho bảng `chapters`
--
ALTER TABLE `chapters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chapters_comic_id_foreign` (`comic_id`),
  ADD KEY `chapters_user_id_foreign` (`user_id`),
  ADD KEY `chapters_translator_id_foreign` (`translator_id`);

--
-- Chỉ mục cho bảng `comics`
--
ALTER TABLE `comics`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `comics_slug_unique` (`slug`),
  ADD KEY `comics_user_id_foreign` (`user_id`);

--
-- Chỉ mục cho bảng `comic_authors`
--
ALTER TABLE `comic_authors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comic_authors_comic_id_foreign` (`comic_id`),
  ADD KEY `comic_authors_author_id_foreign` (`author_id`);

--
-- Chỉ mục cho bảng `comic_categories`
--
ALTER TABLE `comic_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comic_categories_comic_id_foreign` (`comic_id`),
  ADD KEY `comic_categories_category_id_foreign` (`category_id`);

--
-- Chỉ mục cho bảng `comic_translators`
--
ALTER TABLE `comic_translators`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comic_translators_comic_id_foreign` (`comic_id`),
  ADD KEY `comic_translators_translator_id_foreign` (`translator_id`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `comments_user_id_foreign` (`user_id`),
  ADD KEY `comments_comic_id_foreign` (`comic_id`),
  ADD KEY `comments_chapter_id_foreign` (`chapter_id`);

--
-- Chỉ mục cho bảng `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`id`),
  ADD KEY `follows_user_id_foreign` (`user_id`),
  ADD KEY `follows_comic_id_foreign` (`comic_id`);

--
-- Chỉ mục cho bảng `histories`
--
ALTER TABLE `histories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `histories_user_id_foreign` (`user_id`),
  ADD KEY `histories_comic_id_foreign` (`comic_id`);

--
-- Chỉ mục cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_id_foreign` (`user_id`);

--
-- Chỉ mục cho bảng `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Chỉ mục cho bảng `pricelists`
--
ALTER TABLE `pricelists`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `purchases`
--
ALTER TABLE `purchases`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `translators`
--
ALTER TABLE `translators`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `translators_slug_unique` (`slug`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Chỉ mục cho bảng `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `votes_user_id_foreign` (`user_id`),
  ADD KEY `votes_comic_id_foreign` (`comic_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `authors`
--
ALTER TABLE `authors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `chapters`
--
ALTER TABLE `chapters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=128;

--
-- AUTO_INCREMENT cho bảng `comics`
--
ALTER TABLE `comics`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=166;

--
-- AUTO_INCREMENT cho bảng `comic_authors`
--
ALTER TABLE `comic_authors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `comic_categories`
--
ALTER TABLE `comic_categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT cho bảng `comic_translators`
--
ALTER TABLE `comic_translators`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT cho bảng `follows`
--
ALTER TABLE `follows`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=989;

--
-- AUTO_INCREMENT cho bảng `histories`
--
ALTER TABLE `histories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1478;

--
-- AUTO_INCREMENT cho bảng `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=198;

--
-- AUTO_INCREMENT cho bảng `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT cho bảng `pricelists`
--
ALTER TABLE `pricelists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `purchases`
--
ALTER TABLE `purchases`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `translators`
--
ALTER TABLE `translators`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=152;

--
-- AUTO_INCREMENT cho bảng `votes`
--
ALTER TABLE `votes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `chapters`
--
ALTER TABLE `chapters`
  ADD CONSTRAINT `chapters_comic_id_foreign` FOREIGN KEY (`comic_id`) REFERENCES `comics` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `chapters_translator_id_foreign` FOREIGN KEY (`translator_id`) REFERENCES `translators` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `chapters_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `comics`
--
ALTER TABLE `comics`
  ADD CONSTRAINT `comics_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `comic_authors`
--
ALTER TABLE `comic_authors`
  ADD CONSTRAINT `comic_authors_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comic_authors_comic_id_foreign` FOREIGN KEY (`comic_id`) REFERENCES `comics` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `comic_categories`
--
ALTER TABLE `comic_categories`
  ADD CONSTRAINT `comic_categories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comic_categories_comic_id_foreign` FOREIGN KEY (`comic_id`) REFERENCES `comics` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `comic_translators`
--
ALTER TABLE `comic_translators`
  ADD CONSTRAINT `comic_translators_comic_id_foreign` FOREIGN KEY (`comic_id`) REFERENCES `comics` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comic_translators_translator_id_foreign` FOREIGN KEY (`translator_id`) REFERENCES `translators` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_comic_id_foreign` FOREIGN KEY (`comic_id`) REFERENCES `comics` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_comic_id_foreign` FOREIGN KEY (`comic_id`) REFERENCES `comics` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `follows_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `histories`
--
ALTER TABLE `histories`
  ADD CONSTRAINT `histories_comic_id_foreign` FOREIGN KEY (`comic_id`) REFERENCES `comics` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_comic_id_foreign` FOREIGN KEY (`comic_id`) REFERENCES `comics` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `votes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
