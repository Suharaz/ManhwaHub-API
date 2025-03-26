"use client";
import { useState } from "react";

interface Comic {
  id: number;
  name: string;
  slug: string;
  thumbnail: string;
  content: string;
}

interface Chapter {
  id: number;
  name: string;
  slug: string;
  price: number;
  content: string; // JSON string chứa mảng ảnh
}

interface ChapterShort {
  id: number;
  name: string;
  slug: string;
}

interface ChapterData {
  comics: Comic;
  currentChapter: Chapter;
  nextChapter: ChapterShort | null;
  prevChapter: ChapterShort | null;
  listChapter: ChapterShort[];
}

interface Props {
  data: ChapterData;
}

export default function ChapterPage({ data }: Props) {
  const { comics, currentChapter, nextChapter, prevChapter, listChapter } = data;
  const images: string[] = JSON.parse(currentChapter.content);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Thông tin truyện */}
      <div className="flex items-center gap-4">
        <img src={comics.thumbnail} alt={comics.name} className="w-20 h-28 rounded shadow" />
        <div>
          <h1 className="text-2xl font-bold">{comics.name}</h1>
          <p className="text-gray-600">{comics.content}</p>
        </div>
      </div>

      {/* Tiêu đề chapter */}
      <div className="text-center">
        <h2 className="text-3xl font-semibold">{currentChapter.name}</h2>
        <p className="text-gray-500">
          Giá: {currentChapter.price === 0 ? "Miễn phí" : `${currentChapter.price} Coins`}
        </p>
      </div>

      {/* Render ảnh đọc truyện */}
      <div className="bg-white rounded-2xl shadow p-4 space-y-4">
        {images.map((src, index) => (
          <img key={index} src={src} alt={`Trang ${index + 1}`} className="w-full rounded" />
        ))}
      </div>

      {/* Điều hướng chương */}
      <div className="flex justify-between items-center relative">
        {prevChapter ? (
          <a
            href={`/${comics.slug}/${prevChapter.id}`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            ⬅️ {prevChapter.name}
          </a>
        ) : (
          <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded cursor-not-allowed">
            ⬅️ Không có
          </span>
        )}

        {/* Dropdown danh sách chapter */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            📖 Danh sách chap
          </button>
          {showDropdown && (
            <div className="absolute left-0 bottom-full mt-2 w-56 bg-white shadow-lg rounded border max-h-60 overflow-auto z-10">
              {listChapter.map((chapter) => (
                <a
                  key={chapter.id}
                  href={`/${comics.slug}/${chapter.id}`}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {chapter.name}
                </a>
              ))}
            </div>
          )}
        </div>

        {nextChapter ? (
          <a
            href={`/${comics.slug}/${nextChapter.id}`}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            {nextChapter.name} ➡️
          </a>
        ) : (
          <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded cursor-not-allowed">
            Hết chương ➡️
          </span>
        )}
      </div>
    </div>
  );
}
