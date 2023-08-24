from pyl7vp import L7VP

data = [
    {
        "lng": 105.005,
        "lat": 32.349,
        "depth": 10,
        "mag": 5.2,
        "time": 1212640865530,
        "title": "M 5.2 - Sichuan-Gansu border region, China"
    },
    {
        "lng": 104.602,
        "lat": 32.067,
        "depth": 10,
        "mag": 5,
        "time": 1212462569360,
        "title": "M 5.0 - Sichuan-Gansu border region, China"
    },
    {
        "lng": 105.272,
        "lat": 32.451,
        "depth": 10,
        "mag": 5.2,
        "time": 1211177214760,
        "title": "M 5.2 - Sichuan-Gansu border region, China"
    },
    {
        "lng": 105.042,
        "lat": 32.402,
        "depth": 10,
        "mag": 5,
        "time": 1211170138690,
        "title": "M 5.0 - Sichuan-Gansu border region, China"
    },
    {
        "lng": 104.982,
        "lat": 32.24,
        "depth": 9,
        "mag": 5.8,
        "time": 1211044105480,
        "title": "M 5.8 - Sichuan-Gansu border region, China"
    },
    {
        "lng": 103.665,
        "lat": 31.29,
        "depth": 10,
        "mag": 5,
        "time": 1210969012190,
        "title": "M 5.0 - eastern Sichuan, China"
    },
    {
        "lng": 103.351,
        "lat": 31.355,
        "depth": 3,
        "mag": 5.6,
        "time": 1210915547320,
        "title": "M 5.6 - eastern Sichuan, China"
    },
    {
        "lng": 104.214,
        "lat": 31.66,
        "depth": 10,
        "mag": 5.1,
        "time": 1210798867000,
        "title": "M 5.1 - eastern Sichuan, China"
    },
    {
        "lng": 104.014,
        "lat": 31.356,
        "depth": 10,
        "mag": 5.1,
        "time": 1210757203950,
        "title": "M 5.1 - eastern Sichuan, China"
    },
    {
        "lng": 104.032,
        "lat": 31.996,
        "depth": 10,
        "mag": 5.1,
        "time": 1210744497980,
        "title": "M 5.1 - eastern Sichuan, China"
    },
    {
        "lng": 103.518,
        "lat": 31.325,
        "depth": 18.8,
        "mag": 5.4,
        "time": 1210733679980,
        "title": "M 5.4 - eastern Sichuan, China"
    },
    {
        "lng": 105.275,
        "lat": 32.416,
        "depth": 10,
        "mag": 5,
        "time": 1210663156260,
        "title": "M 5.0 - Sichuan-Gansu border region, China"
    },
    {
        "lng": 103.194,
        "lat": 30.89,
        "depth": 9,
        "mag": 5.8,
        "time": 1210662428500,
        "title": "M 5.8 - eastern Sichuan, China"
    },
]

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

