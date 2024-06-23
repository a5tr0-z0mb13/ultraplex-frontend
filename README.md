# UltraplexFrontend

Technical test, set as part of the application process for a startup. A cinema management tool. The test was timeboxed to eight hours. 

### Business requirements

* A cinema has multiple screens.
* A movie can be played on multiple screens (in multiple cinemas).
* A screen can show multiple movies on a day.
* A screening of a movie can have multiple bookings.

### Tasks

* Create a dashboard that shows the number of

    * Cinemas
    * Screens
    * Movies
    * Bookings

* The user should be able to

    * List all cinemas and add new cinemas
    * List all screens for a specific cinema and add a new screen for a specific cinema
    * List all movies and add a specific movie
    * Create a screening (for a specific screen and a specific movie at a certain time
    * Create a booking for a specific screening adding the number of seats

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.5.

## ToDo

* Prettier / ESLint configuration
* Reduce code replication around tables and dialogs (already started)
* DataSource layer between tables and services?
* Unit tests
* e2e tests
* Comments and documentation
* Improve look / feel

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
