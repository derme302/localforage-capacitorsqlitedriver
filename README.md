# Ionic Storage Capacitor SQLite Driver

A custom Ionic Storage driver using [@capacitor-community/sqlite](https://github.com/capacitor-community/sqlite). Designed to be a drop in replacement for [localforage-cordovasqlitedriver](https://github.com/thgreasi/localForage-cordovaSQLiteDriver).

## Install and Use

```bash
npm install @derme302/ionic-storage-capacitorsqlitedriver
```

```ts
import { CAPACITOR_SQLITE_DRIVER } from '@derme302/ionic-storage-capacitorsqlitedriver';

bootstrapApplication(AppComponent, {
  providers: [
    {
    importProvidersFrom(IonicStorageModule.forRoot({
      driverOrder: [CAPACITOR_SQLITE_DRIVER, Drivers.IndexedDB, Drivers.LocalStorage]
    }))
});
```
Then use `Storage` as usual.

```ts
import { Storage } from '@ionic/storage-angular';
import { SQLiteDriver } from '@derme302/ionic-storage-capacitorsqlitedriver';

export class StorageService {
  public isReady: boolean = false;
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.defineDriver(new SQLiteDriver());
    const storage = await this.storage.create();
    this._storage = storage;
    this.isReady = true;
  }
}
```

---

## 🛠 Build the Package

```bash
npm install
npm run build
```

This generates the `dist/` folder.
