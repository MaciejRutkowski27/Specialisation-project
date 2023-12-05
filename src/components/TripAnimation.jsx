import { useState, useEffect } from "react";
export default function TripSimple() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Trigger animation after the component mounts
    setAnimate(true);
  }, []);

  return (
    <div className={`section ${animate ? "animate" : ""}`}>
      <svg
        version="1.0"
        xmlns="http://www.w3.org/2000/svg"
        width="650.000000pt"
        height="408.000000pt"
        viewBox="0 0 611.000000 408.000000"
        preserveAspectRatio="xMidYMid meet"
        id="svglogo"
      >
        <defs>
          <linearGradient id="left-to-right">
            <stop offset="0" stopColor="#F5BA41">
              <animate
                dur="2s"
                attributeName="offset"
                fill="freeze"
                from="0"
                to="1"
                begin="1s"
              />
            </stop>
            <stop offset="0" stopColor="#0C1D36">
              <animate
                dur="3s"
                attributeName="offset"
                fill="freeze"
                from="0"
                to="1"
                begin="2.5s"
              />
            </stop>
          </linearGradient>
        </defs>
        <g
          transform="translate(0.000000,408.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          <path
            className="logoanimation"
            d="M2580 3780 c-243 -31 -477 -201 -585 -423 -32 -68 -71 -194 -63 -203
3 -2 31 16 64 40 40 29 66 56 78 85 19 40 20 41 71 41 39 0 65 8 106 30 l54
30 -88 0 c-87 0 -88 0 -76 21 20 39 92 110 157 156 62 45 199 109 209 99 3 -3
-8 -17 -26 -31 -17 -15 -40 -39 -50 -54 l-20 -28 44 7 c28 4 56 18 80 38 36
32 104 66 113 57 3 -2 4 -41 3 -86 -2 -72 0 -84 20 -105 12 -13 26 -21 30 -18
5 3 9 50 9 104 0 54 4 101 10 105 16 10 95 -34 135 -75 l38 -39 39 20 c25 13
36 24 31 32 -30 50 -127 183 -137 189 -22 12 -176 17 -246 8z"
          />
          <path
            className="logoanimation2"
            fill="url(#left-to-right)"
            d="M2375 3312 c-16 -10 -84 -49 -150 -87 -174 -99 -304 -196 -408 -305
-121 -126 -169 -213 -175 -320 -5 -97 9 -147 58 -202 72 -82 183 -111 346 -88
98 14 142 29 84 30 -91 1 -244 56 -292 105 -80 81 17 237 222 359 97 57 260
132 386 176 l92 32 -6 86 -5 86 -56 73 c-31 40 -58 72 -61 72 -3 1 -18 -7 -35
-17z 
M2760 4054 c0 -3 75 -116 166 -251 92 -135 167 -251 168 -258 0 -7
-91 -59 -204 -117 l-206 -104 -89 68 c-85 64 -134 84 -149 60 -3 -5 35 -59 85
-120 l90 -112 6 -145 c6 -152 11 -162 49 -127 13 13 25 50 38 118 11 54 24
104 30 111 6 7 56 23 111 36 55 14 153 39 218 57 65 18 119 31 121 29 3 -4 42
-301 68 -516 7 -53 16 -93 22 -93 6 1 32 20 58 43 l46 42 16 240 c26 387 22
364 65 382 128 56 284 137 334 174 55 41 122 123 112 139 -8 13 -91 30 -144
30 -85 0 -283 -47 -394 -94 l-38 -16 -222 215 -221 215 -68 0 c-37 0 -68 -3
-68 -6z"
          />
          <path
            className="logoanimation"
            d="M3060 3170 c-24 -6 -25 -9 -22 -63 l4 -56 -119 -3 -118 -3 -3 -27 -3
-28 122 0 122 0 -7 -72 c-4 -40 -11 -89 -15 -108 -5 -19 -12 -47 -15 -62 l-6
-28 -145 0 -145 0 0 65 c0 36 -2 65 -5 65 -3 0 -17 -7 -30 -16 -21 -14 -25
-24 -25 -65 l0 -49 -139 0 -139 0 -11 31 c-6 18 -11 42 -11 54 0 30 -8 35 -36
23 -26 -12 -29 -26 -15 -76 l10 -32 -105 0 c-94 0 -108 -3 -143 -25 -52 -32
-55 -39 -34 -72 106 -170 268 -292 463 -349 99 -29 300 -27 400 5 169 52 323
158 411 283 l22 30 -29 -6 c-18 -4 -40 0 -57 9 -27 14 -29 13 -64 -26 -66 -73
-200 -157 -293 -184 -22 -7 -19 -1 21 41 45 49 103 140 128 202 13 32 14 32
85 32 l73 0 -5 30 c-4 30 -5 30 -64 30 -53 0 -59 2 -53 18 4 9 14 70 23 134
14 99 20 118 35 118 25 0 23 50 -3 57 -15 4 -20 14 -21 42 -1 20 -4 48 -8 62
-5 21 -10 24 -31 19z m-696 -592 c24 -48 61 -104 95 -141 65 -70 57 -70 -75
-7 -85 41 -203 140 -237 199 l-18 31 98 0 98 -1 39 -81z m287 -52 c0 -70 -2
-130 -5 -133 -11 -11 -95 38 -138 82 -43 44 -108 148 -108 174 0 8 37 11 126
9 l125 -3 0 -129z m319 122 c0 -27 -73 -138 -120 -182 -51 -48 -113 -81 -130
-71 -11 7 -14 248 -3 258 12 13 253 8 253 -5z"
          />
          <path
            className="logoanimation1"
            d="M4468 2105 c-67 -37 -105 -204 -87 -390 15 -161 63 -365 105 -447 13
-25 12 -32 -10 -75 -13 -27 -33 -56 -44 -66 -20 -19 -82 -40 -82 -29 0 4 5 34
10 67 7 41 6 79 -1 120 -21 116 -75 175 -162 175 -53 0 -96 -30 -126 -89 l-19
-36 -15 38 c-20 47 -53 49 -99 8 l-32 -29 37 -120 c20 -66 37 -127 37 -134 0
-23 -70 -118 -95 -130 -19 -8 -28 -8 -40 2 -12 10 -15 41 -15 174 0 181 -7
206 -60 206 -44 0 -74 -15 -115 -57 -43 -45 -60 -75 -91 -163 l-23 -65 0 100
c-1 147 -32 176 -126 121 -53 -31 -91 -89 -127 -191 l-28 -80 2 125 3 125 -31
3 c-22 2 -40 -4 -60 -21 -23 -20 -29 -35 -36 -93 -4 -38 -5 -103 -2 -144 l6
-75 -42 -47 c-45 -52 -82 -62 -100 -29 -14 28 -12 107 6 238 20 135 15 148
-50 140 -22 -3 -46 -13 -52 -22 -21 -29 -39 -155 -39 -275 0 -103 3 -119 24
-156 13 -23 34 -47 48 -53 57 -26 136 -6 188 49 16 17 32 30 37 30 4 0 14 -13
23 -30 13 -25 21 -30 54 -30 21 0 43 6 49 13 6 7 18 62 27 122 24 160 66 268
94 240 6 -6 13 -63 17 -128 9 -152 29 -200 86 -205 47 -4 63 20 73 103 14 132
67 275 101 275 11 0 14 -21 14 -108 0 -172 25 -222 111 -222 27 0 64 8 84 17
19 9 36 15 39 12 2 -2 -1 -38 -6 -79 -22 -186 26 -386 100 -419 95 -44 171 35
180 189 4 64 -16 251 -34 327 -5 17 1 25 28 38 18 10 45 28 59 42 23 21 30 23
49 13 54 -29 161 22 211 102 18 29 34 54 35 56 1 1 24 -11 52 -29 45 -27 58
-31 101 -27 64 6 123 45 161 105 16 25 31 50 32 55 2 5 21 1 43 -8 53 -22 131
-13 202 22 130 66 223 242 165 314 -18 22 -52 20 -52 -4 0 -7 -14 -40 -30 -73
-55 -111 -163 -183 -225 -151 l-25 14 56 54 c71 69 88 102 88 170 0 125 -92
191 -202 145 -118 -50 -165 -198 -110 -352 l21 -62 -27 -41 c-29 -44 -84 -75
-116 -65 -11 3 -28 18 -39 33 -18 27 -18 28 5 122 33 135 47 276 42 415 -12
256 -109 395 -230 330z m90 -147 c28 -56 51 -178 51 -268 1 -69 -23 -267 -32
-276 -18 -19 -84 295 -93 446 -10 151 25 197 74 98z m444 -345 c36 -32 18
-101 -40 -157 l-30 -28 -13 23 c-7 13 -13 47 -13 76 0 41 5 57 24 78 27 29 46
31 72 8z m-812 -273 c48 -26 59 -174 19 -254 -24 -48 -52 -76 -64 -64 -3 3
-19 52 -35 108 -28 96 -29 103 -14 138 16 38 51 82 66 82 5 0 18 -4 28 -10z
m-126 -550 c30 -136 46 -257 39 -294 -4 -21 -11 -26 -26 -24 -32 5 -58 85 -64
199 -6 106 4 256 17 243 5 -5 20 -61 34 -124z"
          />
          <path
            className="logoanimation1"
            d="M355 2067 c-55 -22 -84 -48 -110 -100 -47 -95 -28 -187 40 -187 46 0
63 21 63 74 0 90 57 127 165 107 101 -19 159 -41 153 -57 -3 -8 -23 -40 -44
-72 -75 -112 -285 -467 -323 -544 -30 -62 -20 -96 34 -117 60 -23 74 -10 160
149 79 144 276 470 312 516 l20 25 156 -71 c86 -38 163 -70 171 -70 41 0 63
73 32 104 -59 60 -427 210 -592 242 -87 17 -195 17 -237 1z"
          />
          <path
            className="logoanimation1"
            d="M2393 1655 c-150 -42 -226 -128 -227 -255 -1 -110 47 -172 192 -245
38 -19 82 -39 98 -45 53 -20 125 -72 139 -101 47 -90 -37 -177 -172 -178 -76
-1 -149 17 -184 46 -29 25 -30 29 -27 94 3 75 -6 93 -53 104 -42 10 -81 -30
-88 -90 -5 -40 -12 -53 -44 -79 -28 -22 -49 -31 -77 -31 -21 0 -42 3 -45 7 -4
4 7 27 24 52 82 118 87 262 12 330 -44 40 -151 30 -190 -18 -21 -26 -30 -19
-33 27 -3 42 -3 42 -45 45 -65 5 -77 -14 -92 -144 -7 -60 -17 -120 -22 -134
-12 -31 -98 -90 -132 -90 -35 0 -50 23 -42 62 4 18 32 92 61 165 30 72 54 137
54 143 0 6 -16 18 -35 25 -58 25 -80 9 -128 -94 -43 -92 -62 -110 -99 -90 -24
13 -23 23 12 97 36 77 38 115 8 136 -60 43 -175 1 -275 -99 -36 -36 -67 -65
-70 -65 -2 0 22 50 54 111 56 107 57 111 39 125 -27 19 -80 18 -104 -3 -58
-49 -152 -289 -152 -388 0 -61 16 -85 59 -85 32 0 47 16 114 116 56 84 137
164 167 164 24 0 24 -5 5 -60 -21 -59 -19 -84 10 -118 24 -29 102 -57 136 -50
11 2 13 -7 11 -41 -5 -60 22 -127 58 -146 16 -8 48 -15 70 -15 23 0 40 -3 38
-7 -107 -208 -147 -344 -128 -428 14 -60 44 -85 106 -85 83 0 124 43 183 192
17 42 38 105 47 140 37 149 32 138 67 138 18 0 49 5 71 11 34 9 41 8 63 -13
21 -19 35 -23 92 -23 59 0 74 4 121 33 l53 33 26 -25 c69 -66 230 -102 376
-84 76 10 177 59 211 103 52 69 67 170 35 240 -27 60 -83 102 -226 171 -157
75 -200 113 -200 177 0 88 67 136 189 137 125 0 184 -47 170 -136 -9 -61 1
-90 33 -101 62 -22 99 16 110 109 12 98 -52 187 -160 222 -74 24 -200 30 -264
11z m-543 -484 c25 -48 -1 -145 -57 -211 -35 -40 -98 -78 -111 -66 -9 10 25
226 40 243 20 25 71 53 95 53 12 0 27 -9 33 -19z m-329 -417 c-39 -203 -71
-305 -105 -333 -12 -10 -17 -9 -25 8 -15 27 -14 56 4 125 23 89 129 316 141
303 2 -2 -5 -48 -15 -103z"
          />
          <path
            className="logoanimation1"
            d="M1449 1571 c-45 -35 -44 -107 2 -131 11 -7 42 -12 67 -13 37 0 49 5
69 27 28 32 30 75 5 106 -27 33 -108 39 -143 11z"
          />
          <path
            className="logoanimation1"
            d="M2932 1477 c-38 -21 -55 -54 -48 -92 13 -67 97 -88 155 -40 86 73 -7
187 -107 132z"
          />
        </g>
      </svg>
    </div>
  );
}
