from pyl7vp import L7VP

map = L7VP(height=600)

map.save_to_html(file_name="map.html", read_only=False)
