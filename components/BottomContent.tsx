import React, { ReactNode } from "react";

interface BottomContentProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

interface BottomContentSuffixProps {
  children: ReactNode;
}

interface BottomContentContentProps {
  children: ReactNode;
}

interface BottomContentSubmitProps {
  children: ReactNode;
}

function BottomContent({ title, subtitle, children }: BottomContentProps) {
  return (
    <main className="z-10 bottom-0 absolute bg-slate-50 w-full rounded-3xl">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-sm text-slate-500">{subtitle}</p>
      {children}
    </main>
  );
}

function BottomContentSuffix({ children }: BottomContentSuffixProps) {
  return <div className="suffix">{children}</div>;
}

function BottomContentContent({ children }: BottomContentContentProps) {
  return <div className="content">{children}</div>;
}

function BottomContentSubmit({ children }: BottomContentSubmitProps) {
  return <div className="submit">{children}</div>;
}

BottomContent.Suffix = BottomContentSuffix;
BottomContent.Content = BottomContentContent;
BottomContent.Submit = BottomContentSubmit;

BottomContent.defaultProps = {
  Suffix: null,
  Content: null,
  Submit: null,
};

export default BottomContent;
