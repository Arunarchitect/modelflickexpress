echo "Switching to branch master"
git checkout reduxnew

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r dist/* react@139.84.140.96:/var/www/139.84.140.96/

echo "Done"
