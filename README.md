# Pixelforge Admin

## Projekt Leírás
A Pixelforge Admin egy asztali alkalmazás, amely számítógépes hardverekre specializálódott e-kereskedelmi platform kezelésére szolgál. Az alkalmazás lehetővé teszi az adminisztrátorok számára a termékek, felhasználók, rendelések és alkalmazás beállítások kezelését.

## Rendszerkövetelmények
- **Operációs Rendszer**: Windows 10/11, macOS 11+, vagy Linux
- **Hardware**:
  - Minimum 4GB RAM
  - 500MB szabad lemezterület
- **Szoftver Környezet**:
  - Node.js (v16.x vagy újabb)
  - npm (v8.x vagy újabb)
  - Git (fejlesztéshez)
- Internet kapcsolat (API kommunikációhoz)

## Telepítési Útmutató

### Fejlesztői Környezet Beállítása

#### Előfeltételek
- Node.js (v16.x vagy újabb)
- npm (v8.x vagy újabb)
- Git

#### Telepítési Lépések
1. Klónozza a repository-t:
   ```
   git clone https://github.com/your-username/webshop_asztali.git
   cd webshop_asztali
   ```

2. Telepítse a függőségeket:
   ```
   npm install
   ```

3. Fordítsa az Electron TypeScript kódot:
   ```
   npm run transpile:electron
   ```

4. Indítsa el a fejlesztői szervert:
   ```
   npm run dev
   ```

5. Indítsa el az Electron-t:
   ```
   npm run dev:electron
   ```

### Konfigurációs Fájlok

Az alkalmazás főbb konfigurációs fájljai:

- `electron-builder.json` - Electron build konfigurációk
- `vite.config.ts` - Vite konfiguráció
- `tsconfig.json` - TypeScript alap konfiguráció
- `tsconfig.app.json` - TypeScript alkalmazás konfiguráció
- `src/ui/misch/Axios.ts` - API kommunikációs beállítások

## Fordítási/Build Útmutató

Különböző platformokra való termelési build létrehozása:

#### Windows
```
npm run dist:win
```
A parancs automatikusan kezeli az Electron kód fordítását, a React UI buildelését és az alkalmazás Windows-ra való csomagolását.

#### macOS
```
npm run dist:mac
```
A parancs automatikusan kezeli az Electron kód fordítását, a React UI buildelését és az alkalmazás macOS-re való csomagolását.

#### Linux
```
npm run dist:linux
```
A parancs automatikusan kezeli az Electron kód fordítását, a React UI buildelését és az alkalmazás Linux-ra való csomagolását.

A buildelt alkalmazás a `dist` könyvtárban lesz elérhető.

## Futtatási Útmutató

### Fejlesztési Módban
1. Indítsa el a Vite fejlesztői szervert:
   ```
   npm run dev
   ```
2. Külön terminálban indítsa el az Electron alkalmazást:
   ```
   npm run dev:electron
   ```

### Telepített Alkalmazásként
1. Telepítse az operációs rendszeréhez megfelelő csomagot
2. Indítsa el a Pixelforge Admin alkalmazást a telepítő által létrehozott alkalmazás ikonra kattintva

## Tesztelési Útmutató

*Jelenleg automatizált tesztek nem állnak rendelkezésre. A funkciók manuálisan tesztelhetők a fejlesztői környezetben.*

## Projektstruktúra

```
webshop_asztali/
├── src/                 # Forráskód
│   ├── electron/        # Electron fő folyamat kódja
│   │   └── main.ts      # Electron fő belépési pont
│   └── ui/              # React UI kód
│       ├── assets/      # Statikus erőforrások
│       ├── companents/  # UI komponensek
│       │   ├── common/  # Megosztott komponensek
│       │   ├── layout/  # Elrendezési komponensek
│       │   ├── login/   # Bejelentkezési komponensek
│       │   ├── product/ # Termékkezelési komponensek
│       │   ├── order/   # Rendeléskezelési komponensek
│       │   ├── profile/ # Felhasználói profil komponensek
│       │   ├── setting/ # Beállítási komponensek
│       │   ├── user/    # Felhasználókezelési komponensek
│       │   ├── header.tsx  # Fejléc komponens
│       │   └── sidebar.tsx # Oldalsáv komponens
│       ├── hooks/       # Egyedi React hook-ok
│       ├── misch/       # Egyéb segédeszközök és store
│       │   ├── store/   # Redux store szeletek
│       │   ├── Axios.ts # Axios konfigurációk
│       │   └── Store.ts # Redux store konfiguráció
│       ├── pages/       # Oldal komponensek
│       │   └── product/ # Termék oldalak
│       ├── router/      # Útválasztási konfiguráció
│       └── style/       # Stílusfájlok
├── docs/                # Generált dokumentáció
├── package.json         # Projekt függőségek és szkriptek
├── electron-builder.json # Electron build konfiguráció
├── vite.config.ts       # Vite konfiguráció
├── tsconfig.json        # TypeScript alap konfiguráció
├── tsconfig.app.json    # TypeScript alkalmazás konfiguráció
└── tsconfig.node.json   # TypeScript Node konfiguráció
```

