export type DatabasePool = {
  query: (sql: string, params?: Array<string | number | boolean | null | undefined>) => Promise<{ rows: Array<Record<string, unknown>> }>
}

export const pool: DatabasePool | null = null
