RUN_TIME=$(date +%s)
GREEN="\033[32m"

echo "*** Dunkinomics ***"
echo "====================================================="

# install npm packages
npm i

# install python3 packages
pip3 install -r requirements.txt

echo "*** Installed Packages ***"
echo "====================================================="

# move old data files to old data folder
mkdir old_data/archived$RUN_TIME
cp data/response.json old_data/archived$RUN_TIME/response.json
cp data/prices.csv old_data/archived$RUN_TIME/prices.csv
cp data/stores.csv old_data/archived$RUN_TIME/stores.csv
rm -f data/prices.csv
rm -f data/response.json
rm -rf data/stores.csv

echo "*** Backed Up Old Data ***"
echo "====================================================="

# download the store data from Dunkin Donuts (uses ~20-30MB of bandwidth)
node pull.js

echo "*** Downloaded Store Data ** "
echo "====================================================="

# convert the stores to CSV format
node csvStores.js

echo "*** Processed Store Data ***"
echo "====================================================="
# now comes the python part
# get the menu prices
python3 menu.py