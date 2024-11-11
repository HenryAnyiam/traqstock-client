import json
from uuid import uuid4
data = []
number = 1
with open('src/mock_data/housing_structure.json', 'r', encoding='utf-8') as my_file:
    data = json.load(my_file)

for item in data:
    item['name'] = f'Housing{number}'
    number += 1

with open('src/mock_data/housing_structure.json', 'w', encoding='utf-8') as my_file:
    json.dump(data, my_file)
