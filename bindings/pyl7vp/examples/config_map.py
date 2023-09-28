import json
from pyl7vp import L7VP

with open('earthquake-data.json', 'r') as f:
    data = json.loads(f.read())

dataset = {
    "id": "earthquake",
    "type": 'local',
    "data": data,
}

l7vp_map = L7VP(height=600, datasets=[dataset], config={})

l7vp_map.add_dataset(dataset)

l7vp_map.set_config({
  "map": {"config": {"center": [104.153576, 31.287459], "zoom": 7}},
  "layers": [{
    "id": "6342d9b3-31a7-4399-a525-0dde6e953f9d",
    "type": "BubbleLayer",
    "metadata": { "name": "earthquake-layer" },
    "sourceConfig": {
        "parser": {
            "type": "json",
            "x": "lng",
            "y": "lat"
        },
        "datasetId": "earthquake"
    },
    "visConfig": {
        "visible": True,
        "minZoom": 0,
        "maxZoom": 24,
        "blend": "normal",
        "fillColor": {
            "field": "mag",
            "value": [
                "#ffffcc",
                "#d9f0a3",
                "#addd8e",
                "#78c679",
                "#31a354",
                "#006837"
            ],
            "scale": {
                "type": "quantize",
                "unknown": "#c0c0c0"
            },
            "isReversed": False
        },
        "opacity": 0.8,
        "strokeColor": "rgb(146, 112, 202)",
        "lineWidth": 0,
        "lineOpacity": 1,
        "radius": 15,
        "label": {
            "visible": False,
        },
    }
  }]
})

# print(l7vp_map.config)

l7vp_map.save_to_html(file_name="earthquake-map.html", read_only=True)

