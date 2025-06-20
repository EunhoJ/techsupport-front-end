export default function TechSupport() {
  return (
    <section id="tech">
      <div className="text-[#203D4E] flex flex-col gap-5 items-center  justify-center font-extrabold mt-30 mx-5">
        <h1 className="text-4xl ">OLÁ, NÓS SOMOS A TECHSUPPORT</h1>
        <h3 className="text-2xl">A EMPRESA QUE AJUDA O SEU NEGÓCIO</h3>
      </div>
      <div className="flex justify-center gap-20 mt-20 items-center font-extrabold *:shadow-xl/30">
        <a
          href=""
          className="bg-[#E0D449] text-[#152934] rounded-[2rem] px-10 py-5 hover:brightness-90 duration-400"
        >
          <h1 className="w-[100px] text-center">SERVIÇOS OFERECIDOS</h1>
        </a>
        <a
          href=""
          className=" bg-[#152934] text-[#E0D449] rounded-[2rem] px-10 py-5 hover:brightness-150 duration-400"
        >
          <h1 className="w-[100px] text-center">FALE CONOSCO</h1>
        </a>
      </div>
    </section>
  );
}
