import type { ThemeCfg } from '@antv/s2';
import { merge } from 'lodash-es';

const BORDER_COLOR = 'rgba(255,255,255,0.08)';
const BACK_COLOR = 'rgba(255,255,255,0)';
const HEADER_BACK_COLOR = 'rgba(255,255,255,0)';
const CELL_ACTIVE_BACK_COLOR = 'rgba(255,255,255,0)';
const DARK_HOVER_BACKGROUND_COLOR = 'rgba(255,255,255,0)';

export const BaseTheme: ThemeCfg['theme'] = {
  resizeArea: {
    size: 4,
    interactionState: {
      hover: {
        backgroundOpacity: 0,
      },
    },
  },

  cornerCell: {
    cell: {
      padding: {
        top: 12,
        right: 8,
        bottom: 12,
        left: 8,
      },
    },
    bolderText: {
      fontFamily:
        'Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif',
      opacity: 0.4,
    },
  },
  splitLine: {
    horizontalBorderColorOpacity: 1,
    horizontalBorderWidth: 1,

    verticalBorderColorOpacity: 1,
    verticalBorderWidth: 1,
    shadowWidth: 10,
  },
  rowCell: {
    seriesText: {
      fontFamily:
        'Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif',
      opacity: 0.4,
      fontSize: 15,
      textBaseline: 'middle',
    },

    icon: undefined,
    seriesNumberWidth: 35,
    text: {
      fontFamily:
        'Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif',
      opacity: 0.4,
      fontSize: 15,
      textBaseline: 'middle',
    },
    cell: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      interactionState: {
        hover: {
          backgroundOpacity: 1,
        },
      },

      verticalBorderWidth: 1,
      horizontalBorderWidth: 1,
    },
  },
  colCell: {
    icon: {
      size: 12,
      margin: {
        left: 0,
        right: 0,
      },
    },
    cell: {
      verticalBorderWidth: 1,
      horizontalBorderWidth: 1,
      padding: {
        top: 12,
        right: 12,
        bottom: 12,
        left: 12,
      },

      interactionState: {
        hover: {
          backgroundOpacity: 1,
        },
      },
    },
    bolderText: {
      opacity: 0.4,
      fontFamily:
        'Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif',
    },
  },
  dataCell: {
    text: {
      fontFamily:
        'Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif',
    },
    icon: {
      size: 18,
      margin: {
        left: 4,
        right: 0,
      },
    },
    cell: {
      interactionState: {
        hover: {
          backgroundOpacity: 1,
        },
        hoverFocus: {
          backgroundOpacity: 1,
          borderColor: 'blue',
        },
        selected: {
          backgroundOpacity: 1,
        },
        unselected: {
          backgroundOpacity: 1,
          opacity: 1,
        },
        prepareSelect: {},
      },

      verticalBorderWidth: 1,
      horizontalBorderWidth: 1,
      padding: {
        top: 12,
        right: 12,
        bottom: 12,
        left: 12,
      },
      backgroundColorOpacity: 0.9,
    },
  },
};

export const DarkTheme = merge({}, BaseTheme, {
  background: {
    color: HEADER_BACK_COLOR,
  },
  scrollBar: {
    trackColor: 'rgba(0,0,0,0)',
    thumbHoverColor: 'rgba(240, 241, 245,0.5)',
    thumbColor: 'rgba(240, 241, 245,0.2)',
  },
  cornerCell: {
    cell: {
      horizontalBorderColor: BORDER_COLOR,
      verticalBorderColor: BORDER_COLOR,

      backgroundColor: HEADER_BACK_COLOR,
    },

    bolderText: {
      opacity: 0.4,
    },
  },
  splitLine: {
    horizontalBorderColor: BORDER_COLOR,
    verticalBorderColor: BORDER_COLOR,
    shadowColors: {
      left: 'rgba(0,0,0,0.1)',
      right: 'rgba(0,0,0,0)',
    },
  },
  rowCell: {
    seriesText: {
      fill: '#fff',
    },
    text: {
      fill: '#fff',
      opacity: 0.7,
      fontSize: 12,
    },
    cell: {
      backgroundColor: HEADER_BACK_COLOR,

      interactionState: {
        hover: {
          backgroundColor: DARK_HOVER_BACKGROUND_COLOR,
        },
        selected: {
          backgroundColor: CELL_ACTIVE_BACK_COLOR,
        },
      },
      horizontalBorderColor: BORDER_COLOR,
      verticalBorderColor: BORDER_COLOR,
      verticalBorderWidth: 1,
      horizontalBorderWidth: 1,
    },
  },
  colCell: {
    cell: {
      horizontalBorderColor: BORDER_COLOR,
      verticalBorderColor: BORDER_COLOR,

      backgroundColor: HEADER_BACK_COLOR,
      interactionState: {
        hover: {
          backgroundColor: DARK_HOVER_BACKGROUND_COLOR,
          backgroundOpacity: 1,
        },
        selected: {
          backgroundColor: CELL_ACTIVE_BACK_COLOR,
        },
      },
    },
    text: {
      fill: '#fff',
    },
    bolderText: {
      fill: '#fff',
      opacity: 0.8,
    },
  },
  dataCell: {
    cell: {
      interactionState: {
        hover: {
          backgroundColor: '#252b37',
          backgroundOpacity: 1,
        },
        hoverFocus: {
          backgroundColor: CELL_ACTIVE_BACK_COLOR,
          backgroundOpacity: 1,
          borderColor: '#3485FF',
        },
        selected: {
          backgroundColor: CELL_ACTIVE_BACK_COLOR,
          backgroundOpacity: 1,
        },
        unselected: {
          backgroundOpacity: 1,
          opacity: 1,
        },
        prepareSelect: {
          borderColor: '#3485FF',
        },
      },
      horizontalBorderColor: BORDER_COLOR,
      verticalBorderColor: BORDER_COLOR,
      backgroundColor: BACK_COLOR,
      crossBackgroundColor: BACK_COLOR,
    },
    text: {
      fill: '#fff',
      textAlign: 'left',
    },
  },
});

