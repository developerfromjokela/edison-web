/*
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

function checkSession($location, login){
    log(isLoggedIn());
    if (!isLoggedIn())
        $location.path("login");
    else if (!login)
        $location.path("home");
}

function getAuthentication() {
    if (getData(dataEntries.authentication) !== null)
    return JSON.parse(getData(dataEntries.authentication)).session;
    else
        return null;
}

function getFullAuthentication() {
    if (getData(dataEntries.authentication) !== null)
        return JSON.parse(getData(dataEntries.authentication));
    else
        return null;
}

function clearAuthentication() {
    saveData(dataEntries.authentication, null);
    saveData(dataEntries.loggedin, null);
    saveData(dataEntries.offlineDesktop, null);
}

function saveOfflineData(offlineData) {
    var db = getOfflineDatabase();
    db.offlineData.put({uid: getFullAuthentication()['id'], data: offlineData}).then (function(){});
}

function getOfflineData() {
    var db = getOfflineDatabase();
    log(getFullAuthentication()['id']);
    return db.offlineData.get(getFullAuthentication()['id']);
}



function generateAuthenticationJSON(session, csrf, id) {
    return {
        "session": session,
        "csrf_token": csrf,
        "id": id
    }
}

function edisonColorToCode(color) {
    var hex = "#999999";
    if (color.includes("blue")) {
        hex = "#245c99";
    } else if (color.includes("red")) {
        hex = "#d14c4f";
    } else if (color.includes("green")) {
        hex = "#079f78";
    } else if (color.includes("orange")) {
        hex = "#d17834";
    } else if (color.includes("pink")) {
        hex = "#d14c87";
    } else if (color.includes("purple")) {
        hex = "#b063a7";
    }
    return hex;
}