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

function main(){
    renderChessBoard(); 
    renderNumberColumn();      
    renderLetterRow();  
}

main(); 