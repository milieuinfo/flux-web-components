import { html } from 'lit-html';

export const privacyContentSection = () => html`
    <div class="vl-content-block">
        <div class="vl-grid vl-stacked-medium">
            <div class="vl-column vl-column--8 vl-column--m-8 vl-column--s-12 vl-column--xs-12">
                <vl-side-navigation-reference>
                    <div class="vl-grid vl-stacked-large">
                        <div id="privacy-department" class="vl-column vl-column--12 vl-column--m-12">
                            <vl-title type="h2">Het Departement Omgeving en uw privacy</vl-title>
                            <p>
                                Op 25 mei 2018 werd de Europese ‘Algemene Verordening Gegevensbescherming’ (AVG), ook
                                gekend onder de Engelse naam ‘General Data Protection Regulation’ (GDPR) van kracht.
                                Naar aanleiding daarvan heeft het Departement Omgeving zijn privacybeleid verduidelijkt.
                                Om zijn dienstverlening verder te optimaliseren, beheert en gebruikt het departement
                                alle persoonsgegevens die het verzamelt op een veilige, respectvolle manier en als een
                                goede huisvader.
                            </p>
                        </div>
                        <div class="vl-column vl-column--12 vl-column--m-12">
                            <vl-title type="h2" id="privacy-declaration">Privacyverklaring</vl-title>
                            <div class="vl-grid vl-stacked-medium">
                                <div class="vl-column vl-column--12 vl-column--m-12">
                                    <vl-title type="h3" id="privacy-declaration-who"
                                        >Wie is verantwoordelijk voor de verwerking van mijn persoonsgegevens?
                                    </vl-title>
                                    <div class="vl-grid vl-stacked-medium">
                                        <div class="vl-column vl-column--12 vl-column--m-12">
                                            <vl-typography>
                                                <p>
                                                    Het Departement Omgeving verwerkt gegevens van haar doelgroepen en
                                                    contactpersonen (burgers, medewerkers van andere
                                                    overheden/organisaties/ondernemingen, medewerkers van scholen of
                                                    MOS-referentiepersonen, adviesbureaus, experten, …) en is voor die
                                                    gegevensverwerkingen de verwerkingsverantwoordelijke in de zin van
                                                    de Algemene Verordening Gegevensbescherming. We verwerken alleen
                                                    persoonsgegevens als dat noodzakelijk is om de taken die ons zijn
                                                    toegewezen te kunnen verrichten. We verwerken de gegevens altijd in
                                                    overeenstemming met de bepalingen van de algemene verordening
                                                    gegevensbescherming (AVG), en met de bepalingen van de federale en
                                                    Vlaamse regelgeving over de bescherming van natuurlijke personen bij
                                                    de verwerking van persoonsgegevens.
                                                </p>
                                                <p>
                                                    In een aantal gevallen verwerken externe partners persoonsgegevens
                                                    in opdracht van het Departement Omgeving. Met deze verwerkers wordt
                                                    een verwerkingsovereenkomst afgesloten, conform de bepalingen van
                                                    art. 28 AVG. Ook in dit geval blijft het Departement Omgeving de
                                                    eindverantwoordelijke voor de verwerking.
                                                </p>
                                                <p>
                                                    Het Departement treedt voor een aantal specifieke taken op als
                                                    co-verwerkingsverantwoordelijke. Dit betekent dat het Departement
                                                    samen met andere partners verantwoordelijk is voor de verwerking van
                                                    persoonsgegevens. Met de co-verwerkingsverantwoordelijken wordt een
                                                    samenwerkingsovereenkomst afgesloten, conform de bepalingen van art.
                                                    26 AVG.
                                                </p>
                                            </vl-typography>
                                        </div>
                                        <div class="vl-column vl-column--12 vl-column--m-12">
                                            <vl-title type="h4">Over het Departement Omgeving</vl-title>
                                            <p>
                                                Het Departement Omgeving van de Vlaamse overheid is een officieel
                                                overheidsorgaan dat als doel heeft het beleid en de handhaving van de
                                                Vlaamse overheid inzake de beleidsthema’s Ruimtelijke ordening,
                                                Leefmilieu, Natuur en Energie vorm te geven en te realiseren. Met behulp
                                                van de informatiesystemen en de methoden van het Departement Omgeving
                                                van de Vlaamse Overheid worden inventarissen gemaakt, beleidsmaatregelen
                                                uitgevoerd en informatie verstrekt aan het beleidsdomein, aan andere
                                                overheden, inspectiediensten en burgers.
                                            </p>
                                        </div>
                                        <div class="vl-column vl-column--12 vl-column--m-12">
                                            <vl-contact-card>
                                                <vl-infoblock slot="info" type="contact">
                                                    <vl-title type="h4" slot="title" custom-css="h4 {font-size: var(--vl-font-size); margin-top: 1rem; }"> Departement Omgeving </vl-title>
                                                </vl-infoblock>
                                                <vl-properties slot="properties" custom-css="dl:has(.item) { margin-top: 0.8rem; display: block; }">
                                                    <label>Adres</label>
                                                    <data>
                                                        <div>Herman Teirlinckgebouw</div>
                                                        <div>Havenlaan 88</div>
                                                        <div>1000 Brussel, België</div>
                                                    </data>
                                                    <label>Telefoon</label>
                                                    <data>
                                                        <vl-link
                                                            href="tel:02 553 80 11"
                                                            icon-placement="after"
                                                            icon="phone"
                                                        >
                                                            02 553 80 11
                                                        </vl-link>
                                                    </data>
                                                    <label>E-mail</label>
                                                    <data>
                                                        <vl-link
                                                            href="mailto:omgeving@vlaanderen.be"
                                                            icon-placement="after"
                                                            icon="mail"
                                                        >
                                                            omgeving@vlaanderen.be
                                                        </vl-link>
                                                    </data>
                                                    <label>Website</label>
                                                    <data>
                                                        <vl-link href="http://www.omgevingvlaanderen.be" external>
                                                            http://www.omgevingvlaanderen.be
                                                        </vl-link>
                                                    </data>
                                                    <label>KBO-nummer</label>
                                                    <data>
                                                        0316.380.841 (ondernemingsnummer van de Vlaamse Overheid)
                                                    </data>
                                                </vl-properties>
                                            </vl-contact-card>
                                        </div>
                                    </div>
                                </div>
                                <div class="vl-column vl-column--12 vl-column--m-12">
                                    <vl-title type="h3" id="privacy-declaration-process"
                                        >Verwerking van persoonsgegevens
                                    </vl-title>
                                    <div class="vl-grid vl-stacked-medium">
                                        <div class="vl-column vl-column--12 vl-column--m-12">
                                            <p>
                                                Het Departement Omgeving verwerkt persoonsgegevens van u als burger of
                                                als medewerker van een overheid/bestuur, organisatie of onderneming. De
                                                Algemene Verordening Gegevensbescherming geeft in Artikel 4 volgende
                                                definitie van het begrip ‘verwerking’: “een bewerking of een geheel van
                                                bewerkingen met betrekking tot persoonsgegevens of een geheel van
                                                persoonsgegevens, al dan niet uitgevoerd via geautomatiseerde procedés,
                                                zoals het verzamelen, vastleggen, ordenen, structureren, opslaan,
                                                bijwerken of wijzigen, opvragen, raadplegen, gebruiken, verstrekken door
                                                middel van doorzending, verspreiden of op andere wijze ter beschikking
                                                stellen, aligneren of combineren, afschermen, wissen of vernietigen van
                                                gegevens”.
                                            </p>
                                        </div>
                                        <div class="vl-column vl-column--12 vl-column--m-12">
                                            <vl-title type="h4"
                                                >Hoe verzamelen en verwerken we uw persoonsgegevens?
                                            </vl-title>
                                            <vl-typography>
                                                <p>
                                                    Het Departement Omgeving kan uw persoonsgegevens op verschillende
                                                    manieren verzamelen:
                                                </p>
                                                <ul>
                                                    <li>
                                                        We kunnen gegevens rechtstreeks bij u opvragen in een formulier
                                                        of in documenten die u bij een formulier moet voegen. Die
                                                        documenten zijn opgesomd in de regelgeving.
                                                    </li>
                                                    <li>
                                                        Daarnaast vragen we gegevens op bij andere overheidsdiensten die
                                                        er al over beschikken. We leven daarbij altijd de bepalingen na
                                                        over de bescherming van natuurlijke personen bij de verwerking
                                                        van persoonsgegevens, die in voorkomend geval op federaal of
                                                        Vlaams niveau vastgelegd zijn. Voor de toegang tot authentieke
                                                        bronnen zoals bv. het Rijksregister heeft het Departement
                                                        Omgeving een aantal machtigingen gekregen om deze
                                                        persoonsgegevens op te vragen en te verwerken.
                                                    </li>
                                                </ul>
                                            </vl-typography>
                                        </div>
                                        <div class="vl-column vl-column--12 vl-column--m-12">
                                            <vl-title type="h4">Waarvoor verwerken we uw persoonsgegevens? </vl-title>
                                            <vl-typography>
                                                <p>
                                                    Het Departement Omgeving verwerkt persoonsgegevens voor de volgende
                                                    doeleinden:
                                                </p>
                                                <ul>
                                                    <li>
                                                        Om aan wettelijke verplichtingen en beleidsmatig toegewezen
                                                        taken als overheidsinstelling te voldoen;
                                                        <br /><br />
                                                        In Vlaamse Regelgeving worden aan het Departement Omgeving een
                                                        aantal taken opgelegd waarbij de verwerking van persoonsgegevens
                                                        expliciet verplicht wordt. De verwerking is in dat geval beperkt
                                                        tot wat door die wettelijke verplichting bepaald wordt.
                                                        <br /><br />
                                                        Voor andere verwerkingen bestaat geen expliciete verplichting in
                                                        een wettekst, maar is de verwerking van persoonsgegevens een
                                                        noodzaak voor de uitvoering van beleidstaken die aan het
                                                        Departement zijn toegewezen.
                                                    </li>
                                                    <li>
                                                        Om te voldoen aan contractuele verplichtingen of administratieve
                                                        handelingen te kunnen verrichten;
                                                        <br /><br />
                                                        Bij de uitvoering van haar taken neemt het Departement ook
                                                        contractuele verbintenissen op zich. Sommige van deze
                                                        verbintenissen vereisen de verwerking van persoonsgegevens. Ook
                                                        hier is de verwerkte informatie steeds beperkt tot die gegevens
                                                        die strikt noodzakelijk zijn voor de uitvoering van
                                                        overeenkomsten. (financiële administratie en facturatie,
                                                        personeelsadministratie, rechtenbeheer, beheer
                                                        gebruikersovereenkomst)
                                                    </li>
                                                    <li>
                                                        Om u te informeren over nieuwe ontwikkelingen in thema’s
                                                        waarvoor het Departement Omgeving verantwoordelijkheden draagt.
                                                        <br /><br />
                                                        Het Departement Omgeving geeft een aantal nieuwsbrieven uit over
                                                        thema's die nauw verbonden zijn met haar taken. Het informeren
                                                        van burgers kadert in de beleidstaken van de overheid. Gezien
                                                        het hier over directe communicatie gaat, is deze verwerking
                                                        gebaseerd op de toestemming van de betrokkene. U kiest dus zelf
                                                        of u zich in- of uitschrijft voor deze communicatie.
                                                    </li>
                                                </ul>
                                            </vl-typography>
                                        </div>
                                        <div class="vl-column vl-column--12 vl-column--m-12">
                                            <vl-title type="h4">Welke persoonsgegevens worden verwerkt? </vl-title>
                                            <vl-typography>
                                                <p>
                                                    In dit kader verwerkt het Departement Omgeving, naargelang de aard
                                                    van de relatie met u als burger, of medewerker van een
                                                    overheid/bestuur, organisatie of onderneming en de noodzakelijke
                                                    verwerking van (persoons)gegevens mogelijk de volgende gegevens:
                                                </p>
                                                <ul>
                                                    <li
                                                        >Aanhef/aanspreking
                                                    </li>
                                                    <li>Voornaam </li>
                                                    <li>Tussenvoegsel </li>
                                                    <li>Familienaam </li>
                                                    <li
                                                        >Rijksregisternummer
                                                    </li>
                                                    <li>Geslacht </li>
                                                    <li>Geboortedatum </li>
                                                    <li
                                                        >Leeftijd of geboortejaar
                                                    </li>
                                                    <li>Nationaliteit </li>
                                                    <li>Adres(sen) </li>
                                                    <li>E-mailadres(sen) </li>
                                                    <li>Telefoon/gsm/fax </li>
                                                    <li
                                                        >Beroepsgegevens, diploma’s, certificeringen
                                                    </li>
                                                    <li
                                                        >Strafrechtelijke en justitiële gegevens
                                                    </li>
                                                </ul>
                                                <p>
                                                    Tijdens het gebruik van de informatieverwerkende systemen door
                                                    medewerkers of door uzelf (bijvoorbeeld bij ingave in of consultatie
                                                    van een via webtoegang beschikbaar gestelde applicatie) worden door
                                                    het Departement Omgeving en/of de door haar aangewezen verwerkers
                                                    ook bepaalde gegevens verzameld. Het gaat hier om gegevens die
                                                    vereist zijn voor de dienstverlening en de bewaking van de kwaliteit
                                                    van de verzamelde data van het Departement Omgeving. Deze gegevens
                                                    kunnen door het Departement of een door haar aangewezen
                                                    verwerker/dienstverlener onder strikte voorwaarden gebruikt worden
                                                    als er bijvoorbeeld klachten zijn over de verbinding of het niet
                                                    naar behoren functioneren van een software/webtoepassing.
                                                    Afhankelijk van de activiteit die u daarbij als betrokkene verricht,
                                                    verwerkt het Departement Omgeving in dit kader mogelijk de volgende
                                                    gegevens:
                                                </p>
                                                <ul>
                                                    <li>IP-adres </li>
                                                    <li
                                                        >gebruikersnaam (login) of identificatienummer
                                                    </li>
                                                    <li
                                                        >eID identificatie- en authenticatiegegevens
                                                    </li>
                                                    <li
                                                        >tijdstip van handelingen in de software
                                                    </li>
                                                    <li
                                                        >registratie van de handelingen in de software (logging).
                                                    </li>
                                                </ul>
                                            </vl-typography>
                                        </div>
                                        <div class="vl-column vl-column--12 vl-column--m-12">
                                            <vl-title type="h4">Hoelang bewaren we uw persoonsgegevens? </vl-title>
                                            <vl-typography>
                                                <p>
                                                    Het Departement Omgeving verzamelt niet meer gegevens dan
                                                    noodzakelijk voor de dienstverlening die zij geacht wordt te leveren
                                                    en wenst deze niet langer bij te houden dan wettelijk verplicht,
                                                    noodzakelijk of aanvaardbaar. Volgens de algemene regel mogen we uw
                                                    persoonsgegevens alleen bewaren tijdens de periode waarin ze
                                                    noodzakelijk zijn om bepaalde diensten te verlenen. We bewaren uw
                                                    gegevens dus zolang u gebruikmaakt van onze diensten. Daarna bewaren
                                                    we uw gegevens nog gedurende de termijn waarin we ons moeten kunnen
                                                    verantwoorden voor de verleende diensten. Na verloop van die
                                                    verjaringstermijn worden de gegevens verwijderd conform aan de
                                                    bepalingen van het Vlaams Archiefdecreet, tenzij ze van historisch,
                                                    cultureel of algemeen belang zijn.
                                                </p>
                                                <p>
                                                    Bij de bewaring wordt een onderscheid gemaakt tussen de periode
                                                    waarin uw dossier actief is en de periode waarin het passief wordt.
                                                    Uw dossier is actief zolang u van de verleende dienst gebruikmaakt.
                                                    Alle medewerkers die uw gegevens nodig hebben om hun taak te kunnen
                                                    uitoefenen, hebben dan toegang tot uw gegevens. Nadien wordt uw
                                                    dossier passief en heeft enkel een beperkt aantal medewerkers van de
                                                    bevoegde dienst toegang tot uw gegevens.
                                                </p>
                                            </vl-typography>
                                        </div>
                                        <div class="vl-column vl-column--12 vl-column--m-12">
                                            <vl-title type="h4">Persoonsgegevens van kinderen</vl-title>
                                            <p>
                                                In principe gebeurt er geen systematische verwerking van
                                                persoonsgegevens van kinderen onder de door de AVG en de Belgische
                                                wetgever bepaalde leeftijdsgrens.
                                            </p>
                                        </div>
                                        <div class="vl-column vl-column--12 vl-column--m-12">
                                            <vl-title type="h4">Beeldmateriaal</vl-title>
                                            <p>
                                                Voor opname en gebruik (publicatie) van beeldmateriaal zoals foto of
                                                film, wordt gevraagd om toestemming als de geportretteerden duidelijk
                                                individueel herkenbaar zijn.
                                            </p>
                                        </div>
                                        <div class="vl-column vl-column--12 vl-column--m-12">
                                            <vl-title type="h4"
                                                >Mededeling van persoonsgegevens aan derde partijen
                                            </vl-title>
                                            <vl-typography>
                                                <p>
                                                    Uw gegevens worden hoofdzakelijk intern verwerkt door onze
                                                    medewerkers. Daarnaast worden uw persoonsgegevens doorgegeven aan
                                                    deze categorieën van ontvangers:
                                                </p>
                                                <ul>
                                                    <li>
                                                        verwerkers: voor bepaalde verwerkingen doet het Departement
                                                        Omgeving een beroep op externe dienstverleners, die (een deel
                                                        van) de gegevensverwerking uitvoeren. Deze verwerkers ontvangen
                                                        de persoonsgegevens die ze nodig hebben om die opdrachten uit te
                                                        voeren, en kunnen deze enkel gebruiken binnen de voorwaarden die
                                                        het Departement bepaalt. Zij mogen je persoonsgegevens dus niet
                                                        niet hergebruiken voor hun eigen doeleinden, en moeten ze
                                                        verwijderen of terugzenden bij het einde van hun opdracht.
                                                    </li>
                                                    <li>
                                                        sociale media: het Departement Omgeving is aanwezig op sociale
                                                        media. De informatie die via onze pagina's bij sociale media
                                                        gedeeld wordt, is niet exclusief binnen het beheer van het
                                                        Departement. Ook de aanbieders van de sociale media hebben daar
                                                        toegang toe, en bepalen zelf hoe ze die informatie gebruiken. We
                                                        raden je aan om dus ook de gebruiksvoorwaarden en het
                                                        privacybeleid van deze sociale media te lezen.
                                                    </li>
                                                    <li>
                                                        andere overheden: het Departement Omgeving geeft
                                                        persoonsgegevens door aan andere overheden, wanneer daar een
                                                        rechtmatige basis voor bestaat. Dat kan een wettelijke
                                                        verplichting zijn, of een hergebruik van verzamelde
                                                        persoonsgegevens voor doeleinden die niet onverenigbaar zijn met
                                                        de oorspronkelijke verzameling. Welke persoonsgegevens precies
                                                        worden doorgegeven, wordt bepaald in een protocol, dat publiek
                                                        beschikbaar is.
                                                    </li>
                                                </ul>
                                                <p>
                                                    Indien er bepaalde persoonsgegevens worden overgemaakt aan of
                                                    bekomen van andere entiteiten, overheden of derde partijen, dan
                                                    gebeurt dit onder daarvoor bekomen machtigingen of afgesloten
                                                    protocollen. Deze documenten zijn gepubliceerd op deze pagina.
                                                </p>
                                            </vl-typography>
                                        </div>
                                    </div>
                                </div>
                                <div class="vl-column vl-column--12 vl-column--m-12">
                                    <vl-title type="h3" id="privacy-declaration-measures">
                                        Maatregelen in het kader van de Algemene verordening Gegevensbescherming
                                    </vl-title>
                                    <div class="vl-grid vl-stacked-medium">
                                        <div class="vl-column vl-column--12 vl-column--m-12">
                                            <vl-title type="h4">Register van gegevensverwerkingen</vl-title>
                                            <vl-typography>
                                                <p>
                                                    Er wordt, in overeenstemming met de vereisten van de Algemene
                                                    Verordening Gegevensbescherming, een register van
                                                    gegevensverwerkingen opgesteld. Dit wordt geactualiseerd indien zich
                                                    wijzigingen aandienen. Een dergelijk register (inventaris) voor de
                                                    verwerking van persoonsgegevens is verplicht en kan worden
                                                    opgevraagd door de Vlaamse Toezichtscommissie (VTC). Elke
                                                    organisatie die persoonsgegevens verwerkt en gevat is door de
                                                    Algemene Verordening Gegevensbescherming is verplicht aan de Vlaamse
                                                    Toezichtscommissie inzage in het register te geven.
                                                </p>
                                                <p>
                                                    Voor die verwerkingen waarbij het Departement Omgeving optreedt als
                                                    <strong>verantwoordelijke</strong> voor de verwerking van gegevens
                                                    bevat het register de volgende informatie:
                                                </p>
                                                <ul>
                                                    <li>
                                                        de naam en contactgegevens van verantwoordelijke (of diens
                                                        vertegenwoordiger, wanneer de verantwoordelijke buiten de
                                                        Europese Unie is gevestigd), en van de functionaris voor
                                                        gegevensbescherming of FG – de Data Protection Officer (DPO).
                                                    </li>
                                                    <li
                                                        >de doeleinden waarvoor gegevens worden verwerkt;
                                                    </li>
                                                    <li>
                                                        de categorieën gegevens (bijvoorbeeld Rijksregistergegevens,
                                                        contactgegevens, betaalgegevens …);
                                                    </li>
                                                    <li>
                                                        de categorieën betrokkenen (bijvoorbeeld: klanten,
                                                        websitebezoekers, werknemers …);
                                                    </li>
                                                    <li>
                                                        de categorieën ontvangers (aan wie worden de gegevens
                                                        verstrekt?);
                                                    </li>
                                                    <li>
                                                        informatie over eventuele doorgifte van gegevens naar landen
                                                        buiten de Europese Unie;
                                                    </li>
                                                    <li>
                                                        de bewaartermijnen en gebeurlijk termijnen voor vernietiging van
                                                        de gegevens;
                                                    </li>
                                                    <li>
                                                        de manieren waarop gegevens zijn beveiligd (bijvoorbeeld:
                                                        encryptie, logische toegangscontrole, pseudonimisering,
                                                        anonimisering in geval van bepaalde verdere verwerkingen, …).
                                                    </li>
                                                </ul>
                                                <p>
                                                    Voor die verwerkingen waarvoor het Departement Omgeving optreedt als
                                                    <strong>verwerker</strong> is het register bevat het register per
                                                    verantwoordelijke de volgende informatie:
                                                </p>
                                                <ul>
                                                    <li>
                                                        de naam en contactgegevens van de verwerker en de
                                                        verantwoordelijke (of hun vertegenwoordigers) en (indien
                                                        voorzien) de functionaris voor gegevensbescherming;
                                                    </li>
                                                    <li>
                                                        de categorieën verwerkingen (dit komt overeen met de doeleinden
                                                        uit het register van de verantwoordelijke);
                                                    </li>
                                                    <li>
                                                        informatie over eventueel doorgifte van gegevens naar landen
                                                        buiten de Europese Unie;
                                                    </li>
                                                    <li
                                                        >de manieren waarop gegevens zijn beveiligd.
                                                    </li>
                                                </ul>
                                                <p>
                                                    Het Departement Omgeving spant zich in om de verwerkingsactiviteiten
                                                    van de processen binnen haar afdelingen en diensten in kaart te
                                                    brengen en deze inventarisatie (verwerkt in het register van
                                                    verwerkingsactiviteiten) wordt op permanente basis geoptimaliseerd
                                                    en geactualiseerd.
                                                </p>
                                            </vl-typography>
                                        </div>

                                        <div class="vl-column vl-column--12 vl-column--m-12">
                                            <vl-title type="h4">
                                                Toe te passen principes vereist door de Algemene Verordening
                                                Gegevensbescherming
                                            </vl-title>

                                            <div class="vl-grid vl-stacked-medium">
                                                <div class="vl-column vl-column--12 vl-column--m-12">
                                                    <p>
                                                        Het risico voor een privacyschending of het niet kunnen
                                                        garanderen van de rechten van u als betrokkene wordt mee in
                                                        kaart gebracht en voor die activiteiten die een verhoogd
                                                        risicoprofiel hebben inzake bescherming van de privacy wordt een
                                                        gegevensbeschermingseffectbeoordeling (GEB) uitgevoerd. Ook de
                                                        andere principes van de AVG zoals gegevensbescherming door
                                                        ontwerp en met standaardinstellingen, incidentbeheer voor
                                                        informatieveiligheids- en privacy-incidenten met procedure voor
                                                        melding en aanpak van gegevenslek en gegevensverlies worden
                                                        meegenomen in de aanpak van het Departement Omgeving inzake
                                                        privacybescherming.
                                                    </p>
                                                </div>
                                                <div class="vl-column vl-column--12 vl-column--m-12">
                                                    <vl-typography>
                                                        <p>
                                                            Het Departement Omgeving voorziet in de nodige maatregelen
                                                            om persoonsgegevens en privacy te beschermen, zowel in
                                                            fysieke vorm, in de informatiesystemen en online. Het
                                                            Departement Omgeving draagt zorg hiervoor door passende
                                                            organisatorische en technische maatregelen te treffen om
                                                            persoonsgegevens te beveiligen en ongeoorloofde toegang tot
                                                            en gebruik van informatie te vermijden, zoals een degelijk
                                                            paswoordbeleid, gebruik van SSL-certificaten op websites
                                                            (https secured filetransfer), kwalitatieve firewalls,
                                                            antivirus/antimalware en intrusie- en anomaliedetectie.
                                                        </p>
                                                        <p>
                                                            Aan de medewerkers van het Departement Omgeving wordt
                                                            toegang tot persoonlijke informatie verleend enkel voor
                                                            zover ze die specifieke informatie nodig hebben om hun taken
                                                            en dienstverlening naar behoren uit te voeren. De betrokken
                                                            werknemers kregen in hun opleiding instructies om correct om
                                                            te gaan met vertrouwelijke gegevens. Ambts- en beroepsgeheim
                                                            met betrekking tot behandeling van persoonsgegevens zijn
                                                            volledig van toepassing.
                                                        </p>
                                                        <p>
                                                            De gegevens worden opgeslagen en verwerkt op eigen,
                                                            beveiligde informaticaomgevingen en datacenters van het
                                                            Departement Omgeving of in de beveiligde omgeving van
                                                            verwerkers in opdracht van en onder toezicht van het
                                                            Departement Omgeving.
                                                        </p>
                                                    </vl-typography>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="vl-column vl-column--12 vl-column--m-12">
                                    <vl-title type="h3" id="privacy-declaration-rights"
                                        >Uw rechten als betrokkene
                                    </vl-title>
                                    <div class="vl-grid vl-stacked-medium">
                                        <div class="vl-column vl-column--12 vl-column--m-12">
                                            <vl-typography>
                                                <p>
                                                    De Algemene Verordening Gegevensbescherming voorziet in een aantal
                                                    privacy-rechten, waarop u als ‘betrokkene’ (dit is: natuurlijk
                                                    persoon) beroep op kunt doen. Dit uiteraard rekening houdend met de
                                                    privacyrechten van andere personen en met wettelijke bepalingen en
                                                    beperkingen.
                                                </p>
                                                <p>
                                                    Als betrokkene in de zin zoals bepaald in de Algemene Verordening
                                                    Gegevensbescherming beschikt u over volgende rechten die samengevat
                                                    kunnen worden in “het recht op een correcte, legitieme verwerking
                                                    van uw persoonsgegevens”:
                                                </p>
                                                <ul>
                                                    <li>
                                                        Recht van inzage van de met betrekking tot u verwerkte gegevens
                                                        (AVG art. 15)
                                                    </li>
                                                    <li>
                                                        Recht op rectificatie, of recht op correctie van fouten (AVG
                                                        art. 16)
                                                    </li>
                                                    <li>
                                                        Recht op gegevenswissing (officieel "recht op vergetelheid" of
                                                        ook genoemd “het recht om vergeten te worden”); dit recht is
                                                        toepasbaar in bepaalde gevallen en met name als wij gegevens van
                                                        u verwerken op basis van een geïnformeerde toestemming waarbij
                                                        wij geen wettelijke of andere wettelijke basis kunnen inroepen
                                                        voor verdere verwerking inbegrepen bewaring ervan (AVG art. 17);
                                                    </li>
                                                    <li
                                                        >Recht op beperking van verwerking (AVG art. 18);
                                                    </li>
                                                    <li>
                                                        Notificatie van rechtzetting, van uitwissing of van beperking
                                                        van verwerking (AVG art. 19);
                                                    </li>
                                                    <li>
                                                        Recht op overdraagbaarheid van persoonsgegevens (AVG art. 20);
                                                    </li>
                                                    <li>
                                                        Recht van bezwaar/verzet tegen verwerking van uw gegevens (AVG
                                                        art. 21);
                                                    </li>
                                                    <li>
                                                        Rechten met betrekking tot individuele besluitvorming, inclusief
                                                        profilering (AVG art. 22).
                                                    </li>
                                                </ul>
                                            </vl-typography>
                                        </div>
                                        <div class="vl-column vl-column--12 vl-column--m-12">
                                            <vl-title type="h4">Recht op inzage, verbetering of verwijdering </vl-title>
                                            <vl-typography>
                                                <p>
                                                    Voor de verwerkingen van persoonsgegevens waarbij het Departement
                                                    Omgeving optreedt als de Verwerkingsverantwoordelijke voor de
                                                    gegevensverwerkingen in de zin van de Algemene Verordening
                                                    Gegevensbescherming, kunnen betrokkenen een verzoeken om inzage,
                                                    correctie of verwijdering indienen en zal het Departement Omgeving
                                                    deze behandelen conform de bepalingen die zijn voorgeschreven door
                                                    de Algemene Verordening Gegevensbescherming, rekening houdend met de
                                                    beperkingen voorzien in Art. 23 van de AVG.
                                                </p>
                                                <p>
                                                    Voor de verwerkingen van persoonsgegevens waarbij het Departement
                                                    Omgeving niet als de Verwerkingsverantwoordelijke voor de
                                                    gegevensverwerkingen optreedt in de zin van de Algemene Verordening
                                                    Gegevensbescherming, kunnen verzoeken om inzage, correctie of
                                                    verwijdering niet door het Departement Omgeving zelfstandig worden
                                                    afgehandeld. In dat geval moeten verzoeken om inzage, correctie of
                                                    verwijdering worden ingediend bij de Verwerkingsverantwoordelijke
                                                    voor de gegevensverwerkingen die gebruik maken van de diensten en
                                                    verwerking met /door de informatiesystemen van het Departement
                                                    Omgeving.
                                                </p>
                                                <p>
                                                    Voor meer informatie over de wijze waarop persoonsgegevens worden
                                                    verwerkt binnen het werkingsdomein van het Departement Omgeving of
                                                    het uitoefenen van een recht in het kader van de Algemene
                                                    Verordening Gegevensbescherming kunt u contact opnemen met de Data
                                                    Protection Officer) van het Departement Omgeving (DPO) waarvan de
                                                    contactgegevens onderaan deze pagina terug te vinden zijn.
                                                </p>
                                                <p>
                                                    Daarnaast hebt u het recht om klacht in te dienen bij de Vlaamse
                                                    Toezichtscommissie (VTC), indien u meent dat uw rechten geschaad
                                                    zijn en u zich ook na vraagstelling bij de bevoegde diensten van het
                                                    Departement Omgeving of de door het Departement Omgeving aangestelde
                                                    Functionaris voor gegevensbescherming (DPO) niet voldoende in uw
                                                    rechten erkend weet.
                                                </p>
                                            </vl-typography>
                                        </div>
                                    </div>
                                </div>
                                <div class="vl-column vl-column--12 vl-column--m-12">
                                    <vl-title type="h3" id="privacy-declaration-aplpy">
                                        Toepassing van deze Privacyverklaring
                                    </vl-title>
                                    <vl-typography>
                                        <p>
                                            Deze versie van de Privacyverklaring van het Departement Omgeving is van
                                            toepassing vanaf 25 mei 2018.
                                        </p>
                                        <p>
                                            Als de doelstellingen wijzigen waarvoor verwerking van persoonsgegevens
                                            gebeurt, zal het Departement Omgeving dit publiek melden en hiervan op
                                            transparante wijze mededeling doen in nieuwsbrieven, op de website
                                            <a href="www.omgevingvlaanderen.be" target="_blank"
                                                >www.omgevingvlaanderen.be</a
                                            >
                                            en via andere mediakanalen waarvan het Departement Omgeving gebruik maakt.
                                        </p>
                                        <p>
                                            Het Departement Omgeving behoudt zich het recht voor om de privacyverklaring
                                            aan te passen aan nieuwe noden of inzichten. Er zal van wijzigingen aan de
                                            Privacyverklaring transparant melding gemaakt worden op de hoofdwebsite van
                                            het Departement Omgeving (<a
                                                href="www.omgevingvlaanderen.be"
                                                target="_blank"
                                                >www.omgevingvlaanderen.be</a
                                            >) alsook op de papieren versie die op eenvoudige aanvraag verkrijgbaar is
                                            bij de Dienst Communicatie van het Departement Omgeving en via de
                                            Functionaris voor gegevensbescherming (Data Protection Officer) van het
                                            Departement Omgeving.
                                        </p>
                                        <p>
                                            Bij vragen over de Privacyverklaring of de aanpassingen eraan, kunt u
                                            terecht bij de Data Protection Officer waarvan u de contactgegevens
                                            terugvindt via de knop 'Hulp nodig?'.
                                        </p>
                                    </vl-typography>
                                </div>
                            </div>
                        </div>
                        <div class="vl-column vl-column--12 vl-column--m-12">
                            <vl-title type="h2" id="privacy-permissions-protocols"
                                >Machtigingen en protocollen
                            </vl-title>
                            <div class="vl-grid vl-stacked-medium">
                                <div class="vl-column vl-column--12 vl-column--m-12">
                                    <vl-title type="h3" id="privacy-permissions-protocols-process">
                                        Machtigingen van de bevoegde autoriteiten en afgesloten protocollen voor het
                                        verwerken van bepaalde gegevens
                                    </vl-title>
                                    <div class="vl-grid vl-stacked-medium">
                                        <div class="vl-column vl-column--12 vl-column--m-12">
                                            <vl-typography>
                                                <p>
                                                    Het Departement Omgeving of de overheidsinstanties waarvoor zij
                                                    handelt als opvolger hebben voor een aantal verwerkingen van
                                                    persoonsgegevens en/of gegevensoverdracht machtiging bekomen van
                                                    Sectorale comités binnen de schoot van de Privacycommissie (CPBL),
                                                    hun opvolgers IVC en de dienst Toegang tot het Rijksregister, of van
                                                    de Vlaamse Toezichtcommissie (VTC). De lijst met toelichting en
                                                    referentie naar het machtigingsbesluit in kwestie wordt verder in
                                                    deze pagina beschikbaar gesteld.
                                                </p>
                                                <p>
                                                    Voor gegevensoverdrachten tussen overheden die beiden als
                                                    verwerkingsverantwoordelijke optreden, sluit het Departement
                                                    Omgeving een protocol af. Volgens de bepalingen van art. 18 van het
                                                    Bestuursdecreet, worden deze protocollen gepubliceerd. U vindt alle
                                                    protocollen waarbij het Departement Omgeving partij is, hieronder.
                                                </p>
                                            </vl-typography>
                                        </div>
                                        <div class="vl-column vl-column--4 vl-column--m-6" medium-size="6">
                                            <vl-document
                                                href="https://cdn.milieuinfo.be/footer-assets/LATEST/docx/privacybeleid-v0.2.docx"
                                            >
                                                <span slot="type">DOCX</span>
                                                <span slot="title">Lijst van aangiften en machtigingen</span>
                                                <span slot="metadata">DOCX - 43 kB</span>
                                            </vl-document>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </vl-side-navigation-reference>
            </div>
            <div class="vl-column vl-column--4 vl-column--m-4 vl-column--s-12 vl-column--xs-12">
                <vl-side-navigation id="side-nav-privacy-content" aria-label="inhoudsopgave">
                    <vl-side-navigation-h1>Op deze pagina</vl-side-navigation-h1>
                    <vl-side-navigation-content>
                        <vl-side-navigation-group>
                            <vl-side-navigation-item>
                                <a href="#privacy-department"> Het Departement Omgeving en uw privacy </a>
                            </vl-side-navigation-item>
                            <vl-side-navigation-item parent="privacy-declaration">
                                <vl-side-navigation-toggle href="#privacy-declaration" child="privacy-declaration">
                                    Privacyverklaring
                                </vl-side-navigation-toggle>
                                <ul>
                                    <vl-side-navigation-item>
                                        <a href="#privacy-declaration-who" parent="privacy-declaration">
                                            Wie is verantwoordelijk voor de verwerking van mijn persoonsgegevens?
                                        </a>
                                    </vl-side-navigation-item>
                                    <vl-side-navigation-item>
                                        <a href="#privacy-declaration-process" parent="privacy-declaration">
                                            Verwerking van persoonsgegevens
                                        </a>
                                    </vl-side-navigation-item>
                                    <vl-side-navigation-item>
                                        <a href="#privacy-declaration-measures" parent="privacy-declaration">
                                            Maatregelen in het kader van de Algemene verordening Gegevensbescherming
                                        </a>
                                    </vl-side-navigation-item>
                                    <vl-side-navigation-item>
                                        <a href="#privacy-declaration-rights" parent="privacy-declaration">
                                            Uw rechten als betrokkene
                                        </a>
                                    </vl-side-navigation-item>
                                    <vl-side-navigation-item>
                                        <a href="#privacy-declaration-aplpy" parent="privacy-declaration">
                                            Toepassing van deze Privacyverklaring
                                        </a>
                                    </vl-side-navigation-item>
                                </ul>
                            </vl-side-navigation-item>
                            <vl-side-navigation-item parent="privacy-permissions-protocols">
                                <vl-side-navigation-toggle href="#privacy-permissions-protocols" child="privacy-permissions-protocols">
                                    Machtigingen en protocollen
                                </vl-side-navigation-toggle>
                                <ul>
                                    <vl-side-navigation-item>
                                        <a
                                            href="#privacy-permissions-protocols-process"
                                            parent="privacy-permissions-protocols"
                                        >
                                            Machtigingen van de bevoegde autoriteiten en afgesloten protocollen voor het
                                            verwerken van bepaalde gegevens
                                        </a>
                                    </vl-side-navigation-item>
                                </ul>
                            </vl-side-navigation-item>
                        </vl-side-navigation-group>
                    </vl-side-navigation-content>
                </vl-side-navigation>
            </div>
        </div>
    </div>
`;
