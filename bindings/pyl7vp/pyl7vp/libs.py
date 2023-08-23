L7VP_APP_LIBS = [
    {
        "name": "react\lodash",
        "js": [
            'https://unpkg.com/lodash@4.x/lodash.min.js',
            'https://unpkg.com/react@18.x/umd/react.production.min.js',
            'https://unpkg.com/react-dom@18.x/umd/react-dom.production.min.js',
        ],
        "css": []
    },
    {
        "name": "antd",
        "js": [
            'https://unpkg.com/dayjs@1.x/dayjs.min.js',
            'https://unpkg.com/antd@5.x/dist/antd.min.js',
            'https://unpkg.com/@ant-design/icons@5.x/dist/index.umd.min.js',
        ],
        "css": ["https://unpkg.com/antd@5.x/dist/reset.css"]
    },
    {
        "name": "L7",
        "js": [
            'https://unpkg.com/turf@3.x/turf.min.js',
            'https://unpkg.com/mapbox-gl@1.13.3/dist/mapbox-gl.js',
            'https://unpkg.com/@antv/l7@2.x/dist/l7.js',
            'https://unpkg.com/@antv/l7-draw@3.x',
            'https://unpkg.com/@antv/larkmap@1.x',
        ],
        "css": ["https://unpkg.com/@antv/larkmap@1.x/dist/larkmap.min.css"]
    },
    {
        "name": "LI SDK",
        "js": [
            "https://unpkg.com/@antv/li-sdk@1",
        ],
        "css": []
    },
    {
        "name": "LI Assets",
        "js": [
            "https://unpkg.com/@antv/li-core-assets@1",
            "https://unpkg.com/@antv/li-analysis-assets@1",
        ],
        "css": []
    },
]

L7VP_Editor_LIBS = [
    {
        "name": "LI Editor",
        "js": [
            "https://unpkg.com/@antv/li-editor@1",
        ],
        "css": []
    },
]
