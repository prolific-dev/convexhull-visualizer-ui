---
seo:
  title: Convex Hull Visualizer
  description: Interaktive 2D/3D-Visualisierung für konvexe Hüllen mit anpassbaren Algorithmen und Export-Optionen.
---

::u-page-hero{class="dark:bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950"}
#title
Visualisiere konvexe Hüllen in 2D & 3D.

#description
Erkunde Punktmengen, passe Algorithmen live an und exportiere Ergebnisse in Sekunden. Die App kombiniert Nuxt 4, Vue 3 und Nuxt UI zu einer klaren, responsiven Oberfläche.

#links
  :::u-button
  ---
  to: /chart
  size: xl
  trailing-icon: i-lucide-arrow-right
  ---
  Starte Visualisierung
  :::

  :::u-button
  ---
  icon: i-lucide-book-open
  color: neutral
  variant: outline
  size: xl
  to: /api-docs
  ---
  API-Dokumentation
  :::

#default
  :::prose-pre
  ---
  code: |
    pnpm install
    pnpm dev
  filename: Schnellstart
  ---
  :::
::

::u-page-section
#title
Highlights

#description
Die wichtigsten Funktionen, die das Arbeiten mit konvexen Hüllen effizient machen.

#default
  :::u-page-grid
  #items
  - title: 2D- & 3D-Ansicht
    description: Wechsle nahtlos zwischen Ebenen- und Raumdarstellung. Nutzt GraphVis2D/3D mit interaktivem Orbit- und Pan/Zoom.
  - title: Anpasbare Algorithmen
    description: Wähle und tune Algorithmen wie Quickhull und Graham Scan über die Einstellungsseiten. Live-Updates ohne Reload.
  - title: Datenquellen
    description: Verwende Beispiel-Datensätze oder lade eigene Punkte hoch. Server-Endpoints liefern 2D/3D-Cluster und Rauschdaten.
  - title: Export & Teilen
    description: Lade Ergebnisse als JSON oder Screenshot herunter und teile URLs mit vordefinierten Parametern.
  - title: Performante Pipeline
    description: Schlanke Serverfunktionen in server/api berechnen Hüllen und liefern Antwortzeiten im Subsekundenbereich.
  - title: Responsives Layout
    description: Nuxt UI Komponenten sorgen für klare Bedienung auf Desktop, Tablet und Mobile.
  :::
::

::u-page-section
#title
So arbeitest du mit der App

#default
  :::prose
  1. **Daten wählen** – Öffne die Startseite `/chart`, wähle einen Beispiel-Datensatz oder füge eigene Punkte hinzu.
  2. **Parameter anpassen** – Unter `/settings` kannst du Algorithmus, Iterationsschritte, Punktgröße, Farben und Tooltips konfigurieren.
  3. **Ergebnisse prüfen** – Nutze Rotationen, Zoom und Stepper, um jeden Berechnungsschritt sichtbar zu machen.
  4. **Exportieren** – Speichere den aktuellen Zustand als JSON oder Bild. Die API liefert reproduzierbare Antworten für Automatisierungen.
  :::
::

::u-page-section
#title
Wichtige Routen

#default
  :::u-list
  - label: /chart
    icon: i-lucide-orbit
    description: Hauptansicht für 2D/3D-Visualisierung mit Live-Interaktion.
  - label: /settings
    icon: i-lucide-sliders-horizontal
    description: Feintuning für Anzeige, Sampling, Algorithmus und Performance.
  - label: /api-docs
    icon: i-lucide-cloudy
    description: Übersicht der server/api-Endpunkte (`compute`, `compute-full`, `data2d`, `data3d`) mit Beispielen.
  :::
::

::u-page-section
#title
API-Schnellreferenz

#description
Alle Endpoints liefern JSON und können für Automatisierung oder Integration genutzt werden.

#default
  :::prose-pre
  ---
  code: |
    GET  /api/data2d   # Beispielpunkte in 2D
    GET  /api/data3d   # Beispielpunkte in 3D
    POST /api/compute  # Berechnet Hülle inkl. Metadaten
    POST /api/compute-full # Enthält Zwischenschritte
  filename: server/api
  ---
  :::
::

::u-page-section
#title
Tipps für beste Ergebnisse

#default
  :::u-list
  - label: Punktdichte steuern
    icon: i-lucide-scatter-chart
    description: Reduziere die Stichprobe in `/settings`, wenn die Szene zu dicht wird.
  - label: Stepper nutzen
    icon: i-lucide-square-step-forward
    description: In der 3D-Ansicht zeigen Zwischenschritte, wie das Hull wächst – ideal für Demos.
  - label: Farben kontrastreich wählen
    icon: i-lucide-palette
    description: Nutze das Dark-Theme und wähle kontrastreiche Farben, um Facetten klar zu erkennen.
  - label: Export sichern
    icon: i-lucide-download
    description: Nach jeder Berechnung JSON oder Screenshot speichern, um Konfigurationen festzuhalten.
  :::
::

::u-page-section
#title
Häufige Fragen

#default
  :::u-accordion
  - label: Welche Algorithmen werden unterstützt?
    content: Quickhull ist standardmäßig aktiv. Weitere Varianten und Debug-Informationen kannst du unter `/settings` einblenden.
  - label: Kann ich eigene Daten verwenden?
    content: Ja. Lade eigene Punktlisten hoch oder übergebe sie per POST an `/api/compute`.
  - label: Wie halte ich die Performance hoch?
    content: Verwende kleinere Punktmengen, reduziere Iterationsschritte für Vorschauen und aktiviere nur benötigte Debug-Overlays.
  :::
::

::u-page-section
#title
Weiterführende Infos

#default
  :::u-list
  - label: README
    icon: i-lucide-book-open-check
    description: Überblick über Struktur, Befehle und Lizenz.
  - label: Lizenz (AGPL-3.0)
    icon: i-lucide-scale
    description: Die App steht unter AGPL-3.0; Änderungen am Backend müssen ebenfalls offengelegt werden.
  :::
::
