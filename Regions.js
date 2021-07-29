import Territory from './Territory.js';

class Region{
    constructor(name, bonus, territories){
        this.name = name;
        this.bonus = bonus;
        this.territories = territories;
    }

    getOwner(){
        let sameOwner = true;
        let previousOwner = this.territories[0].owner;
        
        this.territories.every(territory => {
            if (territory.owner !== previousOwner) {
                sameOwner = false;
                return false;
            }
            return true;
        });

        if (sameOwner) {
            return previousOwner;
        }
        
        return 'Neutral';
    }
}

const theNorth = new Region('The North', 5, [
        new Territory('The Gift'),
        new Territory('Skagos'),
        new Territory('Bear Island'),
        new Territory('Stoney Shore'),
        new Territory('Wolfswood', false, true),
        new Territory('Winterfell', true),
        new Territory('The Dreadfort', true),
        new Territory('Karhold'),
        new Territory('Widows\'s Watch', false, true),
        new Territory('Barrowlands', true),
        new Territory('White Harbour', false, true),
        new Territory('Cape Kraken', false, true),
        new Territory('The Kneck')
    ]
);

const theIronIslands = new Region('The Iron Islands', 1, [
        new Territory('Pyke', true, true),
        new Territory('Harlaw', false, true)
    ]
);

const theWesterlands = new Region('The Westerlands', 2, [
        new Territory('The Crag'),
        new Territory('Golden Tooth'),
        new Territory('Casterly Rock', true, true),
        new Territory('Crake Hall', true),
        new Territory('Silverhill')
    ]   
);

const theRiverlands = new Region('The Riverlands', 2, [
        new Territory('The Twins', true),
        new Territory('The Trident', false, true),
        new Territory('Riverrun', true),
        new Territory('Stoney Sept'),
        new Territory('Harrenhal', true)
    ]
);

const theVale = new Region('The Vale', 1, [
        new Territory('Mountains of the Moon'),
        new Territory('The Fingers'),
        new Territory('The Eyrie', true),
        new Territory('Gulltown', false, true)
    ]
);

const theReach = new Region('The Reach', 4, [
        new Territory('Searoad Marshes'),
        new Territory('Blackwater Rush'),
        new Territory('Old Town', true, true),
        new Territory('Highgarden', true),
        new Territory('The Mander', true),
        new Territory('The Arbor'),
        new Territory('Three Towers')
    ]
);

const theCrownlands = new Region('The Crownlands', 2, [
        new Territory('Kings\'s Landing', true, true),
        new Territory('Crackclaw Point'),
        new Territory('Dragonstone', true, true),
        new Territory('Kingswood')
    ]
);

const theStormlands = new Region('The Stormlands', 1, [
        new Territory('Storm\'s End', true, true),
        new Territory('Tarth'),
        new Territory('Dornish Marches', true),
        new Territory('Rainwood')
    ]
);
const dorne = new Region('Dorne', 1, [
        new Territory('Red Mountains'),
        new Territory('Sandstone', true),
        new Territory('Greenblood'),
        new Territory('Sunspear', true, true)
    ]
);

export const regions = [theNorth, theIronIslands, theWesterlands, theRiverlands,
                 theVale, theReach, theCrownlands, theStormlands, dorne];