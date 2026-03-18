"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Preciso ter experiência com laser para começar?",
    a: "Não. A formação e orientação incluídas no plano te preparam completamente para realizar os atendimentos com segurança e confiança, mesmo sem experiência prévia com laser.",
  },
  {
    q: "O clareamento está incluso em todos os planos?",
    a: "O protocolo de clareamento está disponível a partir do plano Platinum (semestral). O equipamento permite realizar o procedimento em todos os planos, mas o protocolo e a formação específica são incluídos no Platinum e Black.",
  },
  {
    q: "A máquina UltraFiber LM-L808A é segura?",
    a: "Sim. Utilizamos equipamento profissional com tecnologia de diodo 808 nm, parâmetros ajustáveis e protocolos adequados para cada tipo de pele. Todo o treinamento é focado no uso seguro do equipamento.",
  },
  {
    q: "Consigo pagar com cartão?",
    a: "Sim. Aceitamos cartão e outras formas de pagamento. Entre em contato para conhecer todas as condições disponíveis e encontrar a melhor opção para você.",
  },
  {
    q: "Como funciona a logística da locação?",
    a: "Você escolhe o plano (6h ou 12h por mês), agenda as datas de uso com antecedência conforme a sua prioridade de plano, e utiliza a máquina com protocolos organizados para maximizar seus atendimentos.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  const toggle = (i: number) => setOpen(open === i ? null : i);

  return (
    <section id="faq" style={{ padding: "8rem 0", background: "#0D0D0D" }}>
      <div className="max-w-6xl mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
          {/* Intro */}
          <div>
            <div className="flex items-center gap-3 mb-5" style={{ color: "#C9A55A" }}>
              <span style={{ display: "inline-block", width: 28, height: "0.5px", background: "#C9A55A" }} />
              <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.68rem", fontWeight: 500, letterSpacing: "0.28em", textTransform: "uppercase" as const }}>
                Dúvidas
              </span>
            </div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(2.2rem, 4vw, 3.4rem)", fontWeight: 300, lineHeight: 1.1, color: "#FFFFFF" }}>
              Perguntas<br />
              <em style={{ fontStyle: "italic", color: "#C9A55A" }}>frequentes.</em>
            </h2>
            <p className="mt-6" style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.88rem", fontWeight: 300, color: "rgba(245,240,232,0.45)", lineHeight: 1.9 }}>
              Ainda tem alguma dúvida? Entre em contato pelo WhatsApp e nossa equipe responde na hora.
            </p>
          </div>

          {/* Accordion */}
          <div className="md:col-span-2 flex flex-col">
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: "0.5px solid rgba(201,165,90,0.1)" }}>
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex justify-between items-center text-left gap-8 transition-colors duration-300"
                  style={{ background: "none", border: "none", padding: "1.6rem 0", cursor: "pointer" }}
                >
                  <span
                    style={{
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.92rem",
                      fontWeight: 400,
                      color: open === i ? "#FFFFFF" : "rgba(245,240,232,0.75)",
                      lineHeight: 1.4,
                      transition: "color 0.3s",
                    }}
                  >
                    {faq.q}
                  </span>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      border: `0.5px solid ${open === i ? "#C9A55A" : "rgba(201,165,90,0.2)"}`,
                      borderRadius: "50%",
                      flexShrink: 0,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.9rem",
                      color: "#C9A55A",
                      background: open === i ? "rgba(201,165,90,0.1)" : "transparent",
                      transition: "all 0.3s",
                    }}
                  >
                    {open === i ? "−" : "+"}
                  </div>
                </button>

                <div
                  style={{
                    maxHeight: open === i ? 200 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.4s ease",
                  }}
                >
                  <p
                    style={{
                      paddingBottom: "1.6rem",
                      fontFamily: "'Outfit', sans-serif",
                      fontSize: "0.86rem",
                      fontWeight: 300,
                      color: "rgba(245,240,232,0.45)",
                      lineHeight: 1.85,
                    }}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
