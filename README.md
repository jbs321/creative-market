## About

- This project is based on Laravel as the mvc framework for the back end operations and react for front end SPA app.
- Styling for the project is done using sass compiled by laravel mix and react defined styles also compiled by mix.
- The develoment process can be followed by the github commit
- The Pole on screen 2 is dynamically generated. The source of the questions and options is in a Seeder File.

## Links
- [Github Repo](https://github.com/jbs321/creative-market)
- [Screenshots](https://github.com/jbs321/creative-market/tree/main/screenshots)

##Project Approach
- On the back end notice the SellerApplicationController, The validation is inside the request object and not inside the controllers.
- Notice the api routes, there is a model binding for one of the routes see: RouteServiceProvider
- React utilized a custom redux like system in a form of a Context
- I added a spinner to load the questions for the pole on the 2nd screen
- The Models have polymorphic relationships

##Schema Outline
- migrations - laravel migration records
- options - Each question has options represented in this table
- pole_answers - each pole submission would strive to fill this table
- pole_questions - the questions from the pole
- poles - Where different poles would be stored
- question_options - each question has multiple options and vise-versa
- questions - the pole questions
- users - the user information filled in the first screen

## Notes
- Code doesn't include tests for both laravel and react.

##Setup
- The project was developed on laravel homestead
- The project required to run the seeder in order to have available questions in the second screen
- The Front end is an SPA hence we need to run npm install and build
- composer needs to be installed