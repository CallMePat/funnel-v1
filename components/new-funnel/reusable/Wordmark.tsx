function Wordmark({ text }: { text: string }) {
  return (
    <div className="flex w-full justify-center px-3 pt-10 sm:px-5 sm:pt-12 md:pt-15">
      <div className="translate-y-[6%] whitespace-nowrap opacity-20 text-[27vw] font-semibold leading-[0.78] tracking-[-0.9vw] text-white sm:text-[23vw] md:text-[21.5vw] md:tracking-[-0.5vw]">
        {text}
      </div>
    </div>
  );
}

export default Wordmark;
