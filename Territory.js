export default class Territory{ 
    constructor(name, castle = false, port = false, owner = 'Neutral'){
        this.name = name;
        this.castle = castle;
        this.port = port;
        this.owner = owner;
    }

    getReinforcementPoints() {
        return this.castle ? 2 : 1;
    }

    getVictoryPoints() {
        let points = 1;
        
        if (this.castle){
            points++;
        }
        if (this.port){
            points++;
        }

        return points;
    }
}