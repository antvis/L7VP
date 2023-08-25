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

## Usage

### Jupyter Notebook and JupyterLab

```py
from pyl7vp import L7VP

l7vp_map = L7VP(height = 600)

# Add dataset to map
l7vp_map.add_dataset({"id": "my_dataset", "type": 'local', "data": []})

# Set config
l7vp_map.set_config({
  "map": {
    "type": "Gaode",
    "config": {
            "zoom": 3,
            "center": [120.153576, 30.287459],
            "style": 'dark',
        },
  },
})

# print datasets and config
l7vp_map.datasets
l7vp_map.config

# Display map
l7vp_map.show()
```

### Save to HTML File

```py
from pyl7vp import L7VP

l7vp_map = L7VP(height = 600)

l7vp_map.set_config({
  "map": {
    "type": "Gaode",
    "config": {
            "zoom": 3,
            "center": [120.153576, 30.287459],
            "style": 'dark',
        },
  },
})

# save to html file
l7vp_map.save_to_html("map.html")
```

## Examples

- Online in [Google Colab](https://colab.research.google.com/drive/1KCTfPRv-NksUF3sVGLjSrYo7RgHmfeHH?usp=sharing).

## API

#### L7VP

_L7VP(height: int = 600, datasets: list = [], config: dict = {})_: return an instance.

- _add_dataset(dataset: dict)_: add an dataset to map.

- _set_config(config: dict)_: set the config into instance.

- _show(read_only: bool = False)_: show map on Jupyter Notebook or JupyterLab preview.

- _save_to_html(file_name: str = "map.html", read_only: bool = False,)_: save to html file.

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
