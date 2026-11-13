export default function About() {
  return (
    <section id="about">
      <div className="p-4 mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:items-center gap-6">
        <div>
          <h2 className="font-clash text-2xl md:text-4xl font-medium leading-[120%] text-black">
            Design Driven By <br />
            Purpose &amp; Precision
          </h2>
        </div>
        <div>
          <p className="mt-3 lg:mt-0 text-neutral-600 leading-relaxed max-w-xl">
            From early ideas to polished interfaces, I turn complex challenges into clear,
            purposeful designs that put people first.
          </p>
        </div>
      </div>
    </section>
  );
}