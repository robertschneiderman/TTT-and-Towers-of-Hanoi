var View = function (game, $el) {
  this.game = game;
  this.container = $el;

  this.setupBoard(this.container);
  this.bindEvents();
};

View.prototype.bindEvents = function () {

  $('.box').on('click', event => {
    let $currentTarget = $(event.currentTarget);
    this.makeMove($currentTarget);
  });
};

View.prototype.makeMove = function ($square) {
  // mark box
  // background white
  // alert if bad move
  // this.game.playMove($square.data("pos"))

  //
  try {
    let mark = this.game.currentPlayer;
    // debugger
    this.game.playMove($square.data("pos"));
    $square.text(mark);
    $square.css('background-color', '#fff');
  } catch (e) {
      alert(e.msg);
    return;
  }

  if ($square.text() === 'x') {
    $square.css('color', '#3D3D9A');
  } else {
    $square.css('color', 'red');
  }
  // alert if won
  let winner = this.game.winner();
  if (winner) {
    $('body').prepend("<p class='message'>");
    $('body > .message').text(`${winner} won!`);
  }
};

View.prototype.setupBoard = function (container) {
  // console.log($(`${container}`).append("ul"));
  $(`${container}`).append("<ul class = 'grid clearfix'>");
  const positions = [[0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]];
  for (var i = 0; i < 9; i++) {
    $(`${container} > ul`).append("<li class = 'box'>");
    $(`.box:nth-child(${i+1})`).data('pos', positions[i]);
  }
};

module.exports = View;
