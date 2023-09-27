# Reflektioner kodkvalitet
[Ref Clean Code av Robert C. Martin]

## Reflektioner kap 2

| Namn och förklaring | Reflektion och regler från Clean Code |
| ------------------- | ------------------------------------- |
| `getCellElementRowCol` (En metod som returnerar HTML-cell-elementet vid koordinaten Row, column). Här har jag har använt col som förkortning för column. Förkortningar är ett gissel. Var det clm eller col? Jag försöker vara konsekvent, men jag imorgon tänker inte alltid på samma sätt. Get indikerar att metoden returnerar något. I det här fallet ett cell element. Jag försöker använda det genomgående. Det gör det lätt att se vad som kan gettas i och med att alla get kommer upp när jag söker. Jag försöker hålla en hierarkisk ordning här så att nästa kategorinivå kommer på tur. Vid sökning av 'getCell' får jag upp dess underkategorier. Programmet hanterar cell och cell element. Cell är mitt data objekt och cell element dess associerade HTML-element. Jag hänger på element för att skilja dem åt. Tyvärr är det kanske inte självklart att element syftar på ett HTML element. Sist anger jag att argumenten ska vara Row och Column, i den ordningen. Ibland kan ett litet ord som 'at' förbättra läsbarheten. Med hänsyn till dessa funderingar kanske __getCellHtmlElementAtRowColumn__ hade varit än bättre. Men på bekostnad av längd och kanske därmed läsbarhet. | Vilseledande och dubbeltydiga namn och förkortningar bör undvikas. `Avoid Disinformation` [s19-20]. Använd sökfunktioner på ett smart sätt. `Use searchable Names` [s22-23] Använd distinkta namn som gör det lätt att hålla isär begrepp. `Make meaningful distictions` [s20-21] |
| `getLongestCellLineOfValueMatchIntersectingCell` (Metod som används för att hitta den längsta matchande raden). Det här är det längsta namnet jag fick till. Det är också det namn jag lagt mest möda på för att få till. Den är omdöpt hundra gånger. Den största svårigheten var att få fram intentionen utan att förstöra läsbarheten. Jag tror jag har misslyckats kapitalt. Jag vill säga att metoden returnerar den längsta raden av celler som matchar värdet hos cellen i fråga som raden skär. Jag skulle också ha velat nämna att den tittar i horisontella, vertikala, och diagonala riktningar för att tydligt berätta vad den gör. Men jag får inte ihop det i ett namn. Har istället skrivit en kommentar vid metoden och i readme-filen. Faktum är att den i nuvarande skick returnerar HTML-element och borde heta getLongestCellHTMLElementLineOfValueMatchingIntersectingCellHTMLElement. Det är uttalbart, men i klass med "...laxar i en lackask...". Det finns på att göra listan att göra om den så att den blir mer oberoende av HTML. | "A name of a method, class or variable should say why it exists, what it does, how to use it - without the need for comments." `Use Intention-Revealing Names` [s18-]. `Use Pronouncable Names.` [s21-22]. |
| `gameBoard` (Är min huvudklass med publika metoder). Hur har jag tänkt när jag använder Matrix och `gameBoard` i samma kontext? Kanske kan man anse att MatrixAnalyzer skulle hetat GameBoardAnalyzer för att hålla ihop namn-koncepten. Nu ser jag det som att MatrixAnalyzer är en potentiellt generell 'tjänst' som kan utvecklas att operera på matriser. En betydligt mer svårmotiverad namngivning var att jag initialt använde cell och square för samma koncept. Det var ohemult opraktiskt. Jag var mycket skeptisk till mitt val att ha ett attribut som heter matrixSize i gameboardklassen. Men det blir rätt bra när man sätter ihop det: myGameBoard.matrixSize.rows. Jag har vägt om jag skulle byta rows mot rowsCount, men avgjorde att det får vara nån måtta på curlingen. Jag har använt signature ibland och value ibland för att syfta till cellers innertext. här borde jag givetvis vara konsekvent. En fälla jag gått i är att använda snarlika namn med någon detalj som skiljer för att kunna skilja dem åt, t ex updateSquare, RefreshSquare. Vilken är vilken nu igen? Nu behöver jag lite credd. Positivt är att klassnamnet gameBoard är ett substantiv - ett objekt - (en, ett, flera...). En dröm, en idé, en känsla... | Det är viktigt att hålla sig till ett enda gemensamt namn för ett visst koncept. `Pick One Word per Concept` [s26]. Class and objects should have noun or noun phrase names. `Class Names` [s25]. |
| `isRowColumnOnBoard` (En hjälpfunktion för att kunna testa om en positionen för en cell är på spelbrädet). Jag tror jag har lyckats bra här med att inte kräva mental mappning för att förstå koden. Namnen är mer genomtänkta än vanligt från min sida. Jag har undvikit att använda intetsägande namn som variabeln temp eller hinken, x, y etc. T ex let siffran = maxAge() eller i = maxAge(). Att använda is och get, update etc ger en tydlig hint om vilken typ av metod det är fråga om. 'Is' säger att den aktuella metoden returnerar en boolean beroende på om row och colum är på brädet. Just nu känns det självklartatt det är Row OCH Column men kan det vara Row ELLER Column? Är inte OnBoard (Ombord vs On game board) lite sött ändå? Kanske borde vara __isRowAndColumnOnGameBoard__? Ibland blir man väldigt sugen på söta namn. Särskilt om man kommer på nåt bra. GimmeDaCellAt_OrIllComeAfterYou! Jag var nära här att börja använda Mxa som prefix till matrixAnalyzer metoder för det lät coolt. Men jag höll emot. | Använd namn som tydligt talar om vad de är, vad de gör o s v. Man ska inte behöva mentalt mappa om namnet. `Avoid Mental Mapping` [s25]. Methods should have verb or verb phrase names... `Method Names` [s25]. `Don't Be Cute`[s26]|
| `addClickEventToCells` (En metod för att aktivera klickfunktion på utvalda celler på spelbrädet.). Event är ett begrepp som är självklart för en programmerare. I det här fallet är Cells ett begrepp från problem-domänen (jmfr t ex schackruta). Det kan krävas lite förståelse för hur spelet ser ut och fungerar för att ta till sig cell. Kanske får man fråga en domänexpert rentav. | `Use Solution Domain Names` [s27]. `Use Problem Domain Names` [s27] |

