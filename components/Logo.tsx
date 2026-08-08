/* eslint-disable @next/next/no-img-element */
export function Logo({ light = false }: { light?: boolean }) {
  // Brand asset lives at public/premier-logo.png (black wordmark on transparent).
  // On dark surfaces we invert it to white.
  return (
    <img
      src="/premier-logo.png"
      alt="Premier"
      width={765}
      height={166}
      className={`h-6 w-auto sm:h-7 ${light ? "brightness-0 invert" : ""}`}
    />
  );
}
