// Trello Data Reporter Web App
// by Dan Gallagher
// License: MIT
// v0.0.1
/* global Trello $ */

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

// Create a button and return the HTML button object
function createButton (name) {
  var $button = $('<button>', {name:})
  $button.html(name)
  return $button
}

// Populate buttons for each board a user has
Trello.get('/members/me/boards?filter=open', function (trelloObj) {
  var buttonList = $('.button-list')
  for (var i = 0; i < trelloObj.length; i++) {
    var button = createButton(trelloObj[i].name)
    buttonList.append(button)
  }
})
