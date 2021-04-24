const http = require('http')
const PORT = 3000
const DEFAULT_HEADER = {
    'Application-Type': 'application/json'
}
const ProductFactory = require('./factories/productFactory')
const productService = ProductFactory.generateInstance()

const routes = {
    '/product:get': async (request, response) => {
        const {
            id
        } = request.queryString
        const products = await productService.find(id)
        response.write(JSON.stringify({
            results: products
        }))
        return response.end()
    },
    default: (request, response) => {
        response.write('Hello!')
        response.end()
    }
}

const handler = (request, response) => {
    const {
        url,
        method
    } = request
    const [first, route, id] = url.split('/')
    request.queryString = {
        id: isNaN(id) ? id : Number(id)
    }
    const key = `/${route}:${method.toLowerCase()}`

    response.writeHead(200, DEFAULT_HEADER)

    const chosen = routes[key] || routes.default
    return chosen(request, response)
}

http.createServer(handler)
    .listen(PORT, () => console.log(`Server running at ${PORT}`))