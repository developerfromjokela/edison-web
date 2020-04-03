
/*
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

const dataEntries = new DataEntries();
/**
 * Made this to make naming simpler
 * @param key
 * @param value
 */
function saveData(key, value) {
    window.localStorage.setItem(key, value);
}

function getData(key) {
    return window.localStorage.getItem(key);
}

function getOfflineDatabase() {
    if (!('indexedDB' in window)) {
        console.log('This browser doesn\'t support IndexedDB');
        return false;
    }

    var db = new Dexie("edison_offline_data");
    db.version(1).stores({
        offlineData: '++uid,data'
    });
    return db;
}

function isLoggedIn() {
    console.log(getData(dataEntries.loggedin));
    return (getData(dataEntries.loggedin) === 'true');
}
