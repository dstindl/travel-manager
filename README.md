# Asien-Auszeit 2027

Reiseplanungs-App (PWA). Live: https://dstindl.github.io/travel-manager/

## Versionen

**Vollversionen** (0.81, 0.82, …) sind feste, geprüfte Stände und dienen als dauerhaftes Backup:
- als eigene Datei in `releases/` (z. B. `releases/Asien-Auszeit-v0_81.html`) – wird nie gelöscht oder überschrieben,
- optional zusätzlich als Git-Tag/GitHub-Release (`v0.81`, …), angelegt auf github.com unter Releases → „Draft a new release“.

Eine Vollversion lässt sich jederzeit wiederherstellen: Datei aus `releases/` öffnen oder als `index.html` einsetzen.

**Arbeitsversionen** (z. B. 0.91_01, 0.91_02, …) bauen auf der letzten Vollversion auf und werden laufend gepusht. Im Hauptordner liegt nur die jeweils aktuelle Kopie (derzeit `Asien-Auszeit-v0_91_XX.html`).

| Vollversion | Datum | Datei | Tag |
|---|---|---|---|
| 0.81 | 26.11.2026 | releases/Asien-Auszeit-v0_81.html | Commit d372a3a |
| 0.90 | 26.11.2026 | releases/Asien-Auszeit-v0_90.html | Commit e26ce6b · Neuaufbau: neue Oberfläche, gleicher Datenbestand |
| 0.91 | 26.11.2026 | releases/Asien-Auszeit-v0_91.html | Commit 9405024 · Verbindungen mit echten Angeboten, Unterkunft/Ausflüge finden (KI), Einreise-Karten, Erinnerungen, Kalender, verschlüsselter Abgleich, Reisehinweise, Wetter, Fahrzeiten, Sicherheitslage, Google-Maps-Import, Testmodus |

## Aufbau der App (ab 0.90)

- `index.html` ist die App (installierbar, offline nutzbar). Sie besteht aus einem **Kern** (Datenmodell und Logik, übernommen aus 0.81 – gleiche Reisedaten) und der **neuen Oberfläche** (Übersicht, Route, KI, Orte, Geld).
- Updates: `version.json` nennt die aktuelle Version. Die App prüft beim Start und beim Zurückwechseln, lädt sich selbst neu und zeigt danach „Neu in Version …“.
- `service-worker.js`: Netz zuerst, offline aus dem Speicher; nimmt geteilte Dateien und Texte entgegen (Teilen-Ziel aus `manifest.json`).
- Vor der ersten Änderung eines Tages legt die App eine **Tagessicherung** an (Einstellungen → Daten).
- `alt/` enthält die vorherige App 0.81 (gleiche Daten) für Funktionen, die noch nicht übernommen sind; erreichbar unter Einstellungen → „Vorherige App 0.81“.
- `v2/` leitet auf die App um (früherer Prototyp-Link).
