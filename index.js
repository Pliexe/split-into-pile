Map.prototype.slice = function (start, end)
{
    return Array
        .from(this.keys()).slice(start, end)
        .reduce((m, k) => m.set(k, this.get(k)), new Map);
}

Object.prototype.slice = function (start, end)
{

    return Object.keys(this)
        .slice(start, end)
        .reduce((o, k) => { o[k] = this[k]; return o; }, {});
}

function createError(msg)
{
    var err = new Error(msg);
    Error.captureStackTrace(err, createError, pages.ObjectPages);
    return err;
}

class pages
{
    /**
     * Page formater
     * @param {Map|Array|Object} data Takes array of any
     * @param {Number} size Size of each page (The amount of elements in each page)
     */

    constructor(data, size)
    {
        if (!data) throw createError("Missing parameter \"data\"");
        this.size = size || 10;
        if (isNaN(this.size)) throw createError("Size may only be a number!");


        this.elements = data;

        if (Array.isArray(this.elements))
            this.datatype = "array";
        else if (this.elements.constructor === Object)
            this.datatype = "object";
        else if (this.elements.constructor === Map)
            this.datatype = "map";
        else
            throw createError("Invalid data type. Please use a object or a array of elements for pages!");

        if (this.datatype === "array")
            this.pages = Math.trunc((this.elements.length + this.size - 1) / this.size);
        else if (this.datatype === "object")
            this.pages = Math.trunc((Object.keys(this.elements).length + this.size - 1) / this.size);
        else if (this.datatype === "map")
            this.pages = Math.trunc((this.elements.size + this.size - 1) / this.size);
    }

    /**
     * Returns the obj/array/map splited into pages in array format
     * @returns {Array} Returns array that contains elements splited into pages
     */

    ArrayPages()
    {
        let ArrayListPages = [];

        for (var i = 1; i < this.pages + 1; i++)
            if (i === this.pages) ArrayListPages.push(this.elements.slice(i * this.size - this.size));
            else ArrayListPages.push(this.elements.slice(i * this.size - this.size, i * this.size));

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
     * @returns {Object} Returns object that contains elements splited into pages
     */

    ObjectPages(options)
    {
        let ObjectPages = {};

        options = options || {};

        if (options.keyTemplate && options.keySchema) throw createError("You may not use keyTemplate and keySchema at once!");

        let keyTemplate = options.keyTemplate || "{number}";

        if (keyTemplate.replace('{number}', '') === keyTemplate) throw createError("You have to give a number in template! Example keyTemplate: \"#{number}\"");

        if (options.keySchema) {
            if ((!!options.keySchem) && (options.keySchem.constructor != Array)) throw createError(`keySchema must be a array containing the same amount of keys as pages : This array/object contains ${this.pages} pages`);
            if (options.keySchema.length != this.pages) throw createError(`keySchema array must be the same length as page count : This array/object/map contains ${this.pages} pages`);

            for (var i = 1; i < this.pages + 1; i++) {
                if (i === this.pages) ObjectPages[options.keySchema[i - 1]] = this.elements.slice(i * this.size - this.size);
                else ObjectPages[options.keySchema[i - 1]] = this.elements.slice(i * this.size - this.size, i * this.size);
            }
        } else {
            for (var i = 1; i < this.pages + 1; i++) {
                if (i === this.pages) ObjectPages[keyTemplate.replace('{number}', i)] = this.elements.slice(i * this.size - this.size);
                else ObjectPages[keyTemplate.replace('{number}', i)] = this.elements.slice(i * this.size - this.size, i * this.size);
            }
        }

        return ObjectPages;
    }

    /**
     * Returns the obj/array/map splited into pages in Map() format
     * @param {object} options - Options for output
     * @param {string} options.keyTemplate - Output with specific keyname (per page)
     * @param {Array} options.keySchema - Array that contains every key for every new map entry (page)
     * @example - KeyTemplate
     * MapPages({ keyTemplate: '#{number}' }); // "Number" will be auto replaced with the numeric order of the elements
     * @example - KeySchema
     * const pages = require('split-into-pile')([2,4,3,5], 2);
     * pages.MapPages({ keySchema: ['hello', 'example'] }); // Returns {'hello':[2,4], 'example': [3,5]}
     * @returns {Map} Returns map that contains elements splited into pages
     */

    MapPages(options)
    {
        let MapPages = new Map();

        options = options || {};

        if (options.keyTemplate && options.keySchema) throw createError("You may not use keyTemplate and keySchema at once!");

        let keyTemplate = options.keyTemplate || "{number}";

        if (keyTemplate.replace('{number}', '') === keyTemplate) throw createError("You have to give a number in template! Example keyTemplate: \"#{number}\"");

        console.log(keyTemplate.replace('{number}', i).constructor.toString());

        if (options.keySchema) {
            if ((!!options.keySchem) && (options.keySchem.constructor != Array)) throw createError(`keySchema must be a array containing the same amount of keys as pages : This array/object contains ${this.pages} pages`);
            if (options.keySchema.length != this.pages) throw createError(`keySchema array must be the same length as page count : This array/object/map contains ${this.pages} pages`);

            for (var i = 1; i < this.pages + 1; i++) {
                if (i === this.pages) MapPages.set(options.keySchema[i - 1], this.elements.slice(i * this.size - this.size));
                else MapPages.set(options.keySchema[i - 1], this.elements.slice(i * this.size - this.size, i * this.size));
            }
        } else {
            for (var i = 1; i < this.pages + 1; i++) {
                if (i === this.pages) MapPages.set(options.keyTemplate ? keyTemplate.replace('{number}', i) : i, this.elements.slice(i * this.size - this.size));
                else MapPages.set(options.keyTemplate ? keyTemplate.replace('{number}', i) : i, this.elements.slice(i * this.size - this.size, i * this.size));
            }
        }

        return MapPages;
    }

    /**
     * Get contents of specific page
     * @param {number} page - Page number to get
     * @example
     * const pages = require('split-into-pile')([2,5,6,8], 2);
     * pages.GetPageContent(2); // Returns [6, 8]
     * @return {Object|Array|Map} - Returns one page 
     */

    GetPageContent(page)
    {
        if (!page) throw createError("Page number not defined. Please provide a page number.")
        if (isNaN(page)) throw createError("Invalid page number. Please specify it in numeric format");
        if (page > this.pages) throw createError("This page does not exist. You can check if a page exists with .PageExists();");

        return page === this.pages ? pageElements = this.elements.slice(page * this.size - this.size) : pageElements = this.elements.slice(page * this.size - this.size, page * this.size);
    }

    /**
     * Check if a page exists
     * @param {number} page - Page number
     * @returns {boolean} - Returns if the page exists
     */

    PageExist(page)
    {
        if (!page) throw createError("Page number not defined. Please provide a page number.");
        if (isNaN(page)) throw createError("Invalid page number. Please specify it in numeric format");
        return Math.trunc(((this.elements.length || this.elements.size || Object.keys(this.elements)) + this.size - 1) / this.size) < page;
    }

    /**
     * Check how much pages are there
     * @returns {number} - Returns the amount of pages there are
     */

    get MaxPages()
    {
        return Math.trunc((this.elements.length || this.elements.size || Object.keys(this.elements)) / this.size);
    }
}

module.exports = pages;
