# download the store data from Dunkin Donuts (uses ~20-30MB of bandwidth)
node pull.js

# convert the stores to CSV format
node csvStores.js

# now comes the python part
# get the menu prices
python3 menu.py