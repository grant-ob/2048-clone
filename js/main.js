// model
// import {Game} from './model.js';
// // view
// import {draw} from './view.js';
// // controller
// import {gameController} from './controller.js';

window.onload = () => {
    // init the model
    const game = new Game();
    // init the view
    initView();
    // call the controller
    gameController(game, draw);
}