RUN_TIME=$(date +%s)

# install npm packages
npm i

# install python3 packages
pip3 install -r requirements.txt

# move old data files to old data folder
mkdir old_data/archived$RUN_TIME
cp data/prices.csv old_data/archived$RUN_TIME/prices.csv
rm -f data/prices.csv

# download the store data from Dunkin Donuts (uses ~20-30MB of bandwidth)
node pull.js

# convert the stores to CSV format
node csvStores.js

# now comes the python part
# get the menu prices
python3 menu.py