# Craze of Observables and OPerators

[Important Blogs](https://medium.com/aviabird/angular-2-the-new-craze-of-observables-operators-e2b9dcb9330a#.slf0qmwc9)

An introduction to RxJs Observables with latest AngularJs


#Http (Server-comunication)

[Angular.io Doc](https://angular.io/docs/ts/latest/guide/server-communication.html)

HTTP is the primary protocol for browser/server communication.
' The WebSocket protocol is another important communication technology; it isn't covered in this page.'

The Angular Http client communicates with the server using a familiar HTTP request/response protocol.
The Http client is one of a family of services in the Angular HTTP library.

[A Template reference variable](https://angular.io/docs/ts/latest/guide/template-syntax.html#!#ref-vars)

**The component does not talk directly to the Angular Http client.
 The component doesn't know or care how it gets the data. It delegates to the HeroService

 ***This is a golden rule: always delegate data access to a supporting service class

 supporting HTTP