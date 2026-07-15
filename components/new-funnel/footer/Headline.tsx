function Headline({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="m-0 max-w-56 text-[1.9rem] font-medium uppercase leading-[1.15] tracking-[0.5px] text-white sm:max-w-[18rem] sm:text-[2.25rem] md:max-w-[24rem] md:text-[2.6rem] lg:max-w-105 lg:text-[32px] lg:leading-[1.22]">
      {children}
    </h2>
  );
}

export default Headline;
