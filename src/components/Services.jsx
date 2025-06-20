export default function Services() {
  return (
    <section id="service">
      <div className="text-[#203D4E] flex gap-5 items-center justify-center font-extrabold mt-30 mx-5">
        <h1 className="text-4xl">NOSSOS SERVIÇOS</h1>
      </div>
      <div className="flex flex-row gap-30 items-center justify-center *:w-[250px] *:h-[300px] *:shadow-2xl/40 *:hover:brightness-90 *:duration-400 pt-10 pb-10 cursor-pointer">
        <div className="flex flex-col gap-35 p-[20px] rounded-4xl bg-[#152934] text-[#E0D449] font-bold">
          <h3 className="text-center">Lorem</h3>
          <p className="text-left">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            molestiae!
          </p>
        </div>
        <div className="flex flex-col gap-35 p-[20px] rounded-4xl bg-[#E0D449] text-[#152934] font-bold">
          <h3 className="text-center">Lorem</h3>
          <p className="text-left">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            molestiae!
          </p>
        </div>
        <div className="flex flex-col gap-35 p-[20px] rounded-4xl bg-white text-[#090909] font-bold">
          <h3 className="text-center">Lorem</h3>
          <p className="text-left">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt,
            molestiae!
          </p>
        </div>
      </div>
    </section>
  );
}