### Allmänna reflektioner om kap 2

En förhoppning jag har på den här utbildningen är att den skall hjälpa mig att blir mindre impulsiv och mer strukturerad i mitt kodande. En bra början är att skapa sin egen standard och sätta en bra namnkultur. "What follows are some simple rules for creating good names" [18]. Boken är bra på så sätt att den ger en verktygslåda med erfarenheter och konkreta tips.

Kommunikation kräver tydlighet och precision. Ändå är det så svårt! Det är lätt att vara lat och att ta genvägar! En för mig typisk och återkommande tabbe är att använda förkortningar. Jag gillar inte ens förkortningar.

I MatrixSizeRowsCols.ts använder jag "cols" istället för "columns". Shame on me! Förkortningen sparar 0,0000... åh!
På samma tema: Jag hade data-col istället för data-column som attribut i Cell-klassen. Det orsakade flera buggar.

Istället för att fundera över vad jag sparar idag på att slarva borde jag fråga mig om jag har tid att felsöka i flera timmar imorgon.

"Choosing good names takes time but saves more than it takes" [s18]

I den här uppgiften har jag skrivit ett enkelt okomplicerat program och verkligen tvingat mig att tänka till när det gäller namngivning. Faktum är att jag är förvånad över vilken skillnad det gör. Framförallt när jag börjat ändra och råkar införa buggar har det varit markant lättare att felsöka och hitta. Det är som att namngivningen i sig hjälper till att styra upp själva strukturen i koden.

Även efter att ha arbetat med kapitlet under kursen är jag inte fullfjädrad i namngivningskonsten. Snarare väcks nya frågor. Det är som att öppna en verktygslåda (jag älskar verktyg) med nya verktyg. Jag tar upp ett och undrar nyfiket hur det ska användas?

Hur blir det med event? Jag klickar på en knapp och det kan leda till en lång kedja av händelser - Ändra status på gameboardCellen - Kolla om jag vann - I så fall frys spelet - Fira mig etc. Hur döper man den så att den berättar något? Ska den heta handleCellclicked bara? Det kan ju hända olika saker som beror på kontexten just då.

Min standard fylls på...:

'Använda enhetliga namn där det är lämpligt att kategorisera. Använd unika namn för att särskilja.'

'Om variabeln longest dyker upp i många metoder men används i olika syfte kan det vara svårt att hitta rätt och följa koden. Så gör inte det!'

