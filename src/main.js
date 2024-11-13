function main(loadEvent) {
    const container = document.querySelector('.container');
    const size = {
        rows: 50,
        columns: 50
    }
    const pixelSize = 10

    window.pixelMatrix = Array.from({ length: size.rows }, () => Array.from({ length: size.columns }, () => ''));
    console.log(window.pixelMatrix);

    console.log(loadEvent);
    console.log('size:', size);

    container.style.display = 'grid';
    container.style.gridTemplateColumns = Array.from({ length: size.rows }, () => "auto").join(' ');

    for (let row = 0; row < window.pixelMatrix.length; row++) {
        for (let column = 0; column < window.pixelMatrix[row].length; column++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');

            pixel.setAttribute('row', row);
            pixel.setAttribute('column', column);

            pixel.style.width = `${pixelSize}px`
            pixel.style.height = `${pixelSize}px`

            container.appendChild(pixel);
        }
    }

    createListeners(container);
}
document.addEventListener('DOMContentLoaded', main);

function updatePixel(position, color) {
    window.pixelMatrix[position.row][position.column] = color;

    console.log(window.pixelMatrix);

    const pixel = document.querySelector(`.pixel[row="${position.row}"][column="${position.column}"]`);
    pixel.style.background = color;
}

function createListeners(container) {
    let isMouseDown = false;

    document.addEventListener('mousedown', (event) => {
        isMouseDown = true;
    });

    container.addEventListener('mousemove', (event) => {
        if (isMouseDown) {
            const element = document.elementFromPoint(event.pageX, event.pageY);
            updatePixel({
                row: Math.floor(element.getAttribute('row')),
                column: Math.floor(element.getAttribute('column'))
            }, document.querySelector('#brushColor').value ?? 'white');
        }
    });

    container.addEventListener('click', (event) => {
        const element = document.elementFromPoint(event.pageX, event.pageY);
        updatePixel({
            row: Math.floor(element.getAttribute('row')),
            column: Math.floor(element.getAttribute('column'))
        }, document.querySelector('#brushColor').value ?? 'white');
    });

    document.addEventListener('mouseup', (event) => {
        isMouseDown = false;
    });
}