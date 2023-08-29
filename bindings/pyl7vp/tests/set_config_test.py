from pyl7vp import L7VP

def test_set_config():
    map = L7VP(height=600, config={"map": {"basemap": "Mapbox"},})
    assert map.config['map']['basemap'] == "Mapbox"

    map.set_config({
      "map": {"config": {"center": [104.153576, 31.287459], "zoom": 7}},
    })
    assert map.config['map']['config']['zoom'] == 7
    assert map.config['map']['config']['center'] == [104.153576, 31.287459]

    map.set_config({
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
            "fillColor": "#31a354",
            "opacity": 0.8,
            "strokeColor": "rgb(146, 112, 202)",
            "lineWidth": 0,
            "lineOpacity": 1,
            "radius": 15,
            "label": {
                "visible": False,
            },
        },
  }]
    })
    assert len(map.config['layers']) == 1
