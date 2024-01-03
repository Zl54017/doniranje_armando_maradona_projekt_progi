import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import { useAppDispatch } from "../../redux/store";
import { attemptGetFaq } from "../../redux/slices/authSlice";


interface Question {
    question: string;
    answer: string;
    isEditingQuestion: boolean;
    isEditingAnswer: boolean;
    isOpen: boolean;
}

function FaqEdit() {
    const dispatch = useAppDispatch();
    // const initialQuestions: Question[] = [
    //     {
    //         question: 'Prvo pitanje',
    //         answer: 'Odgovor na prvo pitanje...',
    //         isEditingQuestion: false,
    //         isEditingAnswer: false,
    //         isOpen: false
    //     },
    //     {
    //         question: 'Drugo pitanje',
    //         answer: 'Odgovor na drugo pitanje...',
    //         isEditingQuestion: false,
    //         isEditingAnswer: false,
    //         isOpen: false
    //     }
    //     // Dodaj više pitanja i odgovora po potrebi
    // ];

    const [initialQuestions, setInitialQuestions] = useState({
        question: 'Prvo pitanje',
        answer: 'Odgovor na prvo pitanje...',
        isEditingQuestion: false,
        isEditingAnswer: false,
        isOpen: false
    })

    // const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    const [questions, setQuestions] = useState<any[]>([]);

    const handleQuestionClick = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].isOpen = !updatedQuestions[index].isOpen;
        setQuestions(updatedQuestions);
    };

    const handleEditQuestion = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].isEditingQuestion = !updatedQuestions[index].isEditingQuestion;
        setQuestions(updatedQuestions);
    };

    const handleEditAnswer = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].isEditingAnswer = !updatedQuestions[index].isEditingAnswer;
        setQuestions(updatedQuestions);
    };
    useEffect(() => {
        dispatch(attemptGetFaq())
            .then((response: any) => {
                setQuestions(response.payload || []);
            })
            .catch((error: any) => {
                console.error("Error", error);
            });
    }, [dispatch]);


    return (
        <Container>
            <List>
                {questions.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItemButton onClick={() => handleQuestionClick(index)}>
                            {item.isEditingQuestion ? (
                                <input
                                    type="text"
                                    value={item.question}
                                    onChange={(e) => {
                                        const updatedQuestions = [...questions];
                                        updatedQuestions[index].question = e.target.value;
                                        setQuestions(updatedQuestions);
                                    }}
                                />
                            ) : (
                                <Typography variant="h6" color="#b2102f">
                                    {item.question}
                                </Typography>
                            )}
                            <Button onClick={() => handleEditQuestion(index)} variant="contained" style={{ backgroundColor: "#b2102f", color: "white", gap: "30px" }}>
                                {item.isEditingQuestion ? 'Spremi' : 'Uredi'}
                            </Button>
                        </ListItemButton>
                        {item.isOpen && (
                            <ListItemButton>
                                {item.isEditingAnswer ? (
                                    <input
                                        type="text"
                                        value={item.answer}
                                        onChange={(e) => {
                                            const updatedQuestions = [...questions];
                                            updatedQuestions[index].answer = e.target.value;
                                            setQuestions(updatedQuestions);
                                        }}
                                    />
                                ) : (
                                    <p>{item.answer}</p>
                                )}
                                <Button onClick={() => handleEditAnswer(index)} variant="contained" style={{ backgroundColor: "#b2102f", color: "white", gap: "30px" }}>
                                    {item.isEditingAnswer ? 'Spremi' : 'Uredi'}
                                </Button>
                            </ListItemButton>
                        )}
                    </React.Fragment>
                ))}
            </List>
        </Container>
    );



    {/* <ListItemButton onClick={() => handleQuestionClick(0)}>
                    <Typography variant="h6" color="#b2102f">
                        Tko može darivati krv?{" "}
                    </Typography>
                </ListItemButton>
                {selectedQuestion === 0 && (
                    <Typography variant="body1">
                        Krv može darivati svaki čovjek dobrog općeg zdravstvenog stanja:{" "}
                        <br></br>
                        <br></br>
                        <ol>
                            <li>
                                Dob: od 18 do 65 godina, do 60 godina ako krv daje prvi put, do
                                70 godina 1-2 godišnje nakon pregleda i odluke liječnika
                                specijalista transfuzijske medicine.
                            </li>
                            <br></br>
                            <li>
                                Tjelesna težina: iznad 55 kg, proporcionalna visini. Tjelesna
                                temperatura: do 37°C.
                            </li>
                            <br></br>
                            <li>
                                Krvni tlak: sistolični 100 do 180 mm Hg, dijastolični 60 do 110
                                mm Hg.
                            </li>
                            <br></br>
                            <li>Puls: 50 do 100 otkucaja u minuti.</li>
                            <br></br>
                            <li>Hemoglobin: muškarci 135 g/L, žene 125 g/L.</li>
                            <br></br>
                            <li>
                                U Hrvatskoj, muškarci, darivatelji pune krvi smiju dati krv do 4
                                puta godišnje, s razmakom između darivanja od 3 mjeseca. Žene,
                                darivateljice pune krvi, smiju dati krv do 3 puta godišnje, s
                                razmakom između darivanja od 4 mjeseca.
                            </li>
                        </ol>{" "}
                    </Typography>
                )}

                <ListItemButton onClick={() => handleQuestionClick(1)}>
                    <Typography variant="h6" color="#b2102f">
                        Kako se daruje krv?{" "}
                    </Typography>{" "}
                </ListItemButton>
                {selectedQuestion === 1 && (
                    <Typography variant="body1">
                        Darivanje krvi jednostavan je postupak. Vaše zdravlje nam je
                        značajno i stoga svako darivanje krvi uključuje provjeru vašeg
                        zdravstvenog stanja.<br></br>
                        <br></br>
                        <ol>
                            <li>
                                Provjera količine željeza u krvi:<br></br> brzom metodom, iz
                                kapljice krvi dobivene laganim ubodom u jagodicu prsta.
                            </li>
                            <br></br>
                            <li>
                                Kratki razgovor s liječnikom: <br></br>provjera vašeg
                                dosadašnjeg i sadašnjeg zdravstvenog stanja.
                            </li>
                            <br></br>
                            <li>
                                Liječnički pregled:<br></br> Uključuje provjeru krvnog tlaka i
                                provjeru rada srca. Tek kada smo sigurni da smijete dati krv
                                započinje postupak uzimanja krvi.{" "}
                            </li>
                            <br></br>
                            <li>
                                Darivatelj krvi je udobno smješten na krevetu za davanje krvi:
                                <br></br> Iskusan zdravstveni tehničar odabire venu u lakatnoj
                                jami i bezbolno uvodi iglu u venu. Igla je povezana s plastičnom
                                vrećicom u koju se daje krv. Samo darivanje krvi traje 8 - 12
                                minuta. Igla i plastična vrećica za uzimanje krvi su sterilne i
                                samo za jednokratnu uporabu, tj. mogu se primijetiti samo za
                                jednokratno darivanje. Davatelju nakon darivanja krvi slijedi
                                kratkotrajni odmor uz osvježenje i lagani obrok. Sveukupno,
                                darivanje krvi vam može oduzeti oko 30 minuta vašeg vremena.
                            </li>
                        </ol>
                    </Typography>
                )}
                <ListItemButton onClick={() => handleQuestionClick(2)}>
                    <Typography variant="h6" color="#b2102f">
                        Šteti li darivanje krvi zdravlju?{" "}
                    </Typography>{" "}
                </ListItemButton>
                {selectedQuestion === 2 && (
                    <Typography variant="body1">
                        Darivanje krvi ne šteti zdravlju ako se provedu svi propisani
                        postupci pri odabiru darivatelja krvi. Svaka zdrava osoba između 18
                        i 65 (70) godina starosti može bez opasnosti za svoje zdravlje
                        darovati krv, 3 do 4 puta tijekom jedne godine.
                        <br></br>
                        <br></br>
                        Zdrav organizam darivatelja krvi vrlo brzo u potpunosti nadoknađuje
                        količinu i sve sastavne dijelove darovane krvi: već unutar 24 sata
                        organizam nadoknadi tekući dio krvi - plazmu i njene sastojke, broj
                        trombocita i leukocita. Eritrociti se nadoknade unutar 4 do 6
                        tjedana.
                        <br></br>
                        <br></br>
                        Darivanje krvi najviše utječe na željezo koje se u obliku
                        hemoglobina nalazi u eritrocitima (crvene krvne stanice). Darivanjem
                        450 mL krvi darivatelj gubi oko 200 mg željeza. Organizam
                        nadoknađuje gubitak željeza u roku 1 do 2 mjeseca povećanom
                        apsorpcijom iz hrane. Prije svakog darivanja krvi obvezno
                        provjeravamo zdravstveno stanje darivatelja i količinu željeza u
                        njegovoj krvi. Krv se uzima samo kada je darivatelj zdrav i ima
                        dovoljno željeza. Darivanje krvi nikako ne ugrožava zdravlje
                        davatelja. Darivanje krvi ujedno je i kontrola zdravlja
                    </Typography>
                )}
                <ListItemButton onClick={() => handleQuestionClick(3)}>
                    <Typography variant="h6" color="#b2102f">
                        Može li se darivanjem krvi zaraziti od neke bolesti?{" "}
                    </Typography>{" "}
                </ListItemButton>
                {selectedQuestion === 3 && (
                    <Typography variant="body1">
                        Tijekom darivanja krvi ne postoji mogućnost zaraze davatelja. Sav
                        pribor za uzimanje krvi - igle, plastične vrećice i ostali materijal
                        koji se koristi pri uzimanju krvi su sterilni i za jednokratnu su
                        uporabu. Pribor je napravljen na način koji onemogućuje njegovu
                        ponovnu uporabu.
                    </Typography>
                )}

                <ListItemButton onClick={() => handleQuestionClick(4)}>
                    <Typography variant="h6" color="#b2102f">
                        Razvija li se ovisnost za darivanje krvi?{" "}
                    </Typography>{" "}
                </ListItemButton>
                {selectedQuestion === 4 && (
                    <Typography variant="body1">
                        Darivanje krvi ne uzrokuje ovisnost u darivatelja krvi.
                        <br></br>
                        Darivanjem krvi može se započeti i prestati u svako doba između 18 i
                        65 (70) godina života. Darivanjem krvi ne nastaju nikakve štetne
                        tjelesne promjene ili posljedice po organizam.
                        <br></br>
                        Neki ljudi se ipak bolje osjećaju nakon što daruju krv i zato daruju
                        krv nekoliko puta godišnje. Ta je pojava češća u osoba s blago
                        povišenim krvnim tlakom. U tih je osoba darivanje krvi ujedno i
                        način ublažavanja simptoma uzrokovanih blagim povišenjem krvnog
                        tlaka, ali nije način liječenja povišenog tlaka.
                    </Typography>
                )}

                <ListItemButton onClick={() => handleQuestionClick(5)}>
                    <Typography variant="h6" color="#b2102f">
                        Zašto se odmah nakon darivanja krvi ne smije pušiti?{" "}
                    </Typography>{" "}
                </ListItemButton>
                {selectedQuestion === 5 && (
                    <Typography variant="body1">
                        Mnogi se pušači - darivatelji krvi ljute kada ih zamolimo da ne
                        zapale cigaretu odmah nakon darivanja. Jedna od rjeđih, ali
                        neugodnih reakcija organizma na pušenje je kratkotrajno stiskanje
                        (spazam) krvnih žila u mozgu. Stoga, ako se zapuši odmah nakon
                        završenog darivanja krvi, u nekih, osobito mlađih osoba, može doći
                        do blage omaglice i mučnine. Postoji još čitav niz zdravstvenih i
                        društvenih razloga koji pokazuju da ne bi trebalo pušiti, zar ne?
                    </Typography>
                )}
                <ListItemButton onClick={() => handleQuestionClick(6)}>
                    <Typography variant="h6" color="#b2102f">
                        Zašto nekim darivateljima otekne mjesto uboda igle kroz koju je uzeta krv? {" "}
                    </Typography>{" "}
                </ListItemButton>
                {selectedQuestion === 6 && (
                    <Typography variant="body1">
                        Uzimanje krvi izvodi se ubodom sterilnom iglom u venu lakatne jame. Darivanje traje 8 do 12 minuta i kroz to vrijeme igla se nalazi u veni. Po završetku uzimanja krvi igla se vadi, a kožu se na mjestu uboda zaštićuje gužvicom vate (Tupfer, njem).  Da bi se ubrzalo zatvaranje otvora u veni, ispružena ruka se podiže u vis. U većini je slučajeva otvor u veni potpuno zatvoren u roku od par minuta i na koži ostaje samo mali trag uboda.
                        <br></br>
                        U oko 1 do 2% darivatelja krvi oko mjesta uboda nastaje oteklina s promjenom boje kože (hematom), uz osjećaj zatezanja i lagane boli. Oteklina može nastati tijekom ili nakon darivanja. Uzrok otekline tijekom darivanja posljedica je težeg uvođenja igle u venu ili lošeg položaja igle u veni, zbog kojeg mali dio krvi uz iglu izlazi u potkožno tkivo.
                        <br></br>
                        Oteklina koja nastane nakon darivanja uzrokovana je nedovoljnim stiskanjem (spazmom) vene ili jačim pokretima ruke. Oteklina nije opasna nuspojava darivanja krvi. Oteklina se liječi oblogom od alkohola i mirovanjem ruke. Ako se stanje ne popravi za 2 do 3 dana, potrebno je javiti se u transfuzijsku ustanovu ili liječniku opće prakse.

                    </Typography>
                )}
                <ListItemButton onClick={() => handleQuestionClick(7)}>
                    <Typography variant="h6" color="#b2102f">
                        Zašto se neki darivatelji ne osjećaju dobro nakon darivanja krvi? {" "}
                    </Typography>{" "}
                </ListItemButton>
                {selectedQuestion === 7 && (
                    <Typography variant="body1">
                        Većina zdravih osoba koje daruju krv podnosi gubitak 450 mL  krvi bez ikakvih nuspojava. Nuspojave su tijekom davanja krvi rijetkost i opažaju se u oko 3 do 5% davanja krvi. Nuspojave se mogu pojaviti tijekom darivanja, ali i do više  sati nakon darivanja krvi.
                        <br></br>
                        Nuspojave mogu biti blage, srednje teške i teške.
                        <br></br>
                        Najčešće se javljaju blage nuspojave poput nelagode, nervoze, zabrinutosti, ubrzanog ili dubokog disanja, bljedoće i znojenja, vrtoglavice i magljenja pred očima, te mučnina i povraćanja.
                        <br></br>
                        Srednje i jake nuspojave su vrlo rijetke i opažaju se u 1 do 3% svih nuspojava. To su nesvjestica i grčevi. Najčešći uzrok nuspojava su strah od darivanja krvi, premorenost ili neispavanost, zbog čega se organizam nije u stanju prilagoditi kratkotrajnom gubitku krvi.

                    </Typography>
                )}
                <ListItemButton onClick={() => handleQuestionClick(8)}>
                    <Typography variant="h6" color="#b2102f">
                        Zašto se neki ljudi ne odlučuju darivati krv?{" "}
                    </Typography>{" "}
                </ListItemButton>
                {selectedQuestion === 8 && (
                    <Typography variant="body1">
                        U Hrvatskoj se prikupi godišnje 38 doza krvi/1000 stanovnika, iako postoje uvjeti da dobrovoljno davalaštvo krvi bude razvijeno kao i u Zapadnoj Europi (50 darivanja/1000 stanovnika).
                        <br></br>
                        Anketirali smo ljude o motivima za darivanje krvi:
                        <br></br>
                        Odgovori darivatelja krvi: najčešći razlog zbog kojeg daruju krv je izrazito human - želja da se učini dobro djelo i da se pomogne bolesniku. Darivatelji krvi imaju divan osjećaj osobnog zadovoljstva da su spasili nečiji život.
                        <br></br>
                        Odgovori ne darivatelja krvi: najčešći razlog za nedarivanje krvi je strah i slabo znanje o potrebama i samom darivanju krvi.
                        <br></br>
                        Sve što je u svezi s darivanjem krvi treba biti javno, bez tajni, dobro obrazloženo. Sve nejasnoće i zablude trebaju biti razjašnjene jer se time razbija strah u ljudi. Što je bolje informirano pučanstvo, veća je vjerojatnost da će ljudi prepoznati neke od motiva za darivanje krvi.

                    </Typography>
                )}
                <ListItemButton onClick={() => handleQuestionClick(9)}>
                    <Typography variant="h6" color="#b2102f">
                        Koje osobine ima prosječni dobrovoljni davatelj krvi u Hrvatskoj? {" "}
                    </Typography>{" "}
                </ListItemButton>
                {selectedQuestion === 9 && (
                    <Typography variant="body1">
                        Prosječna je dob darivatelja krvi u Hrvatskoj 32 godine.
                        <br></br>
                        Davatelji  krvi pretežno su muškarci, osobe u braku koje imaju jedno ili više djece i pripadaju srednjem socijalno-ekonomskom sloju.
                        <br></br>
                        Vrlo često te osobe imaju izražen socijalni osjećaj i aktivne su u različitim kulturnim i športskim društvima.

                    </Typography>
                )}
                <ListItemButton onClick={() => handleQuestionClick(10)}>
                    <Typography variant="h6" color="#b2102f">
                        Gdje i kada se može darivati krv?   {" "}
                    </Typography>{" "}
                </ListItemButton>
                {selectedQuestion === 10 && (
                    <Typography variant="body1">
                        Krv možete darivati svakodnevno na organiziranim akcijama darivanja krvi kao i u nekim transfuzijskim centrima.<br></br>
                        Redovite akcije darivanja krvi provode se u svim većim radnim organizacijama i mjesnim zajednicama.<br></br>
                        Vrijeme i mjesto održanja akcija najavljuju se putem javnih glasila (novine, radio, TV, na web stranicama), a mjesto davanja obilježeno je plakatima.<br></br>
                        Davatelji krvi u Zagrebu mogu dati krv svakoga dana u Hrvatskom zavodu za transfuzijsku medicinu, u Petrovoj 3, od ponedjeljka do petka, od 07:30 do 19:00 sati, a subotom od 07:30 do 15:00 sati.<br></br>
                        Informaciju o mogućnosti darivanja krvi u drugim transfuzijskim centrima možete dobiti izravno u svakom centru.

                    </Typography>
                )}
                <ListItemButton onClick={() => handleQuestionClick(11)}>
                    <Typography variant="h6" color="#b2102f">
                        Zašto je potrebna točna identifikacija darivatelja krvi?
                        {" "}
                    </Typography>{" "}
                </ListItemButton>
                {selectedQuestion === 11 && (
                    <Typography variant="body1">
                        Prije nego pristupite darivanju krvi tražimo od vas osobnu iskaznicu i podatke koje provjeravamo prije svakog sljedećeg darivanja krvi:
                        <br></br>
                        Ime i prezime,
                        mjesto rođenja,
                        JMBG (jedinstveni matični broj građana),
                        adresu stanovanja,
                        mjesto zaposlenja,
                        broj telefona u stanu i na poslu,
                        Knjižicu darivatelja krvi i broj dosadašnjih darivanja krvi, ako imate. <br></br>

                        Svakoj osobi koja odluči darivati krv kompjutorski otvaramo Karton darivatelja krvi, u  kojeg se uz osobne podatke unose i slijedeći podaci:
                        <br></br>
                        Mjesto darivanja krvi,
                        broj trenutnog darivanja,
                        ime liječnika koji je pregledao darivatelja,
                        rezultat liječničkog pregleda prije darivanja,
                        razlozi za odgađanje od darivanja ili trajno isključenje,
                        nuspojave tijekom darivanja,
                        ime djelatnika koji je izvršio uzimanje krvi,
                        rezultate laboratorijskih ispitivanja krvi.
                        <br></br>
                        Navedeni podaci su nam vrlo važni iz sljedećih razloga:
                        <br></br>
                        U pojedinim krajevima Hrvatske više stanovnika često imaju isto ime i prezime, ime oca, pa čak i mjesto i godinu rođenja. Stoga može doći do zamjene u identifikaciji darivatelja krvi. JMBG je jedini podatak koji je različit za svakog građanina Hrvatske.
                        Ako darivatelj krvi ima kasnu reakciju na darivanje krvi, možemo ustanoviti razloge.<br></br>
                        Gdje se dogodi da bolesnik koji je primio krv oboli od krvlju prenosive bolesti praćenjem podataka transfundirane doze krvi od bolesnika do darivatelja krvi, možemo potvrditi ili isključiti mogućnost zaraze transfuzijom krvi.<br></br>
                        Postoji jedan mali broj davatelja krvi koje smo iz zdravstvenih razloga trajno isključili iz daljnjeg darivanja krvi. Neki od njih ne mogu prihvatiti činjenicu da više ne smiju darivati krv i nastoje nastaviti darivati krv. Nastavkom darivanja krvi te osobe mogu oštetiti svoje zdravlje ili zdravlje bolesnika koji bi bio liječen njihovom krvlju. Svaka transfuzijska ustanova obvezna je voditi i zanavljati kartoteku trajno odbijenih davatelja kako bi spriječila uzimanje njihove krvi.<br></br>
                        Nakon svakog darivanja vaša se krv laboratorijski ispituje na prisutnost uzročnika bolesti koji se mogu prenijeti krvlju. Zbog zaštite Vašega zdravlja dužni smo Vas pravodobno obavijestiti o nalazima testiranja.<br></br>
                        Svi podaci o dobrovoljnom darivatelju krvi i rezultati testiranja liječnička su tajna i tajnost podataka je osigurana.<br></br>
                        U Hrvatskom zavodu za transfuzijsku medicinu u Zagrebu u potpunosti su kompjutorizirani svi podaci o darivateljima krvi, dozama uzete krvi, pripravcima priređenim iz doza krvi, rezultatima ispitivanja i ustanovi u koju je dostavljena krv. Svi podaci su zaštićeni od neovlaštenog pristupa.

                    </Typography>
                )}
                <ListItemButton onClick={() => handleQuestionClick(12)}>
                    <Typography variant="h6" color="#b2102f">
                        Zašto Vas liječnik prije darivanja krvi pregleda i postavlja intimna pitanja? {" "}
                    </Typography>{" "}
                </ListItemButton>
                {selectedQuestion === 12 && (
                    <Typography variant="body1">
                        Odluku može li neka osoba dati krv liječnik donosi na osnovi davateljevih podataka o njegovom zdravstvenom stanju i fizikalnog pregleda.
                        <br></br>
                        Svrha je pregleda dvojaka:
                        <br></br>
                        Zaštita zdravlja davatelja od posljedica davanja krvi i zaštita bolesnika, poglavito od prijenosa zaraznih bolesti preko transfuzije krvi.
                        Transfuzijama krvi liječe se bolesnici od najranije životne dobi, pa sve do duboke starosti.
                        Transfuzijsko liječenje mora biti korisno. Ono nikako ne smije biti štetno za bolesnika. Također, darivanje krvi ne smije ugroziti zdravlje darivatelja krvi.
                        <br></br>
                        Potpune podatke o mogućim bolestima darivatelja možemo dobiti samo vašim iskrenim odgovorom. Tijekom liječničkog pregleda, prije darivanja krvi, darivatelj mora iskreno odgovoriti na sva postavljena mu pitanja.
                        <br></br>
                        Darivatelji krvi koji nisu sigurni da su zdravi, odnosno ako postoji sumnja da bi njihova krv mogla štetiti bolesniku, ne smiju darivati krv.
                        <br></br>
                        Većina darivatelja čija je krv opasna za zdravlje primatelja, izdvojiti će se već u toku razgovora ili pregleda.
                        <br></br>
                        Neki darivatelji mogu biti zaraženi, ali ne znaju za zarazu. Njih se otkriva laboratorijskim ispitivanjem na prisutnost biljega krvlju prenosivih bolesti. Laboratorijsko testiranje ne može biti zamjena za liječnički pregled.
                        <br></br>
                        Kada odlučite darivati krv zamislite i ponašajte se kao da će vašu krv primiti netko tko vam je vrlo drag i ne želite mu naškoditi. Darivatelj krvi je u moralnom i etičkom pogledu suodgovoran za sigurnost transfuzijskog liječenja bolesnika.
                        <br></br>
                        Svi podaci dobiveni od darivatelja krvi i rezultati testiranja liječnička su tajna i tajnost podataka je osigurana.
                        <br></br>
                        Molimo, nemojte se ljutiti što vas ispitujemo o vašem intimnom ponašanju i molimo vas da odgovarate iskreno. Biti darivatelj krvi privilegija je koja sadrži odgovornost prema bolesniku.

                    </Typography>
                )}
                <ListItemButton onClick={() => handleQuestionClick(13)}>
                    <Typography variant="h6" color="#b2102f">
                        Zašto se organizira dobrovoljno darivanje krvi? {" "}
                    </Typography>{" "}
                </ListItemButton>
                {selectedQuestion === 13 && (
                    <Typography variant="body1">
                        Krv nije moguće proizvesti na umjetan način. Jedini izvor toga lijeka je čovjek - darivatelj krvi. Svi mi, kada nam zatreba krv kao lijek, ovisni smo samo o dobrovoljnim darivateljima krvi.
                        <br></br>
                        Kako bi se osiguralo brzo, kvalitetno i sigurno liječenje bolesnika potrebno je uvijek imati dovoljan broj darivatelja krvi, a time i dovoljne količine krvi u pričuvi.
                        Program okupljanja dobrovoljnih darivatelja krvi je socijalni program. U Hrvatskoj, kao i u drugim europskim zemljama, odnos između darivatelja i transfuzijske službe osniva se na partnerstvu između darivatelja krvi, društva/zajednice i transfuzijske službe.
                        U osnovi transfuzijske djelatnosti jest program okupljanja darivatelja krvi. O provedbi toga programa ovisi liječenje bolesnika transfuzijama krvi, krvnim pripravcima i derivatima plazme.
                        <br></br>
                        Načela rada transfuzijske djelatnosti regulirani su zakonima, propisima i uputama radi:
                        <br></br>
                        osiguranja mogućnosti liječenja transfuzijama krvi, krvnim pripravcima i derivatima plazme svakom bolesniku kojem je takvo liječenje potrebno,
                        osiguranja opskrbe krvlju i krvnim pripravcima tijekom čitave godine, u količinama koje su dovoljne za liječenje bolesnika i postavljanje dijagnoze,
                        sigurnosti darivatelja i bolesnika. Potrebno je postići najviši prihvatljiv standard u prikupljanju krvi, prikupljanju pojedinih krvnih sastojaka, laboratorijskom ispitivanju, izradi pripravaka iz krvi i njihovoj upotrebi primjenom svih poznatih znanstvenih spoznaja,
                        provedbe djelotvornog i ekonomičnog uzimanja, obrade i uporabe nacionalnih zaliha krvi i krvnih pripravaka.

                    </Typography>
                )}
                <ListItemButton onClick={() => handleQuestionClick(14)}>
                    <Typography variant="h6" color="#b2102f">
                        Tko organizira dobrovoljno darivanje krvi? {" "}
                    </Typography>{" "}
                </ListItemButton>
                {selectedQuestion === 14 && (
                    <Typography variant="body1">
                        Organizaciju dobrovoljnog darivanja krvi u većini zemalja svijeta provode humanitarne organizacije poput Crvenog križa i Zelenog polumjeseca, razni klubovi dobrovoljnih darivatelja krvi i transfuzijska služba. <br></br>
                        U Hrvatskoj, promidžbu davalaštva i organizaciju akcija darivanja krvi zajednički provode Hrvatski Crveni križ i Transfuzijska služba Hrvatske na načelima dobrovoljnosti, anonimnosti, besplatnosti i solidarnosti.<br></br>
                        Odabir darivatelja krvi i uzimanje krvi obavljaju stručni, medicinski djelatnici transfuzijske službe u zdravstvenim ustanovama koje su u državnom ili županijskom vlasništvu.<br></br>
                        Pripravu krvi i krnih pripravaka za transfuzijsko liječenje bolesnika provode transfuzijske ustanove u državnom ili županijskom vlasništvu.<br></br>
                        Zdravstvene ustanove u privatnome vlasnišvu ne smiju ni uzimati krv, ni priređivati krvne pripravke.

                    </Typography>
                )}
                <ListItemButton onClick={() => handleQuestionClick(15)}>
                    <Typography variant="h6" color="#b2102f">
                        Tko je dobrovoljni darivatelj krvi?    {" "}
                    </Typography>{" "}
                </ListItemButton>
                {selectedQuestion === 15 && (
                    <Typography variant="body1">
                        Definiciju dobrovoljnog darivatelja krvi odredila je Međunarodna udruga transfuziologa (ISBN), Međunarodni Crveni križ (IFCR), Svjetska zdravstvena organizacija (WHO) i Europsko vijeće (Council of Europe) i prihvaćena je u svim zemljama svijeta.
                        <br></br>
                        Dobrovoljni darivatelj krvi je osoba koja daruje krv, plazmu ili stanične dijelove krvi po svojoj slobodnoj volji i ne prima za to nikakvu nadoknadu, ni novčanu niti na način koji se može smatrati nadomjestkom novca. Skromna uspomena (dar) i osvježenje nakon davanja krvi prihvatljivi su za dobrovoljno davalaštvo krvi. <br></br>
                        Dobrovoljni darivatelji krvi je posredan, aktivan sudionik u liječenju bolesnika, tj. on je aktivna veza između zdravog dijela društva i bolesnika.

                    </Typography>
                )} */}

    //         </List >
    //     </Container >
    // );
}

export default function FaqEmployee(props: any) {
    return (
        <FaqEdit />
    );
}

function setShowForm(arg0: boolean) {
    throw new Error("Function not implemented.");
}
function setDialogContent(arg0: string) {
    throw new Error("Function not implemented.");
}

