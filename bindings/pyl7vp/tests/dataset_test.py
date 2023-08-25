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

dataset_earthquake = {
    "id": "earthquake",
    "type": 'local',
    "data": data,
}

def test_add_datasets():
    map = L7VP(height=600, datasets=[dataset_earthquake])
    print(map.datasets)
    assert len(map.datasets) == 1

def test_add_dataset():
    map = L7VP(height=600, datasets=[dataset_earthquake])
    map.add_dataset(dataset_earthquake)
    map.add_dataset({
      "id": "earthquake2",
      "type": 'local',
      "data": data,
    })
    assert len(map.datasets) == 2
