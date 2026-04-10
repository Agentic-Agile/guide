"use client";

import React from "react";

interface MockWindowProps {
  title: string;
  app: "jira" | "vscode" | "editor" | "browser";
  url?: string;
  children: React.ReactNode;
  className?: string;
}

const chrome = {
  jira: {
    titlebar: "#1d2125",
    border: "#2c333a",
    body: "#161a1d",
    titleColor: "#9fadbc",
  },
  vscode: {
    titlebar: "#3c3c3c",
    border: "#454545",
    body: "#1e1e1e",
    titleColor: "#cccccc",
  },
  editor: {
    titlebar: "#2a2a2a",
    border: "#3a3a3a",
    body: "#1c1c1e",
    titleColor: "#d4d4d4",
  },
  browser: {
    titlebar: "#292a2d",
    border: "#3c3c3c",
    body: "#ffffff",
    titleColor: "#e8eaed",
  },
};

function BrowserChrome({ title, url }: { title: string; url: string }) {
  return (
    <>
      {/* Tab bar */}
      <div
        className="flex items-end px-2 pt-2 gap-0"
        style={{ backgroundColor: "#1e1f22" }}
      >
        {/* Window dots — left of tabs */}
        <div className="flex items-center gap-1.5 px-2 pb-2 mr-1">
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#ff5f57" }} />
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#febc2e" }} />
          <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#28c840" }} />
        </div>

        {/* Active tab */}
        <div
          className="flex items-center gap-2 px-3 pt-1.5 pb-2 text-xs rounded-t max-w-[220px]"
          style={{ backgroundColor: "#292a2d", color: "#e8eaed" }}
        >
          {/* Favicon */}
          <span
            className="inline-block w-3 h-3 rounded-sm flex-shrink-0"
            style={{ backgroundColor: "#579dff" }}
          />
          <span className="truncate font-sans" style={{ fontSize: "11px" }}>
            {title}
          </span>
          <span className="text-zinc-500 ml-1 flex-shrink-0" style={{ fontSize: "11px" }}>✕</span>
        </div>

        {/* New-tab button */}
        <button
          className="pb-2 px-2 text-zinc-500 hover:text-zinc-300 transition-colors flex-shrink-0"
          style={{ fontSize: "16px", lineHeight: 1 }}
          tabIndex={-1}
          aria-hidden
        >
          +
        </button>
      </div>

      {/* Navigation bar */}
      <div
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: "#292a2d", borderBottom: "1px solid #3c3c3c" }}
      >
        {/* Nav buttons */}
        <div className="flex items-center gap-1">
          <button className="w-6 h-6 flex items-center justify-center rounded text-zinc-500 cursor-default" style={{ fontSize: "13px" }} tabIndex={-1} aria-hidden>‹</button>
          <button className="w-6 h-6 flex items-center justify-center rounded text-zinc-500 cursor-default" style={{ fontSize: "13px" }} tabIndex={-1} aria-hidden>›</button>
          <button className="w-6 h-6 flex items-center justify-center rounded text-zinc-400 hover:text-zinc-200 transition-colors" style={{ fontSize: "11px" }} tabIndex={-1} aria-hidden>↺</button>
        </div>

        {/* Address bar */}
        <div
          className="flex-1 flex items-center gap-1.5 px-3 rounded"
          style={{ backgroundColor: "#1e1f22", height: "26px", border: "1px solid #5f6368" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="flex-shrink-0 opacity-60">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" fill="#34a853"/>
          </svg>
          <span className="text-xs font-sans truncate" style={{ color: "#bdc1c6", fontSize: "11px" }}>
            {url}
          </span>
        </div>
      </div>
    </>
  );
}

export default function MockWindow({
  title,
  app,
  url,
  children,
  className,
}: MockWindowProps) {
  if (app === "browser") {
    return (
      <div
        className={`rounded-lg overflow-hidden border ${className ?? ""}`}
        style={{ borderColor: "#3c3c3c" }}
      >
        <BrowserChrome title={title} url={url ?? "example.com"} />
        <div style={{ backgroundColor: chrome.browser.body }}>{children}</div>
      </div>
    );
  }

  const c = chrome[app];

  return (
    <div
      className={`rounded-lg overflow-hidden border ${className ?? ""}`}
      style={{ borderColor: c.border }}
    >
      {/* Title bar */}
      <header
        className="flex items-center gap-2 px-3 py-2"
        style={{ backgroundColor: c.titlebar }}
      >
        {/* Window dots */}
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ backgroundColor: "#ff5f57" }}
        />
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ backgroundColor: "#febc2e" }}
        />
        <span
          className="inline-block w-3 h-3 rounded-full"
          style={{ backgroundColor: "#28c840" }}
        />
        {/* Title */}
        <span
          className="ml-2 text-xs font-mono"
          style={{ color: c.titleColor }}
        >
          {title}
        </span>
      </header>

      {/* Body */}
      <div style={{ backgroundColor: c.body }}>{children}</div>
    </div>
  );
}
