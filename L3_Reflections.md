# L3 - Reflections on Clean Code

## L2->L3 short

Break down the complicated MatrixAnalyzer to make it easier to understand.
Remove dependency on Html from core functionalities.
Remove magic data embedded in the code.
Standardize coordinates using x, y (although short they are good). Instead of row, Column.
Add ability to work with selection of points.
Add facade. - (I tried to add "real" interfaces but it did not work with javascript in the app which is the background to the weird looking Matrix2DActions).
Add Wrapper to the app.
Experiment with structures over objects.
Experiment with stateless usability.
Adhere to Clean Code principles. GPT 4 generated a structure for chapter 2-11 from Clean Code and I have commented. See below.

## Chapter 2: Meaningful Names

A general note in the eleventh hour is that the project name L1_MatrixAnalysisLibrary is cute in regards to L1_.

__Use Intention-Revealing Names__  
I am not all happy with MatrixActions and MatrixAnalyzer when it comes to names. But I feel as a beginner that I sculpt without really knowing what final shape will materialize. The real question is why do I have these two classes in the first place and what are their respective responsibilities. I guess I wanted to stick with the analyzer name and it felt weird to manipulate a matrix in such a class.

__Make Meaningful Distinctions__  
 I used to have a CellPositionRowColumn class and then I invented a Point2D class. I decided to try using these side by side to keep cell being one unit and a point another. That costed me many hours. Why? Well I could not keep track of x=column and y=row. A point is a (x(column),y(row)) and a cell is a (row(y), column(x)). It is a school book example. If you have inch and cm in the same system an accident is bound to happen!

__Use Pronounceable Names__  
I can offer a tonguetwister. If I sound proud - I am not.
getLongestCellElementLineOfValueMatchIntersectingCell
getLongestCellHtmlElementLineOfValueMatchIntersectingPoint
getLongestCellElementLineOfValueMatchIntersectingCells
getLongestMatchingLineOfIntersectingCells
These names do not facilitate communication about code. And the fact that I did not standardize the names through the code makes it even more stupid.

They are part of a call chain:
Component calls method in wrapper.
Wrapper calls library facade ("interface").
facade calls its action-class ("realization").
actionclass calls the analyzer ("doer").

## Chapter 3: Functions

__Small Functions__  
 Creating small functions breaking out low-level logic makes a huge difference for code understandibility. However it is sometimes tideous and makes reading a bit jumpy. I think what it all comes down to is lack of experience. It is a new way to think and it takes a bit of effort and time to get across the treashold. In the end I belive it is a winning formula.

__Function Arguments__  
 Aiming for the optimum of zero arguments I have tried to create classes to carry information. However I found a conflict in that I dont want the wrapper class to carry around a lot of dependencies to classes inside my library. I rather send info one by one and get many arguments. However in javascript I could solve it by passing arguments with an anonymous object.

```javascript
createMatrixByRowsColumns ({ rows, columns })
```

__No Side Effects__  
As I started writing that "I don't do side-effects anymore..." my eyes fell upon this method in my app:

```javascript
    handleClick (event) {
      event.preventDefault()
      const currentCell = event.target
      const currentPlayer = (this.#clickCounter % 2 === 0) ? this.#player1 : this.#player2
      if (currentPlayer.makeMove(currentCell)) {
        this.#advanceClickCounter()
        this.#showPlayerOnTurn()
        this.#evaluateGame(currentCell)
      }
    }
```

I froze for a second and had to consult with my rubber duck who told me I am bust. To get a second oppinion I asked GPT. I soon realized the pitfall was waiting for me.

I transformed it to:

```javascript
    handleClick (event) {
      event.preventDefault()
      const currentCell = event.target
      const currentPlayer = this.#getCurrentPlayer()
      if (currentPlayer.makeMove(currentCell)) {
        this.#executeRound(currentCell)
      }
    }
```

__Command Query Separation__  
...only to realize that makeMove() of the Player class does two things as it checks if it is ok for the player to move and if so execute the move.

