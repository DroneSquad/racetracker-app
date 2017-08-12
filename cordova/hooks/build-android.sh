echo "building android application..."

mediagen

cd .. && PUBLIC_URL=file:///android_asset/www yarn build
