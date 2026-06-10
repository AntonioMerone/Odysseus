# Odysseus

Odysseus e una app mobile-first per seguire orari e meteo di alcune citta nel mondo.

## Avvio con Live Server

Apri `index.html` con Live Server in VS Code.

## Test PWA

Apri l'app da Live Server e controlla in DevTools:

- `Application > Manifest`
- `Application > Service Workers`
- `Application > Cache Storage`

## Test da telefono con IP locale

Avvia Live Server sul computer e apri dal telefono l'indirizzo IP locale del computer, per esempio `http://192.168.1.10:5500`.

Il telefono deve essere sulla stessa rete Wi-Fi. Su alcuni browser l'installazione PWA completa richiede HTTPS, quindi il test via IP locale puo servire per verificare layout e navigazione, ma non sempre mostra il prompt di installazione.

## Installazione Android

Pubblica l'app su HTTPS, aprila con Chrome Android, poi usa il menu e scegli `Aggiungi a schermata Home` o `Installa app`.

## Installazione iPhone

Pubblica l'app su HTTPS, aprila con Safari, tocca Condividi e scegli `Aggiungi alla schermata Home`.

## Tecnologie

- HTML
- CSS
- JavaScript vanilla
- PWA manifest
- Service worker

## Note

Non usa backend. Meteo e ricerca citta richiedono internet.
