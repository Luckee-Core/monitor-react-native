import type { InitMonitorConfig } from './types';

let config: InitMonitorConfig | null = null;

export const initMonitor = (next: InitMonitorConfig): void => {
  config = {
    ...next,
    ingestUrl: next.ingestUrl.replace(/\/$/, ''),
    publicIngestKey: next.publicIngestKey.trim(),
  };
};

export const getMonitorConfig = (): InitMonitorConfig | null => config;

export const isMonitorInitialized = (): boolean => config !== null;
