
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['exports', 'echarts'], factory);
  } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
    // CommonJS
    factory(exports, require('echarts'));
  } else {
    // Browser globals
    factory({}, root.echarts);
  }
}
  (this, function (exports, echarts) {
    var log = function (msg) {
      if (typeof console !== 'undefined') {
        console && console.error && console.error(msg);
      }
    };
    if (!echarts) {
      log('ECharts is not Loaded');
      return;
    }
    echarts.registerTheme('morning', {
      "color": [
        "#7f8cff",
        "#cc65ff",
        "#ff967f",
        "#f3d85f",
        "#53f2ad",
        "#45dbe6",
        "#6588ce",
        "#b850cb",
        "#e77b63",
        "#e7b45b",
        "#4cc18a",
        "#52c4ce"
      ],
      "textStyle": {
        "color": "#a2a7c9"
      },
      "title": {
        "textStyle": {
          "color": "#3fe0e8"
        },
        "subtextStyle": {
          "color": "#a2a7c9"
        }
      },
      "line": {
        "itemStyle": {
          "normal": {
            "borderWidth": "2"
          }
        },
        "lineStyle": {
          "normal": {
            "width": "2"
          }
        },
        "symbolSize": "4",
        "symbol": "circle",
        "smooth": true
      },
      "radar": {
        "itemStyle": {
          "normal": {
            "borderWidth": "2"
          }
        },
        "lineStyle": {
          "normal": {
            "width": "2"
          }
        },
        "symbolSize": "4",
        "symbol": "circle",
        "smooth": true
      },
      "bar": {
        "itemStyle": {
          "normal": {
            "barBorderWidth": "0",
            "barBorderColor": "#ccddee"
          },
          "emphasis": {
            "barBorderWidth": "0",
            "barBorderColor": "#ccddee"
          }
        }
      },
      "pie": {
        "itemStyle": {
          "normal": {
            "borderWidth": "0",
            "borderColor": "#ccddee"
          },
          "emphasis": {
            "borderWidth": "0",
            "borderColor": "#ccddee"
          }
        }
      },
      "scatter": {
        "itemStyle": {
          "normal": {
            "borderWidth": "0",
            "borderColor": "#ccddee"
          },
          "emphasis": {
            "borderWidth": "0",
            "borderColor": "#ccddee"
          }
        }
      },
      "boxplot": {
        "itemStyle": {
          "normal": {
            "borderWidth": "0",
            "borderColor": "#ccddee"
          },
          "emphasis": {
            "borderWidth": "0",
            "borderColor": "#ccddee"
          }
        }
      },
      "parallel": {
        "itemStyle": {
          "normal": {
            "borderWidth": "0",
            "borderColor": "#ccddee"
          },
          "emphasis": {
            "borderWidth": "0",
            "borderColor": "#ccddee"
          }
        }
      },
      "sankey": {
        "itemStyle": {
          "normal": {
            "borderWidth": "0",
            "borderColor": "#ccddee"
          },
          "emphasis": {
            "borderWidth": "0",
            "borderColor": "#ccddee"
          }
        }
      },
      "funnel": {
        "itemStyle": {
          "normal": {
            "borderWidth": "0",
            "borderColor": "#ccddee"
          },
          "emphasis": {
            "borderWidth": "0",
            "borderColor": "#ccddee"
          }
        }
      },
      "gauge": {
        "itemStyle": {
          "normal": {
            "borderWidth": "0",
            "borderColor": "#ccddee"
          },
          "emphasis": {
            "borderWidth": "0",
            "borderColor": "#ccddee"
          }
        }
      },
      "candlestick": {
        "itemStyle": {
          "normal": {
            "color": "#fc97af",
            "color0": "transparent",
            "borderColor": "#fc97af",
            "borderColor0": "#87f7cf",
            "borderWidth": "1"
          }
        }
      },
      "graph": {
        "itemStyle": {
          "normal": {
            "borderWidth": "0",
            "borderColor": "#ccddee"
          }
        },
        "lineStyle": {
          "normal": {
            "width": "1",
            "color": "#ddeeff"
          }
        },
        "symbolSize": "4",
        "symbol": "circle",
        "smooth": true,
        "color": [
          "#7f8cff",
          "#cc65ff",
          "#ff967f",
          "#f3d85f",
          "#53f2ad",
          "#45dbe6",
          "#6588ce",
          "#b850cb",
          "#e77b63",
          "#e7b45b",
          "#4cc18a",
          "#52c4ce"
        ],
        "label": {
          "normal": {
            "textStyle": {
              "color": "#ddeeff"
            }
          }
        }
      },
      "map": {
        "itemStyle": {
          "normal": {
            "areaColor": "#69b7ff",
            "borderColor": "#7159e6",
            "borderWidth": 0.5
          },
          "emphasis": {
            "areaColor": "#99ee99",
            "borderColor": "#52c4ce",
            "borderWidth": "0.5"
          }
        },
        "label": {
          "normal": {
            "textStyle": {
              "color": "#ddeeff"
            }
          },
          "emphasis": {
            "textStyle": {
              "color": "#ddeeff"
            }
          }
        }
      },
      "geo": {
        "itemStyle": {
          "normal": {
            "areaColor": "#69b7ff",
            "borderColor": "#7159e6",
            "borderWidth": 0.5
          },
          "emphasis": {
            "areaColor": "#99ee99",
            "borderColor": "#52c4ce",
            "borderWidth": "0.5"
          }
        },
        "label": {
          "normal": {
            "textStyle": {
              "color": "#ddeeff"
            }
          },
          "emphasis": {
            "textStyle": {
              "color": "#ddeeff"
            }
          }
        }
      },
      "categoryAxis": {
        "axisLine": {
          "show": true,
          "lineStyle": {
            "color": "rgba(255,255,255,0.2)"
          }
        },
        "axisTick": {
          "show": false,
          "lineStyle": {
            "color": "#333"
          }
        },
        "axisLabel": {
          "show": true,
          "textStyle": {
            "color": "#a2a7c9"
          }
        },
        "splitLine": {
          "show": false,
          "lineStyle": {
            "color": [
              "rgba(255,255,255,0.1)"
            ]
          }
        },
        "splitArea": {
          "show": false,
          "areaStyle": {
            "color": [
              "rgba(250,250,250,0.05)",
              "rgba(200,200,200,0.02)"
            ]
          }
        }
      },
      "valueAxis": {
        "axisLine": {
          "show": true,
          "lineStyle": {
            "color": "rgba(255,255,255,0.2)"
          }
        },
        "axisTick": {
          "show": false,
          "lineStyle": {
            "color": "#333"
          }
        },
        "axisLabel": {
          "show": true,
          "textStyle": {
            "color": "#a2a7c9"
          }
        },
        "splitLine": {
          "show": true,
          "lineStyle": {
            "color": [
              "rgba(255,255,255,0.1)"
            ]
          }
        },
        "splitArea": {
          "show": false,
          "areaStyle": {
            "color": [
              "rgba(250,250,250,0.05)",
              "rgba(200,200,200,0.02)"
            ]
          }
        }
      },
      "logAxis": {
        "axisLine": {
          "show": true,
          "lineStyle": {
            "color": "rgba(255,255,255,0.2)"
          }
        },
        "axisTick": {
          "show": false,
          "lineStyle": {
            "color": "#333"
          }
        },
        "axisLabel": {
          "show": true,
          "textStyle": {
            "color": "#a2a7c9"
          }
        },
        "splitLine": {
          "show": true,
          "lineStyle": {
            "color": [
              "rgba(255,255,255,0.1)"
            ]
          }
        },
        "splitArea": {
          "show": false,
          "areaStyle": {
            "color": [
              "rgba(250,250,250,0.05)",
              "rgba(200,200,200,0.02)"
            ]
          }
        }
      },
      "timeAxis": {
        "axisLine": {
          "show": true,
          "lineStyle": {
            "color": "rgba(255,255,255,0.2)"
          }
        },
        "axisTick": {
          "show": false,
          "lineStyle": {
            "color": "#333"
          }
        },
        "axisLabel": {
          "show": true,
          "textStyle": {
            "color": "#a2a7c9"
          }
        },
        "splitLine": {
          "show": true,
          "lineStyle": {
            "color": [
              "rgba(255,255,255,0.1)"
            ]
          }
        },
        "splitArea": {
          "show": false,
          "areaStyle": {
            "color": [
              "rgba(250,250,250,0.05)",
              "rgba(200,200,200,0.02)"
            ]
          }
        }
      },
      "toolbox": {
        "iconStyle": {
          "normal": {
            "borderColor": "#99aabb"
          },
          "emphasis": {
            "borderColor": "#667788"
          }
        }
      },
      "legend": {
        "textStyle": {
          "color": "#717788"
        }
      },
      "tooltip": {
        "axisPointer": {
          "lineStyle": {
            "color": "#ccddee",
            "width": 1
          },
          "crossStyle": {
            "color": "#ccddee",
            "width": 1
          }
        }
      },
      "timeline": {
        "lineStyle": {
          "color": "#87f7cf",
          "width": 1
        },
        "itemStyle": {
          "normal": {
            "color": "#87f7cf",
            "borderWidth": 1
          },
          "emphasis": {
            "color": "#f7f494"
          }
        },
        "controlStyle": {
          "normal": {
            "color": "#87f7cf",
            "borderColor": "#87f7cf",
            "borderWidth": 0.5
          },
          "emphasis": {
            "color": "#87f7cf",
            "borderColor": "#87f7cf",
            "borderWidth": 0.5
          }
        },
        "checkpointStyle": {
          "color": "#fc97af",
          "borderColor": "rgba(252,151,175,0.3)"
        },
        "label": {
          "normal": {
            "textStyle": {
              "color": "#87f7cf"
            }
          },
          "emphasis": {
            "textStyle": {
              "color": "#87f7cf"
            }
          }
        }
      },
      "visualMap": {
        "color": [
          "#6b46b4",
          "#4792f4",
          "#39e8d9"
        ]
      },
      "dataZoom": {
        "backgroundColor": "rgba(255,255,255,0)",
        "dataBackgroundColor": "rgba(114,204,255,1)",
        "fillerColor": "rgba(114,204,255,0.2)",
        "handleColor": "#72ccff",
        "handleSize": "100%",
        "textStyle": {
          "color": "#ddeeff"
        }
      },
      "markPoint": {
        "label": {
          "normal": {
            "textStyle": {
              "color": "#ddeeff"
            }
          },
          "emphasis": {
            "textStyle": {
              "color": "#ddeeff"
            }
          }
        }
      }
    });
  }));
