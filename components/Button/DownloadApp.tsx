"use client";

import { useEffect, useState } from "react";
import { PrimaryButton } from "./Primary";

export const DownloadApp = () => {
  const [supportsPWA, setSupportsPWA] = useState(true);
  const [promptInstall, setPromptInstall] = useState({});

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      console.log("we are being triggered :D");
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

  console.log({ promptInstall, supportsPWA });

  return (
    <div className="flex flex-col gap-2 items-center">
      <PrimaryButton
        disabled={!promptInstall || !supportsPWA}
        onClick={onClick}
      >
        Download for free!
      </PrimaryButton>
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
