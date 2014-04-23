var johndemo = {};
johndemo.indexedDB = {};
johndemo.indexedDB.db = null;

onmessage = function (oEvent) {
    johndemo.indexedDB.addTodo(oEvent);
};

johndemo.indexedDB.onerror = function (e) {
    console.log(e);
};

johndemo.indexedDB.open = function () {
    var version = 4;
    var request = indexedDB.open("todos", version);

    // We can only create Object stores in a versionchange transaction.
    request.onupgradeneeded = function (e) {
        var db = e.target.result;

        // A versionchange transaction is started automatically.
        e.target.transaction.onerror = johndemo.indexedDB.onerror;

        if (db.objectStoreNames.contains("todo")) {
            db.deleteObjectStore("todo");
        }

        var store = db.createObjectStore("todo",
          { keyPath: "id", autoIncrement: true });
    };

    request.onsuccess = function (e) {
        johndemo.indexedDB.db = e.target.result;
        johndemo.indexedDB.getAllTodoItems();
    };

    request.onerror = johndemo.indexedDB.onerror;
};

johndemo.indexedDB.addTodo = function (todoText) {
    console.log(todoText);
    var store = johndemo.indexedDB.store();
    var request = store.put({
        "text": todoText.data,
        "timeStamp": new Date().getTime()
    });

    request.onsuccess = function (e) {
        johndemo.indexedDB.getAllTodoItems();
    };

    request.onerror = function (e) {
        console.log("Error Adding: ", e);
    };
};

johndemo.indexedDB.deleteTodo = function (id) {
    var store = johndemo.indexedDB.store();
    var request = store.delete(id);

    request.onsuccess = function (e) {
        johndemo.indexedDB.getAllTodoItems();
    };

    request.onerror = function (e) {
        console.log("Error Removing: ", e);
    };
};

johndemo.indexedDB.store = function () {
    var db = johndemo.indexedDB.db;
    var trans = db.transaction(["todo"], "readwrite");
    return trans.objectStore("todo");
};

johndemo.indexedDB.getAllTodoItems = function () {
    //var todos = document.getElementById("todoItems");
    //todos.innerHTML = "";

    var store = johndemo.indexedDB.store();

    // Get everything in the store;
    var keyRange = IDBKeyRange.lowerBound(0);
    var cursorRequest = store.openCursor(keyRange);

    cursorRequest.onsuccess = function (e) {
        var result = e.target.result;
        if (!!result == false)
            return;

        postMessage(result.value);
        result.continue();
    };

    cursorRequest.onerror = johndemo.indexedDB.onerror;
};
johndemo.indexedDB.open();