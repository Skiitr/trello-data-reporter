// Trello Data Reporter Web App
// by Dan Gallagher
// License: MIT
// v0.0.1
/* global Trello $ */

var authenticationSuccess = function () { console.log('Successful authentication') }
var authenticationFailure = function () { console.log('Failed authentication') }

var currentBoardId = ''
var cardsFromBoard = []

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
function createButton (name, id) {
  var $button = $('<button>', {'name': name, 'id': id})
  $button.html(name)
  return $button
}

// Populate buttons for each board a user has
Trello.get('/members/me/boards?filter=open', function (trelloBoards) {
  var buttonList = $('.button-list')
  for (var i = 0; i < trelloBoards.length; i++) {
    var button = createButton(trelloBoards[i].name, trelloBoards[i].id)
    buttonList.append(button)
  }
})

// Extract all cards from a given set of boards with a specific ID
function extractCards (boardId) {
  Trello.get('/boards/' + boardId + '/cards/all', function (trelloBoardCards) {
    cardsFromBoard = trelloBoardCards
    console.log(cardsFromBoard)
  })
}

// Collect the ID of the button a user clicks and run a report using that ID
$('body').on('click', 'button', function () {
  var id = $(this).attr('id')
  extractCards(id)
})
