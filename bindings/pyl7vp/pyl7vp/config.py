DEFAULT_ANALYSIS_WIDGETS = [
    {
        "id": 'AnalysisLayout',
        "type": 'AnalysisLayout',
        "metadata": {
            "name": '布局组件',
        },
        "properties": {
            "showFloatPanel": False,
            "showSidePanel": False,
            "showBottomPanel": False,
        },
    },
    {
        "id": 'AdministrativeSelectControl',
        "type": 'AdministrativeSelectControl',
        "metadata": {
            "name": '行政区域选择器',
        },
        "properties": {
            "position": 'lefttop',
        },
        "container": {
            "id": 'AnalysisLayout',
            "slot": 'controls',
        },
    },
    {
        "id": 'LocationSearchControl',
        "type": 'LocationSearchControl',
        "metadata": {
            "name": '位置查询',
        },
        "properties": {
            "position": 'lefttop',
        },
        "container": {
            "id": 'AnalysisLayout',
            "slot": 'controls',
        },
    },
    {
        "id": 'ZoomControl',
        "type": 'ZoomControl',
        "metadata": {
            "name": '缩放器',
        },
        "properties": {
            "position": 'bottomright',
        },
        "container": {
            "id": 'AnalysisLayout',
            "slot": 'controls',
        },
    },
    {
        "id": 'PropertiesPanel',
        "type": 'PropertiesPanel',
        "metadata": {
            "name": '属性面板',
        },
        "properties": {
            "isOpen": False,
            "items": [],
        },
        "container": {
            "id": 'AnalysisLayout',
            "slot": 'controls',
        },
    },
    {
        "id": 'LayerPopup',
        "type": 'LayerPopup',
        "metadata": {
            "name": '图层信息框',
        },
        "properties": {
            "isOpen": True,
            "trigger": 'hover',
            "items": [],
        },
        "container": {
            "id": 'AnalysisLayout',
            "slot": 'controls',
        },
    },
    {
        "id": 'FullscreenControl',
        "type": 'FullscreenControl',
        "metadata": {
            "name": '地图全屏',
        },
        "properties": {
            "position": 'topright',
        },
        "container": {
            "id": 'AnalysisLayout',
            "slot": 'controls',
        },
    },
    {
        "id": 'MapViewSettingControl',
        "type": 'MapViewSettingControl',
        "metadata": {
            "name": '地图倾角',
        },
        "properties": {
            "position": 'topright',
        },
        "container": {
            "id": 'AnalysisLayout',
            "slot": 'controls',
        },
    },
    {
        "id": 'LegendWidget',
        "type": 'LegendWidget',
        "metadata": {
            "name": '图例组件',
        },
        "properties": {
            "position": 'topright',
        },
        "container": {
            "id": 'AnalysisLayout',
            "slot": 'controls',
        },
    },
    {
        "id": 'MapThemeControl',
        "type": 'MapThemeControl',
        "metadata": {
            "name": '地图主题',
        },
        "properties": {
            "position": 'bottomright',
        },
        "container": {
            "id": 'AnalysisLayout',
            "slot": 'controls',
        },
    },
    {
        "id": 'MouseLocationControl',
        "type": 'MouseLocationControl',
        "metadata": {
            "name": '光标经纬度',
        },
        "properties": {
            "position": 'leftbottom',
        },
        "container": {
            "id": 'AnalysisLayout',
            "slot": 'controls',
        },
    },
    {
        "id": 'ScaleControl',
        "type": 'ScaleControl',
        "metadata": {
            "name": '比例尺',
        },
        "properties": {
            "position": 'leftbottom',
        },
        "container": {
            "id": 'AnalysisLayout',
            "slot": 'controls',
        },
    },
    {
        "id": 'ea0b8946-3e3d-4a87-a4a0-5dd08e7a2eed',
        "type": 'ExportImageControl',
        "metadata": {
            "name": '导出图片',
        },
        "properties": {
            "position": 'topright',
        },
        "container": {
            "id": 'AnalysisLayout',
            "slot": 'controls',
        },
    },
]

DEFAULT_ANALYSIS_SPEC = {
    "map": {
        "basemap": 'Gaode',
        "config": {
            "zoom": 3,
            "center": [120.153576, 30.287459],
            "pitch": 0,
            "bearing": 0,
            "style": 'dark',
            "WebGLParams": {
                "preserveDrawingBuffer": True,
            },
        },
        "logoPosition": 'leftbottom',
    },
    "layers": [],
    "widgets": DEFAULT_ANALYSIS_WIDGETS,
}

DEFAULT_ANALYSIS_CONFIG = {
    "version": 'v0.1',
    "metadata": {
        "name": "PyL7VP",
    },
    "datasets": [],
    "spec": DEFAULT_ANALYSIS_SPEC,
}
