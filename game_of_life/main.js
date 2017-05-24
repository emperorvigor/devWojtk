var lifeArrayTEST = [
					[0,0,0,1,0,0,0,0,0,0,0,0],
					[0,0,0,0,1,0,0,0,0,0,0,0],
					[0,0,1,1,1,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,1,0,0,0,0,0,0,0,0],
					[0,0,0,0,1,0,0,0,0,0,0,0],
					[0,0,1,1,1,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0]
				];
				
var lifeArray = [
					[0,0,0,1,0,0,0,0,0,0,0,0],
					[0,0,0,0,1,0,0,0,0,0,0,0],
					[0,0,1,1,1,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,1,0,0,0,0,0,0,0,0],
					[0,0,0,0,1,0,0,0,0,0,0,0],
					[0,0,1,1,1,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0],
					[0,0,0,0,0,0,0,0,0,0,0,0]
				];

function populateLife(width, height){
	document.getElementById("gameboard").style.width = width*10 + "px";
	document.getElementById("gameboard").style.height = height*10 + "px";
	var div;
	var rowArray = [];
    for (var i = 0 ; i < width; i++) {
        for (var j = 0; j < height; j++) {
			div = document.createElement('div');
			div.id = i + '-' + j;
			
			rowArray.push(0);
			/*if(i < lifeArray.length && lifeArray[i][j] == 1){
				div.className = 'life';
			}*/
			document.getElementById('gameboard').appendChild(div);
        }
		lifeArray.push(rowArray);
    }
	//console.table(lifeArray);
	//console.log('---------------');
}

function lifecycle(){
	var totalLife;
	var width = 12;
	var height = 12;
	var nextGeneration = [];
	var rowArray = [];
	//console.table(lifeArray);
	//console.log('-----> lifeArray lenght: ' + lifeArray.length + ' || Inner array length: ' + lifeArray[1].length);
	//console.log('KOORDINATORZER!------> ' + lifeArray[lifeArray.length-1][lifeArray[lifeArray.length-1].length-1]);
	for (var i = 0 ; i < width; i++) {
		for (var j = 0; j < height; j++) {
			//if(i==0){ console.log('-----------> Calculate life: ' + calculateLife(lifeArray, i, j)); }
			//if(11>i && i>0 && 11>j && j>0){
				totalLife = calculateLife(i, j);
				//console.log('Total amount of life around (' + i + ',' + j + '): ' + totalLife);
				//console.log('-----------> Calculate life: ' + calculateLife(lifeArray, i, j));
				if(lifeArray[i][j] == 1){
					if(totalLife < 3){ //death
						//console.log('mindre än 3:::::::::> i & j: ' + i + ' | ' + j);
						rowArray.push(0);
						changeGridElement(i, j, false);
					} else if(totalLife > 2 && totalLife < 5){ //unchanged
						rowArray.push(1);
						changeGridElement(i, j, true);
					} else if(totalLife > 4){ //death
						rowArray.push(0);
						changeGridElement(i, j, false);
					} else {
						//console.log('--- > reached else when totalLife is something else < ---');
					}
				} else if(lifeArray[i][j] == 0){
					if(totalLife == 3){ //dead cell becomes alive
						rowArray.push(1);
						changeGridElement(i, j, true);
					} else {
						//console.log('inne i else under 0 i lifeCycle')
						rowArray.push(0);
						/*nextGeneration[i][j] = 0;
						changeGridElement(i, j, false);*/
					}
				} else {
					//console.log('--- > reached else when lifeArray is something else < ---');
				}
				//console.log(' ----------- next ----------- ');
			//}
			//if(lifeArray[i][j] > 0){}
		}
		nextGeneration.push(rowArray);
		rowArray = [];
	}
	lifeArray = [];
	lifeArray = nextGeneration;
	nextGeneration = [];
	//console.table(lifeArray);
}

function testArray(){
	//populateLife(12, 12, lifeArray);
	lifecycle();
	/*for(var i = 0; i < 6; i++){
		newGeneration = lifecycle(newGeneration);
		
	}*/
	//lifecycle(lifeArray);
	
}

function changeGridElement(i, j, life){
	var div = document.getElementById(i + '-' + j);
	//if(div.className.match('life')){
	if(life && div.className == ''){
		div.className += 'life';
	} else if (!life && div.className == 'life'){
		div.className = div.className.replace(/(?:^|\s)life(?!\S)/g, '');
	} else {
		//console.log('i else för changeGridElement');
	}
}

function generateLifeArray(){
	for(var i = 0 ; 0 > height+1 ; i++){
		for(var j = 0 ; 0 > width+1 ; j++){
		}
	}
}

//TODO
function createGrid(i, j, life){
	div = document.createElement('div');
			div.id = i + '-' + j;
			if(life){
				div.className = 'life';
			}
			document.getElementById('gameboard').appendChild(div);
}

