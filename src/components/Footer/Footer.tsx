export default function Footer() {
  return (
    <footer className="border-t border-[#e5ebe7] bg-white">
      <div className="mx-auto max-w-[1120px] px-4 py-6 sm:px-6 sm:py-7 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          {/* LEFT */}
          <div>
            <p className="text-sm font-bold text-[#202522] sm:text-[15px]">
              বাজার দর
            </p>

            <p className="mt-1 text-xs text-[#737a76] sm:text-sm">
              প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>

            <p className="mt-2 text-[11px] text-[#9aa19d] sm:text-xs">
              © ২০২৬ বাজার দর — All Rights Reserved.
            </p>
          </div>

          {/* RIGHT */}
          <div className="sm:text-right">
            <p className="text-xs leading-5 text-[#737a76] sm:text-sm">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </p>

            <p className="mt-2 text-xs font-medium text-[#008f4c]">
              Developer Md. Yousuf Ali
            </p>

            <p className="mt-0.5 text-[11px] text-[#9aa19d]">
              Full Stack Developer
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
