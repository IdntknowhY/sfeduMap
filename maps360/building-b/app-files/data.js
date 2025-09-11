var APP_DATA = {
  "scenes": [
    {
      "id": "0-b-1-entrance",
      "name": "B-1 Entrance",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "pitch": 0,
        "yaw": 0,
        "fov": 1.5707963267948966
      },
      "linkHotspots": [
        {
          "yaw": 0.020352525725339632,
          "pitch": 0.43778327684675844,
          "rotation": 0,
          "target": "1-b-1-stairs"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "1-b-1-stairs",
      "name": "B-1 Stairs",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "yaw": -3.110723851589471,
        "pitch": 0.007833181281473145,
        "fov": 1.37335227575057
      },
      "linkHotspots": [
        {
          "yaw": 0.0852955179993451,
          "pitch": 0.5216473316360037,
          "rotation": 0,
          "target": "0-b-1-entrance"
        },
        {
          "yaw": -1.4842327143573009,
          "pitch": 0.3115849232341752,
          "rotation": 0,
          "target": "4-b-120"
        },
        {
          "yaw": 2.495928098877153,
          "pitch": 0.20975364529876828,
          "rotation": 0.7853981633974483,
          "target": "2-b-1-2-stairs-"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "2-b-1-2-stairs-",
      "name": "B-1-2 Stairs ",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "yaw": 2.6154119175660036,
        "pitch": 0.20487807213877574,
        "fov": 1.37335227575057
      },
      "linkHotspots": [
        {
          "yaw": -3.0109062852475184,
          "pitch": 0.6320967738111154,
          "rotation": 18.06415775814132,
          "target": "1-b-1-stairs"
        },
        {
          "yaw": 1.7053509181097928,
          "pitch": -0.016717304321247184,
          "rotation": 6.283185307179586,
          "target": "3-b-2-stairs-"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "3-b-2-stairs-",
      "name": "B-2 Stairs ",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "yaw": 0.9766936118852207,
        "pitch": 0.2123461174093304,
        "fov": 1.37335227575057
      },
      "linkHotspots": [
        {
          "yaw": 0.10611689255779666,
          "pitch": 0.029612175041886957,
          "rotation": 0.7853981633974483,
          "target": "10-b-212a"
        },
        {
          "yaw": 1.6700910808855571,
          "pitch": 0.6938140205150081,
          "rotation": 12.566370614359176,
          "target": "2-b-1-2-stairs-"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "4-b-120",
      "name": "B-120",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "yaw": -1.5224188699114372,
        "pitch": 0.14012148634152055,
        "fov": 1.37335227575057
      },
      "linkHotspots": [
        {
          "yaw": 1.5720249634164176,
          "pitch": 0.41343029345268256,
          "rotation": 0,
          "target": "1-b-1-stairs"
        },
        {
          "yaw": -1.6147532031324303,
          "pitch": 0.24845702681574267,
          "rotation": 0,
          "target": "5-b-119"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "5-b-119",
      "name": "B-119",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "yaw": -1.019438146559665,
        "pitch": 0.03762601592229231,
        "fov": 1.37335227575057
      },
      "linkHotspots": [
        {
          "yaw": 1.73599589694716,
          "pitch": 0.3784079684521995,
          "rotation": 0,
          "target": "4-b-120"
        },
        {
          "yaw": -1.524776165866701,
          "pitch": 0.3189052572553859,
          "rotation": 0,
          "target": "6-b-114"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "6-b-114",
      "name": "B-114",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "yaw": -1.658182641754479,
        "pitch": -0.014619685137081007,
        "fov": 1.37335227575057
      },
      "linkHotspots": [
        {
          "yaw": 1.3869289437527534,
          "pitch": 0.43761391483882406,
          "rotation": 0,
          "target": "5-b-119"
        },
        {
          "yaw": -1.522759394344666,
          "pitch": 0.317437626828049,
          "rotation": 0,
          "target": "7-b-118"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "7-b-118",
      "name": "B-118",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "yaw": 1.573733064390396,
        "pitch": 0.07632853255609717,
        "fov": 1.37335227575057
      },
      "linkHotspots": [
        {
          "yaw": -1.4000001449559445,
          "pitch": 0.30604780686740973,
          "rotation": 0,
          "target": "6-b-114"
        },
        {
          "yaw": 1.6025243206565687,
          "pitch": 0.34169696187358767,
          "rotation": 0,
          "target": "8-b-115"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "8-b-115",
      "name": "B-115",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "yaw": 1.0191204467487402,
        "pitch": 0.018594478536179793,
        "fov": 1.37335227575057
      },
      "linkHotspots": [
        {
          "yaw": -1.5240634267305708,
          "pitch": 0.2270917594353552,
          "rotation": 0,
          "target": "7-b-118"
        },
        {
          "yaw": 1.656106517730887,
          "pitch": 0.4019162927025022,
          "rotation": 0,
          "target": "9-b-116"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "9-b-116",
      "name": "B-116",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "yaw": -0.04347605845346436,
        "pitch": -0.005031624853039318,
        "fov": 1.37335227575057
      },
      "linkHotspots": [
        {
          "yaw": -1.3575381792346946,
          "pitch": 0.26887378689530905,
          "rotation": 0,
          "target": "8-b-115"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "10-b-212a",
      "name": "B-212A",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "yaw": 0.9955687136952776,
        "pitch": 0.08347152092858323,
        "fov": 1.37335227575057
      },
      "linkHotspots": [
        {
          "yaw": 1.5405030086533147,
          "pitch": 0.3329547616319335,
          "rotation": 0,
          "target": "11-b-208"
        },
        {
          "yaw": 0.04241754796615638,
          "pitch": 0.28871689515962196,
          "rotation": 0,
          "target": "3-b-2-stairs-"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "11-b-208",
      "name": "B-208",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "yaw": 1.6319146356461331,
        "pitch": 0.1218841350757014,
        "fov": 1.37335227575057
      },
      "linkHotspots": [
        {
          "yaw": 1.62614654697789,
          "pitch": 0.3649406935394417,
          "rotation": 0,
          "target": "12-b-210"
        },
        {
          "yaw": -1.5963596917692229,
          "pitch": 0.3586986494763309,
          "rotation": 0,
          "target": "10-b-212a"
        }
      ],
      "infoHotspots": []
    },
    {
      "id": "12-b-210",
      "name": "B-210",
      "levels": [
        {
          "tileSize": 256,
          "size": 256,
          "fallbackOnly": true
        },
        {
          "tileSize": 512,
          "size": 512
        },
        {
          "tileSize": 512,
          "size": 1024
        },
        {
          "tileSize": 512,
          "size": 2048
        }
      ],
      "faceSize": 1344,
      "initialViewParameters": {
        "yaw": -1.4808558772309794,
        "pitch": 0.18825110342326212,
        "fov": 1.37335227575057
      },
      "linkHotspots": [
        {
          "yaw": -1.5268119931349915,
          "pitch": 0.27656397014223444,
          "rotation": 0,
          "target": "11-b-208"
        }
      ],
      "infoHotspots": []
    }
  ],
  "name": "Building B",
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": false,
    "fullscreenButton": true,
    "viewControlButtons": true
  }
};
