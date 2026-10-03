import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is required to run migrations");
  }

  const migrationClient = postgres(connectionString, { max: 1 });
  const db = drizzle(migrationClient);

  await db.execute(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);
  await db.execute(`CREATE EXTENSION IF NOT EXISTS "postgis";`);

  await migrate(db, { migrationsFolder: "./src/db/migrations" });

  await migrationClient.end();
  console.log("migrations applied");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
