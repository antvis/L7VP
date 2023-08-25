<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | 简体中文

# PyL7VP

🌍 PyL7VP 是 [`@AntV/L7VP`](https://li.antv.antgroup.com) 在 Python3 上的封装。

[![Latest Stable Version](https://img.shields.io/pypi/v/pyl7vp.svg)](https://pypi.python.org/pypi/pyl7vp) [![Test Status](https://github.com/antvis/L7VP/workflows/pyl7vp-test/badge.svg)](https://github.com/antvis/L7VP/actions?query=workflow:pyl7vp-test) [![Pypi Download](https://img.shields.io/pypi/dm/pyl7vp)](https://pypi.python.org/pypi/pyl7vp)

<div align="center">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EAcUQb_UzAEAAAAAAAAAAAAADmJ7AQ/original.png" width="800">
</div>

## 安装

```bash
$ pip install pyl7vp
```

## 使用

#### 在 Notebook 或 JupyterLab

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

#### 保存为 HTML 文件

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

## 案例

- Online in [Google Colab](https://colab.research.google.com/drive/1KCTfPRv-NksUF3sVGLjSrYo7RgHmfeHH?usp=sharing).

## API

#### L7VP

_L7VP(height: int = 600, datasets: list = [], config: dict = {})_: 返回对应的类实例.

- _add_dataset(dataset: dict)_: 将数据集添加到地图上.

- _set_config(config: dict)_: 设置地图相关配置.

- _show(read_only: bool = False)_: 将地图渲染到 Jupyter Notebook or JupyterLab 上预览.

- _save_to_html(file_name: str = "map.html", read_only: bool = False,)_: 保存为 HTML 文件.

## 本地研发

### 安装 Jupyter

```shell
# Using pip
pip install jupyter

# or Using conda
# conda install jupyter
```

### 克隆代码到本地

```shell
git clone https://github.com/antvis/L7VP.git
```

### 启动 jupyter

#### 安装 python 模块

```sh
cd bindings/pyl7vp

# dev install from folder containing setup.py
pip install -e .
```

#### 启动 jupyter notebook

```shell
cd notebooks
jupyter notebook
```

### 发布新版本

更新版本号在 `bindings/pyl7vp/pyl7vp/meta.py` 文件

```py
__version__ = "0.0.1"
```

构建和发布版本

```bash
python setup.py upload
```

## 协议

[Apache-2.0](./LICENSE)
