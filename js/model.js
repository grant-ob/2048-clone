const ROWS = 4;
const COLS = 4;

const moveTypes = {
    ADD: 1,
    SLIDE: 2,
    COMBINE: 3
}

class Game {
    constructor(){
        this.board = [];
        this.moves = [];
        //init the board
        for ( let r = 0; r < ROWS; r++ ) {
            this.board[r] = [];
            for ( let c = 0; c < COLS; c++) {
                this.board[r][c] = 0; 
            }
        } 
    }

    addValue(){
        const options = [];
        for ( let r = 0; r < ROWS; r++ ) {
            for ( let c = 0; c < COLS; c++ ){
                if ( this.board[r][c] === 0 ){
                    options.push({row: r, col: c});
                }
            }
        }
        if ( options.length > 0 ){
            const spot = options[Math.floor(Math.random() * options.length)];
            const new_val = Math.random() > 0.1 ? 2 : 4;
            // set new val
            this.board[spot.row][spot.col] = new_val;
            // register the move
            this.moves.push({
                type: moveTypes.ADD,
                val: new_val,
                s_row: 0,
                s_col: 0,
                d_row: spot.row,
                d_col: spot.col,
            });
            return true;
        } else {
            return false;
        }
    }

    slide(translate) {
        // slide all value to the left as far as they can go
        let moved = false;
        for ( let r = 0; r < ROWS; r++ ){
            let i = -1;
            for ( let c = 0; c < COLS; c++ ) {
                if ( this.board[r][c] === 0 && i === -1 ) {
                    i = c;
                } else if ( this.board[r][c] !== 0 && i !== -1 ){
                    //register the move
                    moved = true;
                    const s_loc = translate(r,c);
                    const d_loc = translate(r,i);
                    this.moves.push({
                        type: moveTypes.SLIDE,
                        val: this.board[r][c],
                        s_row: s_loc.row,
                        s_col: s_loc.col,
                        d_row: d_loc.row,
                        d_col: d_loc.col,
                    });
                    //update the board
                    this.board[r][i] = this.board[r][c];
                    this.board[r][c] = 0;
                    //update loop vars
                    c = i;
                    i = -1;
                }
            }
        }
        return moved;
    }

    combine(translate) {
        // combine values coming in from the right
        let moved = false;
        for ( let r = 0; r < ROWS; r++ ){
            for ( let c = 0; c < COLS-1; c++ ){
                const val = this.board[r][c];
                const r_val = this.board[r][c+1];
                if(val !== 0 && val === r_val){
                    // combine the vals
                    this.board[r][c] = 2*val;
                    this.board[r][c+1] = 0;
                    // register the move
                    moved = true;
                    const s_loc = translate(r,c+1);
                    const d_loc = translate(r,c);
                    this.moves.push({
                        type: moveTypes.COMBINE,
                        val: this.board[r][c],
                        s_row: s_loc.row,
                        s_col: s_loc.col,
                        d_row: d_loc.row,
                        d_col: d_loc.col,
                    });
                }
            }
        }
        return moved;
    }

    leftMove(){
        const translateLeft = (r, c) => {return {row: r, col: c}};
        let result = this.slide(translateLeft);
        result |= this.combine(translateLeft);
        result |= this.slide(translateLeft);
        return result;
    }

    rightMove(){
        const translateRight = (r, c) => { return {row: (ROWS-1-r), col: (COLS-1-c)}};
        this.rotate();
        this.rotate();
        let result = this.slide(translateRight);
        result |= this.combine(translateRight);
        result |= this.slide(translateRight);
        this.rotate();
        this.rotate();
        return result;
    }

    downMove(){
        const translateDown = (r,c) => {return {row: (COLS-1-c), col: r}};
        this.rotate();
        this.rotate();
        this.rotate();
        let result = this.slide(translateDown);
        result |= this.combine(translateDown);
        result |= this.slide(translateDown);
        this.rotate();
        return result;
    }

    upMove(){
        const translateUp = (r, c) => {return {row: c, col: (ROWS-1-r)}};
        this.rotate();
        let result = this.slide(translateUp);
        result |= this.combine(translateUp);
        result |= this.slide(translateUp);
        this.rotate();
        this.rotate();
        this.rotate();
        return result;
    }

    rotate(){
        // rotate the board to counter-clockwise
        this.board = this.board[0].map((col, i) => this.board.map(row => row[this.board.length - i - 1]));
    }

    clearMoves(){
        this.moves = [];
    }
}