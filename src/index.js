const http = require("http");
const PORT = 3000;
const DEFAULT_HEADER = {
  "Application-Type": "application/json",
};
const ProductFactory = require("./factories/productFactory");
const productService = ProductFactory.generateInstance();
const Product = require("./entities/product");


const routes = {
  "/product:get": async (request, response) => {
    const { id } = request.queryString;
    const products = await productService.find(id);
    response.write(
      JSON.stringify({
        results: products,
      })
    );
    return response.end();
  },
  "/product:post": async (request, response) => {
    // entende como outro contexto, entao erro aqui dentro nao é pego pelo contexto maior
    for await (const data of request) {
      try {
        // await Promise.reject('erro!!!')
        const item = JSON.parse(data);
        const product = new Product(item);
        const { valid, error } = product.isValid();
        if (!valid) {
          response.writeHead(400, DEFAULT_HEADER);
          return response.end(JSON.stringify({ error: error.join(", ") }));

          //return response.end();
        }

        const id = await productService.create(product);

        response.writeHead(201, DEFAULT_HEADER);
        return response.end(
          JSON.stringify({ success: "Product Created has succeeded!", id })
        );

        // só jogamos o retorno pois sabemos que é um objeto body por requisicao
        // se fosse um arquivo, ele poderia chamar mais de uma vez, aí removeriamos o return
        //return response.end();

      } catch (error) {
        return handleError(response)(error);
      }
    }
  },
  default: (request, response) => {
    response.write("Hello World!");
    return response.end();
  },
};

const handler = (request, response) => {
  const { url, method } = request;
  const [first, route, id] = url.split("/");
  request.queryString = {
    id: isNaN(id) ? id : Number(id),
  };
  const key = `/${route}:${method.toLowerCase()}`;
  console.log(`${route}:${method.toLowerCase()}`)

  response.writeHead(200, DEFAULT_HEADER);

  const chosen = routes[key] || routes.default;
  return chosen(request, response);
};

const handleError = (response) => {
  return (error) => {
    console.error("Internal Error***", error);
    response.writeHead(500, DEFAULT_HEADER);
    response.write(JSON.stringify({ error: "Internal Server Error!" }));

    return response.end();
  };
};

http
  .createServer(handler)
  .listen(PORT, () => console.log(`Server running at ${PORT}`));