export const LightTheme = merge({}, BaseTheme, {
  resizeArea: {
    interactionState: {
      hover: {
        backgroundOpacity: 0.05,
      },
      selected: {
        backgroundOpacity: 0.05,
      },
    },
  },
  cornerCell: {
    cell: {
      padding: {
        top: 0,
        right: 8,
        bottom: 0,
        left: 8,
      },
      backgroundColor: '#fff',
      backgroundColorOpacity: 1,
    },
    bolderText: {
      opacity: 0.4,
    },
  },
  splitLine: {
    horizontalBorderWidth: 1,
    verticalBorderWidth: 1,
    shadowWidth: 3,
    verticalBorderColor: '#E7E6EA',
    horizontalBorderColor: '#E7E6EA',
  },
  rowCell: {
    bolderText: {
      opacity: 0.85,
      fill: '#000',
      fontFamily:
        'Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif',
      fontSize: 12,
    },
    text: {
      opacity: 0.85,
      fill: '#000',
      fontFamily:
        'Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif',
      fontSize: 12,
    },
    cell: {
      backgroundColor: '#fff',
      backgroundColorOpacity: 1,
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      interactionState: {
        hover: {
          backgroundColor: '#4876ff',
          backgroundOpacity: 0.05,
        },
        selected: {
          backgroundColor: '#4876ff',
          backgroundOpacity: 0.15,
          borderColor: '#4876ff',
          borderOpacity: 0.8,
        },
      },
    },
  },
  // 行头
  colCell: {
    cell: {
      backgroundColor: '#fff',
      backgroundColorOpacity: 1,

      padding: {
        top: 0,
        right: 12,
        bottom: 0,
        left: 12,
      },
      interactionState: {
        hover: {
          backgroundColor: '#4876ff',
          backgroundOpacity: 0.3,
        },
        selected: {
          backgroundColor: '#4876ff',
          backgroundOpacity: 0.15,
          borderColor: '#4876ff',
          borderOpacity: 0.8,
        },
      },
    },
    bolderText: {
      opacity: 0.85,
      fill: '#000',
      fontFamily:
        'Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif',
      fontSize: 12,
      fontWeight: 'bold',
    },
    text: {
      opacity: 0.85,
      fill: '#000',
      fontFamily:
        'Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif',
      fontSize: 12,
      fontWeight: 'bold',
    },
  },
  dataCell: {
    icon: {
      size: 14,
      margin: {
        left: 4,
        right: 0,
      },
    },
    bolderText: {
      opacity: 0.65,
      fill: '#000',
      fontFamily:
        'Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif',
      fontSize: 12,
      fontWeight: 'normal',
    },
    text: {
      opacity: 0.65,
      fill: '#000',
      fontFamily:
        'Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif',
      fontSize: 12,
      textAlign: 'left',
      fontWeight: 'normal',
    },
    cell: {
      backgroundColor: '#fff',
      crossBackgroundColor: '#fff',

      interactionState: {
        selected: {
          backgroundColor: '#4876ff',
          backgroundOpacity: 0.15,
          borderColor: '#4876ff',
          borderOpacity: 0.8,
        },
      },
      padding: {
        top: 0,
        right: 12,
        bottom: 0,
        left: 12,
      },
    },
  },
});
