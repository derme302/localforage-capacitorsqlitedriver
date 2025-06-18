# Ionic Storage Capacitor SQLite Driver

A custom Ionic Storage driver using [@capacitor-community/sqlite](https://github.com/capacitor-community/sqlite). Designed to be a drop in replacement for [localforage-cordovasqlitedriver](https://github.com/thgreasi/localForage-cordovaSQLiteDriver).

## Install and Use

```bash
npm install @yderme302/ionic-storage-capacitorsqlitedriver
```

```ts
import { SQLiteDriver } from '@derme302/ionic-storage-capacitorsqlitedriver';

bootstrapApplication(AppComponent, {
  providers: [
    {
    importProvidersFrom(IonicStorageModule.forRoot({
      driverOrder: [SQLiteDriver, Drivers.IndexedDB, Drivers.LocalStorage]
    }))
});
```
Then use `Storage` as usual.

---

## 🛠 Build the Package

```bash
npm install
npm run build
```

This generates the `dist/` folder.
