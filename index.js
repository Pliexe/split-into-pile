/**
* @exports split-into-pile.pages
* @constructor
* @param {Object|Array} data - Input the array or object that is going to be used for spliting into pages
* @param {number} size - Specify how much elements can be in one page
* @returns {class} this - Returns this class
*/

class pages {

    constructor(data, size) {

        if((!!data) && (data.constructor === Array)) {
            this.isArray = true;
            this.elements = data;
        }
        else if ((!!data) && (data.constructor === Object)) {
            this.isArray = false;
            this.elements = data;
        } else {
            throw createError("Invalid data type. Please use a object or a array of elements for pages!");
        }

        this.size = size || 10;

        this.pages = Math.trunc((this.elements.length + this.size-1) / this.size) || Math.trunc((Object.keys(this.elements).length + this.size-1) / this.size);
    }

    /**
     * Returns the obj/array splited into pages in array format
     * @returns {Array} Returns array that contains elements splited into pages
     */

    ArrayPages () {

        let ArrayListPages = [];

        if (this.isArray) {
            for (var i = 1; i < this.pages+1; i++) {
                if (i === this.pages) ArrayListPages.push(this.elements.slice(i * this.size - this.size));
                    else ArrayListPages.push(this.elements.slice(i * this.size - this.size, i * this.size));
            }
        } else {
            for (var i = 1; i < this.pages+1; i++) {
                if (i === this.pages) ArrayListPages.push(sliceObject(this.elements, i * this.size - this.size));
                else ArrayListPages.push(sliceObject(this.elements, i * this.size - this.size, i * this.size));
            }
        }

        return ArrayListPages;
    }

    /**
     * Returns the obj/array splited into pages in object format
     * @param {object} options - Options for output
     * @param {string} options.keyTemplate - Output with specific keyname (per page)
     * @param {Array} options.keySchema - Array that contains every key for every new object entry (page)
     * @example - KeyTemplate
     * ObjectPages({ keyTemplate: '#{number}' }); // "Number" will be auto replaced with the numeric order of the elements
     * @example - KeySchema
     * const pages = require('split-into-pile')([2,4,3,5], 2);
     * pages.ObjectPages({ keySchema: ['hello', 'example'] }); // Returns {'hello':[2,4], 'example': [3,5]}
     * @returns {Object} Returns array that contains elements splited into pages
     */

    ObjectPages(options) {
        let ObjectPages = {};

        options = options || {};

        if(options.keyTemplate && options.keySchema) throw createError("You may not use keyTemplate and keySchema at once!");

        let keyTemplate = options.keyTemplate || "{number}";

        if (keyTemplate.replace('{number}', '') === keyTemplate) throw createError("You have to give a number in template! Example keyTemplate: \"#{number}\"");

        if(options.keySchema) {
            if ((!!options.keySchem) && (options.keySchem.constructor != Array)) throw createError(`keySchema must be a array containing the same amount of keys as pages : This array/object contains ${this.pages} pages`);
            if (options.keySchema.length != this.pages) throw createError(`keySchema array must be the same length as page count : This array/object contains ${this.pages} pages`);

            if (this.isArray) {
                for (var i = 1; i < this.pages+1; i++) {
                    if (i === this.pages) ObjectPages[options.keySchema[i-1]] = this.elements.slice(i * this.size - this.size);
                        else ObjectPages[options.keySchema[i-1]] = this.elements.slice(i * this.size - this.size, i * this.size);
                }
            } else {
                for (var i = 1; i < this.pages+1; i++) {
                    if (i === this.pages) ObjectPages[options.keySchema[i-1]] = sliceObject(this.elements, i * this.size - this.size);
                    else ObjectPages[options.keySchema[i-1]] = sliceObject(this.elements, i * this.size - this.size, i * this.size);
                }
            }
        } else {
            if (this.isArray) {
                for (var i = 1; i < this.pages+1; i++) {
                    if (i === this.pages) ObjectPages[keyTemplate.replace('{number}', i)] = this.elements.slice(i * this.size - this.size);
                        else ObjectPages[keyTemplate.replace('{number}', i)] = this.elements.slice(i * this.size - this.size, i * this.size);
                }
            } else {
                for (var i = 1; i < this.pages+1; i++) {
                    if (i === this.pages) ObjectPages[keyTemplate.replace('{number}', i)] = sliceObject(this.elements, i * this.size - this.size);
                    else ObjectPages[keyTemplate.replace('{number}', i)] = sliceObject(this.elements, i * this.size - this.size, i * this.size);
                }
            }
        }



        return ObjectPages;
    }

    /**
     * Get contents of specific page
     * @param {number} page - Page number to get
     * @example
     * const pages = require('split-into-pile')([2,5,6,8], 2);
     * pages.GetPageContent(2); // Returns [6, 8]
     * @return {object|array} - Returns one page 
     */

    GetPageContent(page) {
        if(!page) throw createError("Page number not defined. Please provide a page number.")
        if(isNaN(page)) throw createError("Invalid page number. Please specify it in numeric format");
        if(page > this.pages) throw createError("This page does not exist. You can check if a page exists with .PageExists();");

        let pageElements;

        if (this.isArray) {
            if(page === this.pages) pageElements = this.elements.slice(page * this.size - this.size);
                else pageElements = this.elements.slice(page * this.size - this.size, page * this.size);
        } else {
            if (page === this.pages) pageElements = sliceObject(this.elements, page * this.size - this.size);
                else pageElements = sliceObject(this.elements, page * this.size - this.size, page * this.size);
        }

        return pageElements;
    }

    /**
     * Check if a page exists
     * @param {number} page - Page number
     * @returns {boolean} - Returns if the page exists
     */

    PageExist(page) {
        if(!page) throw createError("Page number not defined. Please provide a page number.");
        if(isNaN(page)) throw createError("Invalid page number. Please specify it in numeric format");
        return Math.trunc((this.elements.length + this.size-1) / this.size) < page;
    }

    /**
     * Check how much pages are there
     * @returns {number} - Returns the amount of pages there are
     */

    get MaxPages() {
        return Math.trunc((this.elements.length + this.size-1) / this.size);
    }
}

function createError(msg) {
    var err = new Error(msg);
    Error.captureStackTrace(err, pages);
    return err;
}

function sliceObject(obj, a, b) {
    let object = {};
    if(!b) Object.keys(obj).slice(a).forEach(key => object[key] = obj[key]);
        else Object.keys(obj).slice(a, b).forEach(key => object[key] = obj[key]);

    return object;
}
/** test */
module.exports = pages;
