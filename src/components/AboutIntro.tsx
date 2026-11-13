import TextType from "./TextType";

export default function About() {
  return (
    <section id="about">
      <div className="px-4 py-20 sm:py-4 mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:items-center gap-6">
        <div>
          <h2 className="lg:max-w-128.75 font-clash text-2xl md:text-4xl font-medium leading-[120%] text-black">
            <TextType
              texts={["Design Driven  By Purpose & Precision"]}
              typingSpeed={80}
              loop={false}
              className="lg:w-[420px]"
            />
          </h2>
        </div>
        <div>
          <p className="mt-3 lg:mt-0 text-neutral-600 leading-relaxed max-w-xl">
            From early ideas to polished interfaces, I turn complex challenges
            into clear, purposeful designs that put people first.
          </p>
        </div>
      </div>
    </section>
  );
}
