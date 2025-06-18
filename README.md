# Ionic Storage Capacitor SQLite Driver

A custom Ionic Storage driver using `@capacitor-community/sqlite`. Designed to be a drop in replacement for `localforage-cordovasqlitedriver`.

## Install

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

## 🛠 6. Build the Package

```bash
npm install
npm run build
```

This generates the `dist/` folder.
