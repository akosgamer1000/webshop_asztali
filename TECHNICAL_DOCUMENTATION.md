# Műszaki Dokumentáció: Pixelforge Admin

## Projekt Áttekintés

A Pixelforge Admin egy olynan electron app ami arra szolgál, hogy kezelje a felhasználokat, rendeléseket  és termékéket a webshopphoz

## Technológiai Stack

### Alapvető Technológiák
- **Electron**: Keretrendszer platformfüggetlen asztali alkalmazások fejlesztéséhez
- **React**: Frontend könyvtár felhasználói felületek készítéséhez
- **TypeScript**: Típusos JavaScript a jobb fejlesztői élmény érdekében
- **Redux Toolkit**: Állapotkezelési megoldás
- **React Router**: Kliensoldali útválasztás

### UI Könyvtárak
- **Ant Design**: UI komponens könyvtár
- **Tailwind CSS**: Utility-first CSS keretrendszer
- **React Icons**: Ikon könyvtár
- **Lucide React**: További ikon könyvtár
- **Sonner**: Toast értesítési könyvtár

### Backend Kommunikáció
- **Axios**: HTTP kliens API kérésekhez
- **JWT**: JSON Web Token hitelesítéshez

## Projekt Struktúra

```
webshop_asztali/
├── dist-electron/       # Fordított Electron kód
├── dist-react/          # Fordított React UI kód
├── src/                 # Forráskód
│   ├── electron/        # Electron fő folyamat kódja
│   │   └── main.ts      # Electron fő belépési pont
│   └── ui/              # React UI kód
│       ├── assets/      # Statikus erőforrások
│       ├── companents/  # UI komponensek funkció szerint rendezve
│       │   ├── common/  # Megosztott komponensek
│       │   ├── layout/  # Elrendezési komponensek
│       │   ├── login/   # Hitelesítési komponensek
│       │   ├── order/   # Rendeléskezelő komponensek
│       │   ├── product/ # Termékkezelő komponensek
│       │   ├── profile/ # Felhasználói profil komponensek
│       │   ├── setting/ # Beállítási komponensek
│       │   └── user/    # Felhasználókezelő komponensek
│       ├── hooks/       # Egyedi React hook-ok
│       ├── misch/       # Egyéb segédeszközök
│       │   ├── store/   # Redux store szeletek
│       │   ├── Axios.ts # Axios konfiguráció
│       │   └── Store.ts # Redux store konfiguráció
│       ├── pages/       # Oldal komponensek
│       │   └── product/ # Termékkel kapcsolatos oldalak
│       ├── router/      # Útválasztási konfiguráció
│       │   └── index.tsx # Fő router beállítás
│       └── style/       # Stílusfájlok
├── package.json         # Projekt függőségek és szkriptek
└── vite.config.ts       # Vite konfiguráció
```

## Architektúra

### Electron Fő Folyamat
Az Electron fő folyamat (`src/electron/main.ts`) felelős az alkalmazás ablak létrehozásáért és az alkalmazás életciklusának kezeléséért. Konfigurálja az ablak méreteit, megjelenését és betölti a React UI-t.

### React UI
A React UI funkció-alapú architektúrát használ, ahol a komponensek, állapotok és logika funkció szerint vannak csoportosítva, nem pedig típus szerint. Ez a kódbázist karbantarthatóbbá és skálázhatóbbá teszi.

### Állapotkezelés
Az alkalmazás Redux Toolkit-et használ az állapotkezeléshez, a következő fő szeletekkel:
- **Auth**: Hitelesítési állapot kezelése (bejelentkezés, kijelentkezés, tokenek)
- **Settings**: Alkalmazás beállítások és preferenciák kezelése

### Útválasztás
Az alkalmazás React Router-t használ a navigációhoz. Az útvonalak hitelesítéssel védettek, nem engedélyezett felhasználókat a bejelentkezési oldalra irányít. A fő útvonalak:
- `/login`: Hitelesítési oldal
- `/products`: Termékkezelés
- `/users`: Felhasználókezelés
- `/orders`: Rendeléskezelés
- `/setting`: Alkalmazás beállítások
- `/profile`: Felhasználói profil

A termék létrehozási munkafolyamathoz beágyazott útválasztási struktúra van implementálva.

## Adatbázis Modell

### Adatbázis Diagram
![Adatbázis Modell Diagram](./database.png)

### Tábla Leírások