So I had to recreate a method I erased long ago. The isCellEmpty().

Finally (don't bet on it) I got a nicer handle click:

```javascript
    handleClick (event) {
      event.preventDefault()
      const currentCell = event.target
      if (this.#isCellEmpty(currentCell)) {
        this.#executeRound(currentCell)
      }
    }
```

## Chapter 4: Comments

__Code Over Comments__  
I have tried to stay away from comments and let the code do the work. Especially in the internal parts.

In this example I have "wasted" 3 lines to extract a low-level algorithm (#updateLongestLineOfMatches) just to keep the story on a coherent level.

```javascript
...
    for (const direction of searchDirections) {
      const currentLongest = this.#findLongestLineInDirection(currentPointXY, direction);
      longestLineOfMatches = this.#updateLongestLineOfMatches(longestLineOfMatches, currentLongest);
    }
...

  #updateLongestLineOfMatches(longestLine: Point2D[], newLine: Point2D[]): Point2D[] {
    return newLine.length > longestLine.length ? newLine : longestLine;
  }
```

__No Redundant Comments__  
In the public sections I have been generous in adding comments, not to repeat the story of the code but to give that extra nuance and help make a quick decision about where to go in the jungle of information. Sometimes it is hard to tell the full story with code. Even when you try your best to come up with a long informative name as below.

Example:

```javascript
  /**
   * Look for the longest line of matching values intersecting the current cell and return the html elements
   * Search along the horisontal, vertical and diagonal lines of the game board
   */
   ...
  getLongestCellHtmlElementLineOfValueMatchIntersectingPoint(...
```

__Avoid Noise Comments__  
I think i have some noise comments... The type of comments as below are a menace. You incorporate a culture that enforces comments. Comments that become a necessary evil!

```javascript
 * @returns {Matrix2D} matrix
```

This one is something that slipped my mind as I was waiting for a coin to drop. It felt so right at the time. It is no good to anyone now!

```javascript
  // Staticisch
  public getVectorsStepDegrees(step:number, range:number):Transform2D[]{
```

__Use Comments to Explain Intent__  
It is interesting to consider who is being adressed by the comments. It could be a programmer who is not familiar with this particular language and then the comments might make sence.

The kind of css that I have written so far has things stacked, one on top another, and for me a comment about the intention or purpose would save me time. On the other hand if I was good at css it would have better structure and I would read it more fluently.

## Chapter 5: Formatting

__Vertical Formatting__  
On one hand I am supposed to put the public interface at the top and bundle private hidden stuff in a separate section below. At the same time closely related methods should be close. Preferably placed in call order. I think I may have been jumping a bit back and forth between these two rules. However from now on I will put closely related code close weather private or not.

__Indentation__  
Not much to say about that. It is a great way to visualize the "level" or scoope of the code. Grateful for auto-formatting.

__Team Rules__  
 It may be a good thing for a team to agree on a standard. However in my oppinion it should be based on a general accepted standard to avoid the forming of sub cultures that are hard to penetrate and understand for newcomers and external people.

## Chapter 6: Objects and Data Structures

__Data Abstraction__  
My initial intention was to make the html parts public but keep the Matrix cells private. The interface was only supposed to return coordinates(point), values or copies outside.
However the Matrix2D was made public. Although the attributes of the matrix are readonly the individual cells are available through getters and setters. Is it ok to keep it this way? Is it up to the user to hide the matrix they use?
In the demo app I only use the html parts so the problem doesn't show there.

__Data/Object Anti-Symmetry__  
 I find it hard to know where to draw the line - what is a datastructures and what is an object. I feel comfortable with the Point class being a data-structure. I suppose I feel sure because it is an immutable value type. But my cell class puzzles me. It feels a lot like a data-carrier. However the setters don't allow direct access to the data. The same earie feeling creep upon me for MatrixSizeRowsCols and CellSizeWidthHeight. They seem to be data-structures but not pure such. What if they are awkward hybrids. Ugly creatures luring in the shadows ready to smudge my intensions to present clean code. I suppose I should have moved the validation to the users and made the data immutable and simply replace instances upon update.
 The real freak is the 2DMatrix class. Just to challenge this chapter i made it a data-structure. Its functionality is placed in analyzer, action and factory. Feeling like Bambi on ice I would very much like a comment on this.

__Law of Demeter__  
 I'd like to brag about how my app only knows about its wrapper. The wrapper only knows about the libraries facades. The facade only knows etc... But I am a humble person so I won't. I have told all the classes that they should not trust strangers and only talk to neighbors.

## Chapter 7: Error Handling

__Use Exceptions Rather Than Return Codes__  
 I have not spent that much time thinking about the error handling and I wouldn't be surprised if there are some scary holes ready to let a big crasch through.

__Don't Return Null__  
This is one of the good concepts learned from this course that I will add to my personal standard.

__Define Exception Classes__  
I did not have time to look into this. I have tried it before and knows it is a conveniant way to get your own family of specific exceptions and avoid magic strings. it can be a great guide when debugging.

## Chapter 8: Boundaries

__Use Third-Party Code Wisely__  
 If I would have been really wise I would have let someone much smarter than me design the third-party library. But since I am me and since I use my own library I will have to sick with knowing who to blame when things go wrong!
__Define Clear Boundaries__
 Is why I implemented the wrapper class of the app.
__Adapter Pattern__
 The wrapper class of the app only adheres to the specific functionalities used by the app.

## Chapter 9: Unit Tests

__Three Laws of TDD (Test-Driven Development)__  
It is one of those principles that give you adult points. Keep disciplined and do only as much needed to solve the problem. Take your lean requirement. Write a failing test. Write the exact code to satisfy the test. Prettify the code. Do not over engineer things. I scored zero. My approach was to add a lot of fun stuff to the library. Neglect the time limitation aspect and in a naiv manner hope that I could manage to implement a tetris a picture analyzer and battleship application. Putting myself on the edge with code being so red that you could hear Jingle Bells ringing in your ears. Then build tests and start debugging and refactoring all at once. Yes, I know it is bad!
__Fast Tests__  
Once my tests are there I love them and I run them a lot. I guess the speed issue is beyond the scoop of my simple app.
__Independent Tests__  
 I try my best to make them independant and setup each test from scratch. Sofar it has been a good strategy to test small separate units. The ai is a good friend to bring along when testing and debugging. I often take a second opinion from it. The intention is to learn not to be lazy. It definately outsmarts me and come up with ideas that would have taken me a lot of time to reveal on my own.

## Chapter 10: Classes

__Class Organization__  
 As mentioned above I have been vacillating on weather to place all public classes at the top or place closely related methods together. Except in the facade case I find it better to keep them close. However I fear I have not been consistent.

__Encapsulation__  
Also mentioned above I feel unsure about how I treat my matrix. Deciding upon what methods should be private and public is quite straight forward. Stay private if you don't need to be public.

__Cohesion__  
This was one of the things I spent energy challenging. I strived to allow my major classes to have very few instance variables. Will a class with no instance variables necessarilly be cohesive? Not at all. I belive many of my methods are pointing in different directions. Only the "data"-classes have some. Looking at the MatrixAction class I begin to wonder why it is there at all. I suppose it is there to make room for improvements. Maybe as a holder for future expansion.

## Chapter 11: Systems

__Separation of Concerns__  
 Well, I got a tip from my master saying I should separate Html from matrix core functionality. I think I got a bit down that road. The library being independant of the app is another example of SOC.  

__Use Factories__  
 I use factories for the creation of my gameboards. It is a straight forward class nothing fancy.

__Dependency Injection__  
 I do not employ the benefits of dependency injection in my classes very much. I inject objects directly in the methods but I guess that doesn't count. The matrixAnalyzer is injected with a matrix but it does not have any behaviour.
