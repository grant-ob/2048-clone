const gameController = (game, draw)  => {
    // init the game board
    game.addValue();
    game.addValue();
    console.table(game.board);
    draw(game.moves);
    game.clearMoves();
    // register keypress listeners
    window.addEventListener('keydown', event => {
        const key = event.key.toLowerCase();
        let validKey = true;
        let blockMoved = false;
        switch (key){
            case 'arrowleft':
                blockMoved = game.leftMove();
                break;
            case 'arrowright':
                blockMoved = game.rightMove();
                break;
            case 'arrowup':
                blockMoved = game.upMove();
                break;
            case 'arrowdown':
                blockMoved = game.downMove();
                break;
            default:
                validKey = false;
        }
        if(validKey && blockMoved){
            // add another value
            game.addValue();

            console.table(game.board);
            console.log(game.moves);
            draw(game.moves);
            game.clearMoves();
        }
    });

    window.addEventListener('keyup', event => {
        // do nothing yet
    }); 
}