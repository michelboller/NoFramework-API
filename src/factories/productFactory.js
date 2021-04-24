const ProductRepository = require('./../repositories/productRepository')
const ProductService = require('./../services/productService')

const {
    join
} = require('path')
const filePath = join(__dirname, '../../database', 'data.json')

const generateInstance = () => {
    const productRepository = new ProductRepository({
        file: filePath
    })

    const productService = new ProductService({
        productRepository
    })

    return productService
}


module.exports = {
    generateInstance
}

generateInstance().find().then(console.log).catch(error => console.error(error))
generateInstance().create({
    id: 4,
    name: "Candy",
    price: 0.50,
    stock: 50
}).then(console.log).catch(error => console.error(error))
generateInstance().find().then(console.log).catch(error => console.error(error))