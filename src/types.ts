export type MonitorSeverity = 'fatal' | 'error' | 'warning';

export type MonitorCrudBackend = 'firestore' | 'supabase';

export type InitMonitorConfig = {
  ingestUrl: string;
  publicIngestKey: string;
  crudBackend: MonitorCrudBackend;
  environment?: string;
  release?: string;
};

export type LogThunkExceptionParams = {
  event: string;
  error: unknown;
  severity?: MonitorSeverity;
  /** Firestore collection or Supabase table name. */
  resource?: string;
  resourceId?: string;
  thunkName?: string;
  userId?: string;
};
