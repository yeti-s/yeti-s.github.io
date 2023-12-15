"use strict";(self.webpackChunkyeti_docs=self.webpackChunkyeti_docs||[]).push([[762],{4786:function(e,n,t){var a=t(4316),l=(t(7294),t(917));const i=(0,a.Z)("div",{target:"e1fqcw1k0"})({name:"zov8s0",styles:"width:100%;display:flex;justify-content:center"});n.Z=e=>{let{src:n}=e;return(0,l.tZ)(i,null,(0,l.tZ)("img",{src:n,alt:"Otter dancing with a fish"}))}},407:function(e,n,t){t.r(n),t.d(n,{default:function(){return L}});var a=t(1151),l=t(7294),i=t(4786),r=t.p+"static/02-16c6d119ab927a78f3faf2f3e91bc72c.gif";function o(e){const n=Object.assign({h1:"h1",p:"p",a:"a",h2:"h2",span:"span",ul:"ul",li:"li",pre:"pre",code:"code",ol:"ol"},(0,a.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(i.Z,{src:r}),"\n",l.createElement(n.h1,{id:"introduction"},"Introduction"),"\n",l.createElement(n.p,null,"HD Map 제작을 위한 Point Cloud 측위 오차 보정 자동화"),"\n",l.createElement(n.p,null,"MMS(Mobile Mapping System) 장비를 이용하여 수집한 데이터를 센서 캘리브레이션을 통해 고정밀 도로 지도(HD Map)를 제작할 수 있다. 하지만 이 과정에서 동일한 공간을 촬영한 데이터에도 측위 오차가 발생하여 이를 보정해 줄 필요가 있다. HD Corr는 딥 러닝을 이용하여 Point Cloud의 측위 오차를 자동 보정하는 방법을 연구한다."),"\n",l.createElement(n.p,null,"2D 이미지 데이터에서 Change Detection이라는 Task와 이를 위한 많은 모델이 존재한다.  이를 변형하여 3D Point Cloud에서 Same Area Detection이라는 Task를 수행한다. 생각처럼 잘 되진 않겠지만 이를 통해 Computer Vision 분야의 경험치를 쌓을 수 있다고 예상한다."),"\n",l.createElement(n.p,null,l.createElement(n.a,{href:"https://github.com/yeti-s/PCAC"},"repository")),"\n",l.createElement(n.h2,{id:"기존-보정-방식"},"기존 보정 방식"),"\n",l.createElement(n.p,null,l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 704px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/0bd7f849064be23bff77ba9b3c9e1456/12470/01.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 24.43181818181818%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABVUlEQVR42kWOWUsCYRSGx8nGcZxv1NIWWq2IgsKILNNscsklcwHJuqtughYIIbMsKggqIuiiiO77oU9f3nTx8HLOgee8il24Z6V4yepmg2imgV28I1F/ZDq6g+bswmOa6LqOqqpomoZlWZhC4NLdcm+gG54Opq9PpkBZrN4QLl2RLDbJlduk8m3s2j2zq2Vc3U6Erwd/IIgQVkdueb24pUxRFByOf/7mDpH6K+ndO6qHTQr7LdL1Fpn6M3PLNdlCo29wiP7hUYL9A/h7A1IqCAxPMzETYWwkzHgoTCgUYWoqxuhkDCWevGA9e0081SBmn7OydoydajMf3sFlGrhNq4PuEegyVafKwvIBtb0fipUPtmvflKqflKtfMr9kw8QJkcQpS/EjoutnbGRuSeYemJ0vS4GJISWG+JMKPJYfl+GWt4p8ek02/0Q6/0i+8k6u9EZ264VfnCecaljgiVcAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="pcd pos error"\n        title="서로 다른 시간에 동일한 구간을 촬영한 Point Cloud"\n        src="/static/0bd7f849064be23bff77ba9b3c9e1456/5ebd7/01.png"\n        srcset="/static/0bd7f849064be23bff77ba9b3c9e1456/06437/01.png 176w,\n/static/0bd7f849064be23bff77ba9b3c9e1456/ba1c3/01.png 352w,\n/static/0bd7f849064be23bff77ba9b3c9e1456/5ebd7/01.png 704w,\n/static/0bd7f849064be23bff77ba9b3c9e1456/fd84e/01.png 1056w,\n/static/0bd7f849064be23bff77ba9b3c9e1456/12470/01.png 1311w"\n        sizes="(max-width: 704px) 100vw, 704px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}}),"\r\n동일한 공간을 서로 다른 시간에 촬영한 데이터를 보면 IMU 센서에 의한 오차로 인해 point들이 어느정도 차이가 나는 것을 볼 수 있다. 전체 HD Map을 제작하기 위해 이를 Translation과 Interpolation을 통해 데이터를 보정한다."),"\n",l.createElement(n.h2,{id:"데이터-선택"},"데이터 선택"),"\n",l.createElement(n.p,null,"도로 노면 정보를 이용하여 측위 오차 보정을 위해 높은 채널수의 라이다 센서를 필요로 한다. 또한 개인으로 진행하는 프로젝트이기 때문에 적당한 볼륨의 데이터를 선택해야 한다."),"\n",l.createElement(n.ul,null,"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,l.createElement(n.a,{href:"https://apolloscape.auto/index.html"},"Apolloscape")),"\n",l.createElement(n.p,null,"Apolloscape는 Lane Segmentation, Scene Parsing, Detection/Tracking 등 다양한 Task를 위한 데이터셋을 제공하고 있다. 특히 Lane Segmentation 데이터를 활용하여 카메라 이미지에서 Road Marking Segmentation 모델을 학습할 수 있고, 라이다 Projection을 통한 Point Cloud 샘플링을 진행할 수 있다고 예상하였다. 하지만 HD Map 제작을 위한 raw 데이터를 제공하지 않아 센서 캘리브레이션을 수행할 수 없었다."),"\n"),"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,l.createElement(n.a,{href:"https://www.nuscenes.org/nuscenes"},"Nuscene"),"\r\n기존 MMS 촬영 장비와 최대한 비슷한 환경을 가진 Nuscene 데이터를 채택했었다. 하지만 라이다의 채널과 카메라의 초당 프레임이 정밀한 지도를 만들기에 충분하지 않다고 판단하였다. 동일 사이트에 Nuplan 이라는 더 많은 센서를 이용해 촬영한 데이터가 존재하는데 개인 프로젝트로 진행하기에는 너무 큰 규모이기 때문에 고려하지 않았다."),"\n"),"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,l.createElement(n.a,{href:"https://www.argoverse.org/av2.html"},"Argoverse2"),"\r\n이미 데이터가 어느정도 정제되었지만 Rotation, Translation과 같은 캘리브레이션을 위한 정보도 함께 제공되어 적합하다고 판단하였다. 또한 더 많은 채널의 라이다와 더 높은 초당 카메라 이미지 수를 가지고 있어 Nuscene 보다 더 정밀한 지도를 만들 수 있다고 생각하여 위 데이터를 채택하였다."),"\n"),"\n"),"\n",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 704px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/927d438c9dc9a8a95407f55d7d6d1a1c/d7ab4/00.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 58.52272727272727%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAA7DAAAOwwHHb6hkAAACD0lEQVR42k2TW2/aUBCED2Dw7djmTgBBXhOkNlAuzRPwF0ICgla9Sf3/f2E6s7JRH1YY755vd2aPXZx6hFGM58UC+/0ex+MRT0/P6A0GSJhbr9e4/fwN5xza7Q4WrDscDtjtdnhZruC9R73RQERGluVwURwjihMWtzGZTPH4+IjhcIi86BCY4uvrK779+QtXqyPngbwoWDfB6OEB3W4XSZJwoAg+y6yhS9hBkfFFlufW0dv/HM1WiO12i9uPX3CNwPIxmxeEKgTvdDoGHo/H6FOVSwkSMGexplToueBvEEYm+Xy5UHLNmrZarbJhZuHLs1IlsJOHkq3uVTcVyYZaEODzconT6WQeaiqTGIYGDphXNJtNkx0z56qlCFKU06X0rsVDkvnphcC3N5oemSzLEVYBBdOzmqjGpT6zbcrUol16IyjfN5ohll/WuFCyJptOp5ZP+SyIYFXcgXmnizZDS/ClL5q0NxgiaEVYbTa4Xq92qN/vm8eyRg0avC7/A01yXnARLPA+u5stWRnfB9zyarOlh+/moXLyasBtSr7OaeJqMSl/XZYXUAioA7YUQRkNylqtN3j/+LgDJWs+n2M2mxlY9Zpa0yvPpbCovJwa2d+vg4CccL3F+fYdtZAfAK+RpOrwaDSyZzWI4/h+f51gujbyQKGvQ1BFnVs0yeeLfSkR85Ut3V6v9I/LoRKB5e0/FMMkL4Fyjl8AAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="nuscene argoverse"\n        title="각 데이터셋의 캘리브레이션 된 Potree"\n        src="/static/927d438c9dc9a8a95407f55d7d6d1a1c/5ebd7/00.png"\n        srcset="/static/927d438c9dc9a8a95407f55d7d6d1a1c/06437/00.png 176w,\n/static/927d438c9dc9a8a95407f55d7d6d1a1c/ba1c3/00.png 352w,\n/static/927d438c9dc9a8a95407f55d7d6d1a1c/5ebd7/00.png 704w,\n/static/927d438c9dc9a8a95407f55d7d6d1a1c/d7ab4/00.png 1014w"\n        sizes="(max-width: 704px) 100vw, 704px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}}),"\n",l.createElement(n.h2,{id:"지리-공간-표시"},"지리 공간 표시"),"\n",l.createElement(n.p,null,"IMU 정보를 가진 Ego Vehicle 데이터를 이용하여 GeoJSON 형식으로 촬영된 지리 공간을 웹에서 Openlayers API를 활용해 표시할 수 있도록 한다. Ego Vehicle의 Translation 값은 각 도시의 Original 좌표 기준 미터 단위의 Offset을 나타낸다."),"\n",l.createElement(n.h2,{id:"데이터-구조"},"데이터 구조"),"\n",l.createElement(n.p,null,"AV2 데이터셋은 아래 6개의 도시에서 수집되었다."),"\n",l.createElement(n.ul,null,"\n",l.createElement(n.li,null,"Austin, Texas: 31 logs."),"\n",l.createElement(n.li,null,"Detroit, Michigan: 117 logs."),"\n",l.createElement(n.li,null,"Miami, Florida: 354 logs."),"\n",l.createElement(n.li,null,"Pittsburgh, Pennsylvania: 350 logs."),"\n",l.createElement(n.li,null,"Palo Alto, California: 22 logs."),"\n",l.createElement(n.li,null,"Washington, D.C.: 126 logs."),"\n"),"\n",l.createElement(n.p,null,"AV2의 Sensor 데이터는 아래와 같은 폴더 구조를 가진다"),"\n",l.createElement(n.pre,null,l.createElement(n.code,null,"|-- Root Directory\r\n    |\r\n    |-- [data id]\r\n    |   |-- annotations.feather\r\n    |   |-- city_SE3_egovehicle.feather\r\n    |   |-- calibration\r\n    |       |-- egovehicle_SE3_sensor.feather\r\n    |       |-- intrinsics.feather\r\n    |   |-- map\r\n    |       |-- [data id]___img_Sim2_city.json\r\n    |       |-- [data id]_ground_height_surface____[city name].npy\r\n    |       |-- log_map_archive_[data id]____[city name]_city_[city id].json\r\n    |   |-- sensors\r\n    |       |-- cameras\r\n    |           |-- ring_front_center\r\n    |               |-- [time_stamp].jpg\r\n    |               |-- ...\r\n    |           |-- ...\r\n    |       |-- lidar\r\n    |           |-- [time_stamp].feather\r\n    |           |-- ...\r\n    |   |-- potree (캘리브레이션을 통해 생성할 데이터)\r\n    |       |-- [data id].las\r\n    |       |-- hierarchy.bin\r\n    |       |-- log.txt\r\n    |       |-- metadata.json\r\n    |       |-- octree.bin\r\n    |-- ...\n")),"\n",l.createElement(n.p,null,"캘리브레이션 하여 생성한 Point Cloud 데이터를 .las 형식의 파일로 저장하고 ",l.createElement(n.a,{href:"https://github.com/potree/potree"},"Potree"),"를 이용하여 이를 시각화 할 것이다."),"\n",l.createElement(n.h2,{id:"센서-캘리브레이션"},"센서 캘리브레이션"),"\n",l.createElement(n.ul,null,"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"라이다 캘리브레이션"),"\n",l.createElement(n.p,null,"AV2 데이터셋은 두 개의 32 Channel Lidar를 이용하여 하나의 64 Channel Lidar처럼 사용하였다. Up Lidar와 Down Lidar에 대한 Sensor Calibration을 제공하지만 Point Cloud는 이미 두 Lidar를 융합하여 Ego Vehicle의 좌표계로 변환해 둔 데이터를 제공하기에 쓸 일이 없다."),"\n"),"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"카메라 캘리브레이션"),"\n"),"\n"),"\n",l.createElement(n.h2,{id:"개발-파이프라인"},"개발 파이프라인"),"\n",l.createElement(n.ul,null,"\n",l.createElement(n.li,null,"BEV Feature Detection and Matching","\n",l.createElement(n.ol,null,"\n",l.createElement(n.li,null,"Point Cloud의 Bird's Eye View"),"\n",l.createElement(n.li,null,"Feature Detecting"),"\n",l.createElement(n.li,null,"Feature Matching"),"\n",l.createElement(n.li,null,"Metric Learning"),"\n"),"\n"),"\n",l.createElement(n.li,null,"Point Cloud Sampling","\n",l.createElement(n.ol,null,"\n",l.createElement(n.li,null,"Lane Segmentation (on camera)"),"\n",l.createElement(n.li,null,"Lane Point Sampling (by camera projection)"),"\n",l.createElement(n.li,null,"Feature Matching"),"\n",l.createElement(n.li,null,"Metric Learning"),"\n"),"\n"),"\n",l.createElement(n.li,null,"Camera Featrue Matching and Projection","\n",l.createElement(n.ol,null,"\n",l.createElement(n.li,null,"Cam to Cam Projection"),"\n",l.createElement(n.li,null,"Lane Segmentation"),"\n",l.createElement(n.li,null,"Feature Matching"),"\n",l.createElement(n.li,null,"Metric Learning"),"\n",l.createElement(n.li,null,"Projection to Point Cloud"),"\n"),"\n"),"\n"),"\n",l.createElement(n.h1,{id:"citation"},"Citation"),"\n",l.createElement(n.pre,null,l.createElement(n.code,null," @INPROCEEDINGS { Argoverse2,\r\n  author = {Benjamin Wilson and William Qi and Tanmay Agarwal and John Lambert and Jagjeet Singh and Siddhesh Khandelwal and Bowen Pan and Ratnesh Kumar and Andrew Hartnett and Jhony Kaesemodel Pontes and Deva Ramanan and Peter Carr and James Hays},\r\n  title = {Argoverse 2: Next Generation Datasets for Self-driving Perception and Forecasting},\r\n  booktitle = {Proceedings of the Neural Information Processing Systems Track on Datasets and Benchmarks (NeurIPS Datasets and Benchmarks 2021)},\r\n  year = {2021}\r\n}\r\n@INPROCEEDINGS { TrustButVerify,\r\n  author = {John Lambert and James Hays},\r\n  title = {Trust, but Verify: Cross-Modality Fusion for HD Map Change Detection},\r\n  booktitle = {Proceedings of the Neural Information Processing Systems Track on Datasets and Benchmarks (NeurIPS Datasets and Benchmarks 2021)},\r\n  year = {2021}\r\n}\n")))}var s=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?l.createElement(n,e,l.createElement(o,e)):o(e)},c=t(4316),d=t(1840),m=t(7821),g=t(2654),p=t(4111),u=t(2726),h=t(4480),b=t(2818),f=t(9213),E=t(7213),y=t(9265),A=t(9601),w=t(3071),v=t(6097),Z=t(6782),C=t(4891),k=t(3387),P=t(917);const S=e=>{let{data:{mdx:n,file:t},children:i}=e;const r=(0,h.sJ)((0,b.cp)(b.eE,!1)),o=(0,h.sJ)((0,b.cp)(b.rf,!1)),s=(0,h.Zl)((0,b.cp)(b.Cy,n.tableOfContents.items));return(0,l.useEffect)((()=>{s(n.tableOfContents.items)}),[n]),(0,P.tZ)(d.Z,null,(0,P.tZ)(x,null,(0,P.tZ)(p.Z,null)),(0,P.tZ)(D,null,(0,P.tZ)(I,{className:"navigation",isNavOpened:o},(0,P.tZ)(j,{className:"hide_scroll"},(0,P.tZ)(m.Z,null))),(0,P.tZ)(O,{isNavOpened:o},(0,P.tZ)(M,{isWide:r},(0,P.tZ)(u.Z,{title:n.frontmatter.title,modifiedTime:t.modifiedTime}),(0,P.tZ)(a.Zo,{components:{p:E.Z,h1:y.H1,h2:y.H2,h3:y.H3,h4:y.H4,h5:y.H5,h6:y.H6,hr:A.Z,blockquote:w.Z,ul:Z.Z,ol:v.Z,pre:C.Z,code:k.Z}},i))),(0,P.tZ)(N,null,(0,P.tZ)(_,null,(0,P.tZ)(g.Z,null)))))},x=(0,c.Z)("div",{target:"e1ojob7j7"})({name:"11t2x7x",styles:"display:flex;height:var(--header-height);z-index:5;padding:0.6rem 2rem 0.6rem 0.6rem;position:fixed;width:100%;background:var(--background-color);border-bottom:1px solid var(--border-color)"}),D=(0,c.Z)("div",{target:"e1ojob7j6"})({name:"majwgz",styles:"position:relative;display:flex;min-height:calc(100vh - var(--header-height));overflow-x:hidden"}),I=(0,c.Z)("aside",{target:"e1ojob7j5"})("margin-left:",(e=>e.isNavOpened?"0":"calc(-1 * var(--sidebar-width))"),";flex:0 0 var(--sidebar-width);font-size:0.875rem;overflow-x:hidden;overflow-y:auto;transition:margin 0.25s var(--ease-in-out-quad);@media (min-width: ",f.Z.IPAD_PRO,"px){margin-left:0;}"),j=(0,c.Z)("nav",{target:"e1ojob7j4"})({name:"l4vzaw",styles:"overflow-y:auto;height:100%;padding:var(--body-padding-top) 0 3rem 0;position:fixed;width:var(--sidebar-width);&:-webkit-scrollbar{display:none;}"}),M=(0,c.Z)("main",{target:"e1ojob7j3"})("padding:1rem;width:100%;@media (min-width: ",f.Z.IPAD_AIR,"px){width:",(e=>e.isWide?"90%":"65%"),";}"),O=(0,c.Z)("main",{target:"e1ojob7j2"})("width:calc(100% - 2 * var(--sidebar-width));padding-top:var(--body-padding-top);flex-grow:1;min-width:20rem;display:flex;justify-content:center;opacity:",(e=>e.isNavOpened?.3:1),";@media (min-width: ",f.Z.IPAD_PRO,"px){opacity:1;}"),N=(0,c.Z)("aside",{target:"e1ojob7j1"})("font-size:0.75rem;font-weight:bold;overflow-x:hidden;overflow-y:auto;padding-top:var(--body-padding-top);width:0;transition:width 0.25s var(--ease-in-out-quad);@media (min-width: ",f.Z.HD,"px){width:var(--sidebar-width);}"),_=(0,c.Z)(j,{target:"e1ojob7j0"})({name:"b40oxt",styles:"padding:0 1rem 0 1rem"});function L(e){return l.createElement(S,e,l.createElement(s,e))}}}]);
//# sourceMappingURL=component---src-components-templates-main-template-tsx-content-file-path-contents-pcac-index-mdx-2b5185b5185210aa691d.js.map