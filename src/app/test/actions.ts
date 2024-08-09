"use server";
import { headers } from "next/headers";
import { NextRequest, userAgent } from "next/server";
import UAParser from "ua-parser-js";

export type BrowserInfo = {
  osName: string | undefined;
  osVersion: string | undefined;
  cpuArchitecture: string | undefined;
  browserName: string | undefined;
  browserVersion: string | undefined;
};
export const getBrowserInfo = async (): Promise<BrowserInfo> => {
  const h = headers();
  const parser = new UAParser(h.get("user-agent")?.toString());

  const os = parser.getOS();
  const cpu = parser.getCPU();
  const browser = parser.getBrowser();

  return {
    osName: os.name,
    osVersion: os.version,
    cpuArchitecture: cpu.architecture,
    browserName: browser.name,
    browserVersion: browser.version,
  };
};
