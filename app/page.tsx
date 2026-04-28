import Link from "next/link";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAFAFC] p-6">
      <div className="rounded-3xl border border-[#ece8f7] bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-semibold text-[#2B174F]">NERKA MVP</h1>
        <p className="mt-2 text-sm text-[#6F6A7C]">Encontrá, compará y contratá emprendedores cerca tuyo.</p>
        <Link href="/nerka" className="mt-5 inline-block rounded-xl bg-[#5B2EFF] px-4 py-2.5 text-white">
          Abrir app
        </Link>
      </div>
    </main>
  );
}