## Fejlesztési Munkafolyamat

1. Végezzen módosításokat a forráskódban
2. Electron kód módosításaihoz fordítsa újra:
   ```
   npm run transpile:electron
   ```
3. Futtassa a Vite fejlesztői szervert:
   ```
   npm run dev
   ```
4. Indítsa el az Electron alkalmazást:
   ```
   npm run dev:electron
   ```

## Használati Útmutató

### Főbb Funkciók

- **Termékkezelés**: Számítógépes hardver termékek hozzáadása, szerkesztése és megtekintése
- **Felhasználókezelés**: Adminisztratív felhasználók hozzáadása és kezelése
- **Rendeléskezelés**: Vásárlói rendelések megtekintése és feldolgozása
- **Beállítások**: Alkalmazás preferenciák konfigurálása

### Bejelentkezés
1. Indítsa el a Pixelforge Admin alkalmazást
2. Adja meg felhasználónevét és jelszavát
3. Kattintson a "Bejelentkezés" gombra

### Termékkezelés
- A "Termékek" menüpont használatával új termékeket hozhat létre és kezelheti a meglévőket
- Különböző terméktípusok támogatottak: Processzor, Alaplap, Memória, Merevlemez, stb.

### Felhasználókezelés
- A "Felhasználók" menüpont használatával adminisztrálhatja a rendszer felhasználóit
- Különböző szerepkörök támogatottak: admin, manager, staff

### Rendeléskezelés
- A "Rendelések" menüpont alatt megtekintheti és kezelheti a vásárlói rendeléseket
- Rendelések állapotának frissítése: Függőben, Feldolgozás alatt, Szállítás alatt, stb.

## Hibaelhárítás

### Bejelentkezési Problémák
- Ellenőrizze, hogy a felhasználónév és jelszó helyes-e
- Ellenőrizze, hogy van-e aktív internet kapcsolata
- Ha elfelejtette a jelszavát, lépjen kapcsolatba a rendszeradminisztrátorral

### Fejlesztéssel Kapcsolatos Problémák
- Ellenőrizze, hogy a Node.js és npm verziója megfelelő-e
- Próbálja törölni a `node_modules` mappát és futtassa újra az `npm install` parancsot
- Újrafordítás problémák esetén törölje a `dist-electron` és `dist-react` mappákat, majd futtassa a build parancsokat

### Build Problémák
- Ellenőrizze, hogy minden függőség telepítve van-e
- Windows build problémák esetén győződjön meg róla, hogy van-e megfelelő jogosultság a mappákhoz
- macOS build során ellenőrizze, hogy megfelelő Apple fejlesztői azonosítóval rendelkezik-e

## Közreműködés

1. Forkolja a projektet
2. Hozzon létre egy új ágat a funkciójához (`git checkout -b feature/amazing-feature`)
3. Commitolja a változtatásait (`git commit -m 'Add some amazing feature'`)
4. Pusholja az ágat (`git push origin feature/amazing-feature`)
5. Nyisson egy Pull Request-et

## Dokumentáció

A projekt részletesebb dokumentációja megtalálható:
- `USER_DOCUMENTATION.md` - Felhasználói dokumentáció
- `TECHNICAL_DOCUMENTATION.md` - Műszaki dokumentáció
- `docs/` könyvtárban - Automatikusan generált API dokumentáció

## Licenc

© 2023-2024 Pixelforge. Minden jog fenntartva.

## Kapcsolat

Nemeth Akos - <your.email@example.com>

Projekt Link: [https://github.com/your-username/webshop_asztali](https://github.com/your-username/webshop_asztali)
