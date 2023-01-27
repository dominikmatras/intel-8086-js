// Zmienne globalne
let registyArray = []
let cellArray = []
let regEx = /^[0-9a-fA-F]+$/
// Pobieranie rejestrów
const registyWrapper = document.querySelector('.registy-box-wrapper')
const registyInputs = document.querySelectorAll('.registy-input')
// Pobieranie komórek RAM
const cellInput = document.querySelector('.cell-value')
const cellName = document.querySelector('.cell-name')
const cellInputBtn = document.querySelector('.cellbtn')
// Pobieranie przycisków operacyjnych
const operationBtns = document.querySelectorAll('.operationbtn')

// Funkcja wpisująca do tablicy wartości rejstrów
const pushToArray = () => {
	for (let i = 0; i < 8; i++) {
		registyArray[i] = registyInputs[i].firstElementChild.value
	}
	console.log(registyArray)
}

// Tworzenie komórek RAM
const fillingCells = () => {
	for (let i = 0; i < 65536; i++) {
		let cellName = i.toString(16).toUpperCase()
		while (cellName.length < 4) {
			cellName += '0'
		}
		const cellObj = {
			cellName: cellName,
			cellValue: '0000',
		}
		cellArray.push(cellObj)
	}
}

// Wprowadznie danych do komórek
const inputToCell = () => {
	// Sprawdzanie czy wartość jest wpisana poprawnie
	if (cellInput.value.match(regEx)) {
		cellInput.classList.remove('error-value')
		const cellInputValue = cellInput.value
		// Sprawdzanie czy nazwa komórki jest wpisana poprawnie
		if (cellName.value.toUpperCase().match(regEx)) {
			cellName.classList.remove('error-value')
			const cellInputName = cellName.value.toUpperCase()
			cellArray.forEach(cell => {
				if (cell.cellName === cellInputName) {
					cell.cellValue = cellInputValue.toUpperCase()
					console.log(cellArray)
				}
			})
		} else {
			cellName.classList.add('error-value')
		}
	} else {
		cellInput.classList.add('error-value')
	}
}

// Nasłuchiwanie na wciśnięcie przysisku
registyInputs.forEach(rej => {
	rej.firstElementChild.addEventListener('keyup', pushToArray)
})

cellInputBtn.addEventListener('click', inputToCell)

fillingCells()
