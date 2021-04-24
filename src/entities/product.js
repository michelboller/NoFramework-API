class Product {
    constructor({name, price, stock}){
        this.id = Math.floor(Math.random() * 100) + Date.now()
        this.name = name
        this.price = price
        this.stock = stock
    }

    isValid(){
        const propertyNames = Object.getOwnPropertyNames(this)
        // console.log('properties', propertyNames)
        const amountValid = propertyNames
            .map(property => (!!this[property]) ? null : `${property} is missing`)
            .filter(item => !!item)

        return {
            valid: amountValid.length === 0,
            error: amountValid
        }
    }
}

module.exports = Product

// const product = new Product({name: "Sparkling water", price: 3.50, stock: 3})
// console.log('valid', product.isValid())
// console.log('product', product)