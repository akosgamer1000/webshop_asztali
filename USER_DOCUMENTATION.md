# Felhasználói Dokumentáció: Pixelforge Admin

## Áttekintés

A Pixelforge Admin egy asztali alkalmazás, amely egy számítógépes hardverekre specializálódott e-kereskedelmi platform kezelésére szolgál. Lehetővé teszi az adminisztrátorok számára a termékek, felhasználók, rendelések és alkalmazás beállítások kezelését.

## Rendszerkövetelmények

- Operációs Rendszer: Windows 10/11, macOS 11+, vagy Linux
- Minimum 4GB RAM
- 500MB szabad lemezterület
- Internet kapcsolat az API kommunikációhoz
- Node.js (v16.x vagy újabb)
- npm (v8.x vagy újabb)

## Telepítés

### Fejlesztőknek és Teszteléshez

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

4. Építse az alkalmazást:
   ```
   npm run build
   ```

5. Indítsa el az alkalmazást:
   ```
   npm run dev:electron
   ```

### Végfelhasználóknak

1. Töltse le az operációs rendszeréhez megfelelő legújabb buildet a projekt kiadási oldaláról
2. Csomagolja ki a fájlokat a kívánt helyre
3. Indítsa el az alkalmazást a Pixelforge Admin végrehajtható fájlra kattintva

## Főbb Funkciók

- Termékkezelés: Számítógépes hardver termékek hozzáadása, szerkesztése és megtekintése
- Felhasználókezelés: Adminisztratív felhasználók hozzáadása és kezelése
- Rendeléskezelés: Vásárlói rendelések megtekintése és feldolgozása
- Beállítások: Alkalmazás preferenciák konfigurálása

## Felhasználói Útmutató

### Bejelentkezés

1. Indítsa el a Pixelforge Admin alkalmazást
2. Adja meg felhasználónevét és jelszavát
3. Kattintson a "Bejelentkezés" gombra
4. Ha a hitelesítő adatok érvényesek, átirányítódik a termékek oldalra

![Bejelentkezési Képernyő](path/to/login-screenshot.png)

### Termékkezelés

#### Termékek Megtekintése
1. Kattintson a "Termékek" menüpontra az oldalsávban
2. Böngéssze a terméklistát
3. Használja a keresést vagy szűrőket konkrét termékek megtalálásához

![Terméklista](path/to/products-screenshot.png)

#### Új Termék Létrehozása
1. Kattintson a "Termékek" menüpontra az oldalsávban
2. Kattintson a "Termék Létrehozása" gombra
3. Válassza ki a termék típusát a rendelkezésre álló opciók közül:
   - Processzor
   - Alaplap
   - Memória
   - Merevlemez
   - Videókártya
   - Tápegység
   - CPU Hűtő
   - Ház
4. Töltse ki a kért mezőket a kiválasztott terméktípushoz
5. Kattintson a "Küldés" gombra az új termék létrehozásához

![Termék Hozzáadása](path/to/add-product-screenshot.png)

#### Termék Részletek Megtekintése
1. Keresse meg a terméket a terméklistában
2. Kattintson a termék nevére
3. Tekintse meg a termék részletes információit

### Felhasználókezelés

#### Felhasználók Megtekintése
1. Kattintson a "Felhasználók" menüpontra az oldalsávban
2. Böngéssze a felhasználólistát
3. Használja a keresést vagy szűrőket konkrét felhasználók megtalálásához

#### Új Felhasználó Hozzáadása
1. Kattintson a "Felhasználók" menüpontra az oldalsávban
2. Kattintson az "Új Felhasználó" gombra
3. Töltse ki a kért mezőket:
   - Felhasználónév
   - Email
   - Jelszó
   - Szerepkör (Admin, Felhasználó)
4. Kattintson a "Létrehozás" gombra az új felhasználó hozzáadásához

#### Felhasználó Részletek Megtekintése
1. Keresse meg a felhasználót a felhasználólistában
2. Kattintson a felhasználónévre a részletes információk megtekintéséhez
3. A felhasználó részletei megjelennek, beleértve a kapcsolati információkat és szerepkört

#### Felhasználói Profil
1. Kattintson a felhasználónevére a jobb felső sarokban
2. Válassza a "Profil" opciót a legördülő menüből
3. Tekintse meg és szerkessze a profil információkat

### Rendeléskezelés

#### Rendelések Megtekintése
1. Kattintson a "Rendelések" menüpontra az oldalsávban
2. Böngéssze a rendeléslistát
3. Használja a keresést vagy szűrőket konkrét rendelések megtalálásához

#### Rendelés Részletek Megtekintése
1. Keresse meg a rendelést a rendeléslistában
2. Kattintson a rendelésszámra a részletek megtekintéséhez
3. Tekintse át a rendelés részleteit, tételeit és a vásárló információit

#### Rendelés Állapotának Frissítése
1. Navigáljon a rendelés részletek oldalra
2. Az aktuális állapot a rendelés részletek tetején jelenik meg
3. Az állapot módosításához használja az állapot legördülő menüt
4. Válassza ki az új állapotot a rendelkezésre álló opciók közül:
   - Függőben
   - Feldolgozás alatt
   - Szállítás alatt
   - Kiszállítva
   - Törölve
5. Az állapot automatikusan frissül a módosításkor

### Beállítások

1. Kattintson a "Beállítások" menüpontra az oldalsávban
2. Állítsa be az alkalmazás preferenciáit:
   - Megjelenítési beállítások
   - Értesítési beállítások
   - Alapértelmezett értékek
3. Kattintson a "Mentés" gombra a változtatások alkalmazásához

## Hibaelhárítás

### Bejelentkezési Problémák
- Ellenőrizze, hogy a felhasználónév és jelszó helyes-e
- Ellenőrizze, hogy van-e aktív internet kapcsolata
- Ha elfelejtette a jelszavát, lépjen kapcsolatba a rendszeradminisztrátorral

### Termékkezelési Problémák
- Ellenőrizze, hogy minden kötelező mező ki van-e töltve termékek létrehozásakor/szerkesztésekor
- Ha a képek nem töltődnek fel, ellenőrizze, hogy támogatott formátumban vannak-e (JPG, PNG)
- A képek maximális mérete 5MB

### Rendelésfeldolgozási Problémák
- Ha a rendelések nem frissülnek, frissítse az oldalt és próbálja újra
- Ellenőrizze, hogy megvan-e a megfelelő jogosultsága a rendelések módosításához

## Támogatás

További támogatásért:
- Email: support@pixelforge.com
- Telefon: +1-555-123-4567
- Nyitvatartás: Hétfő-Péntek, 9:00-17:00 EST 