# Trans-Europe-Express

![Homepage](/images/homepage.png)

## Introduction
This project started out as a coding challenge exercise, designed to practice manipulating arrays. I enjoyed the challenge a lot at the time, and since the transport theme was right up my alley, I decided to revisit the code and create an HTML user interface to turn it into a web app. Revising code that I had written a month or so previously and updating it with more advanced JavaScript techniques that I had learned in the meantime was a very interesting and satisfying experience, and hopefully resulted in even more clear and readable code.

## JavaScript Techniques Used

* Destructuring and Spread Syntax
* Arrow Function Syntax
* Higher-Order Functions
* Array Manipulation

## Interesting Challenges
The trickiest part of this coding challenge is dealing with cases involving Munich, which is a hub station that features on all three lines. This means that you must check if Munich happens to be the origin or destination station, and, if it is, make sure that the trip displays as a single line journey.

Color-coding the decorative lines on the itinerary according to the line being travelled was also an enjoyable task.


## Future refactoring
Currently the page functions as intended, but the code could be cleaned up considerably. The first three improvements that immediately spring to mind are:

* Calculate the length of the trip only once the page is ready to be rendered, and the relevant array(s) with the different stop names are available. This could be very simply done by calculating the length of the array(s), and saves passing the number of stops as a separate variable from function to function throughout the program

* Currently there's a lot of repetition of the function used to create the HTML content of the itinerary. This should be refactored.

* To cut down on the number of parameters that are required by the function that renders the itinerary, rather than passing in the origin and destination as separate variables, they could just be calculated by taking the first and last item in the array(s) containing the stops on the journey.