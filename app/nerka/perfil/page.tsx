import Link from "next/link";

export default function PerfilPage() {
  return (
    <main className="px-4 py-5 pb-24">
      <div className="rounded-3xl bg-gradient-to-br from-[#5B2EFF] to-[#2B174F] p-5 text-white">
        <p className="text-sm opacity-90">Tu cuenta</p>
        <h1 className="text-2xl font-semibold">Hola, Martina 👋</h1>
        <p className="mt-1 text-sm opacity-90">Gestioná tus solicitudes y contrataciones desde acá.</p>
      </div>

      <div className="mt-4 space-y-2">
        {[
          ["Mis solicitudes", "/nerka/solicitudes"],
          ["Conversaciones", "/nerka/mensajes"],
          ["Eventos guardados", "/nerka/eventos"],
          ["Editar preferencias", "/nerka/solicitudes/nueva"],
        ].map(([label, href]) => (
          <Link key={label} href={href} className="block rounded-xl bg-white px-4 py-3 text-sm text-[#2B174F] shadow-sm">
            {label}
          </Link>
        ))}
      </div>
    </main>
  );
}
