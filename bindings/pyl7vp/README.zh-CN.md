<img src="https://gw.alipayobjects.com/zos/antfincdn/R8sN%24GNdh6/language.svg" width="18"> [English](./README.md) | 简体中文

# PyL7VP

🌍 PyL7VP 是 [`@AntV/L7VP`](https://li.antv.antgroup.com) 在 Python3 上封装的地理可视分析工具。

[![Latest Stable Version](https://img.shields.io/pypi/v/pyl7vp.svg)](https://pypi.python.org/pypi/pyl7vp) [![Test Status](https://github.com/antvis/L7VP/workflows/pyl7vp-test/badge.svg)](https://github.com/antvis/L7VP/actions?query=workflow:pyl7vp-test) [![Pypi Download](https://img.shields.io/pypi/dm/pyl7vp)](https://pypi.python.org/pypi/pyl7vp)

<div align="center">
  <img src="https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*EAcUQb_UzAEAAAAAAAAAAAAADmJ7AQ/original.png" width="800">
</div>

## 安装

```bash
$ pip install pyl7vp
```

## 使用

### 在 Notebook 或 JupyterLab

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

### 保存为 HTML 文件

```py
from pyl7vp import L7VP

l7vp_map = L7VP(height = 600)

# save to html file
l7vp_map.save_to_html("map.html")
```

## 使用教程

- [快速开始](https://www.yuque.com/antv/htpfbw/usrw68bir8tt0yxy#C7cMY)
- [数据格式](https://www.yuque.com/antv/htpfbw/usrw68bir8tt0yxy#ZaJB8)
- [API 文档](https://www.yuque.com/antv/htpfbw/usrw68bir8tt0yxy#YdNaX)
- [Google Colab 示例](https://colab.research.google.com/drive/1KCTfPRv-NksUF3sVGLjSrYo7RgHmfeHH?usp=sharing)

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
