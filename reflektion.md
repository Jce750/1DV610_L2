tabellreflektioner för kap 2 med fem namn
kort reflektion för hela kap 2
tabellreflektioner för kap 3 med fem funktioner
kort reflektion för hela kap 3
Reflektion om kodkvalitet mer generellt

I have 3 classes:

- CellSizeWidthHeight
- MatrixRowsColumns
- PositionRowColumns

They share logic and could fit the "is a" rule for a base-class. But I find it better to keep them apart to be able to name their properties individually.
Instead I will extract duplicate functions and place in a util class Validator. This could have been a static class. But we are not supposed to use static classes.

There are so many traps. In MatrixSizeRowsCols.ts I use cols instead of columns. Shame on me. That saves 0,0000... aah!

I also have size.rows compared to position.row which makes sense to me but still is confusing.

I had data-row and data-col as attributes in the Cell-class. It caused a bug.
