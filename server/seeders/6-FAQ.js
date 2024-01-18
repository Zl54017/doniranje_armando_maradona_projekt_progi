"use strict";
const db = require("../models");
const FAQ = require("../models/faq");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const questions = [
      "Tko može darivati krv?",
      "Kako se daruje krv?",
      "Šteti li darivanje krvi zdravlju?",
      "Može li se darivanjem krvi zaraziti od neke bolesti?",
      "Razvija li se ovisnost za darivanje krvi?",
      "Zašto se odmah nakon darivanja krvi ne smije pušiti?",
      "Zašto nekim darivateljima otekne mjesto uboda igle kroz koju je uzeta krv?",
      "Zašto se neki darivatelji ne osjećaju dobro nakon darivanja krvi?",
      "Zašto se neki ljudi ne odlučuju darivati krv?",
      "Koje osobine ima prosječni dobrovoljni davatelj krvi u Hrvatskoj?",
      "Gdje i kada se može darivati krv?",
      "Zašto je potrebna točna identifikacija darivatelja krvi?",
      "Zašto Vas liječnik prije darivanja krvi pregleda i postavlja intimna pitanja?",
      "Zašto se organizira dobrovoljno darivanje krvi?",
      "Tko organizira dobrovoljno darivanje krvi?",
      "Tko je dobrovoljni darivatelj krvi?",
    ];

    const answers = [
      `Krv može darivati svaki čovjek dobrog općeg zdravstvenog stanja:

        1. Dob: od 18 do 65 godina, do 60 godina ako krv daje prvi put, do 70 godina 1-2 godišnje nakon pregleda i odluke liječnika specijalista transfuzijske medicine.

        2. Tjelesna težina: iznad 55 kg, proporcionalna visini. Tjelesna temperatura: do 37°C.

        3. Krvni tlak: sistolični 100 do 180 mm Hg, dijastolični 60 do 110 mm Hg.

        4. Puls: 50 do 100 otkucaja u minuti.

        5. Hemoglobin: muškarci 135 g/L, žene 125 g/L.

        6. U Hrvatskoj, muškarci, darivatelji pune krvi smiju dati krv do 4 puta godišnje, s razmakom između darivanja od 3 mjeseca. Žene, darivateljice pune krvi, smiju dati krv do 3 puta godišnje, s razmakom između darivanja od 4 mjeseca.`,
      `Darivanje krvi jednostavan je postupak. Vaše zdravlje nam je značajno i stoga svako darivanje krvi uključuje provjeru vašeg zdravstvenog stanja.

        1. Provjera količine željeza u krvi:
           brzom metodom, iz kapljice krvi dobivene laganim ubodom u jagodicu prsta.

        2. Kratki razgovor s liječnikom:
           provjera vašeg dosadašnjeg i sadašnjeg zdravstvenog stanja.

        3. Liječnički pregled:
           Uključuje provjeru krvnog tlaka i provjeru rada srca. Tek kada smo sigurni da smijete dati krv započinje postupak uzimanja krvi.

        4. Darivatelj krvi je udobno smješten na krevetu za davanje krvi:
           Iskusan zdravstveni tehničar odabire venu u lakatnoj jami i bezbolno uvodi iglu u venu. Igla je povezana s plastičnom vrećicom u koju se daje krv. Samo darivanje krvi traje 8 - 12 minuta. Igla i plastična vrećica za uzimanje krvi su sterilne i samo za jednokratnu uporabu, tj. mogu se primijetiti samo za jednokratno darivanje. Davatelju nakon darivanja krvi slijedi kratkotrajni odmor uz osvježenje i lagani obrok. Sveukupno, darivanje krvi vam može oduzeti oko 30 minuta vašeg vremena.`,
      `Darivanje krvi ne šteti zdravlju ako se provedu svi propisani postupci pri odabiru darivatelja krvi. Svaka zdrava osoba između 18 i 65 (70) godina starosti može bez opasnosti za svoje zdravlje darovati krv, 3 do 4 puta tijekom jedne godine.

       Zdrav organizam darivatelja krvi vrlo brzo u potpunosti nadoknađuje količinu i sve sastavne dijelove darovane krvi: već unutar 24 sata organizam nadoknadi tekući dio krvi - plazmu i njene sastojke, broj trombocita i leukocita. Eritrociti se nadoknade unutar 4 do 6 tjedana.

       Darivanje krvi najviše utječe na željezo koje se u obliku hemoglobina nalazi u eritrocitima (crvene krvne stanice). Darivanjem 450 mL krvi darivatelj gubi oko 200 mg željeza. Organizam nadoknađuje gubitak željeza u roku 1 do 2 mjeseca povećanom apsorpcijom iz hrane. Prije svakog darivanja krvi obvezno provjeravamo zdravstveno stanje darivatelja i količinu željeza u njegovoj krvi. Krv se uzima samo kada je darivatelj zdrav i ima dovoljno željeza. Darivanje krvi nikako ne ugrožava zdravlje davatelja. Darivanje krvi ujedno je i kontrola zdravlja`,
      `Tijekom darivanja krvi ne postoji mogućnost zaraze davatelja. Sav pribor za uzimanje krvi - igle, plastične vrećice i ostali materijal koji se koristi pri uzimanju krvi su sterilni i za jednokratnu su uporabu. Pribor je napravljen na način koji onemogućuje njegovu ponovnu uporabu.`,
      `Darivanje krvi ne uzrokuje ovisnost u darivatelja krvi.
       Darivanjem krvi može se započeti i prestati u svako doba između 18 i 65 (70) godina života. Darivanjem krvi ne nastaju nikakve štetne tjelesne promjene ili posljedice po organizam.
       Neki ljudi se ipak bolje osjećaju nakon što daruju krv i zato daruju krv nekoliko puta godišnje. Ta je pojava češća u osoba s blago povišenim krvnim tlakom. U tih je osoba darivanje krvi ujedno i način ublažavanja simptoma uzrokovanih blagim povišenjem krvnog tlaka, ali nije način liječenja povišenog tlaka.`,
      `Mnogi se pušači - darivatelji krvi ljute kada ih zamolimo da ne zapale cigaretu odmah nakon darivanja. Jedna od rjeđih, ali neugodnih reakcija organizma na pušenje je kratkotrajno stiskanje (spazam) krvnih žila u mozgu. Stoga, ako se zapuši odmah nakon završenog darivanja krvi, u nekih, osobito mlađih osoba, može doći do blage omaglice i mučnine. Postoji još čitav niz zdravstvenih i društvenih razloga koji pokazuju da ne bi trebalo pušiti, zar ne?`,
      `Uzimanje krvi izvodi se ubodom sterilnom iglom u venu lakatne jame. Darivanje traje 8 do 12 minuta i kroz to vrijeme igla se nalazi u veni. Po završetku uzimanja krvi igla se vadi, a kožu se na mjestu uboda zaštićuje gužvicom vate (Tupfer, njem). Da bi se ubrzalo zatvaranje otvora u veni, ispružena ruka se podiže u vis. U većini je slučajeva otvor u veni potpuno zatvoren u roku od par minuta i na koži ostaje samo mali trag uboda.
       U oko 1 do 2% darivatelja krvi oko mjesta uboda nastaje oteklina s promjenom boje kože (hematom), uz osjećaj zatezanja i lagane boli. Oteklina može nastati tijekom ili nakon darivanja. Uzrok otekline tijekom darivanja posljedica je težeg uvođenja igle u venu ili lošeg položaja igle u veni, zbog kojeg mali dio krvi uz iglu izlazi u potkožno tkivo.
       Oteklina koja nastane nakon darivanja uzrokovana je nedovoljnim stiskanjem (spazmom) vene ili jačim pokretima ruke. Oteklina nije opasna nuspojava darivanja krvi. Oteklina se liječi oblogom od alkohola i mirovanjem ruke. Ako se stanje ne popravi za 2 do 3 dana, potrebno je javiti se u transfuzijsku ustanovu ili liječniku opće prakse.`,
      `Većina zdravih osoba koje daruju krv podnosi gubitak 450 mL krvi bez ikakvih nuspojava. Nuspojave su tijekom davanja krvi rijetkost i opažaju se u oko 3 do 5% davanja krvi. Nuspojave se mogu pojaviti tijekom darivanja, ali i do više sati nakon darivanja krvi.
       Nuspojave mogu biti blage, srednje teške i teške.
       Najčešće se javljaju blage nuspojave poput nelagode, nervoze, zabrinutosti, ubrzanog ili dubokog disanja, bljedoće i znojenja, vrtoglavice i magljenja pred očima, te mučnina i povraćanja.
       Srednje i jake nuspojave su vrlo rijetke i opažaju se u 1 do 3% svih nuspojava. To su nesvjestica i grčevi. Najčešći uzrok nuspojava su strah od darivanja krvi, premorenost ili neispavanost, zbog čega se organizam nije u stanju prilagoditi kratkotrajnom gubitku krvi.`,
      `U Hrvatskoj se prikupi godišnje 38 doza krvi/1000 stanovnika, iako postoje uvjeti da dobrovoljno davalaštvo krvi bude razvijeno kao i u Zapadnoj Europi (50 darivanja/1000 stanovnika).
       Anketirali smo ljude o motivima za darivanje krvi:
       Odgovori darivatelja krvi: najčešći razlog zbog kojeg daruju krv je izrazito human - želja da se učini dobro djelo i da se pomogne bolesniku. Darivatelji krvi imaju divan osjećaj osobnog zadovoljstva da su spasili nečiji život.
       Odgovori ne darivatelja krvi: najčešći razlog za nedarivanje krvi je strah i slabo znanje o potrebama i samom darivanju krvi.
       Sve što je u svezi s darivanjem krvi treba biti javno, bez tajni, dobro obrazloženo. Sve nejasnoće i zablude trebaju biti razjašnjene jer se time razbija strah u ljudi. Što je bolje informirano pučanstvo, veća je vjerojatnost da će ljudi prepoznati neke od motiva za darivanje krvi.`,
      `Prosječna je dob darivatelja krvi u Hrvatskoj 32 godine.
       Davatelji krvi pretežno su muškarci, osobe u braku koje imaju jedno ili više djece i pripadaju srednjem socijalno-ekonomskom sloju.
       Vrlo često te osobe imaju izražen socijalni osjećaj i aktivne su u različitim kulturnim i športskim društvima.`,
      `Krv možete darivati svakodnevno na organiziranim akcijama darivanja krvi kao i u nekim transfuzijskim centrima.
       Redovite akcije darivanja krvi provode se u svim većim radnim organizacijama i mjesnim zajednicama.
       Vrijeme i mjesto održanja akcija najavljuju se putem javnih glasila (novine, radio, TV, na web stranicama), a mjesto davanja obilježeno je plakatima.
       Davatelji krvi u Zagrebu mogu dati krv svakoga dana u Hrvatskom zavodu za transfuzijsku medicinu, u Petrovoj 3, od ponedjeljka do petka, od 07:30 do 19:00 sati, a subotom od 07:30 do 15:00 sati.
       Informaciju o mogućnosti darivanja krvi u drugim transfuzijskim centrima možete dobiti izravno u svakom centru.`,
      `Prije nego pristupite darivanju krvi tražimo od vas osobnu iskaznicu i podatke koje provjeravamo prije svakog sljedećeg darivanja krvi:
       Ime i prezime, mjesto rođenja, JMBG (jedinstveni matični broj građana), adresu stanovanja, mjesto zaposlenja, broj telefona u stanu i na poslu, Knjižicu darivatelja krvi i broj dosadašnjih darivanja krvi, ako imate.
       Svakoj osobi koja odluči darivati krv kompjutorski otvaramo Karton darivatelja krvi, u kojeg se uz osobne podatke unose i slijedeći podaci:
       Mjesto darivanja krvi, broj trenutnog darivanja, ime liječnika koji je pregledao darivatelja, rezultat liječničkog pregleda prije darivanja, razlozi za odgađanje od darivanja ili trajno isključenje, nuspojave tijekom darivanja, ime djelatnika koji je izvršio uzimanje krvi, rezultate laboratorijskih ispitivanja krvi.
       Navedeni podaci su nam vrlo važni iz sljedećih razloga:
       U pojedinim krajevima Hrvatske više stanovnika često imaju isto ime i prezime, ime oca, pa čak i mjesto i godinu rođenja. Stoga može doći do zamjene u identifikaciji darivatelja krvi. JMBG je jedini podatak koji je različit za svakog građanina Hrvatske. Ako darivatelj krvi ima kasnu reakciju na darivanje krvi, možemo ustanoviti razloge.
       Gdje se dogodi da bolesnik koji je primio krv oboli od krvlju prenosive bolesti praćenjem podataka transfundirane doze krvi od bolesnika do darivatelja krvi, možemo potvrditi ili isključiti mogućnost zaraze transfuzijom krvi.
       Postoji jedan mali broj davatelja krvi koje smo iz zdravstvenih razloga trajno isključili iz daljnjeg darivanja krvi. Neki od njih ne mogu prihvatiti činjenicu da više ne smiju darivati krv i nastoje nastaviti darivati krv. Nastavkom darivanja krvi te osobe mogu oštetiti svoje zdravlje ili zdravlje bolesnika koji bi bio liječen njihovom krvlju. Svaka transfuzijska ustanova obvezna je voditi i zanavljati kartoteku trajno odbijenih davatelja kako bi spriječila uzimanje njihove krvi.
       Nakon svakog darivanja vaša se krv laboratorijski ispituje na prisutnost uzročnika bolesti koji se mogu prenijeti krvlju. Zbog zaštite Vašega zdravlja dužni smo Vas pravodobno obavijestiti o nalazima testiranja.
       Svi podaci o dobrovoljnom darivatelju krvi i rezultati testiranja liječnička su tajna i tajnost podataka je osigurana.
       U Hrvatskom zavodu za transfuzijsku medicinu u Zagrebu u potpunosti su kompjutorizirani svi podaci o darivateljima krvi, dozama uzete krvi, pripravcima priređenim iz doza krvi, rezultatima ispitivanja i ustanovi u koju je dostavljena krv. Svi podaci su zaštićeni od neovlaštenog pristupa.`,
      `Odluku može li neka osoba dati krv liječnik donosi na osnovi davateljevih podataka o njegovom zdravstvenom stanju i fizikalnog pregleda.
       Svrha je pregleda dvojaka:
       Zaštita zdravlja davatelja od posljedica davanja krvi i zaštita bolesnika, poglavito od prijenosa zaraznih bolesti preko transfuzije krvi. Transfuzijama krvi liječe se bolesnici od najranije životne dobi, pa sve do duboke starosti. Transfuzijsko liječenje mora biti korisno. Ono nikako ne smije biti štetno za bolesnika. Također, darivanje krvi ne smije ugroziti zdravlje darivatelja krvi.
       Potpune podatke o mogućim bolestima darivatelja možemo dobiti samo vašim iskrenim odgovorom. Tijekom liječničkog pregleda, prije darivanja krvi, darivatelj mora iskreno odgovoriti na sva postavljena mu pitanja.
       Darivatelji krvi koji nisu sigurni da su zdravi, odnosno ako postoji sumnja da bi njihova krv mogla štetiti bolesniku, ne smiju darivati krv.
       Većina darivatelja čija je krv opasna za zdravlje primatelja, izdvojiti će se već u toku razgovora ili pregleda.
       Neki darivatelji mogu biti zaraženi, ali ne znaju za zarazu. Njih se otkriva laboratorijskim ispitivanjem na prisutnost biljega krvlju prenosivih bolesti. Laboratorijsko testiranje ne može biti zamjena za liječnički pregled.
       Kada odlučite darivati krv zamislite i ponašajte se kao da će vašu krv primiti netko tko vam je vrlo drag i ne želite mu naškoditi. Darivatelj krvi je u moralnom i etičkom pogledu suodgovoran za sigurnost transfuzijskog liječenja bolesnika.
       Svi podaci dobiveni od darivatelja krvi i rezultati testiranja liječnička su tajna i tajnost podataka je osigurana.
       Molimo, nemojte se ljutiti što vas ispitujemo o vašem intimnom ponašanju i molimo vas da odgovarate iskreno. Biti darivatelj krvi privilegija je koja sadrži odgovornost prema bolesniku.`,
      `Krv nije moguće proizvesti na umjetan način. Jedini izvor toga lijeka je čovjek - darivatelj krvi. Svi mi, kada nam zatreba krv kao lijek, ovisni smo samo o dobrovoljnim darivateljima krvi.
       Kako bi se osiguralo brzo, kvalitetno i sigurno liječenje bolesnika potrebno je uvijek imati dovoljan broj darivatelja krvi, a time i dovoljne količine krvi u pričuvi. Program okupljanja dobrovoljnih darivatelja krvi je socijalni program. U Hrvatskoj, kao i u drugim europskim zemljama, odnos između darivatelja i transfuzijske službe osniva se na partnerstvu između darivatelja krvi, društva/zajednice i transfuzijske službe. U osnovi transfuzijske djelatnosti jest program okupljanja darivatelja krvi. O provedbi toga programa ovisi liječenje bolesnika transfuzijama krvi, krvnim pripravcima i derivatima plazme.
       Načela rada transfuzijske djelatnosti regulirani su zakonima, propisima i uputama radi:
       osiguranja mogućnosti liječenja transfuzijama krvi, krvnim pripravcima i derivatima plazme svakom bolesniku kojem je takvo liječenje potrebno, osiguranja opskrbe krvlju i krvnim pripravcima tijekom čitave godine, u količinama koje su dovoljne za liječenje bolesnika i postavljanje dijagnoze, sigurnosti darivatelja i bolesnika. Potrebno je postići najviši prihvatljiv standard u prikupljanju krvi, prikupljanju pojedinih krvnih sastojaka, laboratorijskom ispitivanju, izradi pripravaka iz krvi i njihovoj upotrebi primjenom svih poznatih znanstvenih spoznaja, provedbe djelotvornog i ekonomičnog uzimanja, obrade i uporabe nacionalnih zaliha krvi i krvnih pripravaka.`,
      `Organizaciju dobrovoljnog darivanja krvi u većini zemalja svijeta provode humanitarne organizacije poput Crvenog križa i Zelenog polumjeseca, razni klubovi dobrovoljnih darivatelja krvi i transfuzijska služba.
       U Hrvatskoj, promidžbu davalaštva i organizaciju akcija darivanja krvi zajednički provode Hrvatski Crveni križ i Transfuzijska služba Hrvatske na načelima dobrovoljnosti, anonimnosti, besplatnosti i solidarnosti.
       Odabir darivatelja krvi i uzimanje krvi obavljaju stručni, medicinski djelatnici transfuzijske službe u zdravstvenim ustanovama koje su u državnom ili županijskom vlasništvu.
       Pripravu krvi i krnih pripravaka za transfuzijsko liječenje bolesnika provode transfuzijske ustanove u državnom ili županijskom vlasništvu.
       Zdravstvene ustanove u privatnome vlasnišvu ne smiju ni uzimati krv, ni priređivati krvne pripravke.`,
      `Definiciju dobrovoljnog darivatelja krvi odredila je Međunarodna udruga transfuziologa (ISBN), Međunarodni Crveni križ (IFCR), Svjetska zdravstvena organizacija (WHO) i Europsko vijeće (Council of Europe) i prihvaćena je u svim zemljama svijeta.
       Dobrovoljni darivatelj krvi je osoba koja daruje krv, plazmu ili stanične dijelove krvi po svojoj slobodnoj volji i ne prima za to nikakvu nadoknadu, ni novčanu niti na način koji se može smatrati nadomjestkom novca. Skromna uspomena (dar) i osvježenje nakon davanja krvi prihvatljivi su za dobrovoljno davalaštvo krvi.
       Dobrovoljni darivatelji krvi je posredan, aktivan sudionik u liječenju bolesnika, tj. on je aktivna veza između zdravog dijela društva i bolesnika.`,
    ];

    const faqs = [];

    for (let i = 0; i < 16; i++) {
      faqs.push({
        title: questions[i],
        text: answers[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    return queryInterface.bulkInsert("FAQs", faqs);
  },

  down: async (queryInterface, Sequelize) => {
    // Define the down migration if needed (for reverting the seeding)
    return queryInterface.bulkDelete("FAQs", null, {});
  },
};