#### User
Felhasználói információk tárolása.
- `id` (INT): Elsődleges kulcs, automatikusan növekvő
- `name` (VARCHAR): Felhasználó neve
- `email` (VARCHAR): Egyedi email cím
- `password` (VARCHAR): Jelszó
- `address` (VARCHAR): Szállítási cím
- `role` (VARCHAR): Felhasználói szerepkör

#### Product
Számítógépes komponensek és termékek adatainak tárolása.
- `id` (INT): Elsődleges kulcs, automatikusan növekvő
- `name` (VARCHAR): Termék neve
- `manufacturer` (VARCHAR): Gyártó neve
- `type` (ENUM): Termék típusa ('PROCESSOR', 'MEMORY', 'HARDDRIVE', 'VIDEOCARD', 'MOTHERBOARD', 'CPUCOOLER', 'POWERSUPPLY', 'POWERHOUSE')
- `price` (DOUBLE): Termék ára
- `quantity` (INT): Elérhető készlet mennyisége
- `imgSrc` (VARCHAR): Termék képének elérési útja

#### Powersupply
Tápegységek adatainak tárolása.
- `id` (INT): Elsődleges kulcs, automatikusan növekvő
- `performance` (DOUBLE): Teljesítmény értéke
- `fourPinConnector` (TINYINT): 4 tűs csatlakozók száma
- `sixPinVGA` (TINYINT): 6 tűs VGA csatlakozók száma
- `size` (VARCHAR): Fizikai méret
- `productId` (INT): Külső kulcs a product táblához

#### Harddrive
Merevlemezek adatainak tárolása.
- `id` (INT): Elsődleges kulcs, automatikusan növekvő
- `capacity` (DOUBLE): Tárhely kapacitás
- `storageType` (VARCHAR): Tárolási technológia típusa
- `connectionInterface` (VARCHAR): Csatlakozási interfész
- `readingSpeed` (DOUBLE): Olvasási sebesség
- `writingSpeed` (DOUBLE): Írási sebesség
- `nandFlashType` (VARCHAR): NAND flash típus
- `pciGeneration` (INT): PCI generáció
- `productId` (INT): Külső kulcs a product táblához

#### Processor
Processzorok adatainak tárolása.
- `id` (INT): Elsődleges kulcs, automatikusan növekvő
- `coreNumber` (INT): Magok száma
- `baseFrequency` (DOUBLE): Alap órajel
- `turboBoostFrequency` (DOUBLE): Turbó órajel
- `cache` (DOUBLE): Cache méret
- `architecture` (VARCHAR): Architektúra típusa
- `processorSeller` (VARCHAR): Processzor gyártó
- `processorModel` (VARCHAR): Processzor modell
- `integratedGraphicModel` (VARCHAR): Integrált grafikai egység modellje
- `processorTechnology` (VARCHAR): Processzor technológia
- `productId` (INT): Külső kulcs a product táblához

#### Powerhouse
Számítógép házak adatainak tárolása.
- `id` (INT): Elsődleges kulcs, automatikusan növekvő
- `motherboardType` (VARCHAR): Támogatott alaplap típus
- `fans` (INT): Ventilátorok száma
- `size` (VARCHAR): Ház mérete
- `productId` (INT): Külső kulcs a product táblához

#### Memory
Memória modulok adatainak tárolása.
- `id` (INT): Elsődleges kulcs, automatikusan növekvő
- `memoryCapacity` (DOUBLE): Memória kapacitás
- `memoryType` (VARCHAR): Memória típus
- `installedMemory` (DOUBLE): Telepített memória mérete
- `frequency` (DOUBLE): Működési frekvencia
- `supportedMemoryCapacity` (DOUBLE): Támogatott maximális kapacitás
- `productId` (INT): Külső kulcs a product táblához

#### Motherboard
Alaplapok adatainak tárolása.
- `id` (INT): Elsődleges kulcs, automatikusan növekvő
- `cpuSocket` (VARCHAR): CPU foglalat típusa
- `chipset` (VARCHAR): Chipset típusa
- `memoryType` (VARCHAR): Támogatott memória típus
- `processorSeller` (VARCHAR): Támogatott processzor gyártó
- `graphicCard` (VARCHAR): Támogatott grafikus kártya típus
- `hdmi` (TINYINT): HDMI csatlakozók száma
- `sataConnectors` (INT): SATA csatlakozók száma
- `pciConnectors` (INT): PCI csatlakozók száma
- `usbPorts` (INT): USB portok száma
- `memorySockets` (INT): Memória foglalatok száma
- `integratedSound` (TINYINT): Integrált hang támogatása
- `bluetooth` (TINYINT): Bluetooth támogatás
- `wireless` (TINYINT): Vezeték nélküli hálózat támogatás
- `sizeStandard` (VARCHAR): Méret szabvány
- `productId` (INT): Külső kulcs a product táblához

