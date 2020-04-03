/*
 * Copyright (c) 2020 EdisonWeb.
 * @author Developer From Jokela
 */

class DataEntries {
    constructor() {
        this._loggedin = "login_state";
        this._authentication = "authentication";
        this._offlineDesktop = "offine_desktop";
    }


    get authentication() {
        return this._authentication;
    }

    set authentication(value) {
        this._authentication = value;
    }

    get loggedin() {
        return this._loggedin;
    }

    set loggedin(value) {
        this._loggedin = value;
    }


    get offlineDesktop() {
        return this._offlineDesktop;
    }

    set offlineDesktop(value) {
        this._offlineDesktop = value;
    }
}
