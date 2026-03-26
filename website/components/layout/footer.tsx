import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🀄</span>
              <span className="text-lg font-bold text-zinc-900">学习汉语</span>
            </div>
            <p className="mt-3 text-sm text-zinc-500">
              Website học tiếng Trung miễn phí. Từ HSK 1 đến HSK 6.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Học tập</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/lessons" className="text-sm text-zinc-500 hover:text-zinc-700">Bài học</Link></li>
              <li><Link href="/vocabulary" className="text-sm text-zinc-500 hover:text-zinc-700">Từ vựng</Link></li>
              <li><Link href="/grammar" className="text-sm text-zinc-500 hover:text-zinc-700">Ngữ pháp</Link></li>
              <li><Link href="/practice" className="text-sm text-zinc-500 hover:text-zinc-700">Luyện tập</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-zinc-900">Công cụ</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/dictionary" className="text-sm text-zinc-500 hover:text-zinc-700">Từ điển</Link></li>
              <li><Link href="/practice/writing" className="text-sm text-zinc-500 hover:text-zinc-700">Luyện viết chữ</Link></li>
              <li><Link href="/practice/listening" className="text-sm text-zinc-500 hover:text-zinc-700">Luyện nghe</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-zinc-200 pt-8 text-center">
          <p className="text-sm text-zinc-400">© 2026 学习汉语. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
