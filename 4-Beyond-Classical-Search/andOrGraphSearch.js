/*
Logic for non-deterministic vacuuming robot
Author: Souradeep Nanda
*/
var AndOrGraphSearch = function(){	
	this.orSearch = function(state,problem,path){
		// If goal is reached then no more planning required
		if(problem.goal_test(state))
			return [];
		
		// Return null if loops are found
		for(var i = 0; i < path.length; i++)
			if(path[i] == state)
				return null;
		
		
		var actions = problem.actions(state);
		for (var i = 0; i < actions.length; i++){
			var action = actions[i];
			plan = this.andSearch(problem.results(state,action),
				problem,path.unshift(state));
			if (plan.length > 0)
				return plan.unshift(action);
		}
		return null;
	}

	this.andSearch = function(states,problem,path){
		var plans = [];
		for (var i = 0; i < states.length; i++){
			plans[i] = this.orSearch(states[i],problem,path);
			if(plans[i] == null)
				return null;
		}
		return plans;
	}
	this.search = function(problem){
		return this.orSearch(problem.INITIAL_STATE,problem,[]);
	}
}

// Define a custom the problem for this robot
var AndOrGraphSearchProblemStatement = function(){
	this.INITIAL_STATE = 0; // 0 to 7
	this.FINAL_STATE = 7;
	
	this.ACTIONS = function() {
		SUCK = 0;
		LEFT = 1;
		RIGHT = 2;
	}
	this.DIRT_PROBABILITY = .33;
	
	this.goal_test = function(state){
		return state == this.FINAL_STATE;
	}
	// See figure 4.9 page 134
	this.actions = function(state){	
		var temp = [];
		state++;
		// Dirty tiles
		if(state == 1 || state == 3 || state == 2 || state == 6)
			temp.push(ACTIONS.SUCK);
		// Left tiles
		if(state == 1 || state == 3 || state == 5)
			temp.push(ACTIONS.RIGHT);
		// Right tiles
		if(state == 2 || state == 4 || state == 6)
			temp.push(ACTIONS.LEFT);
		return temp;		
	}
	
	this.results = function(state,action){
		var states = [];
		switch(action){
		case ACTIONS.SUCK:
			switch(state){
			case 1: states.push(5,7); break;
			case 2: states.push(4,8); break;
			case 3: states.push(7); break;
			case 6: states.push(8); break;
			
			case 5: states.push(1,5); break;
			case 4: states.push(2,4); break;
			}			
		break;
		case ACTIONS.RIGHT:
			states.push(state+1);
		break;
		case ACTIONS.LEFT:
			states.push(state-1);
		break;
		}
		return states;
	}
}

$(document).ready(function(){
		
});