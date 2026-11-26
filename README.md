# Asien-Auszeit 2027

Reiseplanungs-App (PWA). Live: https://dstindl.github.io/travel-manager/

## Versionen

**Vollversionen** (0.81, 0.82, …) sind feste, geprüfte Stände und dienen als dauerhaftes Backup:
- als eigene Datei in `releases/` (z. B. `releases/Asien-Auszeit-v0_81.html`) – wird nie gelöscht oder überschrieben,
- optional zusätzlich als Git-Tag/GitHub-Release (`v0.81`, …), angelegt auf github.com unter Releases → „Draft a new release“.

Eine Vollversion lässt sich jederzeit wiederherstellen: Datei aus `releases/` öffnen oder als `index.html` einsetzen.

**Arbeitsversionen** (0.81_01, 0.81_02, …) bauen auf der letzten Vollversion auf und werden laufend gepusht. Im Hauptordner liegt nur die jeweils aktuelle Kopie (`Asien-Auszeit-v0_81_XX.html`).

| Vollversion | Datum | Datei | Tag |
|---|---|---|---|
| 0.81 | 26.11.2026 | releases/Asien-Auszeit-v0_81.html | Commit d372a3a |

## Neue App (Neuaufbau, `/v2/`)

Live: https://dstindl.github.io/travel-manager/v2/

- Läuft parallel zur heutigen App und arbeitet mit **denselben Reisedaten** (gleicher Speicher im Browser). Änderungen sind sofort in beiden Apps sichtbar; beide laden Änderungen der jeweils anderen automatisch nach.
- Vor der ersten Änderung eines Tages legt die neue App eine **Tagessicherung** an (Einstellungen → Daten → Tagessicherung).
- Aufbau: `v2/index.html` enthält einen **Kern** (Datenmodell und Logik, übernommen aus App 0.81_02) und darunter die **neue Oberfläche**.
- Zählung als **Stand** (Stand 9, 10, …); `v2/version.json` sorgt dafür, dass Handys den neuesten Stand laden.
- Beim Umstieg wird die neue App zur Vollversion **0.90** (`index.html`), die heutige App bleibt dann als Vollversion 0.81 in `releases/`.
