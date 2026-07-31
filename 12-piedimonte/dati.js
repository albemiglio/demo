/* Menù Piedimonte 1.0 — Rodia (ME).
   Fonte: menù del locale (34 pagine fotografate) + scheda TheFork aggiornata al
   31/10/2025. Gli allergeni sono quelli DICHIARATI sul menù: dove il locale non
   li riporta il campo resta vuoto e la scheda rimanda al banco. */

const ALLERGENI = {
  glutine:            { n: 1,  it: 'Glutine',                     en: 'Cereals containing gluten', voce: 'Cereali: grano, segale, orzo, avena, farro, kamut, inclusi ibridati derivati.' },
  crostacei:          { n: 2,  it: 'Crostacei',                   en: 'Crustaceans',               voce: 'Marini e d’acqua dolce: gamberi, scampi, aragoste, granchi e simili.' },
  uova:               { n: 3,  it: 'Uova e derivati',             en: 'Eggs',                      voce: 'Uova e prodotti che le contengono come: maionese, emulsionanti, pasta all’uovo.' },
  pesce:              { n: 4,  it: 'Pesce',                       en: 'Fish',                      voce: 'Prodotti alimentari in cui è presente il pesce, anche se in piccole percentuali.' },
  arachidi:           { n: 5,  it: 'Arachidi e derivati',         en: 'Peanuts',                   voce: 'Snack confezionati, creme e condimenti in cui vi sia anche in piccole dosi.' },
  soia:               { n: 6,  it: 'Soia',                        en: 'Soybeans',                  voce: 'Prodotti derivati come: latte di soia, tofu, spaghetti di soia e simili.' },
  latte:              { n: 7,  it: 'Latte e derivati',            en: 'Milk',                      voce: 'Ogni prodotto in cui viene usato il latte: yogurt, biscotti, torte, gelato e creme varie.' },
  'frutta-a-guscio':  { n: 8,  it: 'Frutta a guscio',             en: 'Tree nuts',                 voce: 'Mandorle, nocciole, noci comuni, noci di acagiù, noci pecan, anacardi e pistacchi.' },
  sedano:             { n: 9,  it: 'Sedano',                      en: 'Celery',                    voce: 'Sia in pezzi che all’interno di preparati per zuppe, salse e concentrati vegetali.' },
  senape:             { n: 10, it: 'Senape',                      en: 'Mustard',                   voce: 'Si può trovare nelle salse e nei condimenti, specie nella mostarda.' },
  sesamo:             { n: 11, it: 'Sesamo',                      en: 'Sesame',                    voce: 'Semi interi usati per il pane, farine anche se lo contengono in minima percentuale.' },
  solfiti:            { n: 12, it: 'Anidride solforosa e solfiti', en: 'Sulphur dioxide and sulphites', voce: 'Cibi sott’aceto, sott’olio e in salamoia, marmellate, funghi secchi, conserve ecc.' },
  lupini:             { n: 13, it: 'Lupini',                      en: 'Lupin',                     voce: 'Presenti in cibi vegan sottoforma di: arrosti, salamini, farine e simili.' },
  molluschi:          { n: 14, it: 'Molluschi',                   en: 'Molluscs',                  voce: 'Crostacei, cannolicchio, capasanta, cozza, ostrica, patella, vongola, tellina ecc.' },
};

/* scorciatoia: sul menù del locale gli allergeni sono numeri, qui restano tali */
const A = (...n) => n.map((x) => Object.keys(ALLERGENI).find((k) => ALLERGENI[k].n === x));

const PANATURA_CROCCHE = 'Panatura: uova, latte, pane grattugiato';
const PANATURA_FRITTATINA = 'Panatura: acqua, sale, farina 00, mollica';

