let View = function (game, rootEl) {
  this.game = game;
  this.rootEl = rootEl;

  this.setupTowers();
  this.clickTower();
  // this.render();
};

View.prototype.setupTowers = function () {

  $(this.rootEl).append("<main class='tower-container'>");

  for (var i = 0; i < 3; i++) {
    let towerNum = (i);
    $('.tower-container').append(`<ul class=tower data-tower='${towerNum}'>`);
  }

  for (var i = 0; i < 3; i++) {
    let cssClass = `disk${i+1}`;
    $('.tower:first-child').append(`<li class='disk ${cssClass}'>`);
  }

};

View.prototype.render = function () {
  $(".disk").remove();

  let towers = this.game.towers;
  for (let i = 0; i < towers.length; i++) {
    let tower = towers[i];
    for (let j = 0; j < tower.length; j++) {
      let diskNum = tower[j];
      $(`.tower:nth-child(${i+1})`).prepend(`<li class='disk disk${diskNum}'>`);
    }
  }
};

View.prototype.clickTower = function () {

    $('.tower').on('click', e => {
      if (typeof this.startTower !== 'undefined') {
        let $endTower = $(e.currentTarget);
        let move = this.game.move(this.startTower.data("tower"), $endTower.data('tower'));
        if (!move) {
          alert("Bad move!");
        }
        this.startTower.css('border-bottom', '20px solid black');
        this.startTower = undefined;
        this.render();
        if (this.game.isWon()) alert("You beat this dumb game");
      } else {
        this.startTower = $(e.currentTarget);
        this.startTower.css('border-bottom', '20px solid blue');
      }
      });
};

    // get click 1 tower
    // get click 2 tower (check if click 1 has been registered)
    // enter clicks as params in game.move(pos)
    // reset click 1
    // alert if bad move



  View.prototype.bindEvents = function () {

  $('.box').on('click', event => {
    let $currentTarget = $(event.currentTarget);
    this.makeMove($currentTarget);
  });
};

module.exports = View;
