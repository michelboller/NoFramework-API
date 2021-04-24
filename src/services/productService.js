class ProductService {
    constructor({
        productRepository
    }) {
        this.productRepository = productRepository
    }

    async find(itemID) {
        return this.productRepository.find(itemID)
    }

    async create(data) {
        return this.productRepository.create(data)
    }
}

module.exports = ProductService