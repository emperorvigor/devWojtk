var mainJS = angular.module('mainJS', []);

mainJS.controller('dataCtrl', function($scope) {
    $scope.chars = [
        {id:0,name:'Leikfaar Ormkrona',weapon:'Något(10)',armor:'rust1',actions:4,combatpoints:27,hp:32,strength:-4,initiative:-5,ini:3,iniTwo:4,iniThree:7},
        {id:1,name:'Bjorn Stormdrake',weapon:'Något(10)',armor:'rust1',actions:3,combatpoints:33,hp:34,strength:+2,initiative:-5,ini:9,iniTwo:4,iniThree:7},
        {id:2,name:'Siri 1',weapon:'Något(10)',armor:'rust1',actions:2,combatpoints:14,hp:32,strength:-4,initiative:3,ini:8,iniTwo:4,iniThree:7},
		{id:3,name:'Siri 2',weapon:'Något(10)',armor:'rust1',actions:2,combatpoints:14,hp:32,strength:-4,initiative:4,ini:3,iniTwo:6,iniThree:7},
		{id:4,name:'Siri 3',weapon:'Något(10)',armor:'rust1',actions:2,combatpoints:14,hp:32,strength:-4,initiative:-4,ini:3,iniTwo:4,iniThree:5},
		{id:5,name:'Siri 4',weapon:'Något(10)',armor:'rust1',actions:2,combatpoints:14,hp:32,strength:-4,initiative:-2,ini:3,iniTwo:4,iniThree:7},
		{id:6,name:'Siri 6',weapon:'Något(10)',armor:'rust1',actions:2,combatpoints:14,hp:32,strength:-4,initiative:-6,ini:0,iniTwo:1,iniThree:7},
		{id:7,name:'Siri 7',weapon:'Något(10)',armor:'rust1',actions:2,combatpoints:14,hp:32,strength:-4,initiative:-4,ini:2,iniTwo:4,iniThree:7},
		{id:7,name:'Siri 8',weapon:'Något(10)',armor:'rust1',actions:2,combatpoints:14,hp:32,strength:-4,initiative:-1,ini:3,iniTwo:4,iniThree:7},
		{id:9,name:'Siri 9',weapon:'Något(10)',armor:'rust1',actions:2,combatpoints:14,hp:32,strength:-4,initiative:-8,ini:6,iniTwo:4,iniThree:7}
    ];
	
	$scope.weapons = [
		{name:'Pilbåge',chritchance:8,shield:false,grip:'2h'},
		{name:'Dolk',chritchance:10,shield:false,grip:'1h'},
		{name:'Liten sköld',chritchance:7,shield:true,grip:'1h'}
	];
	
	$scope.armor = [
		{name:'Tyg',absorbation:'1/10'},
		{name:'Läder',chritchance:'2/20'},
		{name:'Härdat läder',chritchance:'3/30'}
	];
	
	$scope.initiatives = [];
	$scope.segments = [];
});

mainJS.controller('functionsCtrl', function($scope) {
	$scope.hoverIn = function(){
        this.hoverEdit = true;
    };

    $scope.hoverOut = function(){
        this.hoverEdit = false;
    };
	
	$scope.showAddChar = false;
	
	$scope.addChar = function () {
        $scope.chars.push({
			id: $scope.chars.length,
            name: $scope.addName,
			weapon: $scope.addWeapon,
			armor: $scope.addArmor,
            actions: $scope.addActions,
			combatpoints: $scope.addCombatpoints,
			hp: $scope.addHP,
			strength: $scope.addStrength,
			initiative: $scope.addInitiative
        });

        // Clear input fields after push
        $scope.addName = "";
		$scope.addWeapon = "";
		$scope.addArmor = "";
		$scope.addActions = "";
		$scope.addCombatpoints = "";
		$scope.addHP = "";
		$scope.addStrength = "";
		$scope.addInitiative = "";
    };
	
	$scope.removeChar = function(index) {
		$scope.chars.splice(index,1);
	}
	
	$scope.newSegment = function () {
		
	};
	
	var whileTenLoop = function() {
		var iniRoll = 0;
		var roll = 0;
		do{
			//console.log('före, iniroll: ' + iniRoll);
			iniRoll = Math.floor(Math.random()*(10)+1);
			roll = iniRoll + roll;
			//console.log('efter, iniroll: ' + iniRoll);
		} while(iniRoll > 9);
		console.log('Ini: ' + roll);
		return roll;
	};
	
	//Nytt initiaitv - Slumpar fram upp till 3 slag med en T10 och skapar en lista av alla karaktärer
	$scope.newInitiative = function() {
		angular.forEach($scope.chars, function(value, key) {
			//console.log('Ini: ' + roll + ' | Namn: ' + value.name + ' | initiative från char: ' + $scope.chars[key].initiative);
			$scope.chars[key].ini = whileTenLoop();
			console.log('hej');
		});
		
		//om första initiativet är exakt lika som tidigare så slås T10:an på nytt för iniTwo
		angular.forEach($scope.chars, function(value, key) {
			var ini = $scope.chars[key].ini;
			var index = key;
			console.log('ini --> ' + ini + ' width index: ' + index);
			angular.forEach($scope.chars, function(value, key) {
				if(ini == $scope.chars[key].ini && index != key){
					console.log('inside foreachif!!!!!!!');
					$scope.chars[key].iniTwo = whileTenLoop();
				};
			});
			
			//här slumpas iniThree beroende på ifall iniTwo har dubletter (buggar någonstans, slår även om dublett inte finns)
			ini = $scope.chars[key].iniTwo;
			angular.forEach($scope.chars, function(value, key) {
				if(ini == $scope.chars[key].iniTwo && index != key && $scope.initiatives[key].iniTwo != 0){
					console.log('inside INITHREEEEE!!!!!!!');
					$scope.chars[key].iniThree = whileTenLoop();
				};
			});
			
			//tänkt att läsa in vem man attackerar för att spara undan och ha "preselected" vid nästa inislumpning NYI
			//$scope.initiatives[key].attacking = $scope.getAttackedTarget();
			//console.log('------------------>' + $scope.getAttackedTarget());
			//console.log('initiatives:----> ' + JSON.stringify($scope.initiatives));
		});
	};
	
	$scope.getAttackedTarget = function() {
		return $scope.attackedChar;
	};
});