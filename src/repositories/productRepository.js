const {
    readFileSync,
    writeFileSync
} = require('fs')

class ProductRepository {
    constructor({
        file
    }) {
        this.file = file
    }

    async _currentFileContent() {
        return JSON.parse(await readFileSync(this.file))
    }
    async find(itemID) {
        const all = await this._currentFileContent()
        if (!itemID) return all

        return all.find(({
            id
        }) => itemID === id)
    }

    async create(data) {
        const currentFile = await this._currentFileContent()
        currentFile.push(data)

        await writeFileSync(this.file, JSON.stringify(currentFile))
        return data.id
    }
}

module.exports = ProductRepository

// const Product = new ProductRepository({
//     file: './../../database/data.json'
// })
// Product.create({
//     id: 4,
//     name: "Candy",
//     price: 0.50,
//     stock: 50
// }).then(console.log).catch(error => console.error(error))
//Product.find().then(console.log).catch(error => console.error(error))