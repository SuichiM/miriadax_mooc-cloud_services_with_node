class Stock{
    
    constructor (title){
        this._title = title;//  Title of stock manager
        this._stock = {};   //  prods: { <code>: {c: code, desc: <description>,  n: <number>}    
    }

    title  ()  {
    /* Returns title of stock manager */
        return this._title; 
    }

    number () {
        /* return nuber of prods (length of array of prod objects)  */
            return Object.keys(this._stock).length;
    }

    new_p (code, desc, n = 0) {
    /* Adds n prods to stock */
        if (! this._stock[code]) {
            this._stock[code] = {code, desc, n: n};
            return this._stock[code];
        };
        return null;
    }

    add (code, n) {   
    /* if product exists add n and return product, else return null*/
        if (this._stock[code]) {
            this._stock[code].n += n;
            return this._stock[code];
        }
        return null;
    }

    rem (code, n) {
    /* if n prods in stock subtract n and return product, else return null*/
        if ( this._stock[code] && this._stock[code].n >= n ) {
            this._stock[code].n -= n;
            return this._stock[code];
        } 
        return null;
    }

    get_p (code) {       
    /* return product obj if exists or null if it doesn’t  */
        return this._stock[code] || null;
    }

    del_p (code) {
    /* if code exists eliminate it and return true, else return false  */
        return delete this._stock[code];
    }

    addJSON (json_prods)  {
    /* Add n to prod if code exists, or create new prod with json params*/

        var products = JSON.parse(json_prods);
        for (let prod in products){
            if( this._stock.hasOwnProperty(prod) ){
                this.add(prod, products[prod].n); 
            }else{
                this.new_p(prod, products[prod].desc, products[prod].n);
            }
        }
    }

    getJSON (pretty = false) {  
    /* Add n to prod if code exists, or create new prod*/
        return JSON.stringify( this._stock, null, (pretty) ? 2 : null);
    }

    reset () {              
    /*   Remove all products from _stock */
        this._stock = {}; 
    }
}

module.exports = Stock;