#### Cpucooler
CPU hűtők adatainak tárolása.
- `id` (INT): Elsődleges kulcs, automatikusan növekvő
- `fanSpeed` (DOUBLE): Ventilátor fordulatszáma
- `type` (VARCHAR): Hűtő típusa
- `airflow` (DOUBLE): Légáramlás
- `frequency` (DOUBLE): Működési frekvencia
- `productId` (INT): Külső kulcs a product táblához

#### Videocard
Videokártyák adatainak tárolása.
- `id` (INT): Elsődleges kulcs, automatikusan növekvő
- `videoChipset` (VARCHAR): Videokártya chipset
- `producer` (VARCHAR): Gyártó
- `cpuSocket` (VARCHAR): Kompatibilis CPU foglalat
- `coolingType` (VARCHAR): Hűtési típus
- `graphicChipSpeed` (DOUBLE): Grafikus chip sebessége
- `installedMemorySpeed` (DOUBLE): Telepített memória sebessége
- `memoryCapacity` (DOUBLE): Memória kapacitás
- `bandwidth` (DOUBLE): Sávszélesség
- `suggestedPower` (DOUBLE): Ajánlott tápteljesítmény
- `displayPort` (INT): DisplayPort csatlakozók száma
- `size` (VARCHAR): Fizikai méret
- `productId` (INT): Külső kulcs a product táblához

#### Size
Méret információk tárolása.
- `id` (INT): Elsődleges kulcs, automatikusan növekvő
- `width` (DOUBLE): Szélesség
- `length` (DOUBLE): Hosszúság
- `height` (DOUBLE): Magasság
- `productId` (INT): Külső kulcs a product táblához

#### Order
Rendelések nyilvántartása.
- `id` (INT): Elsődleges kulcs, automatikusan növekvő
- `email` (VARCHAR): Megrendelő email címe
- `address` (VARCHAR): Szállítási cím
- `status` (ENUM): Rendelés állapota ('Cancelled', 'Pending', 'InProgress', 'Delivered')
- `totalPrice` (DOUBLE): Teljes rendelési összeg
- `createdAt` (DATETIME): Rendelés létrehozásának ideje

#### OrderItem
Rendelés tételeinek tárolása.
- `id` (INT): Elsődleges kulcs, automatikusan növekvő
- `orderId` (INT): Külső kulcs az order táblához
- `productId` (INT): Külső kulcs a product táblához
- `quantity` (INT): Rendelt mennyiség

#### Prisma_migrations
Adatbázis migrációk táblája.
- `id` (VARCHAR): Elsődleges kulcs, migrációs azonosító
- `checksum` (VARCHAR): Ellenőrző összeg
- `finished_at` (DATETIME): Befejezés időpontja
- `migration_name` (VARCHAR): Migráció neve
- `logs` (TEXT): Naplózási információk
- `rolled_back_at` (DATETIME): Visszaállítás időpontja
- `started_at` (DATETIME): Indítás időpontja
- `applied_steps_count` (INT): Alkalmazott lépések száma

## Hitelesítés

Az alkalmazás JWT-alapú hitelesítést használ:
- A felhasználói hitelesítő adatokat a backend API ellenőrzi
- A JWT tokenek localStorage-ban tárolódnak a perzisztencia érdekében
- A védett útvonalak ellenőrzik a hitelesítési állapotot a megjelenítés előtt
- Az alkalmazás automatikusan megpróbál bejelentkezni a tárolt hitelesítő adatokkal

## API Kommunikáció

Az API kéréseket egy konfigurált Axios példány (`src/ui/misch/Axios.ts`) kezeli. A konfiguráció tartalmazza:
- Alap URL konfigurációt
- Kérés/válasz interceptorokat
- Engedélyezési fejléc kezelést
- Hibakezelést

## Főbb Funkciók

1. **Termékkezelés**:
   - Új számítógépes komponens termékek létrehozása több kategóriában
   - Meglévő termékek szerkesztése
   - Termék részletek megtekintése

2. **Felhasználókezelés**:
   - Admin felhasználók hozzáadása és kezelése
   - Felhasználói profil szerkesztése
   - Szerepkör-alapú hozzáférés-vezérlés

3. **Rendeléskezelés**:
   - Rendelés részletek megtekintése
   - Rendelés állapotának követése
   - Rendelések feldolgozása

4. **Beállítások**:
   - Alkalmazás konfiguráció
   - UI preferenciák

