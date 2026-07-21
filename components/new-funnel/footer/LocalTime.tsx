"use client";

import { useEffect, useState } from "react";

interface LocalTimeProps {
  label: string;
  zone: string;
}

function LocalTime({ label, zone }: LocalTimeProps) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: zone,
        }).format(new Date())
      );
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, [zone]);

  return (
    <p
      className="m-0 whitespace-nowrap text-[12px] uppercase tabular-nums"
      style={{ color: "#77777b" }}
    >
      {label} <span aria-hidden="true">→</span> {time}
    </p>
  );
}

export default LocalTime;
