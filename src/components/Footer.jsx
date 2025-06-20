import Boxicons from "boxicons";

export function Footer() {
  return (
    <>
      <footer className="bg-sky-950 flex flex-row justify-around flex-wrap p-[32px] gap-6 text-white">
        <div className="text-center min-w-60">
          <h3 className="text-[1.8rem]">REDES SOCIAIS</h3>
          <figure className="inline-block my-12 mx-2">
            <a
              href="//www.instagram.com/accounts/login/"
              target="_blank"
              className="text-white no-underline"
            >
              <i className='bx bxl-instagram text-[4rem] transition-transform duration-300 hover:scale-[1.08] hover:text-[#E0D449]' ></i>
            </a>
          </figure>
          <figure className="inline-block my-12 mx-2">
            <a
              target="_blank"
              href="https://www.facebook.com/"
              className="text-white no-underline"
            >
              <i className="bx bxl-facebook-square text-[4rem] transition-transform duration-300 hover:scale-[1.08] hover:text-[#E0D449]"></i>
            </a>
          </figure>
          <figure className="inline-block my-12 mx-2">
            <a
              target="_blank"
              href="https://x.com/"
              className="text-white no-underline"
            >
              <i className="bx bxl-twitter text-[4rem] transition-transform duration-300 hover:scale-[1.08] hover:text-[#E0D449]"></i>
            </a>
          </figure>
        </div>
        <div className="w-1 h-48 rounded-[0.4rem] bg-white self-center"></div>
        <div className="flex flex-col min-w-60">
          <h3 className="text-[1.8rem]">ENTRE EM CONTATO CONOSCO</h3>
          <p className="text-2xl inline-block mt-3.4">
            <a
              href="mailto:techsupport_exemplo@gmail.com"
              className="text-white no-underline inline-flex items-center transition-colors duration-300 hover:text-[#E0D449]"
            >
              <i className="bx bx-envelope text-[1.45rem] mr-2 transition-transform duration-300 hover:scale-[1.08]"></i>
              techsupport_exemplo@gmail.com
            </a>
          </p>
          <p className="text-2xl inline-block mt-3.4">
            <a
              href="tel:+5500900000000"
              className="text-white no-underline inline-flex items-center transition-colors duration-300 hover:text-[#E0D449]"
            >
              <i className="bx bxs-phone text-[1.45rem] mr-2 transition-transform duration-300 hover:scale-[1.08]"></i>
              (000) 90000-0000
            </a>
            <a
              href="https://web.whatsapp.com/"
              target="_blank"
              className="text-white no-underline inline-flex items-center transition-colors duration-300 hover:text-[#E0D449]"
            >
              <i className="bx bxl-whatsapp text-[1.45rem] mr-2 transition-transform duration-300 hover:scale-[1.08]"></i>
            </a>
          </p>
          <p className="text-2xl inline-block mt-3.4">
            SEG-SEX: 08h-12h / 13h-17h
          </p>
          <p className="text-2xl inline-block mt-3.4">SAB: 09h-11h / 13h-15h</p>
        </div>
        <div className="lex justify-center items-center text-center min-w-[15rem]">
          <img
            src="../src/assets/Logo.png"
            alt=""
            className="block max-w-[14rem] h-auto"
          />
        </div>
      </footer>
      <div className="flex bg-sky-950 text-[#E0D449] justify-center py-2">
        <h4 className="font-medium whitespace-nowrap">
          &copy; 2025 TechSupport. Todos os direitos reservados.
        </h4>
      </div>
    </>
  );
}
