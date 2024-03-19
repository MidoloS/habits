"use client";

import { useEffect, useState } from "react";
import { PrimaryButton } from "./Primary";

export const DownloadApp = () => {
  const [supportsPWA, setSupportsPWA] = useState(true);
  const [promptInstall, setPromptInstall] = useState({});

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("transitionend", handler);
  }, []);

  const onClick = (evt: any) => {
    evt.preventDefault();

    // @ts-ignore
    promptInstall.prompt();
  };

  return (
    <div className="flex flex-col gap-2 items-center md:items-start">
      <button
        disabled={!promptInstall || !supportsPWA}
        onClick={onClick}
        className="px-8 py-3 rounded-md text-sm text-white bg-gradient-to-r from-[#E94646] to-[#9821FF] hover:scale-110 duration-200 z-10"
        style={{ boxShadow: "1px 1px 68px 5px #6D1717" }}
      >
        Download for free!
      </button>
      {(!promptInstall || !supportsPWA) && (
        <p className="text-slate-400 text-sm max-w-xs text-center">
          The download button doesnt work in your browser,
          <a
            href="https://www.cdc.gov/niosh/mining/content/hearingloss/installPWA.html"
            className="underline"
            target="_blank"
            rel="noreferrer noopener"
          >
            follow this instruction
          </a>
        </p>
      )}
    </div>
  );
};
