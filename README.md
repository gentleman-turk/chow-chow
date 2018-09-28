![logo]

_Simplify registration of [Relish.js][Relish] messages._

Lead Maintainer: [Robert Hernandez]

## Introduction

[Relish] provides "better error message for Hapi.js Joi validation." 

However, in large scale applications managing the individual route [validate] [failAction] functions can become tedious. Even though a common object may be defined in the hapi server's route configuration, this only facilitates common messages. If you need to have a message that reads "optional" instead of "required", there is not way to initialize every route with that option.

## Problem Example


## Solution Example


[Relish]: https://github.com/dialexa/relish
[hapi]: https://hapijs.com/
[joi]: https://github.com/hapijs/joi
[failAction]: https://hapijs.com/api#lifecycle-failAction
[validate]: https://hapijs.com/api#-routeoptionsvalidate
[Robert Hernandez]: https://github.com/gentleman-turk
[logo]:https://github.com/gentleman-turk/chow-chow/raw/master/images/logo.png