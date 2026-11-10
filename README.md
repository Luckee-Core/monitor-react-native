# @luckee-core/monitor-react-native

GitHub: [luckee-core/monitor-react-native](https://github.com/luckee-core/monitor-react-native)

Production thunk error reporting for **Ops Monitor** (`POST /api/monitoring/ingest`).

## Setup

1. In my-ops-tracker-web → Project → **Monitoring** tab, create destination + app.
2. Copy env snippet (`EXPO_PUBLIC_OPS_MONITOR_INGEST_URL`, `EXPO_PUBLIC_OPS_MONITOR_INGEST_KEY`).

```typescript
import { initMonitor, logThunkException } from '@luckee-core/monitor-react-native';

initMonitor({
  ingestUrl: process.env.EXPO_PUBLIC_OPS_MONITOR_INGEST_URL!,
  publicIngestKey: process.env.EXPO_PUBLIC_OPS_MONITOR_INGEST_KEY!,
  environment: 'production',
  release: process.env.EXPO_PUBLIC_APP_RELEASE,
});

// In thunk catch:
logThunkException({
  event: 'failedToSaveExample',
  error,
  collection: 'example',
  entityId: id,
});
```

## Rules

- One stable `event` per thunk file (`failedTo` + PascalCase action).
- `__DEV__` builds do not send network requests.
