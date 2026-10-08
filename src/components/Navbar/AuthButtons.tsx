import Link from "next/link";

export default function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Link
        href="/SignIn"
        className="btn btn-sm border border-[#008f4c] bg-white text-[#008f4c] hover:bg-[#008f4c] hover:text-white"
      >
        সাইন ইন
      </Link>

      <Link
        href="/SignUp"
        className="btn btn-sm bg-[#008f4c] text-white border-[#008f4c] hover:bg-[#007a40]"
      >
        সাইন আপ
      </Link>
    </div>
  );
}
