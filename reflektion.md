tabellreflektioner för kap 2 med fem namn
kort reflektion för hela kap 2
tabellreflektioner för kap 3 med fem funktioner
kort reflektion för hela kap 3
Reflektion om kodkvalitet mer generellt

# Reflektioner kodkvalitet

## Reflektioner kap 2

| Namn och förklaring | Reflektion och regler från Clean Code |
| ------------------- | ------------------------------------- |
| getCellElementRowCol:  Kanske den här skulle ha hetat getCellElementAtRowCol för att undvika desinformation. Det är heller inte självklart att man får ett HTMLelement. tanken var att hinta om vilka argumenten som krävs men kan lätt missförstås som att det är ett returvärde eller typ. | Vi bör självklart undvika vilseledande och dubbeltydiga namn och förkortningar |
| getLongestCellLineOfValueMatchIntersectingCell: Det här är det längsta namnet jag fick till. Det är också det namn jag lagt mest möda på för att få till. Den är omdöpt hundra gånger. Den största svårigheten var att få fram intentionen utan att förstöra läsbarheten. Jag tror jag har misslyckats kapitalt. jag vill säga get longest line of cells that matches the value of the intersected cell in question. jag skulle också vilja nämna att den tittar i horisontellt, vertikalt, och diagonalt.                    | A name of a method, class or variable should say why it exists, what it does, how to use it - without the need for comments. |
| Matrix vs gameBoard kanske är något långsökt men kanske kan man anse att MatrixAnalyzer skulle hetat GameBoardAnalyzer för att hålla ihop namn-koncepten. Nu ser jag det som att MatrixAnalyzer är en potentiellt generell tjänst som kan utvecklas att operera på matriser. Till en början hade jag cell och square som namn för samma koncept. Det var ohemult opraktiskt. Jag har använt signatur ibland och value ibland för att syfta till cellers textcontent. | Det är viktigt att hålla sig till ett enda gemensamt namn för ett visst koncept. |
| Jag tror jag har lyckats bra här med att inte kräva mental mappning för att förstå koden. Namnen är mer genomtänkta än vanligt från min sida. getLongestMatchingLineIntersectingCell är en knepig funktion. Tycker jag har lyckats abstrahera en hel del så att man kan läsa vad som händer. Kanske lite svårt att greppa hur direction fungerar utan att titta i definitionen eftersom den är nästlad. Jag har undvikit att använda intetsägande namn som variabeln temp eller hinken, x, y etc. | Använd namn som tydligt talar om vad det är, vad det gör o s v. Man ska inte behöva mentalt mappa om namnet. T ex let hinken = maxAge() eller i = maxAge() |
| Uppfödd med Excel och datalistor så håller jag med om att det är viktigt att hålla sig med sökbarhet. Använd enhetliga namn. Tänk på sortering filtrering och att hålla namn unika. Hopplöst om t ex variabeln longest dyker upp i många metoder. Undvik liknande namn som kan blandas samman vid sökning tex getCellMaxMin getCellMinMax.                  | Se till att namn anpassas för att vara sökbara om det behövs. Enbokstavsvariabelnamn är rimliga att använda lokalt i små metoder. Variabler som har ett större scoop bör namnges så att de lätt kan hittas vid sökning.                                       |

### Allmänt

Jag har 3 klasser:

CellSizeWidthHeight
MatrixRowsColumns
PositionRowColumns

De delar logik och skulle kunna passa in under regeln "is-a" för en basklass. Men jag tycker det är bättre att hålla dem åtskilda för att kunna namnge deras egenskaper individuellt.
Istället kommer jag att extrahera duplicerade funktioner och placera dem i en util-klass som jag kallar Validator. Detta kunde ha varit en statisk klass. Men vi får inte använda statiska klasser.

Det finns så många fällor. I MatrixSizeRowsCols.ts använder jag "cols" istället för "columns". Shame on me! Det sparar 0,0000... åh!

Jag har också size.rows (plural) jämfört med position.row (singular) vilket känns logiskt för mig men fortfarande förvirrande.

Jag hade data-row och data-col som attribut i Cell-klassen. Det orsakade en bugg.

Kanske borde size propertyn i GameBoard ha hetat rowsColumnsSize.

Jag försöker tänka att jag ska standardisera sättet jag skriver på. Undvika förkortningar, inte använda underscore i onödan.

## Reflektioner kap 3

| Metodnamn och länk eller kod | Antal rader ( ej ws )
Reflektion | Reflektion |
| ------------------- | ------------------------------------- | ------------------------------------- |
| #getMatchesInSpecifiedDirection(currentCell:HTMLElement, direction:number[]):HTMLElement[] | 19 |                                        |
| getLongestMatchingLineIntersectingCell(currentCell:HTMLElement):HTMLElement[] | 16 |                                       |
| isRowColumnFiniteIntegers(row:number, column:number) | 11 |                                       |
| #validateInput | 14 |                                       |
| addclickEventToCells(cellElements:HTMLCollection, onclick: (event: MouseEvent) => void):void | 11 |                                       |


### Allmänt
blabla

## Generellt kodkvalitet

Det är toppen att vi får en duvning i Clean Code. Det hjälper mig väldigt mycket. Jag tvingas in i ett bättre och mer strukturerat tänk. Förstår finnesserna i språken lte bättre också.