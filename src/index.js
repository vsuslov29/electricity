/**
 * This class is just a facade for your implementation, the tests below are using the `World` class only.
 * Feel free to add the data and behavior, but don't change the public interface.
 */


export class World {
  constructor() {
    this.connectedHouseholds = [];

    this.hasHouseholdOwnElectricity = (household) => {
      return household.powerPlants
        .some(powerPlant => powerPlant.isAlive);
    }

    this.hasConnectedHouseholdsElectricity = (households) => {
      return households.some(connectedHousehold => {
        return this.hasHouseholdOwnElectricity(connectedHousehold);
      });
    }
  }

  createPowerPlant() {
    return {
      isAlive: true,
    };
  }

  createHousehold() {
    return {
      powerPlants: [],
      connectedHouseholds: [],
    };
  }

  connectHouseholdToPowerPlant(household, powerPlant) {
    household.powerPlants.push(powerPlant);
  }

  connectHouseholdToHousehold(household1, household2) {
    const { connectedHouseholds } = this;
    
    connectedHouseholds.push(household1, household2)

    household1.connectedHouseholds = connectedHouseholds;
    household2.connectedHouseholds = connectedHouseholds;
  }

  disconnectHouseholdFromPowerPlant(household, powerPlant) {
    household.powerPlants = household.powerPlants
      .filter(plant => plant !== powerPlant);
  }

  killPowerPlant(powerPlant) {
    powerPlant.isAlive = false;
  }

  repairPowerPlant(powerPlant) {
    powerPlant.isAlive = true;
  }

  householdHasEletricity(household) {
    const { 
      hasHouseholdOwnElectricity,
      hasConnectedHouseholdsElectricity,
    } = this;

    const { connectedHouseholds } = household;

    return hasHouseholdOwnElectricity(household) || 
      hasConnectedHouseholdsElectricity(connectedHouseholds);
  }
}
