import { unstable_renderSubtreeIntoContainer } from "react-dom";

export class RemoveStore {
  constructor(affectedRows) {
    this.affectedRows = affectedRows;
  }

  toString() {
    return this.affectedRows;
  }
}

export class StoresList {
  constructor(idstore, longitude, latitude, managerUserName, managerEmail) {
    this.idstore = idstore;
    this.longitude = longitude;
    this.latitude = latitude;
    this.managerUserName = managerUserName;
    this.managerEmail = managerEmail;
  }
  toString() {
    return (
      this.idstore +
      " " +
      this.longitude +
      " " +
      this.latitude +
      " " +
      this.managerUserName +
      " " +
      this.managerEmail
    );
  }
}
export class StoresList2 {
  constructor(idstore, longitude, latitude, distance) {
    this.idstore = idstore;
    this.longitude = longitude;
    this.latitude = latitude;
    this.distance = distance;
  }
  toString() {
    return (
      this.idstore +
      " " +
      this.longitude +
      " " +
      this.latitude +
      " " +
      this.distance
    );
  }
}
// Inventory worth report for one store
export class Inventory {
  constructor(totalPrice) {
    // this.idstore = idstore;
    this.totalPrice = totalPrice;
  }
  toString() {
    //return this.idstore + " " + this.value;
    return this.totalPrice;
  }
}

//Inventory worth for all stores
export class TotalInventory {
  constructor(totalPrice) {
    this.totalPrice = totalPrice;
  }
  toString() {
    return this.totalPrice;
  }
}

export class ItemLocation {
  constructor(idLocations, sku, aisle, shelf) {
    this.idLocations = idLocations;
    this.sku = sku;
    this.aisle = aisle;
    this.shelf = shelf;
  }
  toString() {
    return (
      this.idLocations + " " + this.sku + " " + this.aisle + " " + this.shelf
    );
  }
}
export class Item {
  constructor(sku, name, description, price, maxQ) {
    this.sku = sku;
    this.name = name;
    this.description = description;
    this.price = price;
    this.maxQ = maxQ;
  }
  toString() {
    return (
      this.sku +
      " " +
      this.name +
      " " +
      this.description +
      " " +
      this.price +
      " " +
      this.maxQ
    );
  }
}

export class Store {
  constructor(
    idstore,
    longitude,
    latitude,
    managerUserName,
    managerPassword,
    managerEmail
  ) {
    this.idstore = idstore;
    this.longitude = longitude;
    this.latitude = latitude;
    this.managerUserName = managerUserName;
    this.managerPassword = managerPassword;
    this.managerEmail = managerEmail;
  }

  toString() {
    return (
      this.idstore +
      " " +
      this.longitude +
      " " +
      this.latitude +
      " " +
      this.managerUserName +
      " " +
      this.managerPassword +
      " " +
      this.managerEmail
    );
  }
}

export class Model {
  constructor() {
    this.stores = [];
    this.items = [];
    this.itemLocations = [];
    this.inventories = [];
    this.storesList = [];
    this.storesList2 = [];
    this.removeStores = [];
    this.totalInventories = [];
  }
  //  getValues(idstore, longitude, latitude, managerUserName, managerPassword, managerEmail)

  // calculator getValues function
  // getValue(name) {
  //     // if name is a STRING try to find constant with that name
  //     // o/w parse as double and continue
  //     let value = parseFloat(name);
  //     if (isNaN(value)) {
  //         // must be CONSTANT name!
  //         let foundConstant = this.constants.find((c) => c.name === name);
  //         if (foundConstant) {
  //             return foundConstant.value;
  //         } else {
  //             return NaN; // shows error
  //         }
  //     } else {
  //         return value;
  //     }
  // }

  // Return TRUE if newly created; return FALSE if replace
  // define(name, value) {
  //     let foundConstant = this.constants.find((c) => c.name === name);
  //     if (foundConstant) {
  //         foundConstant.value = value;
  //         return false;
  //     }
  //     let c = new Constant(name, value);
  //     this.constants.push(c);
  //     return true;
  // }

  // remove(name) {
  //     let foundConstant = this.constants.find((c) => c.name === name);
  //     if (foundConstant) {
  //         // seems like perhaps does one extra step...
  //         const index = this.constants.indexOf(foundConstant);
  //         this.constants.splice(index, 1);
  //         return true;
  //     }

  //     return false;
  // }

  copy() {
    let m = new Model();
    m.stores = this.stores; // Make a COPY of the constants
    m.items = this.items;
    m.itemLocations = this.itemLocations;
    m.inventories = this.inventories;
    m.storesList = this.storesList;
    m.storesList2 = this.storesList2;
    m.removeStores = this.removeStores;
    m.totalInventories = this.totalInventories; 
    return m;
  }
}

// export class Constant {
//     constructor(name, value) {
//         this.name = name;
//         this.value = value;
//     }

//     toString() {
//         return this.name + "=" + this.value;
//     }
// }

// export class Model {
//     constructor() {
//         this.constants = [];
//     }

//     getValue(name) {
//         // if name is a STRING try to find constant with that name
//         // o/w parse as double and continue
//         let value = parseFloat(name);
//         if (isNaN(value)) {
//             // must be CONSTANT name!
//             let foundConstant = this.constants.find((c) => c.name === name);
//             if (foundConstant) {
//                 return foundConstant.value;
//             } else {
//                 return NaN; // shows error
//             }
//         } else {
//             return value;
//         }
//     }

//     // Return TRUE if newly created; return FALSE if replace
//     define(name, value) {
//         let foundConstant = this.constants.find((c) => c.name === name);
//         if (foundConstant) {
//             foundConstant.value = value;
//             return false;
//         }
//         let c = new Constant(name, value);
//         this.constants.push(c);
//         return true;
//     }

//     remove(name) {
//         let foundConstant = this.constants.find((c) => c.name === name);
//         if (foundConstant) {
//             // seems like perhaps does one extra step...
//             const index = this.constants.indexOf(foundConstant);
//             this.constants.splice(index, 1);
//             return true;
//         }

//         return false;
//     }

//     copy() {
//         let m = new Model();
//         m.constants = this.constants; // Make a COPY of the constants
//         return m;
//     }
// }