Noise-words [s21]... Det är som att författaren känner mig!

 Jag gillar "One difference between a smart programmer and a professional programmer is that the professional understand that clarity is king". Det är viktigt att förstå att koden är ett budskap som har en eller flera mottagare. Det är viktigt att sändaren förstår att den har ett ansvar att anpassa budskapet så att kommunikationen med mottagaren fungerar. Sändaren kanske måste anpassa budskapet. Mottagarna ska kunna förstå och behandla och kanske "svara" på budskapet. En otydlighet kan en gång på 10000 orsaka en olycka eller 10000 gånger kosta en minut av "måste dubbelkolla". Säg att du jobbat i 20 år med en kodbas och ska lämna över till en nyanställd. Det ställer andra krav än att lämna över koden till din coworker under semestern. Men varför chansa? Låt alltid clarity vara king!

## Reflektioner kap 3

| Metodnamn och länk eller kod | Antal rader ( ej ws ) | Reflektion |
| ------------------- | ------------------------------------- | ------------------------------------- |
| [#getMatchesInSpecifiedDirection(currentCell:HTMLElement, direction:number[]):HTMLElement[]](https://github.com/Jce750/1DV610_L2/blob/4592115bceb789b1364fa4028d73675291cce053/src/MatrixAnalyzer.ts#L49-L74)| 19 | Det här är min längsta funktion. Den är som ett svart hål. När man försöker läsa koden sugs man in där och kommer aldrig därifrån. `Small` [s34]. Den här metoden gör mer än en sak och skulle tjäna på att delas upp i mindre bitar. `Do One Thing` [35]. Den gör saker på en väldigt låg nivå. Dessa bör brytas ut och abstraheras. Abstraktionerna bör sträva efter att vara på en enhetlig nivå i en metod. `One Level of Abstraction per Function` [s36]. While-loopen kunde ha använt gör-tills-break eller continue men det gör den inte.  Istället har den en enda return. Det är bra. En väg in en väg ut! Förutsägbart flöde. Return gör den till en query. Den ska alltså inte samtidigt förändra state på objekt. Använder en argument-array. `Argument Objects` [s43]. Här finns just nu massor av sidoeffekter i form av console.log(). `Have No Side Effects` [s44].|
| [getLongestMatchingLineIntersectingCell(currentCell:HTMLElement):HTMLElement[]](https://github.com/Jce750/1DV610_L2/blob/4592115bceb789b1364fa4028d73675291cce053/src/MatrixAnalyzer.ts#L31-L47%7C)| 16 | This method takes an argument currentCell and lookup things and return a result. `Common Monadic Forms` [s41] En sak som ställer till det är hur jag hanterar directions. Den är en number[][][]. Jag har en nivå med fyra axlar horisont, vertikal och diagonaler. Sen har varje axel positivSida och negativSida så att säga. Jag summerar matchningarna från var sida med den aktuella utgångspunkten. Axlarna kanske skall vara en klass istället? Den har i alla fall en ingång och en return utan break och continue. `Structured Programming` [s48] |
| [#validateInput](https://github.com/Jce750/1DV610_L2/blob/4592115bceb789b1364fa4028d73675291cce053/src/RangeMinMax.ts) | 14 | En range har i det här fallet en övre och en nedre gräns. Den här tar 2 argument min och max och värderar om de är rimliga innan objektet skapas. `Dyadic Functions` [s42] |
| [addclickEventToCells(cellElements:HTMLCollection, onclick: (event: MouseEvent) => void):void](https://github.com/Jce750/1DV610_L2/blob/4592115bceb789b1364fa4028d73675291cce053/src/GameBoard.ts) | 11 | Här ser jag ett exempel på en command-metod som ändrar state utan att returnera något. Men den kan ju kasta undantag. `Command Query Separation` [s45].
| [isRowColumnFiniteIntegers(row:number, column:number)](https://github.com/Jce750/1DV610_L2/blob/4592115bceb789b1364fa4028d73675291cce053/src/Validator.ts)| 11 | Dyadic function: Jag kunde ha valt att låta funktionen kontrollera ett värde i taget och gjort två anrop. Men jag tyckte det här var lagom. `Dyadic Functions` [s42]. new validator().isRowColumnFiniteIntegers(rowIndex,columnIndex) är långt att läsa men det säger vad den gör. `Verbs and Keywords` [s43]. Den hintar också vilka argument som krävs.  Funktionen i sig kunde ha delats upp i flera underfunktioner som isFinite(row), isPositive(row), isInteger(row). ... Aha! så gör jag! Så kan jag kedja de kontroller av row/column jag vill göra. Det blir flexibelt och bra! Det blev alltså new validator(rows).isPositive().isFinite().isInteger() istället. Det blev färre argument och de returnerar en sak. Man får ett exakt felmeddelande som kan innehålla regeln som man brutit mot eller en specifik instruktion istället för en hel manual. Varje funktion gör en sak. I det här fallet kastas ett undantag om det krävs. Apropå undantag. De ska ju hanteras någonstans också. Felhantering är en sak. Förvisso men jag tycker det är ok att ha ett och annat felmeddelande inbäddat i lagom små funktioner. Krystad utbrytning känns ...krystat. `Error Handling is One Thing` [s47].|

### Allmänna reflektioner om kap 3

Koden skall berätta sin egen historia kort, koncist och tydligt. även detta kapitel ger oss verktyg och guidelines med inriktning mot funktioner.

Huvudtesen är att funktioner ska vara små och göra en enda sak!

Jag går vidare med några kommentarer kring argument som hade en signifikant viktning i kapitlet.

"The ideal number of arguments for a function is zero" [s40]
Jag har fått tänka till kring hur jag använder argument. Det känns så självklart när man läser att man ska sikta mot noll argument. Desto svårare att genomföra. Men som nybörjare måste man starta någonstans. Jag kan föreställa mig hur svårt det blir att utföra heltäckande testning när antalet argument ökar.

"In general output arguments should be avoided" [s45].
Jag vet att jag använt out (C#) för att skicka in parametrar som argument till metoder i syfte att låta metoden initialisera parametern till ett visst värde. Men det känns avigt och jag kommer undvika output arguments i det längsta. Det får bli input-args-command-return-patternet istället.

"Passing a boolean into a function is a truly terrible practice" [s41].
Det är inte så längesedan jag använde bitflaggor och det känns fortfarande som att det kan finnas tillfällen när det är användbart. Typ att avvakta att alla blir satta innan man gör nåt. Jag kan förstå att det är svårare att se vad en funktion kommer göra om man skickar in en flagga som argument. Om true gå dit annars hit.

"Reducing the number of arguments by creating objects out of them may seem like cheating, but it's not." [43]
Objekt som argument ser jag som ett av de kraftfulla verktygen i det här avsnittet. Jag har t ex försökt slå ihop row och column till en position-klass. Genast känns det lite mer robust. Den kan ha validering och funktionalitet. Går från att vara värden till objekt helt enkelt. En nackdelen är overheaden som objektet för med sig. Objektet kan kasta undantag och förses med funktionalitet. 

Jag vill inte missa möjligheten att göra reklam för min stora (potentiella) potential:

"Functions should either do something or answer something, but not both" [45]. Detta är min favorit, min aha! Så enkelt så genialt. Som när man kommer på att man använt nåt sen man var liten men gjort fel. Command => uppdatera state, Query => answer. Det liksom gör det enklare att jobba med bara för att företeelserna har fått etiketter. Jag kommer aldrig mer kunna titta på en metod utan att försöka stoppa den i ett av dessa fack.

Hur länge har man använt automatisk testning? Lintning? Det ha varit en god boost för kodkvalitet när det växte fram.

"I also have a suite of unit tests that cover every one of those clumsy lines of code" [s49].
Vid de än så länge få tillfällen när jag skrivit tester parallellt med kod så har testerna hjälpt mig reflektera kring min kod direkt. Mina testfall är inte heltäckande. Jag tänker att målet med testning måste vara att få ner risken till en rimlig nivå inte att testa 100%. Att arbeta med tester under utvecklingen har potential att accentuera en del av de poänger boken gör. Returnerar metoden? Är det lätt att blanda ihop namnen? Ett switch statement hur testar jag det här? En triadic. Hur testar jag den?

"When I write functions they come out long and complicated" [s49]. Jag brukar också börja med en blob som jag sedan smider om till något som jag ämnar ska bli fint. Jag skulle önska att det alltid fanns tid att förbättra saker. Tyvärr är det motstridiga krav som kämpar och leder till kompromisser där man sällan kan känna sig helt nöjd. Det är inte alltid självklart att kräva mer tid för att förbättra något. När är det bra nog?

Sammanfattningsvis "...never forget that your real goal is to tell the story of the system, and that the functions you write need to fit cleanly into a clear and precise language to help you with that telling" [s50].

## Generellt kodkvalitet

Clean code - by the book

- minimal
- efficient
- with care
- one thing
- simple
- readable - literate
- elegant - beautiful
- crisp abstraction

Listan ovan utgör mina favoritbeskrivningar av clean code. Till listan vill jag också foga:

- communication - code communicates
- craft - the beauty of craft!

Redan de gamla grekerna... Okej, vi hoppar fram till industrialismen som fick tillgång till en ny kraft genererad av ånga. Produktiviteten ökade och ångmaskinen var hjärtat som höll den igång. Ett stort antal ångmaskiner exploderade vilket ledde till materiella kostnader såväl som dödade och skadade människor. En av orsakerna var att man inte hade koll på materialframställningsprocesserna och använde spröda material. Det ledde till att man började samla data och forska. Man noterade processer som fungerade och utvecklade därifrån, byggde på och så vidare (kaizen). Det gav tillförlitlighet, låg risk, säker investering - kvalitet.

När jag började jobba fick jag höra om maskindirektivet och riskanalyser. EG ville skapa en friktionsfri inre marknad och ville se till att produkter konkurrerade på lika villkor genom att ge dem gemensamma grundkrav. T ex skulle tillverkaren ha kollat igenom dess risker. Grundkraven specas i standarder. Om produkten uppfyller standarden så vet vi var vi har den. Den uppfyller grundkraven och kan tillåtas konkurrera med andra produkter.

Den unga mjukvarubranchen har inte alltigenom samma förutsättningar som de ovan beskrivna men jag påstår att clean codes syfte linjerar med huvuddragen som jag beskrivit. Tillförlitlighet, lägre risk, standardisering etc

Jag använder gpt 4. Den största nyttan jag har av ai:n är att den hjälper mig att matcha mina frågor med svar från Stackoverflow snabbt och lätt. Den kan generera exempel och förtydliga saker så att jag får en djupare förståelse på kortare tid. Felsökning är ett annat område där den sparar tid. Jag tycker inte den har varit särskilt duktig på att hjälpa mig att utveckla min kodkvalitet. Finliret är kanske fortfarande ett hantverk för oss människor.

Bokens författare [Clean Code - Robert C Martin] förväntar sig att programmeringens abstraktionsnivån kommer lyftas ytterligare. Jag tänker att abstraktion är nödvändig för att ta vara på vunnen kunskap och kunna lägga energi på att jaga ny. I någon mån leder kanske abstraktionen till specialisering. Specialisering är kostsam och ett risktagande som måste vägas mot nyttan av skräddarsydda verktyg. Kommande generationer ai kanske kommer kanske att förskjuta break-even så att vi kan lägga mer energi på specialisering. Ju mer vi vill använda ai desto större krav ställer det på kodkvalitet (påstår jag). Ju bättre vi förklarar vår intention desto bättre kan den hjälpa oss att föreslå hjul som redan uppfunnits. Så att vi kan lyfta blicken.

Under min uppväxt var mjukvara något av en dagslända. Appar kom och gick. Hårdvaran utvecklades i rasande tempo. Många försök i tidens anda att skapa strukturer för framtiden ligger i papperskorgen. Vad består? Vad bygger vi vidare på idag? Idag är branchen mer mogen, mer tillrättalagd.

Behöver få jobba lite med allt detta nyvunna tänk för att spontant kunna se vilka vägar som är bra att gå och se nyttan. Just nu är det som att jag hör vad du säger och jag vet att du har rätt men ändå...

Jag vet att det finns goda skäl att skriva bra kod från start. Även för mig som nybörjare i hantverket blir det tydligt vilken skillnad det är när kod är välskriven. "A programmer without 'code-sence' can look at a messy module and recognize the mess but will have no idea what to do with it." [Clean Code - Robert C Martin, s 7]. Från studier där vi nu befinner oss är steget till ett företag och krav på lönsamhet inte långt. Ändå hamnar jag där ibland. Sparade jag tid? Sparade jag tid när jag skrev en förkortning som ledde till en bug. "As the mess builds up, the productivity decreases" [Clean Code - Robert C Martin, s 4]. När är det dags att göra jobbet att bygga om koden? Hur ska det göras? Om koden är i produktion, ska befintlig kod underhållas parallellt med att en kopia renoveras? Gör om gör rätt? Nä, gör rätt direkt!

Det är toppen att vi får en duvning i Clean Code. Det känns som att 1DV607 och 1DV610 är nära besläktade. Att skapa en bra struktur. En kodkultur som fungerar, som är enhetlig och gemensam. Det hjälper mig väldigt mycket. Jag tvingas in i ett bättre och mer strukturerat tänk. jag förstår finesserna i språken lite bättre.
