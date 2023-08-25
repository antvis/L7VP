import os
from pyl7vp import L7VP

file_name = os.path.dirname(os.path.abspath(__file__)) + "/map.html"

def test_save_to_html():
    map = L7VP(height=600)
    map.save_to_html(file_name)

    assert os.path.exists(file_name) == True
    os.remove(file_name)
