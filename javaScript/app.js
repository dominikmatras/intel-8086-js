// Zmienne globalne
let registyArray = []
const registryNameArray = ['AL', 'AH', 'BL', 'BH', 'CL', 'CH', 'DL', 'DH']
let cellArray = []
let regEx = /^[0-9a-fA-F]+$/
let operation = ''
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
// Pobieranie div'y operacji
const MultiplyOperationDiv = document.querySelector('.multiply-operation')
const SingleOperationDiv = document.querySelector('.single-operation')
// Pobieranie <p> operacji
const operationName = document.querySelector('.operation-name')
// Pobieranie inputów operacji
const inputOperation1 = document.querySelector('.input-operation1')
const inputOperation2 = document.querySelector('.input-operation2')
// (single)
const inputOperation3 = document.querySelector('.input-operation3')
// Pobieranie przycisków do wyboru komórek operacji
const actionCell1 = document.querySelector('.operation-btn-wrapper1')
const actionCellBtns1 = document.querySelectorAll('.btn-operation1')
const actionCell2 = document.querySelector('.operation-btn-wrapper2')
const actionCellBtns2 = document.querySelectorAll('.btn-operation2')
// (single)
const actionCell3 = document.querySelector('.operation-btn-wrapper3')
const actionCellBtns3 = document.querySelectorAll('.btn-operation3')
// Przyciski wykonujące operacje
const actionMultiSubmit = document.querySelector('.multiply-submit')
const actionSingleSubmit = document.querySelector('.single-submit')

// Funkcja wpisująca do tablicy wartości rejstrów
const pushToArray = () => {
	for (let i = 0; i < 8; i++) {
		registyArray[i] = registyInputs[i].firstElementChild.value
	}
}

const validateRegistry = () => {
	registyInputs.forEach(el => {
		el.classList.remove('error-value')
	})
	let i = 0
	registyArray.forEach(element => {
		if (element.match(regEx)) {
			i += 1
		}
	})

	if (i == 8) {
		return true
	} else {
		registyInputs.forEach(el => {
			el.classList.add('error-value')
		})
		return false
	}
}

// Tworzenie komórek RAM
const fillingCells = () => {
	for (let i = 1; i <= 65536; i++) {
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
		let cellInputValue = cellInput.value
		// Sprawdzanie czy nazwa komórki jest wpisana poprawnie
		if (cellName.value.toUpperCase().match(regEx)) {
			cellName.classList.remove('error-value')
			while (cellInputValue.length < 4) {
				cellInputValue += '0'
			}
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

const operationChoice = () => {
	if (!validateRegistry()) {
		alert('Rejejst nie został wypełniony poprawnie!')
		operationBtns.forEach(btn => btn.classList.remove('btn-active'))
	} else {
		if (operation == '') {
			alert('Nie wybrano operacji!!')
		} else {
			operationName.textContent = `Operacja: ${operation}`
			switch (operation) {
				case 'NOT':
				case 'INC':
				case 'DEC':
					MultiplyOperationDiv.classList.add('action-hiden')
					SingleOperationDiv.classList.remove('action-hiden')
					break
				default:
					SingleOperationDiv.classList.add('action-hiden')
					MultiplyOperationDiv.classList.remove('action-hiden')
			}
		}
	}
}

const operationSingle = () => {
	let outputValue
	let decimalValue
	let nameOfCell = inputOperation3.value.toUpperCase()

	if (actionCellBtns3[0].classList.contains('operation-btn-active')) {
		let indexCell = registryNameArray.indexOf(nameOfCell)
		let inputValue = registyArray[indexCell]
		if (inputValue == undefined) {
			alert('Zła nazwa resjetru!')
		} else {
			switch (operation) {
				case 'NOT':
					decimalValue = parseInt(inputValue, 16)
					decimalValue = ~decimalValue
					outputValue = decimalValue.toString(16).toUpperCase()
					alert(`Wartość komórki rejesrtu ${nameOfCell} po operacji NOT uległa zmianie na: ${outputValue}`)
					registyArray[indexCell] = outputValue
					const inputCellNOT = document.querySelector(`[data-index="${indexCell}"]`)
					inputCellNOT.value = outputValue
					break
				case 'INC':
					decimalValue = parseInt(inputValue, 16)
					decimalValue += 1
					outputValue = decimalValue.toString(16).toUpperCase()
					alert(`Wartość komórki rejesrtu ${nameOfCell} po operacji INC uległa zmianie na: ${outputValue}`)
					registyArray[indexCell] = outputValue
					const inputCellINC = document.querySelector(`[data-index="${indexCell}"]`)
					inputCellINC.value = outputValue
					break
				case 'DEC':
					decimalValue = parseInt(inputValue, 16)
					decimalValue -= 1
					outputValue = decimalValue.toString(16).toUpperCase()
					alert(`Wartość komórki rejesrtu ${nameOfCell} po operacji DEC uległa zmianie na: ${outputValue}`)
					registyArray[indexCell] = outputValue
					const inputCellDEC = document.querySelector(`[data-index="${indexCell}"]`)
					inputCellDEC.value = outputValue
			}
		}
	} else {
		// Jezeli RAM!
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
		e.target.classList.add('btn-active')
		operationChoice()
	}
})

// Wybór na jakich komórkach ma wykonać się operacja - nasłuchiwanie
actionCell1.addEventListener('click', e => actionCellChoice(e))
actionCell2.addEventListener('click', e => actionCellChoice(e))
actionCell3.addEventListener('click', e => actionCellChoice(e))

// Wpisywanie do tablicy 'cellArray'
cellInputBtn.addEventListener('click', inputToCell)

actionSingleSubmit.addEventListener('click', operationSingle)

// Wypełnianie zerami (0) komórek RAM
fillingCells()

// let number = 10011101
// let hex = parseInt(number, 2)
// hex += 1
// console.log(hex)
// hex = hex.toString(16)
// console.log(hex)
