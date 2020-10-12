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


function getScriptPath(foo) {
    return window.URL.createObjectURL(new Blob([foo.toString().match(/^\s*function\s*\(\s*\)\s*\{(([\s\S](?!\}$))*[\s\S])/)[1]], {type: 'text/javascript'}));
}

function generateRSAKeys(callback) {
    var rsa = forge.pki.rsa;
    rsa.generateKeyPair({bits: 2048, workers: -1}, function (err, keypair) {
        // keypair.privateKey, keypair.publicKey
        var b64Key = forge.pki.publicKeyToPem(keypair.publicKey);
        // Removing PCKS#1 format and leaving just the base64
        b64Key = b64Key.replace("-----BEGIN PUBLIC KEY-----", "");
        b64Key = b64Key.replace("-----END PUBLIC KEY-----", "");
        b64Key = b64Key.replace(/(\r\n|\n|\r)/gm, "");
        b64Key = b64Key.trim();
        callback({'keys': keypair, 'public': b64Key, 'error': err});
    });
}

function decryptRSAMessage(msg, key, callback) {
    try {
        console.log("decryping")
        console.log("start!");
        console.log(key);
        var privkey = key.privateKey;
        var decoded = forge.util.decode64(msg);
        var decrypted = privkey.decrypt(decoded);
        callback(decrypted)
    } catch (e) {
        console.log(e);
    }

}


/*function decryptRSAMessage(encrypted, key, callback) {


    var worker1 = new Worker(getScriptPath(function () {
        console.log("run decryptor!");

        self.addEventListener('message', function (e) {
            console.log("start");
            importScripts("/crypto/forge.min.js");
            var rsa = forge.pki.rsa;
            var decrypted = e.data.key.privateKey.decrypt(atob(e.data.msg), 'RSA');
            self.postMessage({'result': decrypted});
            console.log("end");
        }, false);
    }));
    worker1.addEventListener('message', function (e) {
        callback(e.data);
    }, false);
    worker1.postMessage({'msg': encrypted, 'key': key})
    return worker1;
}*/

/*function decryptRSAMessage(encrypted, key, callback) {


    var worker1 = new Worker(getScriptPath(function () {
        console.log("run decryptor!");

        self.addEventListener('message', function (e) {
            var window = e.data.window;
            console.log("start");
            var crypt = new JSEncrypt({default_key_size: keysize});
            crypt.setKey(e.data.key);
            var decrypted = crypt.decrypt(e.data.msg);
            self.postMessage({'result': decrypted});
            console.log("end");
        }, false);
    }));
    worker1.addEventListener('message', function (e) {
        callback(e.data);
    }, false);
    worker1.postMessage({'msg': encrypted, 'key': key})
    return worker1;
}*/