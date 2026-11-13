import heroAvatar from "../assets/images/hero-avatar.png";
import ShinyText from "./ShinyText";

interface StatItem {
  value: string;
  label: string;
}

const stats: StatItem[] = [
  { value: "4+", label: "Years of experience" },
  { value: "50+", label: "Project Completed" },
  { value: "20+", label: "Satisfied Clients" },
];

export default function Hero() {
  return (
    <section id="hero-section" className="p-4 mx-auto max-w-7xl">
      <div className="bg-black rounded-4xl relative overflow-hidden flex sm:h-175 md:h-137.5 xl:h-137.5">
        <div
          className="w-full min-h-150 md:min-h-137.5 xl:h-137.5 flex flex-col justify-between p-4 mt-4 md:mt-0 md:p-12
          md:grid md:grid-cols-2 gap-5 md:items-stretch"
        >
          {/* Text Hero (Kolom Kiri) */}
          <div className="flex flex-col gap-6 md:justify-between z-10">
            {/* Grup Atas: Greeting + Judul + Tombol */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2 justify-center p-2 mt-4 lg:mt-0 lg:p-0">
                <p className="text-white text-center md:text-left md:text-xl">
                  Hallo, I&apos;m Adi Rizki
                </p>

                <h1 className="font-clash font-medium text-[40px] sm:text-[68px] md:text-[72px] lg:text-[84px] xl:text-[93px] leading-[100%] text-gradient-silver text-center md:text-left">
                  <ShinyText text="Designer &" speed={4} />
                  <br />
                  <ShinyText text="Developer" speed={4} />
                </h1>
                {/* Deskripsi versi MOBILE */}
                <p className="flex text-white text-center sm:w-75 sm:mx-auto md:hidden">
                  I design intuitive digital experiences that connect people,
                  products, and brands.
                </p>
              </div>
              <a
                href="#contact"
                className="flex w-fit px-4 py-2 md:px-7 md:py-3.5 bg-orange-500 text-black font-medium rounded-[8px] justify-center mx-auto md:mx-0 hover:bg-orange-300 transition"
              >
                Hire Me
              </a>
            </div>

            {/* Deskripsi versi DESKTOP */}
            <p className="hidden md:block text-white/80 text-sm max-w-sm leading-relaxed">
              I design intuitive digital experiences that connect people,
              products, and brands.
            </p>
          </div>

          {/* Statistic (Kolom Kanan Bawah) */}
          <div className="grid grid-cols-3 divide-x divide-neutral-800 text-white py-6 md:py-0 z-10 md:self-end">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span className="font-clash text-xl lg:text-4xl font-semibold text-center text-white">
                  {stat.value}
                </span>
                <p className="font-clash text-[8px] lg:text-xs text-center text-white/80">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Foto */}
          <img
            src={heroAvatar}
            alt="Adi Rizki"
            className="absolute place-items-center bottom-0 right-3 sm:w-100 sm:right-30 md:w-125 md:right-3.75 lg:right-8 lg:w-[50%] lg:max-w-[630px] object-cover pointer-events-none"
          />
        </div>
      </div>
    </section>
  );
}
