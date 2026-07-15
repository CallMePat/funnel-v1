import { useState } from "react";

interface SubscribeFormProps {
  tagline: string;
  placeholder: string;
  buttonLabel: string;
  onSubscribe?: (email: string) => void;
}

function SubscribeForm({ tagline, placeholder, buttonLabel, onSubscribe }: SubscribeFormProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubscribe?.(email);
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="m-0 max-w-full text-[15px] uppercase leading-normal tracking-[0.3px] text-neutral-300 sm:max-w-100">
        {tagline}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded border-none bg-[#2b2b29] px-4 py-3.5 text-sm text-white placeholder:text-neutral-400 focus:outline-none sm:max-w-90 sm:flex-1"
        />
        <button
          type="submit"
          className="cursor-pointer rounded border-none bg-[#cfe58a] px-5.5 py-3.5 text-[13px] font-semibold tracking-[0.5px] text-[#111110] hover:brightness-105 sm:w-auto"
        >
          {buttonLabel}
        </button>
      </form>
    </div>
  );
}
export default SubscribeForm;
