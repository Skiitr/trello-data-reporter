// Trello Data Reporter Web App
// by Dan Gallagher
// License: MIT
// v0.0.1

/* global Trello $ moment */
// Set globals
var currentTime

// Setup authentication messages
var authenticationSuccess = function () {
  console.log('Successful authentication')
  getBoards()
}
var authenticationFailure = function () { console.log('Failed authentication') }

// Setup moment.js format
moment().format('DD-MM-YYYY')

// Authenticate User
Trello.authorize({
  type: 'popup',
  name: 'Trello Data Reporter',
  scope: {
    read: true,
    write: false },
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
function getBoards () {
  Trello.get('/members/me/boards?filter=open', function (trelloBoards) {
    for (var i = 0; i < trelloBoards.length; i++) {
      var button = createButton(trelloBoards[i].name, trelloBoards[i].id)
      button.addClass('button-board')
      $('.button-list').append(button)
    }
  })
}

// Report information on the cards recieved
function cardReport (cardArray) {
  // Count the cards/issues that are closed
  var closedCards = 0
  var lastMonth = 0
  var oneMonth = 0
  var oneWeek = 0
  for (var i = 0; i < cardArray.length; i++) {
    if (cardArray[i].closed === true) {
      closedCards++
      // Collect data on the date of each closed card
      var cardDate = moment(cardArray[i].dateLastActivity)
      if (cardDate.from(currentTime) === 'a month ago') { lastMonth++ }
      if (currentTime.diff(cardDate, 'days') < 7) { oneWeek++ }
      if (currentTime.diff(cardDate, 'days') < 30) { oneMonth++ }
    }
  }
  // Print Report
  $('.card-report').empty()
  .append('<p>This board contains ' + cardArray.length + ' cards:</p>')
  .append('<p>' + closedCards + ' are closed,</p>')
  .append('<p>' + oneWeek + ' cards closed in the past week,</p>')
  .append('<p>' + oneMonth + ' cards closed in the past month,</p>')
  .append('<p>' + lastMonth + ' cards closed the previous month,</p>')
  .append('<p>' + (cardArray.length - closedCards) + ' remain open.</p>')
}

// Extract all cards from a given set of boards with a specific ID
function extractCards (boardId) {
  Trello.get('/boards/' + boardId + '/cards/all', function (trelloBoardCards) {
    cardReport(trelloBoardCards)
  })
}

// Collect the ID of the button a user clicks and run a report using that ID
$('body').on('click', 'button', function () {
  var id = $(this).attr('id')
  extractCards(id)
  // Set the current time
  currentTime = moment()
})
