import json
from pyl7vp import L7VP

with open('earthquake-data.json', 'r') as f:
    data = json.loads(f.read())

l7vp_map = L7VP(height=600)

l7vp_map.add_dataset({
    "id": "data-1",
    "type": 'local',
    "data": data,
  })

l7vp_map.save_to_html(file_name="earthquake-map.html", read_only=False)
