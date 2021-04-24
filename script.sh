echo '[ REQUEST ] requesting all products'
echo '[ RESPONSE ] '
curl localhost:3000/product

echo '

[ REQUEST  ] requesting product with id 1
[ RESPONSE ] '
curl localhost:3000/product/1

echo '

[ REQUEST  ] posting an product with invalid data
[ RESPONSE ] '
curl --silent -X POST --data-binary '{"invalid": "data"}' localhost:3000/product

echo '

[ REQUEST  ] posting an product with valid data
[ RESPONSE ] '
curl --silent -X POST --data-binary '{"name": "Sparkling water", "price": 3.50, "stock": 2}' localhost:3000/product
