/* Hero media served locally from /public. Swap the file at public/hero.jpg anytime.
   The single image is sliced across a real CSS grid so each tile is a separate
   panel with its own edge and a gap between it and its neighbours. */
const HERO_SRC = "/hero.jpg";
const COLS = 6;
const ROWS = 3;

const CARDS = [
  { n: "01", label: "Low, locked rates", highlight: false, place: "col-start-2 row-start-1" },
  { n: "02", label: "Close in ~18 days", highlight: true, place: "col-start-3 row-start-3" },
  { n: "03", label: "A real loan officer", highlight: false, place: "col-start-5 row-start-2" },
];

const gridTemplate = {
  gridTemplateColumns: `repeat(${COLS}, 1fr)`,
  gridTemplateRows: `repeat(${ROWS}, 1fr)`,
};

export function VideoWall() {
  const tiles = Array.from({ length: COLS * ROWS }, (_, i) => {
    const c = i % COLS;
    const r = Math.floor(i / COLS);
    return {
      key: i,
      style: {
        backgroundImage: `url(${HERO_SRC})`,
        backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
        backgroundPosition: `${(c / (COLS - 1)) * 100}% ${(r / (ROWS - 1)) * 100}%`,
      },
    };
  });

  return (
    <div className="relative">
      {/* tile wall — real gaps between separated panels */}
      <div
        className="grid gap-0.5 rounded-3xl"
        style={{ ...gridTemplate, height: "clamp(320px, 46vw, 560px)" }}
      >
        {tiles.map((t) => (
          <div
            key={t.key}
            aria-hidden
            className="relative rounded-[4px] bg-center ring-1 ring-black/10 transition duration-300 ease-out hover:z-20 hover:-translate-y-1 hover:scale-[1.05] hover:shadow-xl hover:ring-black/20"
            style={t.style}
          />
        ))}
      </div>

      {/* card overlay — aligned to the same tile grid */}
      <div className="pointer-events-none absolute inset-0 grid gap-0.5" style={gridTemplate}>
        {CARDS.map((c) => (
          <div key={c.n} className={`relative ${c.place} hover:z-20`}>
            <div
              className={`pointer-events-auto absolute inset-0 flex flex-col justify-between rounded-[4px] p-4 shadow-lg backdrop-blur-md transition duration-300 ease-out hover:-translate-y-1 hover:scale-[1.05] ${
                c.highlight
                  ? "bg-white/15 text-paper ring-1 ring-white/25"
                  : "bg-black/60 text-paper ring-1 ring-white/10"
              }`}
            >
              <div className="flex items-start justify-between">
                <span className="eyebrow opacity-60">{c.n}</span>
                <span aria-hidden className="text-sm opacity-50">
                  +
                </span>
              </div>
              <div className="text-sm font-medium leading-snug">{c.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
