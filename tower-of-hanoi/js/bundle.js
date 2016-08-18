/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);

	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);