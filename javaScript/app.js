// Zmienne globalne
let registyArray = []
let cellArray = []

// Pobieranie rejestrów
const registyWrapper = document.querySelector('.registy-box-wrapper')
const registyInputs = document.querySelectorAll('.registy-input')

// Pobieranie komórek RAM
const cellInput = document.querySelector('.cell-value')
const cellName = document.querySelector('.cell-name')
const cellInputBtn = document.querySelector('.cellbtn')

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
	const cellInputValue = cellInput.value
	const cellInputName = cellName.value.toUpperCase()
	cellArray.forEach(cell => {
		if (cell.cellName === cellInputName) {
			cell.cellValue = cellInputValue
			console.log(cellArray)
		}
	})
}

// Nasłuchiwanie na wciśnięcie przysisku
registyInputs.forEach(div => {
	div.firstElementChild.addEventListener('keyup', pushToArray)
})

cellInputBtn.addEventListener('click', inputToCell)

fillingCells()
