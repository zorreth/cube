import { migrate } from 'drizzle-orm/bun-sql/migrator';
import { db } from '.';

console.log('⏳ Running database migrations...');

try {
  await migrate(db, { migrationsFolder: './drizzle' });
  console.log('✅ Migrations complete!');
} catch (err) {
  console.error('❌ Migration failed!');
  console.error(err);
  process.exit(1);
}
