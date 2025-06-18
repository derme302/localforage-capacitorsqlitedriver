import {
  StorageDriver
} from '@ionic/storage';
import {
  CapacitorSQLite,
  SQLiteConnection,
  SQLiteDBConnection
} from '@capacitor-community/sqlite';

export class SQLiteDriver implements StorageDriver {
  public readonly _driver = 'sqlite';
  private db: SQLiteDBConnection | null = null;
  private sqlite: SQLiteConnection;

  constructor() {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
  }

  async _initStorage(_options?: any): Promise<void> {
    if (!(await this.sqlite.isAvailable())) {
      throw new Error('SQLite not available');
    }

    this.db = await this.sqlite.createConnection('ionic-storage', false, 'no-encryption', 1);
    await this.db.open();

    await this.db.execute(`
      CREATE TABLE IF NOT EXISTS kv (
        key TEXT PRIMARY KEY NOT NULL,
        value TEXT
      );
    `);
  }

  async getItem(key: string): Promise<any> {
    const result = await this.db?.query(`SELECT value FROM kv WHERE key = ?`, [key]);
    const value = result?.values?.[0]?.value;
    return value !== undefined ? JSON.parse(value) : null;
  }

  async setItem(key: string, value: any): Promise<any> {
    const stringValue = JSON.stringify(value);
    await this.db?.run(`INSERT OR REPLACE INTO kv (key, value) VALUES (?, ?)`, [key, stringValue]);
    return value;
  }

  async removeItem(key: string): Promise<void> {
    await this.db?.run(`DELETE FROM kv WHERE key = ?`, [key]);
  }

  async clear(): Promise<void> {
    await this.db?.execute(`DELETE FROM kv`);
  }

  async length(): Promise<number> {
    const result = await this.db?.query(`SELECT COUNT(key) as count FROM kv`);
    return result?.values?.[0]?.count ?? 0;
  }

  async keys(): Promise<string[]> {
    const result = await this.db?.query(`SELECT key FROM kv`);
    return result?.values?.map((i) => i.key) ?? [];
  }

  async iterate<T = any>(
    callback: (value: T, key: string, iterationNumber: number) => any
  ): Promise<void> {
    const result = await this.db?.query(`SELECT key, value FROM kv`);
    const rows = result?.values ?? [];
    rows.forEach((i, j) => {
      callback(JSON.parse(i.value), i.key, j);
    });
  }
}
