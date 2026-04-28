import { CheckCircle2, PencilLine, Sparkles } from "lucide-react";
import { proposal } from "@/lib/nerka-data";

export function ChatThread() {
  return (
    <div className="space-y-3">
      <div className="max-w-[85%] rounded-2xl bg-white p-3 text-sm text-[#312b47] shadow-sm">Hola, me interesa una propuesta para el cumple de mi bebé.</div>
      <div className="ml-auto w-fit max-w-[85%] rounded-2xl bg-[#F2ECFF] p-3 text-sm text-[#2B174F]">¡Hola! Gracias por escribirme. ¿La fecha sigue siendo 12 de mayo?</div>
      <div className="max-w-[85%] rounded-2xl bg-white p-3 text-sm text-[#312b47] shadow-sm">Sí, en Berazategui. Quiero algo simple pero lindo.</div>
      <div className="ml-auto w-fit max-w-[85%] rounded-2xl bg-[#F2ECFF] p-3 text-sm text-[#2B174F]">Perfecto, te envié una propuesta estructurada abajo 👇</div>
    </div>
  );
}

export function StructuredProposalCard() {
  return (
    <section className="rounded-2xl border-2 border-[#5B2EFF] bg-white p-4 shadow-md">
      <p className="inline-flex items-center gap-1 rounded-full bg-[#F2ECFF] px-2 py-1 text-xs font-medium text-[#5B2EFF]"><Sparkles size={13} /> Propuesta recibida</p>
      <p className="mt-2 text-sm font-semibold text-[#2B174F]">Propuesta estructurada</p>
      <p className="mt-1 text-2xl font-bold text-[#5B2EFF]">{proposal.estimatedPrice}</p>
      <p className="text-sm text-[#6F6A7C]">{proposal.availability}</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#433d56]">
        {proposal.includes.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {proposal.references.map((img) => (
          <img key={img} src={img} alt="Referencia propuesta" className="h-20 w-full rounded-xl object-cover" />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B2EFF] px-3 py-2 text-sm font-medium text-white">
          <CheckCircle2 size={16} /> Aceptar propuesta
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F2ECFF] px-3 py-2 text-sm font-medium text-[#5B2EFF]">
          <PencilLine size={16} /> Pedir ajuste
        </button>
      </div>
    </section>
  );
}
