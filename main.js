//TODO:
//get black and white pieces, put them on board



/* const AWANLLM_API_KEY = '6547e190-4f09-46c8-9524-46a4aa3a57cd'	

fetch("https://api.awanllm.com/v1/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${AWANLLM_API_KEY}`,
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    "model": "Meta-Llama-3-8B-Instruct",
    "prompt": "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\nYou are an master of chess.<|eot_id|><|start_header_id|>user<|end_header_id|>\n\nHello there!<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
    "repetition_penalty": 1.1,
    "temperature": 0.7,
    "top_p": 0.9,
    "top_k": 40,
    "max_tokens": 1024,
    "stream": false
  })
}).then(response => response.json()).then(data => {
    const aiResponse = data.choices[0].text;
})
 */

const chessBoard = document.getElementById('chessBoard')

function createTile(color, row, col) {
    let lettersForNamingTiles = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']; 
    let numsForNamingTiles = ['1', '2', '3', '4', '5', '6', '7', '8'].reverse();
    const tile = document.createElement('div')
    tile.classList.add('chessTile', color, lettersForNamingTiles[col] + numsForNamingTiles[row]) 
    chessBoard.appendChild(tile);    
}

function renderNumberColumn(){
    for (let number = 8; number > 0; number--){
        const numberTile = document.createElement('div');
        numberTile.textContent = number; 
        numberTile.classList.add('numberTile'); 
        chessBoardNumbers.appendChild(numberTile); 
    }
}

function renderLetterRow(){
    const letterBank = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
    for (let number = 0; number < 8; number++){
        const letterTile = document.createElement('div');
        letterTile.textContent = letterBank[number]; 
        letterTile.classList.add('letterTile'); 
        chessBoardLetters.appendChild(letterTile);      
    }
}

function renderChessBoard(){
 for (let row = 0; row < 8; row++){
        for (let col = 0; col < 8; col++){
            if ((row + col) % 2 === 0) {
                createTile('white', row, col)
            } else {
                createTile('black', row, col)
            }
        }
    }  
}

function renderChessPiece(pieceID, pieceTile, color, name){
    pieceTile.forEach(square => {
        let pieceObject = new Image(); 
        pieceObject.src = pieceID;
        pieceObject.classList.add('chessPiece', 'draggable', color, name);
        pieceObject.draggable = true;

        let validSpawnSquare = document.querySelector(square)
        if (validSpawnSquare) {
        validSpawnSquare.appendChild(pieceObject);
        }
    })
}



function main(){

    renderChessBoard(); 
    renderNumberColumn();      
    renderLetterRow();

    renderChessPiece('./pieces/white/pawnWhite.png', ['.a2', '.b2', '.c2', '.d2', '.e2', '.f2', '.g2', '.h2'], 'whitePiece', 'pawnW')
    renderChessPiece('./pieces/white/rookWhite.png', ['.a1', '.h1'], 'whitePiece', 'rookW')
    renderChessPiece('./pieces/white/knightWhite.png', ['.b1', '.g1'], 'whitePiece', 'knightW')
    renderChessPiece('./pieces/white/bishopWhite.png', ['.c1', '.f1'], 'whitePiece', 'bishopW')
    renderChessPiece('./pieces/white/kingWhite.png', ['.d1'], 'whitePiece', 'kingW')
    renderChessPiece('./pieces/white/queenWhite.png', ['.e1'], 'whitePiece', 'queenW')

    renderChessPiece('./pieces/black/bishopBlack.png', ['.c8', '.f8'], 'blackPiece', 'bishopB')
    renderChessPiece('./pieces/black/knightBlack.png', ['.b8', '.g8'], 'blackPiece', 'knightB')
    renderChessPiece('./pieces/black/rookBlack.png', ['.a8', '.h8'], 'blackPiece', 'rookB')
    renderChessPiece('./pieces/black/kingBlack.png', ['.d8'], 'blackPiece', 'kingB')
    renderChessPiece('./pieces/black/queenBlack.png', ['.e8'], 'blackPiece', 'queenB')
    renderChessPiece('./pieces/black/pawnBlack.png', ['.a7', '.b7', '.c7', '.d7', '.e7', '.f7', '.g7', '.h7'], 'blackPiece', 'pawnB')



    let draggablePieces = document.querySelectorAll('.whitePiece')
    let pieceTargetLocations = document.querySelectorAll('.chessTile') 
    
    for (piece of draggablePieces) {
        piece.addEventListener('dragstart', function(e) {
            let selectedPiece = e.target; 
            console.log('dragging is happening')
            
            for (tiles of pieceTargetLocations) {
            tiles.addEventListener('dragover', function(e) {
                e.preventDefault();
                console.log('dragover is happening')
            })}
              
            for (tiles of pieceTargetLocations) {
                tiles.addEventListener('drop', function(e) {
                if (selectedPiece != null) { 
                    e.target.appendChild(selectedPiece)
                    console.log('dropped is happening')
                    selectedPiece = null; 
                }
            })} 
        })
    }
}

main(); 


//make a turn counter inside the droppped event listener. this will not only block you from making moves, but it will be used to determined priority for piece taking. if your turn, you take. if not, they take. also use that same idea to create a variable that goes up each move (one for player one for computer). Use this to determine if pawns can move 1 or 2 spaces. when game is over, add up moves and print it

//put the drag start event listener  inside an if statement that only fires if its your move

//maybe try and clean up event listener block. its kind of disgusting. 
//define legal moves and put them in a function that returns a boolean. if the boolean returns true then allow the drop part of the big event listener function to run
//