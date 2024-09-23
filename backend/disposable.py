# Takes a list of US states disposable income
# Then determines how much a small dunkin coffee is of that, using the per state data
import csv
import byState
import os
import json

# Data sourced from Forbes (https://www.forbes.com/advisor/mortgages/cost-of-living-by-state/)
# Should additionally be sourced
stateList = []
with open("static_data/income.csv") as income:
    d = csv.reader(income)
    # 0 - State
    # 1 - Cost of Living
    # 2 - Cost of Living Ranking
    # 3 - Disposable Income
    # 4 - Disposable Income Ranking
    for line in d:
        # ignore first line
        if line[1] == "Cost of Living<sup>1</sup>":
            continue
        disposable = line[3].replace("$", "").replace(",", "")
        
        stateList.append({"state": byState.convertStateToAbv(line[0]), "disposable_income": int(disposable)})

# Now let's open the states.json file from ~/frontend/static
if not os.path.exists("../frontend/static/states.json"):
    raise FileNotFoundError("Please run the byState.py file to generate the states.json file")

incomeToCoffeeRatio = []
coffeesWithDisposable = []
with open("../frontend/static/states.json") as static:
    api = json.loads(static.read())
    for ste in api["features"]:
        name = ste["properties"]["name"]
        cost = ste["properties"]["density"]
        
        # -1 indicates there are no dunkins in that state, so move on
        if cost == -1:
            continue
        
        abv = byState.convertStateToAbv(name)
        # The state doesn't exist
        if abv == None:
            continue
        
        # Find the state's income in the CSV
        for x in stateList:
            if abv == x["state"]:
                # What percent of your disposable income is a coffee?
                disposable_income = x["disposable_income"]
                
                ratio = cost/disposable_income
                percent = round(ratio * 100, 6)
                str_percent = str(percent) + "%"
        
                incomeToCoffeeRatio.append(
                    {"state": abv, "percentOfIncome": str_percent}
                )
                
                # How many small iced coffees could you buy with that money?
                ratio2 = disposable_income/cost
                str_ratio2 = str(round(ratio2))
                coffeesWithDisposable.append(
                    {"state": abv, "coffees": str_ratio2}
                )
        
        # if it wasn't found, nothing will be added
print(incomeToCoffeeRatio)
print("============================")
print(coffeesWithDisposable)