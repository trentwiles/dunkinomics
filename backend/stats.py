import os
import sys

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