# Meridian website

Een zelfstandige remake van de Meridian RP-landingspagina.

## Starten

Open `index.html` direct, of start in deze map een lokale server:

```powershell
python -m http.server 4173
```

Open daarna <http://localhost:4173>.

## Instellingen

Pas bovenaan `script.js` de waarden in `CONFIG` aan:

- `playersOnline`
- `maxPlayers`
- `connectAddress`
- `discordUrl`

De website gebruikt verder geen buildstap of externe JavaScript-dependencies.
