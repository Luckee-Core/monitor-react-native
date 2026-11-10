export const normalizeError = (error: unknown): { message: string; stack: string | null } => {
  if (error instanceof Error) {
    return { message: error.message || 'Error', stack: error.stack ?? null };
  }
  if (typeof error === 'string') {
    return { message: error, stack: null };
  }
  try {
    return { message: JSON.stringify(error), stack: null };
  } catch {
    return { message: 'Unknown error', stack: null };
  }
};
