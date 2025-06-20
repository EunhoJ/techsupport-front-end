import { useEffect, useState } from "react";

const feedbacks = [
  {
    cliente: "CLIENTE 01",
    texto:
      "Equipe fera.",
  },
  {
    cliente: "CLIENTE 02",
    texto:
      "Entregam o que promete",
  },
  {
    cliente: "CLIENTE 03",
    texto:
      "Qualidade no serviço.",
  },
  {
    cliente: "CLIENTE 04",
    texto:
      "Excelente atendimento e solução rápida. Recomendo muito!",
  },
  {
    cliente: "CLIENTE 05",
    texto:
      "Equipe muito profissional e atenciosa.",
  },
  {
    cliente: "CLIENTE 06",
    texto:
      "Serviço de qualidade e suporte eficiente.",
  },
];
const itens_paginas = 3;
const intervalo = 6000;

export default function Feedback() {
  const [startIndex, setStartIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // inicia fade-out
      setTimeout(() => {
        setStartIndex((prev) =>
          prev + itens_paginas >= feedbacks.length ? 0 : prev + itens_paginas
        );
        setFade(true); // inicia fade-in
      }, 400); // tempo do fade-out
    }, intervalo);
    return () => clearInterval(interval);
  }, []);

  const currentFeedbacks = feedbacks.slice(
    startIndex,
    startIndex + itens_paginas
  );

  const displayedFeedbacks =
    currentFeedbacks.length < itens_paginas
      ? [
          ...currentFeedbacks,
          ...feedbacks.slice(0, itens_paginas - currentFeedbacks.length),
        ]
      : currentFeedbacks;

  return (
    <section  id="feed">
      <div className="text-[#203D4E] flex flex-col gap-5 items-center justify-center font-extrabold mt-30 mx-5">
        <h1 className="text-4xl">NOSSOS FEEDBACKS</h1>
        <h3 className="text-2xl">
          LEIA O QUE OS OUTROS CLIENTES ESCREVERAM SOBRE NÓS
        </h3>
      </div>
      <div className="flex flex-row gap-8 justify-center p-[64px] overflow-hidden">
        <div
          className={`flex flex-row gap-8 transition-opacity duration-400`}
          style={{
            opacity: fade ? 1 : 0,
          }}
        >
          {displayedFeedbacks.map((fb, idx) => (
            <div
              key={idx}
              className="border-2 flex flex-col gap-6 border-[#152934] w-[280px] p-[50px] bg-white shadow-2xl/40 rounded-4xl font-bold text-[#152934] h-[220px]"
            >
              <h3 className="text-center">{fb.cliente}</h3>
              <p className="text-left">{fb.texto}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}