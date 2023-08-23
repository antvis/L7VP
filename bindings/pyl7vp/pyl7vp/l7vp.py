import uuid
from jinja2 import Environment

from pyl7vp.engine import Engine
from pyl7vp.config import DEFAULT_ANALYSIS_CONFIG, DEFAULT_ANALYSIS_SPEC
from pyl7vp.libs import L7VP_APP_LIBS, L7VP_Editor_LIBS
from pyl7vp.helper.code import json_dump_to_js
from pyl7vp.helper.file import write_utf8_file
from pyl7vp.helper.html import HTML
from typing import Optional


class L7VP():
    '''
    instance l7vp
    '''

    def __init__(self, height=600, datasets: list = [], config: object = DEFAULT_ANALYSIS_SPEC):
        self.height = height
        self.instance_id = uuid.uuid4().hex
        self.datasets = datasets
        self.config = DEFAULT_ANALYSIS_CONFIG

        # page settting
        self.page_title = "PyL7VP"

    '''
    add dataset to l7vp datasets, documents [here](https://github.com/antvis/L7VP/bindings/pyl7vp/README.md)
    '''

    def add_dataset(self, dataset: object):
        self.datasets.append(dataset)
        return self

    '''
    set the l7vp config, documents [here](https://github.com/antvis/L7VP/bindings/pyl7vp/README.md)
    '''

    def set_config(self, config: object):
        self.config = config
        return self

    '''
    get the JavaScript app config of l7vp
    '''

    def dump_js_config(
        self,
        env: Optional[Environment] = None,
        **kwargs
    ) -> str:
        return json_dump_to_js(self.config)

    '''
    get the JavaScript app datasets of l7vp
    '''

    def dump_js_datasets(
        self,
        env: Optional[Environment] = None,
        **kwargs
    ) -> str:
        return json_dump_to_js(self.datasets)

    '''
    render to jupyter
    '''

    # def render_notebook(
    #     self,
    #     env: Optional[Environment] = None,
    #     **kwargs
    # ) -> HTML:
    #     self.js_options = self.dump_js_options(env=env, **kwargs)
    #     # get html string
    #     return HTML(Engine(env=env).render(
    #         plot=self,
    #         template_name="notebook.html",
    #         **kwargs
    #     ))

    '''
    render to jupyter lab
    '''

    # def render_jupyter_lab(
    #     self,
    #     env: Optional[Environment] = None,
    #     **kwargs
    # ) -> HTML:
    #     self.js_options = self.dump_js_options(env=env, **kwargs)
    #     # get html string
    #     return HTML(Engine(env=env).render(
    #         plot=self,
    #         template_name="jupyter-lab.html",
    #         **kwargs
    #     ))

    '''
    render to html string
    '''

    def render_html(
        self,
        read_only: bool = False,
        env: Optional[Environment] = None,
        **kwargs
    ) -> str:
        self.js_datasets = self.dump_js_datasets(env=env, **kwargs)
        self.js_config = self.dump_js_config(env=env, **kwargs)

        L7VP_LIBS = L7VP_APP_LIBS + L7VP_Editor_LIBS

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
            template_name="l7vp.html",
            **kwargs
        )

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
        html = self.render_html(read_only, env, **kwargs)
        # write output into file
        write_utf8_file(file_name, html)
        return file_name
