import { getMonitorConfig } from './init-monitor';
import { normalizeError } from './normalize-error';
import type { LogThunkExceptionParams } from './types';

const INGEST_HEADER = 'X-Ops-Monitor-Ingest-Key';

declare const __DEV__: boolean | undefined;

/**
 * Reports unexpected thunk failures to Ops Monitor ingest (production only).
 */
export const logThunkException = (params: LogThunkExceptionParams): void => {
  if (typeof __DEV__ !== 'undefined' && __DEV__) {
    return;
  }

  const monitorConfig = getMonitorConfig();
  if (!monitorConfig) {
    return;
  }

  const { message, stack } = normalizeError(params.error);
  const body = {
    event: params.event,
    message,
    stack,
    severity: params.severity ?? 'error',
    crudBackend: monitorConfig.crudBackend,
    resource: params.resource ?? null,
    resourceId: params.resourceId ?? null,
    thunkName: params.thunkName ?? null,
    userId: params.userId ?? null,
    environment: monitorConfig.environment ?? null,
    release: monitorConfig.release ?? null,
  };

  fetch(monitorConfig.ingestUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      [INGEST_HEADER]: monitorConfig.publicIngestKey,
    },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});
};
