npm run build

git add dist -f 

git commit -m "deployed files"

git subtree push --prefix dist origin pages 
