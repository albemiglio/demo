// Struttura dati di una visita. E' anche il formato che dovra' produrre il
// convertitore quando una chiesa ci commissiona il rilievo: cambiano i file
// dei panorami e i testi, non lo schema.
//
//   tappa.link[]  angolo in cui compare la freccia sul pavimento
//   tappa.mappa   posizione in pixel sulla planimetria
//   tappa.opere[] pastiglie cliccabili, con la scheda che si apre di lato

export const TOURS = {

  sanmarco: {
    nome: 'Basilica di San Marco',
    luogo: 'Venezia, Italia',
    epoca: 'Consacrata nel 1094',
    intro: 'Ottomila metri quadrati di mosaici a fondo oro su cinque cupole. Dieci tappe dal nartece al presbiterio.',
    mappa: 'mappe/sanmarco.svg',
    mappaCentro: { x: 400, y: 440 },
    credito: 'Riprese a 360° tratte da materiale divulgativo pubblicato online.',
    tappe: [
      { id: 't00', nome: 'Il nartece', pano: 'pano/sanmarco/00', mappa: { x: 400, y: 762 },
        link: [{ a: 't01', yaw: '-70deg' }],
        opere: [{ id: 'o-genesi', occhiello: 'Mosaici · XIII secolo', titolo: 'Le cupole della Genesi',
          yaw: '-24deg', pitch: '38deg',
          testo: ['Le cupolette del nartece raccontano l\'Antico Testamento: la Creazione, il diluvio, la storia di Giuseppe. Sono fra i mosaici più antichi della basilica.',
                  'Chi entra li attraversa quasi sempre senza alzare lo sguardo. Da qui, invece, si possono guardare con calma.'],
          dettagli: 'Mosaico a fondo oro · Maestranze veneziane' }] },

      { id: 't01', nome: 'Verso la porta maggiore', pano: 'pano/sanmarco/01', mappa: { x: 232, y: 640 },
        link: [{ a: 't00', yaw: '150deg' }, { a: 't02', yaw: '20deg' }] },

      { id: 't02', nome: 'L\'ingresso in basilica', pano: 'pano/sanmarco/02', mappa: { x: 400, y: 606 },
        link: [{ a: 't01', yaw: '170deg' }, { a: 't03', yaw: '-8deg' }],
        opere: [{ id: 'o-oro', occhiello: 'Le volte', titolo: 'Il fondo oro',
          yaw: '-10deg', pitch: '44deg',
          testo: ['Le tessere sono posate con una leggerissima inclinazione irregolare: è per questo che l\'oro non resta fermo, ma sembra muoversi mentre ci si sposta.',
                  'È un effetto pensato per chi cammina. In fotografia si perde quasi sempre; girandosi lentamente, qualcosa torna.'],
          dettagli: 'Oltre 8.000 m² di superficie musiva' }] },

      { id: 't03', nome: 'La navata centrale', pano: 'pano/sanmarco/03', mappa: { x: 400, y: 500 },
        link: [{ a: 't02', yaw: '172deg' }, { a: 't04', yaw: '-6deg' }],
        opere: [{ id: 'o-pavimento', occhiello: 'Pavimento · XII secolo', titolo: 'L\'opus sectile',
          yaw: '30deg', pitch: '-42deg',
          testo: ['Marmi, porfidi e vetri tagliati e composti in tarsie geometriche e figure di animali. Il piano non è affatto orizzontale: secoli di assestamenti sull\'acqua lo hanno reso ondulato.',
                  'Camminandoci sopra lo si sente sotto i piedi. Qui lo si vede.'],
          dettagli: 'Opus sectile e opus tessellatum' }] },

      { id: 't04', nome: 'Sotto la cupola centrale', pano: 'pano/sanmarco/04', mappa: { x: 400, y: 414 },
        link: [{ a: 't03', yaw: '174deg' }, { a: 't05', yaw: '82deg' }, { a: 't06', yaw: '-8deg' }] },

      { id: 't05', nome: 'Il transetto meridionale', pano: 'pano/sanmarco/05', mappa: { x: 596, y: 414 },
        link: [{ a: 't04', yaw: '-96deg' }, { a: 't06', yaw: '-30deg' }] },

      { id: 't06', nome: 'Verso il presbiterio', pano: 'pano/sanmarco/06', mappa: { x: 400, y: 310 },
        link: [{ a: 't04', yaw: '168deg' }, { a: 't07', yaw: '-10deg' }],
        opere: [{ id: 'o-iconostasi', occhiello: 'Scultura · 1394', titolo: 'L\'iconostasi',
          yaw: '-14deg', pitch: '6deg',
          testo: ['La transenna di marmo che separa il presbiterio dalla navata porta in cima la croce e le statue della Vergine, di san Marco e degli apostoli, opera di Jacobello e Pier Paolo Dalle Masegne.',
                  'Divide due spazi che nella liturgia bizantina hanno funzioni diverse: di là si celebra, di qua si assiste.'],
          dettagli: 'Jacobello e Pier Paolo Dalle Masegne' }] },

      { id: 't07', nome: 'Il presbiterio', pano: 'pano/sanmarco/07', mappa: { x: 400, y: 232 },
        link: [{ a: 't06', yaw: '170deg' }, { a: 't08', yaw: '-104deg' }],
        opere: [{ id: 'o-pala', occhiello: 'Oreficeria · XII–XIV secolo', titolo: 'La Pala d\'Oro',
          yaw: '-4deg', pitch: '-4deg',
          testo: ['Dietro l\'altare maggiore, la Pala d\'Oro: smalti bizantini montati su oro, con quasi duemila fra perle, smeraldi, zaffiri e granati. Fu composta in più fasi nell\'arco di due secoli.',
                  'Nella visita ordinaria la si osserva da dietro una fila, con il tempo contato.'],
          dettagli: 'Smalti cloisonné · 1342, su nuclei più antichi' }] },

      { id: 't08', nome: 'Il transetto settentrionale', pano: 'pano/sanmarco/08', mappa: { x: 204, y: 414 },
        link: [{ a: 't07', yaw: '76deg' }, { a: 't09', yaw: '-24deg' }] },

      { id: 't09', nome: 'Il commiato', pano: 'pano/sanmarco/09', mappa: { x: 400, y: 686 },
        link: [{ a: 't08', yaw: '150deg' }, { a: 't00', yaw: '-4deg' }] },
    ],
  },

  sepolcro: {
    nome: 'Basilica del Santo Sepolcro',
    luogo: 'Gerusalemme',
    epoca: 'Dal IV secolo',
    intro: 'Sei confessioni cristiane sotto lo stesso tetto, un cortile, una rotonda e una scala scavata nella roccia.',
    mappa: 'mappe/sepolcro.svg',
    mappaCentro: { x: 450, y: 400 },
    credito: 'Riprese a 360° tratte da materiale divulgativo pubblicato online.',
    tappe: [
      { id: 't00', nome: 'Il cortile', pano: 'pano/sepolcro/00', mappa: { x: 399, y: 664 },
        link: [{ a: 't01', yaw: '0deg' }],
        opere: [{ id: 'o-scala', occhiello: 'Sulla facciata', titolo: 'La scala immobile',
          yaw: '10deg', pitch: '16deg',
          testo: ['Sul cornicione sopra l\'ingresso è appoggiata una scala di legno. È lì dal Settecento e nessuno la sposta: lo status quo che regola i rapporti fra le sei confessioni proprietarie impedisce a chiunque di modificare da solo ciò che è comune.',
                  'È l\'oggetto più fotografato della facciata, e racconta la basilica meglio di qualsiasi didascalia.'],
          dettagli: 'Documentata da incisioni del 1728' }] },

      { id: 't01', nome: 'La Pietra dell\'Unzione', pano: 'pano/sepolcro/01', mappa: { x: 437, y: 556 },
        link: [{ a: 't00', yaw: '178deg' }, { a: 't02', yaw: '96deg' }, { a: 't05', yaw: '-56deg' }],
        opere: [{ id: 'o-pietra', occhiello: 'Presso l\'ingresso', titolo: 'La lastra di calcare rosso',
          yaw: '84deg', pitch: '-28deg',
          testo: ['Appena varcata la soglia, una lastra di calcare rosato posata a terra. I pellegrini vi si inginocchiano, la baciano, vi appoggiano oggetti portati da casa.',
                  'La lastra attuale risale al 1810: quelle precedenti furono consumate e portate via pezzo per pezzo.'],
          dettagli: 'Calcare rosso · sostituita nel 1810' }] },

      { id: 't02', nome: 'La cappella del Calvario', pano: 'pano/sepolcro/02', mappa: { x: 570, y: 556 },
        link: [{ a: 't01', yaw: '-92deg' }, { a: 't03', yaw: '30deg' }],
        opere: [{ id: 'o-calvario', occhiello: 'Piano superiore', titolo: 'L\'altare greco-ortodosso',
          yaw: '2deg', pitch: '2deg',
          testo: ['Si sale per una scala ripidissima, ricavata nello spessore del muro. Sopra, due cappelle affiancate: quella latina e quella greco-ortodossa, riccamente rivestita di icone e lampade d\'argento.',
                  'La scala è il punto in cui il pellegrinaggio diventa fisicamente difficile. Per molti visitatori è semplicemente inaccessibile.'],
          dettagli: 'Rivestimenti e lampade votive' }] },

      { id: 't03', nome: 'Il katholikon', pano: 'pano/sepolcro/03', mappa: { x: 580, y: 352 },
        link: [{ a: 't02', yaw: '-160deg' }, { a: 't04', yaw: '-40deg' }] },

      { id: 't04', nome: 'Il deambulatorio', pano: 'pano/sepolcro/04', mappa: { x: 452, y: 268 },
        link: [{ a: 't03', yaw: '140deg' }, { a: 't05', yaw: '-24deg' }] },

      { id: 't05', nome: 'La Rotonda dell\'Anastasis', pano: 'pano/sepolcro/05', mappa: { x: 242, y: 466 },
        link: [{ a: 't04', yaw: '150deg' }, { a: 't01', yaw: '100deg' }, { a: 't06', yaw: '-40deg' }],
        opere: [{ id: 'o-edicola', occhiello: 'Al centro della rotonda', titolo: 'L\'Edicola',
          yaw: '-6deg', pitch: '-2deg',
          testo: ['Il piccolo edificio al centro custodisce la tomba. La struttura attuale è del 1810; le travi di ferro che la cingevano dal 1947 sono state rimosse solo dopo il restauro del 2016-2017.',
                  'Attorno, il colonnato della rotonda sale verso la cupola aperta sul cielo.'],
          dettagli: 'Restauro 2016–2017 · Politecnico di Atene' }] },

      { id: 't06', nome: 'La discesa', pano: 'pano/sepolcro/06', mappa: { x: 786, y: 540 },
        link: [{ a: 't05', yaw: '160deg' }, { a: 't07', yaw: '-4deg' }] },

      { id: 't07', nome: 'La cappella inferiore', pano: 'pano/sepolcro/07', mappa: { x: 828, y: 586 },
        link: [{ a: 't06', yaw: '176deg' }, { a: 't08', yaw: '-84deg' }] },

      { id: 't08', nome: 'Le volte scavate', pano: 'pano/sepolcro/08', mappa: { x: 800, y: 630 },
        link: [{ a: 't07', yaw: '92deg' }, { a: 't09', yaw: '-30deg' }],
        opere: [{ id: 'o-cisterna', occhiello: 'Sotto la basilica', titolo: 'La roccia e la cava',
          yaw: '-16deg', pitch: '10deg',
          testo: ['Sotto il livello della basilica il costruito lascia il posto alla pietra tagliata. Era una cava, poi un\'area di sepoltura fuori dalle mura della città antica.',
                  'È la parte che quasi nessun visitatore raggiunge, e quella che spiega perché la basilica sorge esattamente qui.'],
          dettagli: 'Cava di calcare · età erodiana' }] },

      { id: 't09', nome: 'La cripta di sant\'Elena', pano: 'pano/sepolcro/09', mappa: { x: 760, y: 600 },
        link: [{ a: 't08', yaw: '146deg' }, { a: 't00', yaw: '-10deg' }] },
    ],
  },

  bruxelles: {
    nome: 'Ss. Michele e Gudula',
    luogo: 'Bruxelles, Belgio',
    epoca: 'XIII–XV secolo',
    intro: 'Gotico brabantino: pietra chiara, vetrate cinquecentesche e un pulpito barocco che occupa mezza navata.',
    mappa: 'mappe/bruxelles.svg',
    mappaCentro: { x: 350, y: 560 },
    credito: 'Riprese a 360° tratte da materiale divulgativo pubblicato online.',
    tappe: [
      { id: 't00', nome: 'Il sagrato', pano: 'pano/bruxelles/00', mappa: { x: 350, y: 962 },
        link: [{ a: 't01', yaw: '96deg' }, { a: 't02', yaw: '0deg' }],
        opere: [{ id: 'o-facciata', occhiello: 'Facciata occidentale', titolo: 'Le due torri',
          yaw: '0deg', pitch: '26deg',
          testo: ['Il fronte a due torri gemelle fu completato nel Quattrocento su progetto di Jan van Ruysbroeck, lo stesso architetto della torre del municipio.',
                  'La scalinata che porta al portale è stata aggiunta molto più tardi, quando il livello della strada fu abbassato.'],
          dettagli: 'Jan van Ruysbroeck · XV secolo' }] },

      { id: 't01', nome: 'Il fianco settentrionale', pano: 'pano/bruxelles/01', mappa: { x: 628, y: 872 },
        link: [{ a: 't00', yaw: '-84deg' }, { a: 't02', yaw: '-20deg' }] },

      { id: 't02', nome: 'In fondo alla navata', pano: 'pano/bruxelles/02', mappa: { x: 350, y: 776 },
        link: [{ a: 't00', yaw: '180deg' }, { a: 't03', yaw: '0deg' }] },

      { id: 't03', nome: 'Il pulpito', pano: 'pano/bruxelles/03', mappa: { x: 350, y: 646 },
        link: [{ a: 't02', yaw: '180deg' }, { a: 't04', yaw: '0deg' }],
        opere: [{ id: 'o-pulpito', occhiello: 'Scultura lignea · 1699', titolo: 'Adamo ed Eva cacciati dall\'Eden',
          yaw: '0deg', pitch: '4deg',
          testo: ['Il pulpito di Hendrik Frans Verbruggen è un albero intagliato a grandezza naturale: fra i rami, Adamo ed Eva vengono scacciati dal giardino, mentre in alto la Vergine schiaccia il serpente.',
                  'Arrivò qui nel 1776 dalla chiesa dei gesuiti di Lovanio. È intagliato per essere guardato girandoci intorno, cosa che quasi nessuno fa.'],
          dettagli: 'Hendrik Frans Verbruggen · quercia' }] },

      { id: 't04', nome: 'La navata centrale', pano: 'pano/bruxelles/04', mappa: { x: 350, y: 548 },
        link: [{ a: 't03', yaw: '180deg' }, { a: 't05', yaw: '0deg' }],
        opere: [{ id: 'o-colonne', occhiello: 'Architettura', titolo: 'I pilastri e gli apostoli',
          yaw: '-40deg', pitch: '10deg',
          testo: ['Contro i pilastri della navata sono addossate le statue dei dodici apostoli, seicentesche, su mensole.',
                  'La pietra chiara e le finestre alte fanno sì che qui dentro, anche d\'inverno, non serva quasi luce artificiale.'],
          dettagli: 'Statue del XVII secolo' }] },

      { id: 't05', nome: 'La crociera', pano: 'pano/bruxelles/05', mappa: { x: 350, y: 424 },
        link: [{ a: 't04', yaw: '180deg' }, { a: 't06', yaw: '0deg' }, { a: 't07', yaw: '92deg' }] },

      { id: 't06', nome: 'Il coro', pano: 'pano/bruxelles/06', mappa: { x: 350, y: 252 },
        link: [{ a: 't05', yaw: '176deg' }, { a: 't07', yaw: '120deg' }],
        opere: [{ id: 'o-vetrate', occhiello: 'Vetrate · XVI secolo', titolo: 'Le finestre del transetto',
          yaw: '62deg', pitch: '26deg',
          testo: ['Le grandi vetrate del transetto furono disegnate nella cerchia di Bernard van Orley e raffigurano i sovrani committenti inginocchiati sotto archi trionfali.',
                  'Sono l\'unico punto della cattedrale in cui il colore prende il sopravvento sulla pietra.'],
          dettagli: 'Cerchia di Bernard van Orley' }] },

      { id: 't07', nome: 'La cappella del Sacramento', pano: 'pano/bruxelles/07', mappa: { x: 546, y: 512 },
        link: [{ a: 't06', yaw: '-64deg' }, { a: 't05', yaw: '-120deg' }, { a: 't08', yaw: '150deg' }] },

      { id: 't08', nome: 'La navata laterale', pano: 'pano/bruxelles/08', mappa: { x: 546, y: 700 },
        link: [{ a: 't07', yaw: '0deg' }, { a: 't09', yaw: '170deg' }] },

      { id: 't09', nome: 'La controfacciata', pano: 'pano/bruxelles/09', mappa: { x: 350, y: 834 },
        link: [{ a: 't08', yaw: '40deg' }, { a: 't02', yaw: '180deg' }],
        opere: [{ id: 'o-organo', occhiello: 'Organo · 2000', titolo: 'Il nido di rondine',
          yaw: '0deg', pitch: '30deg',
          testo: ['L\'organo Grenzing non sta in controfacciata come di consueto, ma è sospeso al fianco della navata su una mensola: è la disposizione detta a nido di rondine, scelta per non coprire le vetrate.',
                  'Ha 4.300 canne e fu inaugurato nel 2000.'],
          dettagli: 'Gerhard Grenzing · 4.300 canne' }] },
    ],
  },
};
