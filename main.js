const fs = require('fs');
const http = require('http');

function createBoard(size, proportions) {
    const colors = ['blue', 'red', 'brown', 'black'];
    const totalSquares = size * size;
    const squaresPerColor = Math.floor(totalSquares / proportions.length);

    let board = '<html><body><table>';

    for (let i = 0; i < size; i++) {
        board += '<tr>';
        for (let j = 0; j < size; j++) {
            const colorIndex = Math.floor(j / squaresPerColor);
            const color = colors[colorIndex];
            board += `<td style="background-color: ${color}; width: 50px; height: 50px;"></td>`;
        }
        board += '</tr>';
    }

    board += '</table></body></html>';

    return board;
}

const size = 8;
const proportions = [2, 2, 1, 1]; // [blue, red, brown, black]

const boardHTML = createBoard(size, proportions);

fs.writeFile('board.html', boardHTML, (err) => {
    if (err) throw err;
    console.log('Board created successfully!');
});
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(boardHTML);
    res.end();
});

const port = 3000;

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
