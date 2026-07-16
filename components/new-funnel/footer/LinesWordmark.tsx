function LinesWordmark({ text }: { text: string }) {
  return (
    <div className="flex w-full justify-center overflow-hidden px-3 pt-14 sm:px-5 sm:pt-16">
      <div
        aria-hidden="true"
        className="translate-y-[7%] whitespace-nowrap bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.4)_0px,rgba(255,255,255,0.4)_1px,transparent_1px,transparent_13px)] bg-clip-text text-[26vw] font-bold leading-[0.8] tracking-[-0.8vw] text-transparent transition-[background-position] duration-700 hover:bg-[position:0px_7px] sm:text-[23vw] md:tracking-[-0.5vw]"
      >
        {text}
      </div>
    </div>
  );
}

export default LinesWordmark;
