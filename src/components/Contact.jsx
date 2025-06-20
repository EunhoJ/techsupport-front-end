export default function Contact() {
  return (
    <section id="contact">
      <form>
        <div className="flex flex-col items-center w-[900px] m-auto p-2">
          <div className="text-[#203D4E] font-extrabold ">
            <h1 className="text-4xl pb-4">FALE CONOSCO</h1>
          </div>
          <div className="p-8 rounded-3xl border-2 gap-4 flex flex-col">
            <div className="flex justify-between font-bold gap-5 *:rounded-[16px]">
              <input
                className="w-100 h-10 border pl-[12px] justify-center"
                type="text"
                placeholder="Digite seu nome"
              />
              <input
                className="w-100 h-10 border pl-[12px] justify-center"
                type="email"
                placeholder="Digite seu email"
              />
            </div>
            <div className="flex flex-col font-bold *:rounded-[16px] gap-5">
              <textarea
                className="pt-2 pl-[12px] h-30 border"
                rows={5}
                name=""
                id=""
                placeholder="Deixe sua mensagem..."
              ></textarea>
              <button className="flex self-center h-10 w-40 bg-[#152934] justify-center items-center text-[#E0D449] cursor-pointer hover:brightness-150 duration-400">Enviar</button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
