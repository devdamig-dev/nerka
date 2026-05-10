import { CheckCircle2, PencilLine } from "lucide-react";
import { proposal } from "@/lib/nerka-data";

export function ChatThread() {
  return (
    <div className="space-y-3">
      <div className="self-start rounded-2xl bg-white p-3 text-sm text-[#3B4038] shadow-sm">Hola, me interesa una propuesta para el cumple de mi bebé.</div>
      <div className="ml-auto w-fit rounded-2xl bg-[#EEF3EA] p-3 text-sm text-[#2F3A2B]">¡Hola! Gracias por escribirme. ¿La fecha sigue siendo 12 de mayo?</div>
      <div className="self-start rounded-2xl bg-white p-3 text-sm text-[#3B4038] shadow-sm">Sí, en Berazategui. Quiero algo simple pero lindo.</div>
      <div className="ml-auto w-fit rounded-2xl bg-[#EEF3EA] p-3 text-sm text-[#2F3A2B]">Perfecto, te envié una propuesta estructurada abajo 👇</div>
    </div>
  );
}

export function StructuredProposalCard() {
  return (
    <section className="rounded-2xl border-2 border-[#6E7F63] bg-white p-4 shadow-md">
      <p className="text-sm font-semibold text-[#2F3A2B]">Propuesta estructurada</p>
      <p className="mt-2 text-2xl font-bold text-[#6E7F63]">{proposal.estimatedPrice}</p>
      <p className="text-sm text-[#666C60]">{proposal.availability}</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-[#4F554B]">
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
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#6E7F63] px-3 py-2 text-sm font-medium text-white">
          <CheckCircle2 size={16} /> Aceptar propuesta
        </button>
        <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#EEF3EA] px-3 py-2 text-sm font-medium text-[#6E7F63]">
          <PencilLine size={16} /> Pedir ajuste
        </button>
      </div>
    </section>
  );
}
