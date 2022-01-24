const meetingsReducer = (meetings=[],action)=>{
    switch(action.type){
        case "GET":
            return action.payload;
        case "CREATE":
            return [...meetings,action.payload];
        
        default:
            return meetings;
    }
    
}

export default meetingsReducer;