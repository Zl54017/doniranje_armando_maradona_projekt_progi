import React, { useState } from "react";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";

function Faq() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const handleQuestionClick = (index: number) => {
    // If the same question is clicked again, close it
    setSelectedQuestion((prev) => (prev === index ? null : index));
  };

  return (
    <Container>
      <List>
        <ListItemButton onClick={() => handleQuestionClick(0)}>
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
      </List>
    </Container>
  );
}

export default Faq;
