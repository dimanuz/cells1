//задаем начальный размер таблицы
var TColSize=4; 
var TRowSize=4;

function CreateTable() {
	//Объявляем переменные
	var table = document.getElementById('table');
	var tbody = document.createElement('tbody');
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	var div = document.createElement('div');
	
	tbody.id='tbody';
	
	//Добавить первую строку
	for (var r = 0; r < TRowSize+2; r++) {
		//Создаем строку тела 
		tr = document.createElement('tr');
		
		// Особая первая строка
		if (r==0) {
			for (var c = 0; c < TColSize+2; c++) {
				td = document.createElement('td');
				div = document.createElement('div');

				if ((c==0)||(c==(TColSize+1)))
					td.classList.add('blank');
				
				if (c>0 && c<(TColSize+1)) { // Простые столбцы
					td.classList.add('del');
					div.classList.add('plus');
					div.innerHTML='-';
					td.appendChild(div);
				}
				tr.appendChild(td);
			}
		}

		// Простые строки
		if (r>0 && r<=(TRowSize)) {
			
			for (var c = 0; c < TColSize+2; c++) {
				td = document.createElement('td');
				div = document.createElement('div');
				
				if (c==0) { // Особый первая столбец
					td.classList.add('del');
					div.classList.add('plus');
					div.innerHTML='-';
					td.appendChild(div);
				}
				
				if (c==(TColSize+1)) {// Особый последний столбец
					if (r==1){ //Добавляем кнопку добавления
						td.classList.add('add');
						div.classList.add('plus');
						div.innerHTML='+';
						td.appendChild(div);
					} else{
						td.classList.add('blank');
					}
				}
				tr.appendChild(td);
			}
		}
		
		// Особая последняя строка
		if (r==(TRowSize+1)) {
			for (var c = 0; c < TColSize+2; c++) {
				td = document.createElement('td');
				div = document.createElement('div');
				td.classList.add('blank');
				if (c==1) { // Особый  второй столбец
					td.classList.add('add');
					div.classList.add('plus');
					div.innerHTML='+';
					td.appendChild(div);
				}
				tr.appendChild(td);
			}
		}	
		//Добавляем строку к телу таблицы
		tr.appendChild(td);
		tbody.appendChild(tr);
	}
	
	//Устанавливаем размеры таблицы
	setTableSize();

	//Добавляем тело к таблице
	table.appendChild(tbody);
}


function add_class_active(r, c) {
	var tbody = document.getElementById('tbody');
	if (r<(TRowSize+1)&&TColSize>1&&c!=0&&c!=(TColSize+1)) tbody.rows[0].cells[c].classList.add('active');
	if (c<(TColSize+1)&&TRowSize>1&&r!=0&&r!=(TRowSize+1)) tbody.rows[r].cells[0].classList.add('active');
}

function remove_class_active() {
	//Устанавливаем видимость кнопки удаления
	var elems = document.querySelectorAll('.active');
	for (var i = 0; i < elems.length; i++) {
		elems[i].classList.remove('active');
	}
}


function mClick(event) {
// обработчик клика по таблице
	var table = document.getElementById('table');
	var target = event.target;
	var div = document.createElement('div');
	if (target.tagName=='DIV') 
	{
		target=target.parentElement;
	}
 	var iRow=target.parentElement.rowIndex;
	var iCol=target.cellIndex;

	//нажали на кнопку добавления столбца
 	if (iCol == (TColSize+1) && iRow==1) {
		TColSize+=1;
		for (var r = 0; r < TRowSize+2; r++){
			table.rows[r].insertCell(TColSize);
			if (r==0) {
				table.rows[r].cells[TColSize].classList.add('del');
				div.classList.add('plus');
				div.innerHTML='-';
				table.rows[r].cells[TColSize].appendChild(div);				
			}
			if (r==(TRowSize+1)) {// Особый последний столбец
				//<td id="td_blank2">
				table.rows[r].cells[TColSize].classList.add('blank');	
			}
		}
	}
	
	//нажали на кнопку добавления строки

 	if (iRow == (TRowSize+1) && iCol==1) {
		var newrow = table.insertRow(TRowSize+1);
		for (var c = 0; c < TColSize+2; c++) newrow.insertCell(-1);
		for (var c = 0; c < TColSize+2; c++) {
			if (c==0) { // Особый первая столбец
				// <td class="del del_row1" id="right_del_row1"> <div class="plus">-</div>
				newrow.cells[0].classList.add('del');
				div.classList.add('plus');
				div.innerHTML='-';
				newrow.cells[0].appendChild(div);
			}
			if (c==(TColSize+1)) {// Особый последний столбец
				newrow.cells[c].classList.add('blank');	
				newrow.cells[c].classList.add('border_top');	
			}
		}
		TRowSize+=1;
	}
	
	//нажали на кнопку удаления строки
 	if (iCol == 0 && iRow > 0) {
		table.deleteRow(iRow);	
		if (iRow==1) {// Если удалили строку с кнопкой, то надо восстановить кнопку
			//Если это вторая строка <td class="add" id="add_col"> <div class="plus">+</div>
			tbody.rows[1].cells[TColSize+1].classList.add('add');
			div.classList.add('plus');
			div.innerHTML='+';
			tbody.rows[1].cells[TColSize+1].appendChild(div);
		}

		TRowSize-=1;
	}

	//нажали на кнопку удаления столбца
 	if (iRow == 0 && iCol > 0) {
		for (var r = 0; r < TRowSize+2; r++){
			table.rows[r].deleteCell(iCol);
		}
			
		if (iCol==1){//Восстановить кнопку добавления столбца
			//Если это вторая строка <td class="add" id="add_col"> <div class="plus">+</div>
			tbody.rows[TRowSize+1].cells[1].classList.remove('del');
			tbody.rows[TRowSize+1].cells[1].classList.add('add');
			div.classList.add('plus');
			div.innerHTML='+';
			tbody.rows[TRowSize+1].cells[1].appendChild(div);
		}
		TColSize-=1;
	}
	setTableSize();
	setBorder();
}

function setTableSize(){
	//Устанавливаем размеры таблицы
	var table = document.getElementById('table');
	var sH=(TRowSize+2)*50+'px'; //alert(sH);
	table.setAttribute('height', sH);		
	var sW=(TColSize+2)*50+'px'; //alert(sH);
	table.setAttribute('width', sW);	
}	

function setBorder(){
	//Устанавливаем место и размеры рамки 
	var border = document.getElementById('border'); //получаем нашу рамку
	border.style.height=(TRowSize)*50+'px';		
	border.style.width=(TColSize)*50+'px';	
	border.style.top = -1*((TRowSize+1)*50+1)+'px';		
	border.style.left = '49px';		
}

function mOver(event) {
	//обработчик положения мышки в таблице
	var target = event.target;
	if (target.tagName=='DIV') 
	{
		target=target.parentElement;
	}
 	var iRow=target.parentElement.rowIndex;
	var iCol=target.cellIndex;
	
	remove_class_active();
	add_class_active(iRow,iCol);
}

function AddListners(){
	//навешиваем обработчики клика и положения мышки на область таблицы
	var elem = document.getElementById('table');
	elem.addEventListener('mouseover', mOver);
	elem.addEventListener('click', mClick);
}

window.onload = function(){
	CreateTable();
	setBorder();
	AddListners();
}
