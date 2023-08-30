import uuid
from jinja2 import Environment

from pyl7vp.engine import Engine
from pyl7vp.config import DEFAULT_ANALYSIS_CONFIG, DEFAULT_ANALYSIS_SPEC
from pyl7vp.helper.merge import deep_merge
from pyl7vp.libs import L7VP_APP_LIBS, L7VP_Editor_LIBS
from pyl7vp.helper.code import json_dump_to_js
from pyl7vp.helper.file import write_utf8_file
from pyl7vp.helper.html import HTML
from typing import Optional


def _validate_dataset(dataset: dict):
    if not isinstance(dataset, dict):
        raise TypeError("dataset must be a dict")
    if "id" not in dataset:
        raise TypeError("dataset must have a id")
    if "type" not in dataset:
        raise TypeError("dataset must have a type")
    if "metadata" not in dataset:
        dataset["metadata"] = {"name": dataset.get("id")}
    if "name" not in dataset["metadata"]:
        dataset["metadata"]["name"] = dataset.get("id")

    if dataset["type"] not in ["local", "remote", "raster-tile", "vector-tile"]:
        raise TypeError(
            "dataset type must be one of local, remote, raster-tile, vector-tile")

    if dataset["type"] == "local":
        if "data" not in dataset:
            raise TypeError("local dataset must have a data")
        if not isinstance(dataset["data"], list):
            raise TypeError("local dataset data must be a list")

    if "columns" not in dataset:
        dataset["columns"] = []

def _validate_datasets(datasets: list):
    if not isinstance(datasets, list):
        raise TypeError("datasets must be a list")
    for dataset in datasets:
        _validate_dataset(dataset)

    return datasets


def _validate_config(config: dict):
    if not isinstance(config, dict):
        raise TypeError("config must be a dict")

def _merge_config(sourceConfig, targetConfig: dict):
    result = sourceConfig.copy()

    for key in targetConfig:
        if(key == "map"):
            deep_merge(result["map"], targetConfig["map"])
        else:
            result[key] = targetConfig[key]

    return result


class L7VP():
    '''
    instance l7vp
    '''

    def __init__(self, height=600, datasets: list = [], config: dict = {}):
        self.height = height
        self.instance_id = uuid.uuid4().hex
        self.datasets = _validate_datasets(datasets)

        _validate_config(config)
        self.config = _merge_config(DEFAULT_ANALYSIS_SPEC, config)

        # page settting
        self.page_title = "PyL7VP"

        print('User Guide: {}'.format(
            'https://github.com/antvis/L7VP/blob/master/bindings/pyl7vp/README.md#user-guide'))

    '''
    add dataset to l7vp datasets, documents [here](https://www.yuque.com/antv/htpfbw/yt98k1sgofg9wgqa#PlyNq)
    '''

    def add_dataset(self, dataset: dict):
        _validate_dataset(dataset)
        datasets = list(filter(lambda x: x["id"] != dataset["id"], self.datasets))
        datasets.append(dataset)

        self.datasets = datasets


    '''
    set the l7vp config, documents [here](https://www.yuque.com/antv/htpfbw/yt98k1sgofg9wgqa#fy1wU)
    '''

    def set_config(self, config: dict):
        _validate_config(config)
        self.config = _merge_config(self.config, config)

    '''
    get the JavaScript app config of l7vp
    '''

    def _dump_js_app_config(
        self,
        env: Optional[Environment] = None,
        **kwargs
    ) -> str:
        app_config = DEFAULT_ANALYSIS_CONFIG.copy()
        app_config.update({"spec": self.config, "metadata": { "name": self.page_title }})
        return json_dump_to_js(app_config)

    '''
    get the JavaScript app datasets of l7vp
    '''

    def _dump_js_datasets(
        self,
        env: Optional[Environment] = None,
        **kwargs
    ) -> str:
        return json_dump_to_js(self.datasets)

    '''
    get render to html string
    '''

    def _get_html_str(
        self,
        read_only: bool = False,
        env: Optional[Environment] = None,
        html_template: str = "l7vp.html",
        **kwargs
    ) -> str:
        self.js_datasets = self._dump_js_datasets(env=env, **kwargs)
        self.js_app_config = self._dump_js_app_config(env=env, **kwargs)

        L7VP_LIBS = L7VP_APP_LIBS if read_only else L7VP_APP_LIBS + L7VP_Editor_LIBS

        cssAssets = []
        jsAssets = []
        for dep in L7VP_LIBS:
            cssAssets += dep["css"]
            jsAssets += dep["js"]

        self.dependencies = {
            "cssAssets": cssAssets,
            "jsAssets": jsAssets,
        }

        self.read_only = read_only

        # get html string
        return Engine(env=env).render(
            l7vp=self,
            template_name=html_template,
            **kwargs
        )

    '''
    display map to jupyter or jupyter lab
    '''

    def show(
        self,
        read_only: bool = False,
        env: Optional[Environment] = None,
        **kwargs
    ) -> HTML:
        # get html string
        html = self._get_html_str(read_only, env, "notebook.html", **kwargs)
        return HTML(html)

    '''
    save to html file
    '''

    def save_to_html(
        self,
        file_name: str = "map.html",
        read_only: bool = False,
        env: Optional[Environment] = None,
        **kwargs
    ) -> str:
        # get html string
        html = self._get_html_str(read_only, env, **kwargs)
        # write output into file
        write_utf8_file(file_name, html)

        print("Saved to {}!".format(file_name))
