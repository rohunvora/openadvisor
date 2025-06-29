import postgres from 'postgres';
import * as schema from './schema';
export declare const db: import("node_modules/drizzle-orm/postgres-js").PostgresJsDatabase<typeof schema> & {
    $client: postgres.Sql<{}>;
};
export declare const migrationClient: postgres.Sql<{}>;
//# sourceMappingURL=client.d.ts.map