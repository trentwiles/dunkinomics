import os
import sys
import json
import csv

if not os.path.isfile('data/prices.csv'):
    print("please ensure data/prices.csv exists")
    sys.exit()

csv_contents = ""

def dummy():
    return

with open("data/prices.csv") as s:
    for line in s:
        parsed = line.split(",")
        if parsed[0] == "price":
            # we're at the first line, so add it
            csv_contents += line
        elif parsed[0] == 'None' or parsed[0] == None:
            dummy()
        elif float(parsed[0]) == -1.0:
            dummy()
        else:
            csv_contents += line

# future: write to a stats.json file?
original_lines = len(open("data/prices.csv").readlines())
new_lines = len(csv_contents.split('\n')) - 1

pct_removed = round(((original_lines - new_lines) / original_lines) * 100, 2)
print(str(pct_removed) + "% removed")

os.remove("data/prices.csv")
with open("data/prices.csv", 'a') as d:
    d.write(csv_contents)
    
# now that we cleaned out the csv, we can write to json
holder = []
with open("data/prices.csv", "r") as d:
    reader = csv.reader(d)
    for api in reader:
        if "price" != api[0]:
            cordinates = api[4].split(",")
            # 3.09,353936,"350 Pleasant St, Belmont, MA",https://locations.dunkindonuts.com/en/353936,"42.403717,-71.166456"
            format = {
                "price": api[0],
                "id": api[1],
                "address": api[2],
                "url": api[3],
                "lat": float(cordinates[0]),
                "lon": float(cordinates[1])
            }
            holder.append(format)

path = "../frontend/static/index.json"
try:
    os.remove(path)
except FileNotFoundError:
    print("Did not remove JSON file, doesn't exist")
with open(path, 'a') as p:
    p.write(json.dumps({"data": holder}))