const DATI = {
  locale: {
    nome: 'Piedimonte',
    versione: '1.0',
    payoff: 'Pizza d’autore',
    firma: 'Enzo Piedimonte',
    citazione: '«Ogni pizza è un passo verso il futuro»',
    racconto:
      'Non faccio la pizza solo per nutrire, ma per raccontare una storia, la mia storia, ' +
      'quella di un napoletano che a 24 anni ha trovato nella Sicilia una nuova radice, ' +
      'ma che non ha mai dimenticato da dove viene. A Rodia ho creato la mia pizzeria, il ' +
      'risultato di una vita intera, fatta di sacrifici, passione e determinazione. Qui vivrai ' +
      'un incontro tra Napoli e Sicilia, tra il mare e la musica, tra la tradizione e l’innovazione.',
    indirizzo: 'Via Lungomare 15F, Rodia — 98161 Messina',
    telefono: '090 214 8316',
    whatsapp: '+39 090 214 8316',
    instagram: 'piedimonte_1.0',
    mappa: 'https://maps.google.com/?cid=11296821929271625700',
    orari: 'mar 19:30-00:00\nmer 19:30-00:00\ngio 19:30-00:00\nven 19:30-00:00\nsab 19:30-01:00\ndom 19:30-00:00',
    riconoscimenti: [
      'Due Spicchi — Guida Pizzerie Gambero Rosso',
      '50 Top Pizza',
      'Casa Sanremo — responsabile Arena del Gusto dal 2022',
    ],
    note: [
      'Aggiunta ingredienti € 2,00 · pizza verace € 2,00.',
      'Tutte le pizze si possono fare veraci e si possono fare gluten free con l’aggiunta di € 2,00.',
      'Coperto € 2,00.',
      'In caso di allergie o intolleranze rivolgetevi al personale di sala prima di ordinare: alcune preparazioni possono subire contaminazioni.',
    ],
  },

  categorie: [
    /* ---------------------------------------------------------------- fritti */
    {
      id: 'antipasti',
      nome: 'Antipasti',
      script: true,
      voci: [
        {
          id: 'patate-dippers',
          nome: 'Patate dippers',
          nome_en: 'Potato dippers',
          descrizione: 'Pistacchio e stracciatella',
          descrizione_en: 'Pistachio and stracciatella',
          allergeni: A(1, 7),
          prezzo: 7,
        },
        {
          id: 'misto-fritto',
          nome: 'Misto fritto',
          nome_en: 'Mixed fried platter',
          descrizione: 'Patatine fritte, wrustel, crocchette',
          descrizione_en: 'French fries, frankfurters, croquettes',
          nota: 'Porzione per due',
          allergeni: A(1),
          prezzo: 8,
        },
        {
          id: 'chips-di-patate',
          nome: 'Chips di patate',
          nome_en: 'Potato chips',
          descrizione: 'Cacio e pepe',
          descrizione_en: 'Pecorino cheese and black pepper',
          allergeni: A(1, 7),
          prezzo: 7,
        },
      ],
    },
    {
      id: 'burrate-fritte',
      nome: 'Burrate fritte',
      occhiello: 'Burrate fritte',
      voci: [
        {
          id: 'burrata-pistacchio',
          nome: 'Pistacchio',
          nome_en: 'Pistachio',
          descrizione: 'Burrata in pastella di acqua, farina, sale, pangrattato e pistacchio',
          descrizione_en: 'Burrata in a water, flour and salt batter, breadcrumbs and pistachio',
          allergeni: A(1, 7, 8),
          prezzo: 8,
        },
        {
          id: 'burrata-nduja',
          nome: 'Nduja',
          nome_en: 'Nduja',
          descrizione: 'Burrata in pastella di acqua, farina, sale, pangrattato e salsa di nduja',
          descrizione_en: 'Burrata in a water, flour and salt batter, breadcrumbs and nduja sauce',
          allergeni: A(1, 7),
          prezzo: 8,
        },
      ],
    },
    {
      id: 'montanare',
      nome: 'Montanare',
      occhiello: 'Montanare',
      voci: [
        {
          id: 'montanara-mortadella',
          nome: 'Mortadella e pistacchio',
          nome_en: 'Mortadella and pistachio',
          descrizione: 'Mortadella, pistacchio, stracciatella di bufala, granella di pistacchio',
          descrizione_en: 'Mortadella, pistachio, buffalo stracciatella, chopped pistachio',
          allergeni: A(1, 7, 8),
          prezzo: 12,
        },
        {
          id: 'montanara-norma',
          nome: 'Norma 2.0',
          nome_en: 'Norma 2.0',
          descrizione: 'Crema di melanzane, chips di melanzane, basilico fritto',
          descrizione_en: 'Aubergine cream, aubergine chips, fried basil',
          allergeni: A(1),
          prezzo: 12,
        },
        {
          id: 'montanara-verace',
          nome: 'Verace',
          nome_en: 'Verace',
          descrizione: 'Pomodoro San Marzano, mozzarella di bufala DOP, scaglie di grana, basilico',
          descrizione_en: 'San Marzano tomato, PDO buffalo mozzarella, grana flakes, basil',
          allergeni: A(1, 7),
          prezzo: 8,
        },
      ],
    },
    {
      id: 'crocche',
      nome: 'Crocchè',
      occhiello: 'Crocchè',
      voci: [
        {
          id: 'crocche-patate',
          nome: 'Crocchè di patate',
          nome_en: 'Potato croquette',
          descrizione: 'Patate, uova, burro, prezzemolo, sale, pepe, parmigiano, prosciutto cotto, mozzarella',
          descrizione_en: 'Potato, egg, butter, parsley, salt, pepper, parmesan, cooked ham, mozzarella',
          nota: PANATURA_CROCCHE,
          allergeni: A(1, 7),
          prezzo: 3.5,
        },
        {
          id: 'crocche-chef-mortadella',
          nome: 'Crocchè dello chef · mortadella e pistacchio',
          nome_en: 'Chef’s croquette · mortadella and pistachio',
          descrizione: 'Mortadella e pistacchio, patate, uova, burro, prezzemolo, sale, pepe, parmigiano',
          descrizione_en: 'Mortadella and pistachio, potato, egg, butter, parsley, salt, pepper, parmesan',
          nota: PANATURA_CROCCHE,
          allergeni: A(1, 7, 8),
          prezzo: 4,
        },
        {
          id: 'crocche-chef-salsiccia',
          nome: 'Crocchè dello chef · salsiccia e friarielli',
          nome_en: 'Chef’s croquette · sausage and friarielli',
          descrizione: 'Salsiccia e friarielli, patate, uova, burro, prezzemolo, sale, pepe, parmigiano',
          descrizione_en: 'Sausage and friarielli, potato, egg, butter, parsley, salt, pepper, parmesan',
          nota: PANATURA_CROCCHE,
          allergeni: A(1, 7),
          prezzo: 4,
        },
        {
          id: 'crocche-chef-nduja',
          nome: 'Crocchè dello chef · nduja',
          nome_en: 'Chef’s croquette · nduja',
          descrizione: 'Nduja, patate, uova, burro, prezzemolo, sale, pepe, parmigiano',
          descrizione_en: 'Nduja, potato, egg, butter, parsley, salt, pepper, parmesan',
          nota: PANATURA_CROCCHE,
          allergeni: A(1, 7),
          prezzo: 4,
        },
      ],
    },
    {
      id: 'fantasia',
      nome: 'Fantasia',
      occhiello: 'Fantasia',
      voci: [
        {
          id: 'frittatina-salsiccia',
          nome: 'Frittatina salsiccia e friarielli',
          nome_en: 'Sausage and friarielli frittatina',
          descrizione: 'Salsiccia, friarielli, latte, burro, parmigiano, pasta, mozzarella, farina 00, sale',
          descrizione_en: 'Sausage, friarielli, milk, butter, parmesan, pasta, mozzarella, flour, salt',
          nota: PANATURA_FRITTATINA,
          allergeni: [],
          prezzo: 4,
        },
        {
          id: 'frittatina-classica',
          nome: 'Frittatina classica',
          nome_en: 'Classic frittatina',
          descrizione:
            'Pasta, macinato, cipolla, piselli, olio, latte, burro, farina 00, noce moscata, sale, parmigiano, mozzarella, prosciutto cotto, pepe',
          descrizione_en:
            'Pasta, minced meat, onion, peas, oil, milk, butter, flour, nutmeg, salt, parmesan, mozzarella, cooked ham, pepper',
          nota: PANATURA_FRITTATINA,
          allergeni: [],
          prezzo: 4,
        },
        {
          id: 'frittatina-mortadella',
          nome: 'Frittatina mortadella e pistacchio',
          nome_en: 'Mortadella and pistachio frittatina',
          descrizione: 'Mortadella, pistacchio, pasta, burro, latte, parmigiano, mozzarella, farina 00, sale, olio',
          descrizione_en: 'Mortadella, pistachio, pasta, butter, milk, parmesan, mozzarella, flour, salt, oil',
          nota: PANATURA_FRITTATINA,
          allergeni: [],
          prezzo: 4,
        },
        {
          id: 'suppli',
          nome: 'Supplì',
          nome_en: 'Supplì',
          descrizione:
            'Riso, carne macinata, mozzarella, cipolla, piselli, salsa di pomodoro, burro, sale, pepe, prosciutto cotto, parmigiano, olio evo',
          descrizione_en:
            'Rice, minced meat, mozzarella, onion, peas, tomato sauce, butter, salt, pepper, cooked ham, parmesan, olive oil',
          nota: PANATURA_FRITTATINA + ' · porzione da 2 pezzi',
          allergeni: A(1, 7),
          prezzo: 5,
        },
      ],
    },
    {
      id: 'pizze-fritte',
      nome: 'Pizze fritte',
      script: true,
      voci: [
        {
          id: 'fritta-margherita',
          nome: 'Margherita',
          nome_en: 'Margherita',
          descrizione: 'Pomodoro San Marzano, fiordilatte, basilico',
          descrizione_en: 'San Marzano tomato, fiordilatte, basil',
          allergeni: A(1, 7),
          prezzo: 9,
        },
        {
          id: 'fritta-mortadella',
          nome: 'Mortadella e pistacchio',
          nome_en: 'Mortadella and pistachio',
          descrizione: 'Fiordilatte, mortadella, pesto di pistacchio, stracciatella, granella di pistacchio',
          descrizione_en: 'Fiordilatte, mortadella, pistachio pesto, stracciatella, chopped pistachio',
          allergeni: A(1, 7, 8),
          prezzo: 11,
        },
        {
          id: 'fritta-street-food',
          nome: 'Street food',
          nome_en: 'Street food',
          descrizione: 'Pomodoro San Marzano DOP, fiordilatte, ricotta fresca, prosciutto cotto, pepe, basilico',
          descrizione_en: 'PDO San Marzano tomato, fiordilatte, fresh ricotta, cooked ham, pepper, basil',
          allergeni: A(1, 7),
          prezzo: 10,
        },
      ],
    },
    {
      id: 'calzoni',
      nome: 'Calzoni',
      script: true,
      voci: [
        {
          id: 'calzone-napoletano',
          nome: 'Napoletano',
          nome_en: 'Napoletano',
          descrizione:
            'Fiordilatte, pomodoro San Marzano, ricotta fresca, provola affumicata, salame Napoli, pepe nero, basilico, olio evo',
          descrizione_en:
            'Fiordilatte, San Marzano tomato, fresh ricotta, smoked provola, Napoli salami, black pepper, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 10,
        },
        {
          id: 'calzone-salsiccia',
          nome: 'Salsiccia e friarielli',
          nome_en: 'Sausage and friarielli',
          descrizione: 'Fiordilatte, friarielli, salsiccia, provola affumicata, basilico, olio evo',
          descrizione_en: 'Fiordilatte, friarielli, sausage, smoked provola, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 10,
        },
        {
          id: 'calzone-messinese',
          nome: 'Messinese',
          nome_en: 'Messinese',
          descrizione: 'Fiordilatte, scarola fresca, acciughe, datterino fresco, basilico, olio',
          descrizione_en: 'Fiordilatte, fresh escarole, anchovies, datterino tomato, basil, oil',
          allergeni: A(1, 7),
          prezzo: 10,
        },
      ],
    },

    /* ----------------------------------------------------------------- pizze */
    {
      id: 'napoletane',
      nome: 'Pizze',
      occhiello: 'Le napoletane',
      script: true,
      voci: [
        {
          id: 'dop',
          nome: 'DOP',
          nome_en: 'DOP',
          descrizione:
            'Pomodoro San Marzano DOP, mozzarella di bufala DOP, bocconcino di bufala in uscita, scaglie di grana, basilico, olio evo',
          descrizione_en:
            'PDO San Marzano tomato, PDO buffalo mozzarella, buffalo bocconcino added after baking, grana flakes, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 10,
        },
        {
          id: 'marinara',
          nome: 'Marinara',
          nome_en: 'Marinara',
          descrizione: 'Pomodoro San Marzano DOP, origano, aglio, basilico, olio evo',
          descrizione_en: 'PDO San Marzano tomato, oregano, garlic, basil, olive oil',
          allergeni: A(1),
          prezzo: 6,
        },
        {
          id: 'cosacca',
          nome: 'Cosacca',
          nome_en: 'Cosacca',
          descrizione: 'Pomodoro San Marzano DOP, pecorino romano, pepe, basilico, origano, olio evo',
          descrizione_en: 'PDO San Marzano tomato, pecorino romano, pepper, basil, oregano, olive oil',
          allergeni: A(1, 7),
          prezzo: 9,
        },
        {
          id: 'nap-salsiccia',
          nome: 'Salsiccia e friarielli',
          nome_en: 'Sausage and friarielli',
          descrizione: 'Friarielli, salsiccia, provola affumicata, pepe nero, basilico, olio evo',
          descrizione_en: 'Friarielli, sausage, smoked provola, black pepper, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 12,
        },
        {
          id: 'provola-e-pepe',
          nome: 'Provola e pepe',
          nome_en: 'Provola and pepper',
          descrizione: 'Pomodoro San Marzano, provola affumicata, pepe nero, basilico, olio evo',
          descrizione_en: 'San Marzano tomato, smoked provola, black pepper, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 12,
        },
      ],
    },
    {
      id: 'contemporanee',
      nome: 'Pizze',
      occhiello: 'Le contemporanee',
      script: true,
      voci: [
        {
          id: 'margherita',
          nome: 'Margherita',
          nome_en: 'Margherita',
          descrizione: 'Pomodoro San Marzano DOP, fiordilatte, basilico, olio evo',
          descrizione_en: 'PDO San Marzano tomato, fiordilatte, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 8,
        },
        {
          id: 'margherita-gialla',
          nome: 'Margherita gialla',
          nome_en: 'Yellow margherita',
          descrizione: 'Fiordilatte, salsa di pomodoro giallo, basilico, olio evo',
          descrizione_en: 'Fiordilatte, yellow tomato sauce, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 8,
        },
        {
          id: 'norma',
          nome: 'Norma',
          nome_en: 'Norma',
          descrizione: 'Pomodoro San Marzano DOP, fiordilatte, melanzane fritte, ricotta infornata, basilico, olio evo',
          descrizione_en: 'PDO San Marzano tomato, fiordilatte, fried aubergine, baked ricotta, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 11,
        },
        {
          id: 'capricciosa',
          nome: 'Capricciosa',
          nome_en: 'Capricciosa',
          descrizione:
            'Pomodoro San Marzano DOP, fiordilatte, prosciutto cotto, funghi trifolati, carciofi grigliati, olive, basilico, olio evo',
          descrizione_en:
            'PDO San Marzano tomato, fiordilatte, cooked ham, sautéed mushrooms, grilled artichokes, olives, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 10,
        },
        {
          id: 'messinese',
          nome: 'Messinese',
          nome_en: 'Messinese',
          descrizione: 'Fiordilatte, vellutata di scarola, datterino rosso, acciughe, pepe nero, basilico, olio evo',
          descrizione_en: 'Fiordilatte, escarole velouté, red datterino tomato, anchovies, black pepper, basil, olive oil',
          allergeni: A(1, 4, 7),
          prezzo: 12,
        },
        {
          id: 'primavera',
          nome: 'Primavera',
          nome_en: 'Primavera',
          descrizione:
            'Crema di parmigiano, pomodoro datterino rosso semi dry, prosciutto crudo, stracciatella, pesto di rucola, basilico, olio evo',
          descrizione_en:
            'Parmesan cream, semi-dried red datterino tomato, cured ham, stracciatella, rocket pesto, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 14,
        },
        {
          id: 'mortadella-pistacchio',
          nome: 'Mortadella e pistacchio',
          nome_en: 'Mortadella and pistachio',
          descrizione:
            'Fiordilatte, datterino rosso semi dry, mortadella, stracciatella, pesto di pistacchio, granella di pistacchio, olio evo',
          descrizione_en:
            'Fiordilatte, semi-dried red datterino tomato, mortadella, stracciatella, pistachio pesto, chopped pistachio, olive oil',
          allergeni: A(1, 7, 8),
          prezzo: 14,
        },
        {
          id: 'pistacchiosa',
          nome: 'Pistacchiosa',
          nome_en: 'Pistacchiosa',
          descrizione:
            'Fiordilatte, pesto di pistacchio, ricotta fresca, pomodoro datterino giallo semi dry, speck, burrata, granella di pistacchio, basilico, olio evo',
          descrizione_en:
            'Fiordilatte, pistachio pesto, fresh ricotta, semi-dried yellow datterino tomato, speck, burrata, chopped pistachio, basil, olive oil',
          allergeni: A(1, 7, 8),
          prezzo: 14,
        },
        {
          id: 'tonnara-chic',
          nome: 'Tonnara chic',
          nome_en: 'Tonnara chic',
          descrizione:
            'Fiordilatte, salsa di pomodoro giallo, filetti di tonno, cipolla caramellata, maionese all’erba cipollina, basilico, olio evo',
          descrizione_en:
            'Fiordilatte, yellow tomato sauce, tuna fillets, caramelised onion, chive mayonnaise, basil, olive oil',
          allergeni: A(1, 4, 7),
          prezzo: 14,
        },
        {
          id: 'norma-scomposta',
          nome: 'Norma scomposta',
          nome_en: 'Deconstructed norma',
          descrizione:
            'Fiordilatte, crema di melanzane, chips di melanzane, crema di parmigiano, pomodori semi dry, basilico fritto, olio evo',
          descrizione_en:
            'Fiordilatte, aubergine cream, aubergine chips, parmesan cream, semi-dried tomatoes, fried basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 13,
        },
        {
          id: 'piedimonte-10',
          nome: 'Piedimonte 1.0',
          nome_en: 'Piedimonte 1.0',
          descrizione:
            'Datterino rosso semi dry, fiordilatte, patè di capperi, polvere di olive nere, acciughe, basilico, olio evo',
          descrizione_en:
            'Semi-dried red datterino tomato, fiordilatte, caper pâté, black olive powder, anchovies, basil, olive oil',
          allergeni: A(1, 4, 7),
          prezzo: 13,
          firma: true,
        },
        {
          id: 'nini',
          nome: 'Ninì',
          nome_en: 'Ninì',
          descrizione: 'Fiordilatte, salsiccia, salame piccante, ’nduja, cipolla fresca, basilico, olio evo',
          descrizione_en: 'Fiordilatte, sausage, spicy salami, ’nduja, fresh onion, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 14,
        },
        {
          id: 'bresaola',
          nome: 'Bresaola',
          nome_en: 'Bresaola',
          descrizione:
            'Pomodoro San Marzano, fiordilatte, datterino giallo semi dry, rucola, bresaola, scaglie di grana, basilico, olio evo',
          descrizione_en:
            'San Marzano tomato, fiordilatte, semi-dried yellow datterino tomato, rocket, bresaola, grana flakes, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 13,
        },
        {
          id: 'marinara-rivisitata',
          nome: 'Marinara rivisitata',
          nome_en: 'Marinara revisited',
          descrizione: 'Pomodoro San Marzano, crema di aglio, acciughe, origano, pepe nero, perlage di basilico, olio evo',
          descrizione_en: 'San Marzano tomato, garlic cream, anchovies, oregano, black pepper, basil pearls, olive oil',
          allergeni: A(1, 4, 7),
          prezzo: 10,
        },
        {
          id: 'capricciosa-rivisitata',
          nome: 'Capricciosa rivisitata',
          nome_en: 'Capricciosa revisited',
          descrizione:
            'Pomodoro San Marzano, prosciutto cotto, funghi trifolati, crema di carciofi, polvere di olive, basilico, olio evo',
          descrizione_en:
            'San Marzano tomato, cooked ham, sautéed mushrooms, artichoke cream, olive powder, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 12,
        },
        {
          id: 'crumble',
          nome: 'Crumble',
          nome_en: 'Crumble',
          descrizione:
            'Salsa datterino giallo, datterino rosso semi dry, bufala, speck, stracciatella, crumble di tarallo, basilico, olio evo',
          descrizione_en:
            'Yellow datterino sauce, semi-dried red datterino tomato, buffalo mozzarella, speck, stracciatella, tarallo crumble, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 14,
        },
        {
          id: 'a-romana',
          nome: 'A romana',
          nome_en: 'A romana',
          descrizione: 'Fiordilatte, guanciale, pecorino, basilico, olio evo',
          descrizione_en: 'Fiordilatte, guanciale, pecorino, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 12,
        },
        {
          id: 'e-creatur',
          nome: 'E creatur',
          nome_en: 'E creatur',
          descrizione: 'Fiordilatte, crema di parmigiano, prosciutto cotto, mais, crocchè, basilico, olio evo',
          descrizione_en: 'Fiordilatte, parmesan cream, cooked ham, sweetcorn, potato croquette, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 14,
        },
        {
          id: 'nerano',
          nome: 'Nerano',
          nome_en: 'Nerano',
          descrizione: 'Crema di zucchine, pancetta, fiordilatte, chips di zucchine, scaglie di grana, basilico, olio evo',
          descrizione_en: 'Courgette cream, pancetta, fiordilatte, courgette chips, grana flakes, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 14,
        },
      ],
    },
    {
      id: 'premiate',
      nome: 'Pizze',
      occhiello: 'Le premiate',
      script: true,
      voci: [
        {
          id: 'cinque-formaggi',
          nome: '5 formaggi croccante',
          nome_en: 'Crunchy five cheeses',
          descrizione:
            'Fiordilatte, parmigiano, gorgonzola, provola affumicata, prosciutto crudo, miele, crosta di pecorino, basilico, olio evo',
          descrizione_en:
            'Fiordilatte, parmesan, gorgonzola, smoked provola, cured ham, honey, pecorino crust, basil, olive oil',
          nota: 'Sky TV 2024',
          allergeni: A(1, 7),
          prezzo: 15,
          firma: true,
        },
        {
          id: 'sapuritu',
          nome: 'Sapuritu',
          nome_en: 'Sapuritu',
          descrizione: 'Pesto di pomodoro secco e acciughe, stracciatella, datterino giallo semi dry, basilico, olio evo',
          descrizione_en: 'Sun-dried tomato and anchovy pesto, stracciatella, semi-dried yellow datterino tomato, basil, olive oil',
          nota: 'Sky TV 2024',
          allergeni: A(1, 4, 7),
          prezzo: 15,
          firma: true,
        },
      ],
    },
    {
      id: 'sanremo',
      nome: 'Pizze',
      occhiello: 'Sanremo',
      script: true,
      voci: [
        {
          id: 'amadeus',
          nome: 'Amadeus',
          nome_en: 'Amadeus',
          descrizione: 'Fiordilatte, funghi porcini, chips di patate, speck, olio, basilico',
          descrizione_en: 'Fiordilatte, porcini mushrooms, potato chips, speck, oil, basil',
          allergeni: [],
          prezzo: 12,
        },
        {
          id: 'carlo-conti',
          nome: 'Carlo Conti',
          nome_en: 'Carlo Conti',
          descrizione: 'Crema di friarielli, salsiccia, provola affumicata, pepe nero, basilico, olio evo',
          descrizione_en: 'Friarielli cream, sausage, smoked provola, black pepper, basil, olive oil',
          nota: 'Sanremo 2025',
          allergeni: A(1, 7),
          prezzo: 13,
        },
        {
          id: 'rocco-hunt',
          nome: 'Rocco Hunt',
          nome_en: 'Rocco Hunt',
          descrizione: 'Patate schiacciate, pancetta in cottura, bufala affumicata, origano, pepe nero, olio, basilico',
          descrizione_en: 'Crushed potatoes, pancetta baked in, smoked buffalo mozzarella, oregano, black pepper, oil, basil',
          allergeni: [],
          prezzo: 13,
        },
        {
          id: 'tony-effe',
          nome: 'Tony Effe',
          nome_en: 'Tony Effe',
          descrizione: 'Crema di pomodori secchi, guanciale, bufala, ricotta fresca all’uscita, burrata, olio, basilico',
          descrizione_en: 'Sun-dried tomato cream, guanciale, buffalo mozzarella, fresh ricotta after baking, burrata, oil, basil',
          allergeni: [],
          prezzo: 14,
        },
        {
          id: 'clara',
          nome: 'Clara',
          nome_en: 'Clara',
          descrizione:
            'Pesto di basilico, bufala, prosciutto crudo, datterino rosso semi dry, doppio bocconcino di bufala all’uscita, olio, basilico',
          descrizione_en:
            'Basil pesto, buffalo mozzarella, cured ham, semi-dried red datterino tomato, double buffalo bocconcino after baking, oil, basil',
          allergeni: [],
          prezzo: 14,
        },
      ],
    },
    {
      id: 'veraci',
      nome: 'Pizze',
      occhiello: 'Le veraci',
      script: true,
      nota: 'Tutte le pizze si possono fare veraci con l’aggiunta di € 2,00.',
      voci: [
        {
          id: 'verace',
          nome: 'Verace',
          nome_en: 'Verace',
          descrizione:
            'Pomodoro San Marzano DOP, mozzarella di bufala DOP, pecorino romano, bocconcino di bufala in uscita, basilico, olio evo',
          descrizione_en:
            'PDO San Marzano tomato, PDO buffalo mozzarella, pecorino romano, buffalo bocconcino added after baking, basil, olive oil',
          allergeni: A(1, 7),
          prezzo: 11,
        },
      ],
    },
    {
      id: 'picciotte',
      nome: 'Pizze',
      occhiello: 'Le picciotte',
      script: true,
      nota: 'Una pizza dedicata a delle ragazze speciali.',
      voci: [
        {
          id: 'le-picciotte',
          nome: 'Le picciotte',
          nome_en: 'Le picciotte',
          descrizione:
            'Pomodoro San Marzano, fiordilatte, speck, granella di pistacchio, burrata, olio, basilico. Con bordo ripieno di ricotta fresca e pesto di pistacchio',
          descrizione_en:
            'San Marzano tomato, fiordilatte, speck, chopped pistachio, burrata, oil, basil. Crust filled with fresh ricotta and pistachio pesto',
          allergeni: [],
          prezzo: 15,
          firma: true,
        },
      ],
    },

    /* ------------------------------------------------------------- da bere */
    {
      id: 'bevande',
      nome: 'Bevande',
      script: true,
      listino: true,
      voci: [
        { id: 'coca-33', nome: 'Coca Cola 33 cl', prezzo: 3 },
        { id: 'coca-zero-33', nome: 'Coca Cola Zero 33 cl', prezzo: 3 },
        { id: 'coca-1l', nome: 'Coca Cola 1 lt', prezzo: 5 },
        { id: 'fanta-sprite-chino', nome: 'Fanta 33 cl / Sprite 33 cl / Chinò 33 cl', prezzo: 3 },
      ],
    },
    {
      id: 'birre-bottiglia',
      nome: 'Birre in bottiglia',
      script: true,
      listino: true,
      voci: [
        { id: 'heineken-33', nome: 'Heineken 33 cl', prezzo: 3.5 },
        { id: 'heineken-66', nome: 'Heineken 66 cl', prezzo: 6 },
        { id: 'cristalli-33', nome: 'Cristalli di Sale 33 cl', prezzo: 4 },
        { id: 'cristalli-50', nome: 'Cristalli di Sale 50 cl', prezzo: 6 },
        { id: 'stretto-33', nome: 'Birra dello Stretto 33 cl', prezzo: 3.5 },
        { id: 'stretto-66', nome: 'Birra dello Stretto 66 cl', prezzo: 6 },
        { id: 'semedorato-33', nome: 'Semedorato 33 cl', prezzo: 3.5 },
        { id: 'semedorato-66', nome: 'Semedorato 66 cl', prezzo: 6 },
        { id: 'semedorato-premium', nome: 'Semedorato Premium 33 cl', prezzo: 4 },
        { id: 'ichnusa-33', nome: 'Ichnusa 33 cl', prezzo: 3.5 },
        { id: 'ichnusa-50', nome: 'Ichnusa 50 cl', prezzo: 7 },
        { id: 'corona-33', nome: 'Corona 33 cl', prezzo: 5 },
        { id: 'ceres-33', nome: 'Ceres 33 cl', prezzo: 5 },
        { id: 'daura-33', nome: 'Daura 33 cl', nota: 'gluten free', prezzo: 5 },
        { id: 'clausthaler-33', nome: 'Clausthaler 33 cl', nota: 'analcolica', prezzo: 5 },
      ],
    },
    {
      id: 'birre-spina',
      nome: 'Birre alla spina',
      script: true,
      listino: true,
      voci: [
        { id: 'bionda-20', nome: 'Bionda 20 cl', prezzo: 4 },
        { id: 'rossa-20', nome: 'Rossa 20 cl', prezzo: 4 },
        { id: 'bionda-40', nome: 'Bionda 40 cl', prezzo: 6 },
        { id: 'rossa-40', nome: 'Rossa 40 cl', prezzo: 6 },
        { id: 'bionda-50', nome: 'Bionda 50 cl', prezzo: 7 },
        { id: 'rossa-50', nome: 'Rossa 50 cl', prezzo: 7 },
      ],
    },
    {
      id: 'amari',
      nome: 'Amari',
      script: true,
      listino: true,
      voci: [
        { id: 'amaro-del-capo', nome: 'Amaro del Capo', prezzo: 5 },
        { id: 'unicum', nome: 'Unicum', prezzo: 5 },
        { id: 'fernet', nome: 'Fernet', prezzo: 5 },
        { id: 'amara', nome: 'Amaro Amara', prezzo: 5 },
        { id: 'brancamenta', nome: 'Brancamenta', prezzo: 5 },
        { id: 'jefferson', nome: 'Jefferson', prezzo: 5 },
        { id: 'capo-peperoncino', nome: 'Amaro del Capo al peperoncino', prezzo: 5 },
        { id: 'amaranca', nome: 'Amaranca', prezzo: 5 },
        { id: 'baileys', nome: 'Baileys', prezzo: 5 },
      ],
    },
    {
      id: 'acque',
      nome: 'Carta delle acque',
      script: true,
      senzaFoto: true,
      voci: [
        {
          id: 'ferrarelle',
          nome: 'Ferrarelle',
          nome_en: 'Ferrarelle',
          descrizione:
            'L’acqua effervescente naturale che con le sue migliaia di bollicine solletica le labbra ed esplode sul palato. Nata da un processo naturale lungo 30 anni, è una grande alleata dell’organismo grazie alla sua particolare composizione di minerali.',
          descrizione_en:
            'Naturally sparkling water born from a 30-year natural process; thousands of fine bubbles and a mineral composition that works with the body.',
          varianti: [{ etichetta: 'Effervescente naturale 75 cl', prezzo: 2.5 }],
        },
        {
          id: 'lete',
          nome: 'Lete',
          nome_en: 'Lete',
          descrizione:
            'Con le sue delicate bollicine, è un dono della natura che nel percorso tra le rocce si arricchisce di preziosi minerali. È l’acqua prodotta in Italia con il più basso contenuto di sodio, ricchissima di calcio: favorisce i processi digestivi e contribuisce alla salute delle ossa.',
          descrizione_en:
            'Delicately sparkling, mineral-rich water: the lowest sodium content of any water produced in Italy and very high in calcium.',
          varianti: [{ etichetta: 'Effervescente naturale 75 cl', prezzo: 2.5 }],
        },
        {
          id: 'san-benedetto',
          nome: 'San Benedetto',
          nome_en: 'San Benedetto',
          descrizione:
            'Un’acqua minerale dalla purezza millenaria racchiusa in un elegante design e dedicata alla ristorazione d’eccellenza. Nasce a 236 metri di profondità, da una falda acquifera che dona all’acqua un’inconfondibile purezza, con nitrati inferiori allo 0,0001%.',
          descrizione_en:
            'Bottled from an aquifer 236 metres deep, with a nitrate content below 0.0001%. Light, genuine, irresistible.',
          varianti: [
            { etichetta: 'Naturale 33 cl', prezzo: 1.5 },
            { etichetta: 'Frizzante 33 cl', prezzo: 1.5 },
          ],
        },
        {
          id: 'cavagrande',
          nome: 'Cavagrande',
          nome_en: 'Cavagrande',
          descrizione:
            'Sgorga in purezza dal grembo del vulcano Etna, dopo aver attraversato rocce antiche che la arricchiscono di preziosi elementi. Ideale per accompagnare tutti i piatti: al ristorante si farà amare e ammirare per il suo design, che richiama il nostro vulcano.',
          descrizione_en:
            'Rises pure from the slopes of Mount Etna, enriched by ancient volcanic rock. A bottle whose design recalls the volcano itself.',
          varianti: [{ etichetta: 'Naturale 75 cl', prezzo: 2.5 }],
        },
        {
          id: 'orsini',
          nome: 'Orsini',
          nome_en: 'Orsini',
          descrizione:
            'Nasce all’interno del Parco Nazionale dell’Alta Murgia. Acqua oligominerale dal gusto piacevole che appaga la sete e il palato; povera di sali e con un equilibrato residuo fisso di soli 298 mg/l.',
          descrizione_en:
            'From the Alta Murgia National Park: a light mineral water, low in salts, with a balanced dry residue of just 298 mg/l.',
          varianti: [
            { etichetta: 'Naturale 75 cl', prezzo: 2.5 },
            { etichetta: 'Frizzante 33 cl', prezzo: 2.5 },
          ],
        },
        {
          id: 'armani',
          nome: 'Armani',
          nome_en: 'Armani',
          descrizione:
            'L’acqua è stile. Eleganza e purezza sono i tratti distintivi dell’acqua che nasce dalla collaborazione tra Giorgio Armani e Lauretana, imbottigliata alla sorgente Lauretana nell’area idrogeologica del ghiacciaio del Monte Rosa.',
          descrizione_en:
            'Born from the collaboration between Giorgio Armani and Lauretana, bottled at source in the Monte Rosa glacier basin.',
          varianti: [
            { etichetta: 'Naturale 33 cl', prezzo: 1.5 },
            { etichetta: 'Naturale 75 cl', prezzo: 1.5 },
            { etichetta: 'Frizzante 75 cl', prezzo: 5 },
          ],
        },
        {
          id: 'plose',
          nome: 'Plose',
          nome_en: 'Plose',
          descrizione:
            'Una tra le migliori acque minerali al mondo: sgorga in alta montagna, a 1870 metri di altezza, nelle montagne incontaminate dell’Alto Adige, patrimonio dell’umanità Unesco. Il gusto neutro esalta i sapori senza coprirli.',
          descrizione_en:
            'From 1,870 metres up in the Unesco-listed Dolomites: a crystalline, remarkably light water whose neutral taste lifts flavours instead of masking them.',
          varianti: [
            { etichetta: 'Naturale 75 cl', prezzo: 5 },
            { etichetta: 'Frizzante 75 cl', prezzo: 5 },
          ],
        },
        {
          id: 'panna',
          nome: 'Panna',
          nome_en: 'Panna',
          descrizione:
            'Scorre in Toscana tra rocce secolari dove si arricchisce di preziosi minerali che donano un perfetto equilibrio di gusto. Grazie al pH 7,9 naturale alla sorgente, si caratterizza per una composizione bilanciata: da New York a Tokyo è l’acqua preferita dai migliori ristoranti del mondo.',
          descrizione_en:
            'Filtered through centuries-old Tuscan rock, naturally pH 7.9 at source. From New York to Tokyo, a favourite of the world’s best restaurants.',
          varianti: [{ etichetta: 'Frizzante 75 cl', prezzo: 2.5 }],
        },
        {
          id: 'perrier',
          nome: 'Perrier',
          nome_en: 'Perrier',
          descrizione:
            'Elegante, effervescente, straordinariamente rinfrescante. Le inconfondibili bollicine e l’equilibrato contenuto di sali minerali dissetano da oltre 150 anni. Nasce in Francia ed è celebre in tutto il mondo.',
          descrizione_en:
            'Elegant, sparkling, extraordinarily refreshing: unmistakable bubbles and balanced minerals, from France, famous the world over.',
          varianti: [{ etichetta: 'Frizzante 75 cl', prezzo: 5 }],
        },
        {
          id: 'lurisia',
          nome: 'Lurisia',
          nome_en: 'Lurisia',
          descrizione:
            'Nasce nel cuore delle Alpi, dal Monte Pigna: un capolavoro di design italiano, leggerissima, con il minor residuo fisso d’Italia e indicata per le diete povere di sodio.',
          descrizione_en:
            'From Monte Pigna in the heart of the Alps: extremely light, the lowest dry residue in Italy, suited to low-sodium diets.',
          varianti: [
            { etichetta: 'Naturale 75 cl', prezzo: 7 },
            { etichetta: 'Frizzante 75 cl', prezzo: 7 },
          ],
        },
      ],
    },
  ],
};
