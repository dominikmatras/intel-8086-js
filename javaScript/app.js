// Zmienne globalne
let registyArray = []
let cellArray = []
let regEx = /^[0-9a-fA-F]+$/
let operation
let operationCell1 = 'rej',
	operationCell2 = 'rej',
	operationCell3 = 'rej'
// Pobieranie rejestrów
const registyWrapper = document.querySelector('.registy-box-wrapper')
const registyInputs = document.querySelectorAll('.registy-input')
// Pobieranie komórek RAM
const cellInput = document.querySelector('.cell-value')
const cellName = document.querySelector('.cell-name')
const cellInputBtn = document.querySelector('.cellbtn')
// Pobieranie przycisków operacyjnych
const operationBtnsWrapper = document.querySelector('.operation-box-wrapper')
const operationBtns = document.querySelectorAll('.operationbtn')
// Pobieranie przycisków do wyboru komórek operacji
const actionCell1 = document.querySelector('.operation-btn-wrapper1')
const actionCellBtns1 = document.querySelectorAll('.btn-operation1')
const actionCell2 = document.querySelector('.operation-btn-wrapper2')
const actionCellBtns2 = document.querySelectorAll('.btn-operation2')
const actionCell3 = document.querySelector('.operation-btn-wrapper3')
const actionCellBtns3 = document.querySelectorAll('.btn-operation3')

// Funkcja wpisująca do tablicy wartości rejstrów
const pushToArray = () => {
	for (let i = 0; i < 8; i++) {
		registyArray[i] = registyInputs[i].firstElementChild.value
	}
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
				}
			})
		} else {
			cellName.classList.add('error-value')
		}
	} else {
		cellInput.classList.add('error-value')
	}
}

// Wybór na jakich komórkach ma wykonać się operacja
const actionCellChoice = e => {
	let next = e.target.nextElementSibling // Jeżeli nie ma to NULL
	let prev = e.target.previousElementSibling // Jeżeli nie ma to NULL

	if (!e.target.classList.contains('operation-btn-active')) {
		if (next == null) {
			prev.classList.remove('operation-btn-active')
		} else {
			next.classList.remove('operation-btn-active')
		}
		e.target.classList.add('operation-btn-active')
		if (e.target.classList.contains('btn-operation1')) {
			operationCell1 = e.target.attributes.operation.textContent
		} else if (e.target.classList.contains('btn-operation2')) {
			operationCell2 = e.target.attributes.operation.textContent
		} else {
			operationCell3 = e.target.attributes.operation.textContent
		}
	}
}

// Nasłuchiwania

// Wpisywanie do tablicy 'registyArray'
registyInputs.forEach(rej => {
	rej.firstElementChild.addEventListener('keyup', pushToArray)
})

// Wybór operacji
operationBtnsWrapper.addEventListener('click', e => {
	operationBtns.forEach(btn => btn.classList.remove('btn-active'))
	if (e.target.nodeName == 'BUTTON') {
		operation = e.target.textContent
		console.log(operation)
		e.target.classList.add('btn-active')
	}
})

// Wybór na jakich komórkach ma wykonać się operacja - nasłuchiwanie
actionCell1.addEventListener('click', e => actionCellChoice(e))
actionCell2.addEventListener('click', e => actionCellChoice(e))
actionCell3.addEventListener('click', e => actionCellChoice(e))

// Wpisywanie do tablicy 'cellArray'
cellInputBtn.addEventListener('click', inputToCell)

// Wypełnianie zerami (0) komórek RAM
fillingCells()
