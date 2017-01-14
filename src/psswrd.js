class Psswrd {

    constructor() {

        /**
         * Force to generate cryptographically random values
         * @type {boolean}
         */
        this.strict = true;

        /**
         * Default password length
         * @type {number}
         */
        this.length = 12;

        /**
         * Default alphabetic characters
         * @type {string}
         */
        this.letters = 'AaBaCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';

        /**
         * Default numeric characters
         * @type {string}
         */
        this.numbers = '0123456789';

        /**
         * Default special characters
         * @type {string}
         */
        this.special = '!$%@#';

    }

    /**
     * _getRandomPassword - Generate a (by default cryptographically) secure random password
     *
     * @param  {number} length the length of password being generated
     * @return {string}        generated password
     */
    getRandomPassword(length) {
        if (!Number.isInteger(length)) {
            length = this.length;
        }

        var characters = this._getCharacters();

        var password = '';
        for (let i = 0; i < length; i++) {
            password += characters.charAt(this._getRandomInt(0, (characters.length - 1)));
        }

        return password;
    }

    /**
     * _getRandomInt - Generate and return a random generated integer
     *
     * @param  {number} min minimum interger being returned
     * @param  {number} max maximum interger being returned
     * @return {number}     random integer
     */
    _getRandomInt(min, max) {
        var array = new Uint8Array(1);
        array = this._getRandomValues(array);

        if (!(array[0] >= min && array[0] <= max)) {
            return this._getRandomInt(min, max);
        }

        return array[0];
    }

    /**
     * _getCharacters - Combine numbers, alphabetic- and special characters
     *
     * @return {string}  the full string of characters
     */
    _getCharacters() {
        return this.letters + this.numbers + this.special;
    }


    /**
     * _getRandomValues - Create an array with (by default cryptographically) random values
     *
     * @param  {type} array an empty typed array
     * @return {type}       array with (by default cryptographically) random values
     */
    _getRandomValues(array) {
        if (window.crypto && window.crypto.getRandomValues) {
            window.crypto.getRandomValues(array);
        } else if (typeof window.msCrypto === "object" && typeof window.msCrypto.getRandomValues === 'function') {
            window.msCrypto.getRandomValues(array);
        } else if (this.strict === false) {
            array[0] = Math.floor(Math.random() * 256) + 1;
        } else {
            throw new Error("There was a problem with generating cryptographically random values.");
        }

        return array;
    }

}
