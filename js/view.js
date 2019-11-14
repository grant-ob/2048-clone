// color palette
// onyx: 31393c
// blue (crayola): 2176ff
// brilliant azure: 33a1fd
// sunglow: fdca40
// carrot orange: f79824
const CELL_WIDTH = 100;
const CELL_BORDER = 10;
const CELL_LOCATIONS = [
    // row 1
    [{x: CELL_BORDER, y: CELL_BORDER},
    {x: CELL_BORDER + (CELL_WIDTH+CELL_BORDER), y: CELL_BORDER},
    {x: CELL_BORDER + 2*(CELL_WIDTH+CELL_BORDER), y: CELL_BORDER},
    {x: CELL_BORDER + 3*(CELL_WIDTH+CELL_BORDER), y: CELL_BORDER}],
    // row 2
    [{x: CELL_BORDER, y: 2*CELL_BORDER + CELL_WIDTH},
    {x: CELL_BORDER + (CELL_WIDTH+CELL_BORDER), y: 2*CELL_BORDER + CELL_WIDTH},
    {x: CELL_BORDER + 2*(CELL_WIDTH+CELL_BORDER), y: 2*CELL_BORDER + CELL_WIDTH},
    {x: CELL_BORDER + 3*(CELL_WIDTH+CELL_BORDER), y: 2*CELL_BORDER + CELL_WIDTH}],
    // row 3
    [{x: CELL_BORDER, y: 3*CELL_BORDER + 2*CELL_WIDTH},
    {x: CELL_BORDER + (CELL_WIDTH+CELL_BORDER), y: 3*CELL_BORDER + 2*CELL_WIDTH},
    {x: CELL_BORDER + 2*(CELL_WIDTH+CELL_BORDER), y: 3*CELL_BORDER + 2*CELL_WIDTH},
    {x: CELL_BORDER + 3*(CELL_WIDTH+CELL_BORDER), y: 3*CELL_BORDER + 2*CELL_WIDTH}],
    // row 4
    [{x: CELL_BORDER, y: 4*CELL_BORDER + 3*CELL_WIDTH},
    {x: CELL_BORDER + (CELL_WIDTH+CELL_BORDER), y: 4*CELL_BORDER + 3*CELL_WIDTH},
    {x: CELL_BORDER + 2*(CELL_WIDTH+CELL_BORDER), y: 4*CELL_BORDER + 3*CELL_WIDTH},
    {x: CELL_BORDER + 3*(CELL_WIDTH+CELL_BORDER), y: 4*CELL_BORDER + 3*CELL_WIDTH}]
];
const BLANKSTYLE = '#AAAAAA';
const FILLSTYLES = {
    2: '#2176ff',
    4: '#33a1fd',
    8: '#fdca40',
    16: '#f79824',
    32: '#2176ff',
    64: '#33a1fd',
    128: '#fdca40',
    256: '#f79824',
    512: '#2176ff',
    1024: '#33a1fd',
    2048: '#fdca40'

}
const CELLFONTS = {
    2: '64px sans-serif',
    4: '64px sans-serif',
    8: '64px sans-serif',
    16: '52px sans-serif',
    32: '52px sans-serif',
    64: '52px sans-serif',
    128: '32px sans-serif',
    256: '32px sans-serif',
    512: '32px sans-serif',
    1024: '24px sans-serif',
    2048: '24px sans-serif'
}
const BOARD_WIDTH = 4*(CELL_WIDTH + CELL_BORDER) + CELL_BORDER;

const getCtx = () => {
    const canvas = document.querySelector('canvas');
    return canvas.getContext('2d');
}

const initView = () => {
    const canvas = document.querySelector('canvas');
    canvas.width = BOARD_WIDTH;
    canvas.height = BOARD_WIDTH;
    // canvas.width = window.innerWidth;
    // canvas.height = window.innerHeight;
    const c = getCtx();

    // draw the board
    c.fillStyle = '#31393c';
    c.fillRect(0,0,BOARD_WIDTH,BOARD_WIDTH);
    // draw the cells
    c.fillStyle = BLANKSTYLE;
    for ( let i in CELL_LOCATIONS){
        for ( let j in CELL_LOCATIONS[i])
        c.fillRect(CELL_LOCATIONS[i][j].x, CELL_LOCATIONS[i][j].y, CELL_WIDTH, CELL_WIDTH);
    }
}

const draw = (moves) => {
    const c = getCtx();
    console.log(moves);
    //process each move
    for (let i in moves){
        const move = moves[i];
        switch (move.type) {
            case 1:
                console.log('ADD');
                // get the fill style
                c.fillStyle = FILLSTYLES[move.val];
                // draw a rect at the new location
                c.fillRect(
                    CELL_LOCATIONS[move.d_row][move.d_col].x,
                    CELL_LOCATIONS[move.d_row][move.d_col].y,
                    CELL_WIDTH,
                    CELL_WIDTH);
                // add the text
                c.fillStyle = 'black';
                c.textAlign="center"; 
                c.textBaseline = "middle";
                c.font = CELLFONTS[move.val];
                c.fillText(
                    move.val.toString(),
                    CELL_LOCATIONS[move.d_row][move.d_col].x + 0.5*CELL_WIDTH,
                    CELL_LOCATIONS[move.d_row][move.d_col].y + 0.5*CELL_WIDTH
                );
                break;
            case 2:
                console.log('SLIDE');
                // blank the cell at the old location
                c.fillStyle = BLANKSTYLE;
                c.fillRect(
                    CELL_LOCATIONS[move.s_row][move.s_col].x,
                    CELL_LOCATIONS[move.s_row][move.s_col].y,
                    CELL_WIDTH,
                    CELL_WIDTH);
                // get the fill style
                c.fillStyle = FILLSTYLES[move.val];
                // draw a rect at the new location
                c.fillRect(
                    CELL_LOCATIONS[move.d_row][move.d_col].x,
                    CELL_LOCATIONS[move.d_row][move.d_col].y,
                    CELL_WIDTH,
                    CELL_WIDTH);
                // add the text
                c.fillStyle = 'black';
                c.textAlign="center"; 
                c.textBaseline = "middle";
                c.font = CELLFONTS[move.val];
                c.fillText(
                    move.val.toString(),
                    CELL_LOCATIONS[move.d_row][move.d_col].x + 0.5*CELL_WIDTH,
                    CELL_LOCATIONS[move.d_row][move.d_col].y + 0.5*CELL_WIDTH
                );
                break;
            case 3:
                console.log('COMBINE');
                // blank the cell at the old location
                c.fillStyle = BLANKSTYLE;
                c.fillRect(
                    CELL_LOCATIONS[move.s_row][move.s_col].x,
                    CELL_LOCATIONS[move.s_row][move.s_col].y,
                    CELL_WIDTH,
                    CELL_WIDTH);
                // get the fill style
                c.fillStyle = FILLSTYLES[move.val];
                // draw a rect at the new location
                c.fillRect(
                    CELL_LOCATIONS[move.d_row][move.d_col].x,
                    CELL_LOCATIONS[move.d_row][move.d_col].y,
                    CELL_WIDTH,
                    CELL_WIDTH);
                // add the text
                c.fillStyle = 'black';
                c.textAlign="center"; 
                c.textBaseline = "middle";
                c.font = CELLFONTS[move.val];
                c.fillText(
                    move.val.toString(),
                    CELL_LOCATIONS[move.d_row][move.d_col].x + 0.5*CELL_WIDTH,
                    CELL_LOCATIONS[move.d_row][move.d_col].y + 0.5*CELL_WIDTH
                );
                break;
        }
    }
};