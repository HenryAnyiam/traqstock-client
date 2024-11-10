import json
import random
names = ['Open-Sided Shed', 'Closed Shed', 'Battery Cage System', 'Deep Litter House', 'Semi-Intensive Housing', 'Pasture Housing']
cats = ['Brooder Chick House', 'Growers House', 'Layers House', 'Broilers House', 'Breeders House']
new_data = []
for i in names:
    registered = random.randint(25, 100)
    choice = random.choice(cats)
    data = {"type": i, "category": choice, "registered": registered}
    new_data.append(data)


with open('housing_structure.json', 'w', encoding='utf-8') as my_file:
    json.dump(new_data, my_file)
