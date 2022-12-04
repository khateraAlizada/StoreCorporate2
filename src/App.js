import React from "react";
import axios from "axios";
import "./App.css";
import {
  Model,
  Store,
  Item,
  ItemLocation,
  StoresList,
  StoresList2,
  Inventory,
  RemoveStore,
  TotalInventory,
} from "./Model.js";

function App() {
  const [model, setModel] = React.useState(new Model());

  const updateStores = () => {
    // go through and get all stores from the model
    let str = "";
    model.stores.forEach((c) => {
      str +=
        "storeID: " +
        c.idstore +
        " = " +
        "Longitude: " +
        c.longitude +
        ", Latitude: " +
        c.latitude +
        ", ManagerUserName: " +
        c.managerUserName +
        ", ManagerPassword: " +
        c.managerPassword +
        ", ManagerEmail: " +
        c.managerEmail +
        "<br>";
    });

    // insert HTML in the <div> with
    // constant-list
    let cd = document.getElementById("store-list");
    cd.innerHTML = str;
  };

  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect(() => {
    updateStores();
  }, [model]);

  const inserTuple = (e) => {
    let arg1 = document.getElementById("idstore");
    let arg2 = document.getElementById("longitude");
    let arg3 = document.getElementById("latitude");
    let arg4 = document.getElementById("managerUserName");
    let arg5 = document.getElementById("managerPassword");
    let arg6 = document.getElementById("managerName");
    let arg7 = document.getElementById("managerEmail");

    // let arg3 = model.getValue(arg1.value) + model.getValue(arg2.value);
    document.getElementById("result").value = "added";
  };

  const createStore = (e) => {
    // potentially modify the model
    let idstore = document.getElementById("idstore").value;
    let longitude = document.getElementById("longitude").value;
    let latitude = document.getElementById("latitude").value;
    let managerUserName = document.getElementById("managerUserName").value;
    let managerPassword = document.getElementById("managerPassword").value;
    let managerEmail = document.getElementById("managerEmail").value;
    //document.getElementById("store-list").value;
    document.getElementById("added").value = "store added";

    var base_url =
      "https://cn74yl30dg.execute-api.us-east-1.amazonaws.com/Prod/";

    let payload = {
      idstore: idstore,
      longitude: longitude,
      latitude: latitude,
      managerUserName: managerUserName,
      managerPassword: managerPassword,
      managerEmail: managerEmail,
    };
    let msg = JSON.stringify(payload);

    axios({
      method: "post",
      url: base_url + "createStore",
      data: {
        body: msg,
      },
    })
      .then(function (response) {
        console.log(response);
        let store = new Store(
          idstore,
          longitude,
          latitude,
          managerUserName,
          managerPassword,
          managerEmail
        );

        model.stores.push(store);
      })
      .catch(function (error) {
        console.log(error);
      });

    // clear inputs
    // idstore.value = "";
    // longitude.value = "";
    // latitude.value = "";
    // managerUserName.value = "";
    // managerPassword.value = "";

    // managerEmail.value = "";

    setModel(model.copy()); // this TRIGGERS the redraw
  };

  const updateRemoveStore = () => {
    let str = "";
    model.removeStores.forEach((c) => {
      str += "affectedRoows: " + c.affectedRows + "<br>";
    });
    let cd = document.getElementById("remove-store");
    cd.innerHTML = str;
  };
  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect(() => {
    // do something
    updateRemoveStore();
  }, [model]); // this argument is critical! since it says what to do

  const remove = (e) => {
    let storeID = document.getElementById("storeID");
    document.getElementById("removed").value = " removed store";
  };
  const removeStore = (e) => {
    // potentially modify the model
    let storeID = document.getElementById("storeID").value;
    document.getElementById("removed").value = " removed store";

    var base_url =
      "https://cn74yl30dg.execute-api.us-east-1.amazonaws.com/Prod/";

    let payload = {
      storeID: storeID,
    };
    let msg = JSON.stringify(payload);

    axios({
      method: "post",
      url: base_url + "deleteStore",
      data: {
        body: msg,
      },
    })
      // .then(function (response) {
      //   console.log(response);
      //   console.log(response.status);
      //   let st = response.status;
      //   console.log(JSON.stringify(response.data.result));
      //   console.log(JSON.stringify(response.data));
      //   // let removedStore = new RemoveStore(storeID);
      //   //model.removeStores.push(new RemoveStore(removedStore));
      //   model.removeStores.push(new RemoveStore(storeID));
      // })
      .then(function (response) {
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        console.log(response.data);
        const list = response.data.result;
        // const list = response.data;

        for (let i = 0; i < list.length; i++) {
          console.log(list[i].statusCode);
          model.removeStores.push(new RemoveStore(list[i].affectedRows));
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    // clear inputs
    //storeID.value = "";

    setModel(model.copy()); // this Triggers the redraw
  };
  // await axios.delete ('https://qytapr8ayd.execute-api.us-east-1.amazonaws.com/Prod/',{
  //     data: {idstore: `${idstore}`}})

  //   data: {
  //     body: msg,
  //   },
  //   }).catch(function (error) {
  //     console.log(error);
  //   });

  //   if (model.remove(idstore.value)) {
  //     setModel(model.copy()); // this TRIGGERS the redraw ONLY when removed
  //   }

  //   // clear input
  //   idstore.value = "";
  // };

  const updateItems = () => {
    let str = "";
    // go through and get all items from the model
    model.items.forEach((i) => {
      str += i.sku + " = " + i.name + i.description + i.price + i.maxQ + "<br";
    });

    //insert HTML in the <div> with
    // item-list
    let il = document.getElementById("item-list");
    il.innerHTML = str;
  };
  const insertItem = (e) => {
    let sku = document.getElementById("sku");
    let name = document.getElementById("name");
    let description = document.getElementById("description");
    let price = document.getElementById("price");
    let maxQ = document.getElementById("maxQ");

    document.getElementById("resultItem").value = " added";
  };

  const createItem = (e) => {
    let sku = document.getElementById("sku").value;
    let name = document.getElementById("name").value;
    let description = document.getElementById("description").value;
    let price = document.getElementById("price").value;
    let maxQ = document.getElementById("maxQ").value;

    var base_url =
      "https://cn74yl30dg.execute-api.us-east-1.amazonaws.com/Prod/";

    let payload = {
      sku: sku,
      name: name,
      description: description,
      price: price,
      maxQ: maxQ,
    };
    let msg = JSON.stringify(payload);

    axios({
      method: "post",
      url: base_url + "createItem",
      data: {
        body: msg,
      },
    })
      .then(function (response) {
        console.log(response);
        let item = new Item(sku, name, description, price, maxQ);

        model.items.push(item);
      })
      .catch(function (error) {
        console.log(error);
      });

    // clear inputs
    // sku.value = "";
    // name.value = "";
    //description.value = "";
    // price.value = "";

    setModel(model.copy()); // this TRIGGERS the redraw
  };
  const updateItemLocations = () => {
    let str = "";
    // go through and get all items from the model
    model.itemLocations.forEach((i) => {
      str += i.idlocations + "=" + i.sku + i.aisle + i.shelf + "<br";
    });

    //insert HTML in the <div> with
    // item-list
    let il = document.getElementById("item-location-list");
    il.innerHTML = str;
  };
  const insertItemLocation = (e) => {
    let idlocations = document.getElementById("idlocations");
    let sku = document.getElementById("sku");
    let aisle = document.getElementById("aisle");
    let shelf = document.getElementById("shelf");

    document.getElementById("resultItemLocations").value = " assigned location";
  };

  const assignItemLocation = (e) => {
    let idlocations = document.getElementById("idlocations").value;
    let sku = document.getElementById("sku").value;

    let aisle = document.getElementById("aisle").value;
    let shelf = document.getElementById("shelf").value;

    var base_url =
      "https://cn74yl30dg.execute-api.us-east-1.amazonaws.com/Prod/";

    let payload = {
      idlocations: idlocations,
      sku: sku,
      aisle: aisle,
      shelf: shelf,
    };
    let msg = JSON.stringify(payload);

    axios({
      method: "post",
      url: base_url + "assignItemLocation",
      data: {
        body: msg,
      },
    })
      .then(function (response) {
        console.log(response);
        let itemLocation1 = new ItemLocation(idlocations, sku, aisle, shelf);

        model.itemLocations.push(itemLocation1);
      })
      .catch(function (error) {
        console.log(error);
      });

    // clear inputs
    // sku.value = "";
    // name.value = "";
    //description.value = "";
    // price.value = "";

    setModel(model.copy()); // this TRIGGERS the redraw
  };

  const updateInventory = () => {
    let str = "";
    model.inventories.forEach((i) => {
      str += "totalPrice: " + i.totalPrice + "<br>";
    });
    let cd = document.getElementById("storeInventory");
    cd.innerHTML = str;
  };
  React.useEffect(() => {
    updateInventory();
  }, [model]);

  const createInventory = (e) => {
    let arg1 = document.getElementById("storeIDInventory");
    document.getElementById("storeInventory").value = "Report created!";
  };

  const generateInventoryReport = (e) => {
    // potentially modify the model
    let storeID = document.getElementById("storeIDInventory").value;
    //let quantity = document.getElementById("quantity").value;

    var base_url =
      "https://cn74yl30dg.execute-api.us-east-1.amazonaws.com/Prod/";

    let payload = {
      storeID: storeID,
    };
    let msg = JSON.stringify(payload);

    axios({
      method: "post",
      url: base_url + "generateInventoryC",
      data: {
        body: msg,
      },
    })
      .then(function (response) {
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        const list = response.data.result;
        model.inventories = [];

        for (let i = 0; i < list.length; i++) {
          console.log(list[i].totalPrice);
          model.inventories.push(new Inventory(list[i].totalPrice));
        }
        setModel(model.copy()); // this Triggers the redraw
      })
      .catch(function (error) {
        console.log(error);
      });
    // clear inputs
  };
  const updateTotalInventory = () => {
    let str = "";
    model.totalInventories.forEach((i) => {
      str += "totalPrice" + i.totalPrice + "<br>";
    });
    let cd = document.getElementById("totalInventory");
    cd.innerHTML = str;
  };
  React.useEffect(() => {
    updateTotalInventory();
  }, [model]);
  const updateStoreList = () => {
    // go through and get all stores from the model
    let str = "";
    model.storesList.forEach((i) => {
      str +=
        "idstore: " +
        i.idstore +
        ", longitude: " +
        i.longitude +
        ", latitude: " +
        i.latitude +
        ", managerUserName" +
        i.managerUserName +
        ", managerEmail" +
        i.managerEmail +
        "<br>";
    });
    //insert HTML in the <div> with
    // storeInventory
    let cd = document.getElementById("storesList");
    cd.innerHTML = str;
  };
  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect(() => {
    updateStoreList();
  }, [model]);
  const totalInventory = (e) => {
    document.getElementById("totalInventory").value = "Report created";
  };
  const generateTotalInventory = (e) => {
    var base_url =
      "https://cn74yl30dg.execute-api.us-east-1.amazonaws.com/Prod/";
    let payload = {};
    let msg = JSON.stringify(payload);
    axios({
      method: "post",
      url: base_url + "generateTotalInventoryReport2",
      data: {
        body: msg,
      },
    })
      .then(function (response) {
        console.log(JSON.stringify(response));
        console.log(response.data.result);
        const list = response.data.result;
        model.totalInventories = [];
        for (let i = 0; i < list.length; i++) {
          console.log(list[i].totalPrice);
          model.totalInventories.push(new TotalInventory(list[i].totalPrice));
        }
        setModel(model.copy()); // this Triggers the redraw
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const createReport = (e) => {
    //let arg1 = document.getElementById("storesList");

    document.getElementById("storesList").value = "Report created!";
  };

  const storeListReport = (e) => {
    // potentially modify the model
    //let storeID = document.getElementById("storesList").value;
    //let quantity = document.getElementById("list").value;

    var base_url =
      "https://cn74yl30dg.execute-api.us-east-1.amazonaws.com/Prod/";

    let payload = {};
    let msg = JSON.stringify(payload);

    axios({
      method: "post",
      url: base_url + "listStoreC",
      data: {
        body: msg,
      },
    })
      .then(function (response) {
        console.log(response.data.result);
        const list = response.data.result;
        model.storesList = [];

        for (let i = 0; i < list.length; i++) {
          model.storesList.push(
            new StoresList(
              list[i].idstore,
              list[i].longitude,
              list[i].latitude,
              list[i].managerUserName,
              list[i].managerEmail
            )
          );
        }
        setModel(model.copy()); // this Triggers the redraw
      })
      .catch(function (error) {
        console.log(error);
      });
    // clear inputs
  };
  const updateStoreList2 = () => {
    // go through and get all stores from the model
    let str = "";
    model.storesList2.forEach((i) => {
      str +=
        "idstore: " +
        i.idstore +
        ", longitude: " +
        i.longitude +
        ", latitude: " +
        i.latitude +
        ", distance: " +
        i.distance +
        "<br>";
    });
    //insert HTML in the <div> with

    // storeInventory
    let cd = document.getElementById("storesList2");
    cd.innerHTML = str;
  };
  /** Ensures initial rendering is performed, and that whenever model changes, it is re-rendered. */
  React.useEffect(() => {
    updateStoreList2();
  }, [model]);

  const createReport2 = (e) => {
    let arg1 = document.getElementById("custLong");
    let arg2 = document.getElementById("custLat");
    document.getElementById("storesList2").value = "Report created!";
  };

  const storeListReport2 = (e) => {
    // potentially modify the model

    let custLat = document.getElementById("custLat").value;
    let custLong = document.getElementById("custLong").value;

    var base_url =
      "https://cn74yl30dg.execute-api.us-east-1.amazonaws.com/Prod/";

    let payload = {
      custLong: custLong,
      custLat: custLat,
    };
    let msg = JSON.stringify(payload);

    axios({
      method: "post",
      url: base_url + "listStores",
      data: {
        body: msg,
      },
    })
      .then(function (response) {
        console.log(response.data.result);
        const list = response.data.result;
        model.storesList2 = [];

        for (let i = 0; i < list.length; i++) {
          console.log(list[i].idstore);
          model.storesList2.push(
            new StoresList2(
              list[i].idstore,
              list[i].longitude,
              list[i].latitude,
              list[i].distance
            )
          );
        }
        setModel(model.copy()); // this Triggers the redraw
      })
      .catch(function (error) {
        console.log(error);
      });
    // clear inputs
  };

  //result Item: <input id="resultItem" readOnly />
  //result Item Location: <input id="resultItemLocations" readOnly />
  //result: <input id="result" readOnly />
  //<h1>Store</h1>

  return (
    <div className="App">
      <h3>Welcome to Corporate Page</h3>
      sku: <input id="sku" />
      name: <input id="name" />
      description: <input id="description" />
      price: <input id="price" />
      maxQ: <input id="maxQ" />
      <button onClick={(e) => createItem()}> Create Item</button>
      <p></p>
      <div id="item-list"></div>
      idlocations: <input id="idlocations" />
      sku: <input id="sku" />
      aisle: <input id="aisle" />
      shelf: <input id="shelf" />
      <button onClick={(e) => assignItemLocation()}>
        Assign Item Location
      </button>
      <p></p>
      <div id="Item-Location-List"></div>
      idstore: <input id="idstore" />
      longitude: <input id="longitude" />
      latitude: <input id="latitude" />
      managerUserName: <input id="managerUserName" />
      managerPassword: <input id="managerPassword" />
      managerEmail: <input id="managerEmail" />
      <button onClick={(e) => createStore()}>CreateStore</button>
      <p></p>
      <div id="store-list"></div>
      <p></p>
      added: <input id="added" readOnly />
      <div id="store-list"></div>
      <p></p>
      storeID: <input id="storeID" />
      <button onClick={(e) => removeStore()}>Remove</button>
      <div id="remove-store"></div>
      <p></p>
      removed: <input id="removed" readOnly />
      <div id="remove-store2"></div>
      <p></p>
      storeID: <input id="storeIDInventory" />
      <button onClick={(e) => generateInventoryReport()}>
        Generate Inventory
      </button>
      <div id="storeInventory"></div>
      <button onClick={(e) => generateTotalInventory()}>
        Total Inventory Report
      </button>
      <div id="totalInventory"></div>
      <button onClick={(e) => storeListReport()}>List stores</button>
      <div id="storesList"></div>
      custLong: <input id="custLong" />
      custLat: <input id="custLat" />
      <button onClick={(e) => storeListReport2()}>List stores2</button>
      <div id="storesList2"></div>
    </div>
  );
}

export default App;
