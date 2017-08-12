echo "building ios application..."

mediagen

cd .. && PUBLIC_URL=cdvfile://localhost/bundle/www yarn build