function calculateLife(i, j){
	var iMax = lifeArray.length-1; 
	var jMax = lifeArray[lifeArray.length-1].length-1;
	var totalLife = -1;
	
	//upp-vänster
	if(i == 0 && j == 0){
		//i,j | i,0 | i,1
		//0,j |
		//1,j |
		totalLife = lifeArray[iMax][jMax] + lyingPair(lifeArray, iMax, j) + standingPair(lifeArray, i, jMax) + square(lifeArray, i, j);
		//console.log('Om i = 0 och j = 0 (i: ' + i + ' | j: ' + j + '): ' + totalLife);
	}
	
	//upp-höger			
	if(i == 0 && j == lifeArray[j].length-1){
		//i,j-1 | i,j | i,0
		//			  | 0,0
		//			  | 1,0
		totalLife = lifeArray[iMax][0] + lyingPair(lifeArray, iMax, j-1) + standingPair(lifeArray, 0, 0) + square(lifeArray, i, j-1);
		//console.log('Om i = 0 och j = max (i: ' + i + ' | j: ' + j + '): ' + totalLife);
	}
	
	//ner-vänster			
	if(i == iMax && j == 0){
		//i,j-1 |
		//i,j   |
		//0,j   | 0,0 | 0,1
		totalLife = lifeArray[0][jMax] + lyingPair(lifeArray, 0, 0) + standingPair(lifeArray, i-1, jMax) + square(lifeArray, i-1, j);
		//console.log('Om i = max och j = 0 (i: ' + i + ' | j: ' + j + '): ' + totalLife);
	}
	
	//ner-höger
	if(i == iMax && j == jMax){
		//			  | i-1,0
		//			  | i,0
		//0,j-1 | 0,j | 0,0
		totalLife = lifeArray[0][0] + lyingPair(lifeArray, 0, j-1) + standingPair(lifeArray, i-1, 0) + square(lifeArray, i-1, j-1);
		//console.log('Om i = max och j = max (i: ' + i + ' | j: ' + j + '): ' + totalLife);
	}
	
	//vänster sida
	if(i > 0 && i < iMax && j == 0){
		//console.log('-----------vänst ' + i);
		totalLife = lifeArray[i-1][jMax] + lyingPair(lifeArray, i-1, j) + standingPair(lifeArray, i, jMax) + square(lifeArray, i, j);
		//console.log('Om 0<i<max och j = 0 (i: ' + i + ' | j: ' + j + '): ' + totalLife);
	}

	//höger sida
	if(i > 0 && i < iMax && j == jMax){
		//console.log('-----------hög ' + i);
		totalLife = lifeArray[i-1][0] + lyingPair(lifeArray, i-1, j-1) + standingPair(lifeArray, i, 0) + square(lifeArray, i, j-1);
		//console.log('Om 0<i<max och j = max (i: ' + i + ' | j: ' + j + '): ' + totalLife);
	}
	
	//uppre sida
	if(i == 0 && j > 0 && j < jMax){
		//console.log('-----------upp ' + i);
		totalLife = lifeArray[iMax][j-1] + lyingPair(lifeArray, iMax, j) + standingPair(lifeArray, i, j-1) + square(lifeArray, i, j);
		//console.log('Om 0<j<max och i = 0 (i: ' + i + ' | j: ' + j + '): ' + totalLife);
	}
	
	//nedre sida
	if(i == iMax && j > 0 && j < jMax){
		//console.log('-----------ner ' + i);
		totalLife = lifeArray[0][j-1] + lyingPair(lifeArray, 0, j) + standingPair(lifeArray, i-1, j-1) + square(lifeArray, i-1, j);
		//console.log('Om 0<j<max och i = max (i: ' + i + ' | j: ' + j + '): ' + totalLife);
	}
	
	//mitten
	if(i < iMax && i > 0 && j > 0 && j < jMax){
		//console.log('-----------mitt ' + i);
		totalLife = lifeArray[i-1][j-1] + lyingPair(lifeArray, i-1, j) + standingPair(lifeArray, i, j-1) + square(lifeArray, i, j);
		//console.log('Om 0<j<max och 0<i<max (i: ' + i + ' | j: ' + j + '): ' + totalLife);
	}
 
	return totalLife;
}

//fyrkanten
function square(lifeArray, i, j){
	//console.log('square(lifeArray, i-1, j): ' + square(lifeArray, i-1, j));
	return lifeArray[i][j] + lifeArray[i][j+1] +
		   lifeArray[i+1][j] + lifeArray[i+1][j+1];
}

//liggande par
function lyingPair(lifeArray, i, j){
	//console.log('lyingPair(lifeArray, i-1, j-1)' + lyingPair(lifeArray, i-1, j-1));
	return lifeArray[i][j] + lifeArray[i][j+1];
}

//stående par
function standingPair(lifeArray, i, j){
	//console.log('standingPair(lifeArray, i, 0)' + standingPair(lifeArray, i, 0));
	return lifeArray[i][j] + lifeArray[i+1][j];
}