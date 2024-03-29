﻿# BootstrapAddButtonJs
In una pagina gestita tramite Bootstrap potremmo avere necessità di visualizzare delle righe successive a quelle attualmente visualizzate.  
Questo script si preoccupa di recuperare tutti i div aventi lo stesso id sequenziale e li mostra/nasconde in base alla presenza della classe d-none.
## Come lavora
Inizialmente, quindi al primo avvio della pagina, se non trova la classe `d-none` la aggiunge, se inveve è presente viene rimossa.
Aggiunge automaticamente un pulsante [add] al primo elemento ed aggiunge dei pulsanti [del] come ultimi elementi di una colonna Bootstrap.
Si preoccupa di wrappare quello che c'è nella riga all'interno di un div a cui assegna classe `col-11` per aggiungere una ulteriore colonna con classe `col-1`

## Come devo preparare il codice html
Si necessita quindi, quando si crea una struttura che sarà gestita attraverso questo pulsante, di una serie di div aventi classi row ed un Id che sia sequenziale.
Proprio come nell'esempio del file index.html che abbiamo in allegato.
```html
<div class="row" id="row_1">
  <div class="col-sm-6 col-12">
  ...
  </div>
  <div class="col-sm-6 col-12">
  ...
  </div>
</div>

<div class="row" id="row_2">
  <div class="col-sm-6 col-12">
  ...
  </div>
  <div class="col-sm-6 col-12">
  ...
  </div>
</div>

<div class="row" id="row_3">
  <div class="col-sm-6 col-12">
  ...
  </div>
  <div class="col-sm-6 col-12">
  ...
  </div>
</div>
```
Non devo preoccuparmi ove verrà visualizzato il bottone perhcè sarà appunto lo script ad occuparsi di inserirlo adattando il contenuto.

## Come invoco lo script.
Per invocare lo script è sufficiente lanciare la funzione `gestisciDivNascosti(id)` indicando come variabile id la parte comune a tutte le righe che devono essere visualizzate/nascoste.
Nell'esempio del codice precedente la variabile id conterrà 'row_';
La funzione contiene due eventi uno lanciato al click del pulsante add, uno lanciato al click del pulsante delete
In entrambi gli eventi vengono passate due variabili: l'evento stesso e l'oggetto sul quale l'azione deve essere avviata.
- `gdn_add(ev,obj);`
- `gdn_del(ev,obj);`

### Note personali
La funzione querySelectorAll restituisce un oggetto NodeList che ha una struttura simile a un array ma non è esattamente un array. Per utilizzare i metodi degli array su un NodeList, dobbiamo convertirlo in un vero array. Questo è esattamente ciò che fa Array.prototype.slice.call(). call() invoca il metodo slice dell'oggetto Array.prototype, ma lo fa con divSuccessivi come contesto (this). Ciò significa che slice sarà eseguito su divSuccessivi come se fosse un array.
In questo caso, Array.prototype.slice.call(divNL, 1) crea una copia di divNL a partire dal secondo elemento,eliminando così il primo elemento dall'array.
Quindi, divA diventa un vero array con il primo elemento rimosso.
