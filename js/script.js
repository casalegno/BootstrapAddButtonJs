/**
 * Questo script si preoccupa di recuperare tutti i div aventi lo stesso id sequenziale e li mostra/nasconde in base alla presenza della classe d-none (inizialmente al contrario).
 * Aggiunge automaticamente un pulsante [add] al primo elemento ed aggiunge dei pulsanti [del] come ultimi elementi di una colonna Bootstrap
 * Si necessita quindi quando si crea una struttura che sarà gestita, da div
 * La funzione querySelectorAll restituisce un oggetto NodeList che ha una struttura simile a un array ma non è esattamente un array. Per utilizzare i metodi degli array su un NodeList, dobbiamo convertirlo in un vero array. Questo è esattamente ciò che fa Array.prototype.slice.call(). call() invoca il metodo slice dell'oggetto Array.prototype, ma lo fa con divSuccessivi come contesto (this). Ciò significa che slice sarà eseguito su divSuccessivi come se fosse un array.
 * In questo caso, Array.prototype.slice.call(divNL, 1) crea una copia di divNL a partire dal secondo elemento,eliminando così il primo elemento dall'array.
 * Quindi, divA diventa un vero array con il primo elemento rimosso.
 *
 * Contiene due eventi uno lanciato al click del pulsante add, uno lanciato al click del pulsante delete.
 * In entrambi gli eventi vengono passate due variabili: l'evento stesso e l'oggetto sul quale l'azione deve essere avviata.
 * gdn_add(ev,obj);
 * gdn_del(ev,obj);
 *
 * @param {string} idDiv Una stringa che rappresenta la parte iniziale dell'id sul quale iterare le righe
 * @returns {null}
 */
function gestisciDivNascosti(idDiv) {
//     Trova tutti i div con lo stesso ID numerato in sequenza
    const divNL = document.querySelectorAll('[id^="' + idDiv + '"]');
//    Preparo le variabili
    const main = divNL[0];
    let bd = [];
    let dc1 = document.createElement('div');
    let drow = document.createElement('div');
    let dc11 = document.createElement('div');//uso un div perchè non posso nestare due dc11
    let ba = document.createElement('span');
    let divA = Array.prototype.slice.call(divNL, 1);
    dc11.className = "col-sm-11 col-12";
    drow.className = 'row';
    dc1.className = 'col-sm-1';
    ba.className = 'btn btn-sm toggleRow btn-outline-primary';
    ba.innerHTML = "<i style='line-height: inherit;' class='fa fa-plus'></i>";
    main.id = idDiv + 'main';
//    creo i pulsanti per le righe e salvo il valore iniziale per ogni campo input
    n = 0;
    divA.forEach((d) => {
        d.classList.toggle('d-none');
        creaForm(d);
        InputValue(d);
        n++;
    });
//    attivo il bottone add a mostrare nascondere le righe successive
    ba.addEventListener('click', (ev) => {
        for (var i = 0; i < divA.length; i++) {
            if (typeof gdn_beforeAdd==="function") {
                    gdn_add(ev,divA[i]);
                }
            if (divA[i].classList.contains('d-none')) {
                divA[i].classList.remove('d-none');
                //getInputValue(divA[i]);
                return;
            }
        }
    });
//    Ora gestisco i pulsanti di cancellazione
    bd.forEach((b) => {
        b.addEventListener('click', (ev) => {
            idName = idDiv + b.dataset.nmb;
            b.closest('#' + idName).classList.add('d-none');
            InputValue(b.closest('#' + idName), false);
            if (typeof gdn_del==="function") {
                    gdn_del(ev,b.closest('#' + idName));
                }
        });
    });
    dc1.appendChild(ba);
//    sposto i figli della main all'intendo di drow
    while (main.firstChild) {
        c = main.firstChild;
        main.removeChild(c);
        drow.appendChild(c);
    }
    dc11.appendChild(drow);
    main.appendChild(dc11);
    main.appendChild(dc1);
    function creaForm(genitore) {
        genitore.id = idDiv + n;//resetto l'id
        dc11row = document.createElement('div');
        dc11row.className = 'col-sm-11 col-12'
        row = document.createElement('div');
        row.className = 'row';
        dc11row.appendChild(row);
        div = dc1.cloneNode();
        bd[n] = document.createElement('span');
        bd[n].className = 'btn btn-sm toggleRow btn-outline-danger';
        bd[n].innerHTML = "<i style='line-height: inherit;' class='fa fa-minus'></i>";
        bd[n].dataset.nmb = n;
        div.appendChild(bd[n]);
//        Rimuovi tutti i nodi figli dal genitore e inseriscili nel dc11
        while (genitore.firstChild) {
            let figlio = genitore.firstChild;
            genitore.removeChild(figlio);
            row.appendChild(figlio);
        }
        genitore.appendChild(dc11row);
        genitore.appendChild(div);
    }
    function InputValue(genitore, a = true) {
        dc11row = genitore.firstChild;
        form = genitore.closest('form');
        Array.from(form.elements).forEach((el) => {
            if (el.closest('#' + genitore.id)) {
                switch (el.type) {
                    case 'checkbox':
                    case 'radio':
                        if (a) {
                            el.dataset.gdn = el.checked;
                        } else {
                            el.checked = el.dataset.gdn;
                        }
                        break;
                    default :
                        if (a) {
                            el.dataset.gdn = el.value;
                        } else {
                            el.value = el.dataset.gdn;
                        }
                        break;
                }
            }
        });
    }
}

// Esempio di utilizzo: passare l'ID del div desiderato
gestisciDivNascosti('row_');
