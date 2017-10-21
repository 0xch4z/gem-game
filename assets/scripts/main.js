const game = {
  active: false,
  wins: 0,
  losses: 0,
  number: null,
  total: 0,
  elements: {
    wins: $('#wins'),
    losses: $('#losses'),
    number: $('#number'),
    total: $('#total'),
    gems: $('#gems'),
    gem1: $('#gem1'),
    gem2: $('#gem2'),
    gem3: $('#gem3'),
    gem4: $('#gem4'),
    nongame: $('.non-game'),
  }
}

game.start = function() {
  // reset state
  this.total = 0
  this.active = true
  this.elements.nongame.css({ display: 'none' })  
  this.generateRandomNumber()  
  this.generateRandomGemValues()
}

game.end = function(won) {
  console.log('ending game')
  if (won) {
    this.wins++
    this.elements.wins.text(this.wins)
    alert('you won')
  } else {
    this.losses++
    this.elements.losses.text(this.losses)
    alert('you lost')
    // end game
    this.elements.nongame.css({ display: 'block' })
    this.active = false
  }
}

game.generateRandomGemValues = function() {
  // iterate through gems
  // set values 1~10
  for (const gem of this.elements.gems.children()) {
    const rand = Math.floor(
      Math.random() * 10
    ) + 1
    $(gem).attr('value', rand)
  }
}

game.generateRandomNumber = function() {
  // gen random number 30~50
  this.number = Math.floor(
    Math.random() * 30
  ) + 21
  this.elements.number.text(this.number)
}

game.addGuess = function(value) {
  this.total += value
  this.elements.total.text(this.total)
  console.log(this.total)
  console.log(this.number)
  if (this.total > this.number) {
    this.end(false)
  } else if (this.total === this.number) {
    this.end(true)
  }
}


$(document).keydown(function({ key }) {
  if (key === ' ' && !game.active) {
    game.start()
  }
})

$('#gems > *').on('click', function() {
  if (game.active) {
    const value = parseInt($(this).attr('value'))
    game.addGuess(value)
  }
})
