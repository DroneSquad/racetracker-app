echo "building android application..."

mediagen

cd .. && PUBLIC_URL=/android_asset/www yarn build
