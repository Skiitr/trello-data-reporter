// Trello Data Reporter Web App
// by Dan Gallagher
// License: MIT
// v0.0.1
/* global Trello */

var authenticationSuccess = function () { console.log('Successful authentication') }
var authenticationFailure = function () { console.log('Failed authentication') }

Trello.authorize({
  type: 'popup',
  name: 'Getting Started Application',
  scope: {
    read: true,
    write: true },
  expiration: 'never',
  success: authenticationSuccess,
  error: authenticationFailure
})
