<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> English | [简体中文](./README.zh-CN.md)

# PyL7VP

🌍 Python3 binding for [`@AntV/L7VP`](https://li.antv.antgroup.com) geospatial visual analysis tool.

[![Latest Stable Version](https://img.shields.io/pypi/v/pyl7vp.svg)](https://pypi.python.org/pypi/pyl7vp) [![Test Status](https://github.com/antvis/L7VP/workflows/pyl7vp-test/badge.svg)](https://github.com/antvis/L7VP/actions?query=workflow:pyl7vp-test) [![Pypi Download](https://img.shields.io/pypi/dm/pyl7vp)](https://pypi.python.org/pypi/pyl7vp)

<div align="center">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EAcUQb_UzAEAAAAAAAAAAAAADmJ7AQ/original.png" width="800">
</div>

## Installation

```bash
$ pip install pyl7vp
```

### Usage

### Jupyter Notebook and JupyterLab

```py
from pyl7vp import L7VP

l7vp_map = L7VP(height = 600)

# data
data = [
  { "longitude": 105.005, "latitude": 32.349, "mag": 5.2 },
  { "longitude": 104.602, "latitude": 32.067, "mag": 3 },
  { "longitude": 103.665, "latitude": 31.29, "mag": 6 },
  { "longitude": 105.275, "latitude": 32.416, "mag": 2 }
]

# add dataset to map
l7vp_map.add_dataset({"id": "my_dataset", "type": 'local', "data": data})

# Set config
l7vp_map.set_config({
  "map": {
    "type": "Gaode",
    "config": {
            "zoom": 7,
            "center": [104.615357, 32.068745],
            "style": 'dark',
        },
  },
})

# display map
l7vp_map.show()
```

### Save to HTML File

```py
from pyl7vp import L7VP

l7vp_map = L7VP(height = 600)

# save to html file
l7vp_map.save_to_html("map.html")
```

## User Guide

- [Quick Start](https://www.yuque.com/antv/htpfbw/usrw68bir8tt0yxy#C7cMY)
- [Data Format](https://www.yuque.com/antv/htpfbw/usrw68bir8tt0yxy#ZaJB8)
- [API Document](https://www.yuque.com/antv/htpfbw/usrw68bir8tt0yxy#YdNaX)
- Online in [Google Colab](https://colab.research.google.com/drive/1KCTfPRv-NksUF3sVGLjSrYo7RgHmfeHH?usp=sharing)

## Local Development

### Install Jupyter

```shell
# Using pip
pip install jupyter

# or Using conda
# conda install jupyter
```

### Clone code

```shell
git clone https://github.com/antvis/L7VP.git
```

### Setup jupyter

#### Install python module

```sh
cd bindings/pyl7vp

# dev install from folder containing setup.py
pip install -e .
```

#### Start jupyter notebook

```shell
cd notebooks
jupyter notebook
```

### Release a new version

Update `version` in `bindings/pyl7vp/pyl7vp/meta.py`

```py
__version__ = "0.0.1"
```

Build and publish

```bash
python setup.py upload
```

## License

[Apache-2.0](./LICENSE)
