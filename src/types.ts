export type MonitorSeverity = 'fatal' | 'error' | 'warning';

export type LogThunkExceptionParams = {
  event: string;
  error: unknown;
  severity?: MonitorSeverity;
  collection?: string;
  entityId?: string;
  thunkName?: string;
  userId?: string;
};

export type InitMonitorConfig = {
  ingestUrl: string;
  publicIngestKey: string;
  environment?: string;
  release?: string;
};
