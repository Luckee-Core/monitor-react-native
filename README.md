# @luckee-core/monitor-react-native

GitHub: [luckee-core/monitor-react-native](https://github.com/luckee-core/monitor-react-native)

Production thunk error reporting for **Ops Monitor** (always **HTTP POST** + ingest key).

- **Supabase customers:** `ingestUrl` = ops Express `/api/monitoring/ingest`
- **WomenHeart / Firestore:** `ingestUrl` = **Cloud Function** (`…/monitoringIngest`) — same env vars, different URL. The app never writes monitoring docs with the Firestore client SDK.

`crudBackend: 'firestore'` only labels `resource` / `resourceId` in the payload; it does **not** remove the need for `ingestUrl` and `publicIngestKey`.

## Setup

1. In my-ops-tracker-web → Project → **Monitoring** tab, create destination + app.
2. Copy env snippet (`EXPO_PUBLIC_OPS_MONITOR_INGEST_URL`, `EXPO_PUBLIC_OPS_MONITOR_INGEST_KEY`).

```typescript
import { initMonitor, logThunkException } from '@luckee-core/monitor-react-native';

initMonitor({
  ingestUrl: process.env.EXPO_PUBLIC_OPS_MONITOR_INGEST_URL!,
  publicIngestKey: process.env.EXPO_PUBLIC_OPS_MONITOR_INGEST_KEY!,
  crudBackend: 'firestore',
  environment: 'production',
  release: process.env.EXPO_PUBLIC_APP_RELEASE,
});

// In thunk catch:
logThunkException({
  event: 'failedToSaveExample',
  error,
  resource: 'example',
  resourceId: id,
});
```

## Rules

- One stable `event` per thunk file (`failedTo` + PascalCase action).
- `__DEV__` builds do not send network requests.
