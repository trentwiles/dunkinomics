import os
import csv


if not os.path.exists("data/prices.csv"):
    raise ValueError("prices CSV file does not exist, please run shell script")

def getAverageByState(stateAbv):

    total = 0
    totalLocations = 0

    with open("data/prices.csv", "r") as c:
        csvl = csv.reader(c)
        for x in csvl:
            if x[0] != "price":
                # now determine if the state matches the input
                addy = x[2]
                state = addy[-2:]
                if state == stateAbv:
                    total += float(x[0])
                    totalLocations += 1
                    
    if totalLocations == 0:
        return -1
    return round(total/totalLocations, 2)

print("Connecticut: " + str(getAverageByState("CT")))
print("Mass: " + str(getAverageByState("MA")))
print("New York: " + str(getAverageByState("NY")))
print("New Jersey: " + str(getAverageByState("NJ")))
