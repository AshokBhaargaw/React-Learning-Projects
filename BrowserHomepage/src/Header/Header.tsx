import DarkMode from "./Darkmode";
import { useEffect, useState } from "react";

export default function Header() {
  const [msg, setMsg] = useState("Hello,");

  useEffect(() => {
    const currHour = new Date().getHours();
    if (currHour >= 6 && currHour < 12) {
      setMsg("Hi, Good Morning 🌅 Boss.");
    } else if (currHour >= 12 && currHour < 16) {
      setMsg("Hi, Good Afternoon 🍵 Boss.");
    } else if (currHour >= 16 && currHour < 22) {
      setMsg("Hi, Good evening 🌃 Boss.");
    } else if (currHour >= 22 && currHour < 24) {
      setMsg("Boss, it's bed time");
    } else {
      setMsg("Boss, it's mid-night. You must sleep");
    }
  }, []);

  return (
    <div className="min-w-100 flex justify-between place-items-center">
      <h1 className="text-2xl font-bold my-5">{msg}</h1>
      <DarkMode />
    </div>
  );
}
