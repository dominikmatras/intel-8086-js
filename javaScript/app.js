// Zmienne globalne
let registyArray = []
const cellArray = []

// Pobieranie rejestrów
const registyWrapper = document.querySelector('.registy-box-wrapper')
const registyInputs = document.querySelectorAll('.registy-input')

// Pobieranie komórek RAM
const cellInput = document.querySelector('.cell-input')
const cellList = document.querySelector('.cell-list')
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

// Nasłuchiwanie na wciśnięcie przysisku
registyInputs.forEach(div => {
	div.firstElementChild.addEventListener('keyup', pushToArray)
})

fillingCells()

console.log(cellArray)
