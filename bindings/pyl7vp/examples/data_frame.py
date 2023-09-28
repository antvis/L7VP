import pandas as pd
from pyl7vp import L7VP

df = pd.DataFrame(
    {'id': ['a', 'b', 'c'],
     'point_latitude': [31.2384, 31.2311, 31.2334],
     'point_longitude': [108.30948, 108.30231, 108.30238],
     'value': [5, 11, 9],
     'time': ['2019-08-01 12:00:00', '2019-08-01 12:05:00', '2020-08-01 11:55:00']
     })

l7vp_map = L7VP(height=600)

l7vp_map.add_dataset({
    "id": "df-1",
    "type": 'local',
    "data": df,
  })

l7vp_map.save_to_html(file_name="map.html", read_only=False)
