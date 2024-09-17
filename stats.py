highest = 0.0
highest_data = None


with open("data/prices.csv") as s:
    for line in s:
        
        parsed = line.split(",")
        if parsed[0] == "price":
            continue
        if parsed[0] == 'None' or parsed[0] == None:
            continue
        if float(parsed[0]) < 0.0:
            continue 
        
        if float(parsed[0]) > highest:
            highest = float(parsed[0])
            highest_data = line

print(f"The most costly coffee ({highest}) is at:")
print(highest_data)