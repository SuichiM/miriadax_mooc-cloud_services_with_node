function stock (title) {
    let    _title = title;//  Title of stock manager
    const  _stock = {};   //  prods: { <code>: {c: code, desc: <description>,  n: <number>}
 
    /* Returns access object to internal variables, uses ES6 object method syntax */
    return {

        title  ()  {
        /* Returns title of stock manager */
            return _title; 
        },
        
        number () {
        /* return nuber of prods (length of array of prod objects)  */
            return Object.keys(_stock).length;
        },

        new_p (code, desc, n = 0) {
        /* Adds n prods to stock */
            if (!_stock[code]) {
                _stock[code] = {code, desc, n: n};
                return _stock[code];
            };
            return null;
        },

        add (code, n) {   
        /* if product exists add n and return product, else return null*/
            if (_stock[code]) {
                _stock[code].n += n;
                return _stock[code];
            }
            return null;
        },

        rem (code, n) {
        /* if n prods in stock subtract n and return product, else return null*/
            if ( _stock[code] && _stock[code].n >= n ) {
                _stock[code].n -= n;
                return _stock[code];
            } 
            return null;
        },

        get_p (code) {       
        /* return product obj if exists or null if it doesn’t  */
            return _stock[code] || null;
        },

        del_p (code) {
        /* if code exists eliminate it and return true, else return false  */
           return delete _stock[code];
        },

        /* Add n to prod if code exists, or create new prod with json params*/
        addJSON (json_prods)  {
            var products = JSON.parse(json_prods);
            for (let prod in products){
                if( _stock.hasOwnProperty(prod) ){
                    this.add(prod, products[prod].n); 
                }else{
                    this.new_p(prod, products[prod].desc, products[prod].n);
                }
            }
        },

        getJSON (pretty = false) {  
        /* Add n to prod if code exists, or create new prod*/
            return JSON.stringify( _stock, null, (pretty) ? 2 : null);
        },

        reset () {              
        /*   Remove all products from _stock */
            _stock = {}; 
        }
    }
}

module.exports = {stock};
