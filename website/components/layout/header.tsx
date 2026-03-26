import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🀄</span>
          <span className="text-xl font-bold text-zinc-900">学习汉语</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/lessons" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            Bài học
          </Link>
          <Link href="/vocabulary" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            Từ vựng
          </Link>
          <Link href="/grammar" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            Ngữ pháp
          </Link>
          <Link href="/practice" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            Luyện tập
          </Link>
          <Link href="/dictionary" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
            Từ điển
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
}
