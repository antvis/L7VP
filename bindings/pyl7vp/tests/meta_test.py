from pyl7vp import L7VP


def test_meta():
    assert "pyl7vp" == "pyl7vp"


def test_save_to_html():
    map = L7VP(height=600)
    map.save_to_html(file_name="map.html")
