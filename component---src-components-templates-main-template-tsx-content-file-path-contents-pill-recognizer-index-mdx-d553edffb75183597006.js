"use strict";(self.webpackChunkyeti_docs=self.webpackChunkyeti_docs||[]).push([[955],{3524:function(e,n,t){t.r(n),t.d(n,{default:function(){return q}});var a=t(1151),l=t(7294);function r(e){const n=Object.assign({p:"p",h1:"h1",h2:"h2",a:"a",ul:"ul",li:"li",br:"br",span:"span"},(0,a.ah)(),e.components);return l.createElement(l.Fragment,null,l.createElement(n.p,null,"사진을 통해 알약 정보를 제공하는 프로젝트를 진행하기 앞서 알약 종류를 인식하는 모델을 개발합니다."),"\n",l.createElement(n.h1,{id:"기획"},"기획"),"\n",l.createElement(n.h2,{id:"데이터"},"데이터"),"\n",l.createElement(n.p,null,l.createElement(n.a,{href:"https://nedrug.mfds.go.kr/pbp/CCBGA01/getItem?totalPages=4&limit=10&page=2&&openDataInfoSeq=11"},"의약품 안전 나라 공공 데이터")),"\n",l.createElement(n.p,null,"위 데이터를 보면 우리가 사용할만한 데이터는 각 알약의 종류마다 앞, 뒤가 찍혀있는 한장의 이미지와 색, 재형, 텍스트 등의 정보가 있네요.\r\n이를 활용하여 알약의 종류를 판별하는 모델을 구현해보죠."),"\n",l.createElement(n.h2,{id:"모델-구조"},"모델 구조"),"\n",l.createElement(n.p,null,"초반에는 하나의 모델로 알약의 종류를 식별하는 방법을 생각했어요.\r\n하지만 이 방법은 몇 가지 문제가 있더라구요."),"\n",l.createElement(n.ul,null,"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"먼저 구별해야하는 종류가 너무 많다는 것이에요.",l.createElement(n.br),"\n","우리는 약 25,000개의 종류를 구별해야 하는데, 각 알약마다 사진은 한장밖에 제공이 되지 않아요.\r\n즉 augmentation을 통해 학습 데이터를 늘린다고 하더라도 쉽지 않을 것 같더라구요."),"\n"),"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"또 확장성의 문제가 있어요.",l.createElement(n.br),"\n","하나의 모델로 이루어진 모듈은 새로운 알약이 등장할 때 마다 학습을 시켜야 한다는 문제가 발생합니다.\r\n앞으로 셀 수 없을 정도로 신약이 꾸준히 등장할텐데 이 방법은 지속적인 서비스를 불가능하게 만들 거에요."),"\n"),"\n"),"\n",l.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 638px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/d1d5e44296da40fcf49ddf1e9246a1c4/41be6/00.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 89.77272727272728%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAACXBIWXMAABJ0AAASdAHeZh94AAADQ0lEQVR42o2U208bRxTG/ef2oWqlSjRqX6u+Vk0oYG4BSszVJKSq8G29GMzu+krDtRAMNrZ314ZgEuxNws2/nl0DIkgtHenbmT2X75yZOXN8PDIuLy8plUo0Gg3+z/C5n3bbRdtzvrq64vr6mraL9rVn1Gq1PPl/DZfDI2zfrJyPnyjs72PZNWq1OpZlUyweeLrm2ZkEEcJ2J8i1uNzHLdldhm8th/j6MfGN+zhh4a8Gsc0mr9M2kfX3RDeaKBvvWdw6+QLq5jv+rrY8Yt/R2TnTusWMYTN7gxmjxnzqED2fw1jNoyYTaLkMqdUMscwWU0ZdbDo+t5jUTKzGZ3zFo49MaRZBEbqYS9niIFFzbzhNP+GD8T1HK12c6E9wjG8pr40waZyKnfikanc+Eysme7aDrySEgaRE02ymBVMrVQLLFq+0t+T0l2S1INpigPTKLHltioSxJPaSUbLqwU1mRrd5sXRD6GY4viRKrc7viSpD0QIjyj7PY0X8MZO+8CG9oUP6IxX8URt/+IDnygEjsX2GIgVG40Um9WPGxNe9C1+x7jCk1lAy6+zoo+wYY0RTm7zWC+ymx9le7kPPGswmS+xkp1lTe8lnFyU7i+3MHGuJft7kYwyrFrtmC99BvUWfUkfPLHGqdVFPfMdyWuNPfYuG8SO1+NesZecJalLc2Z8ohb5iLzMiZ2ZRT/9MffEbKrl+BhSLHZdwv+YwIFt7kSjxKpEjGE8zqhS8LQfVHDOxFMPRPX4LlZmKrzEX15mIbzEYKzOt5Hmppggmd/FHql7p+ApC6I9WZNsWfsWmRxz7wkXvrJ6FKozGdoiqIaLKH4wrWzxdqNAbLnn6Hjnb3ojJoGrLXGbbJdyVg+wVwsF4VSCz6s4mQ/LfoxyRyCzjrP6Ak+tCy8ZFVpfgFc+mY+smU6U7XGaj3MRnSjE+DVd4JuiWm+wO36LMryGTMckqps6jqHOS4YYnc3V3dpEOflkoUzz61Hl6uYMzAlI2E/pD1Ajo7xheOmZAKiEgBe/KHtoFtBqpwgfaXnO41y0ePvqrTrPh/PwzjtPy1leieLQ5uEb3hQ+H4zg0m81/b103HO7C91jDvLi4wDRND26/fKzB/gP8rvei+IyN4wAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="pill recognizer modeul prototype"\n        title=""\n        src="/static/d1d5e44296da40fcf49ddf1e9246a1c4/41be6/00.png"\n        srcset="/static/d1d5e44296da40fcf49ddf1e9246a1c4/06437/00.png 176w,\n/static/d1d5e44296da40fcf49ddf1e9246a1c4/ba1c3/00.png 352w,\n/static/d1d5e44296da40fcf49ddf1e9246a1c4/41be6/00.png 638w"\n        sizes="(max-width: 638px) 100vw, 638px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}}),"\n",l.createElement(n.p,null,"그래서 두 문제를 해결할 수 있는 방식을 선택할거에요.\r\n바로 한번에 알약을 구별하는 것이 아닌, 알약의 특징등을 구별하고 이를 활용하여 최종적인 추론을 진행할거에요.\r\n즉 여러개의 서브 모듈로 하나의 큰 알약 식별 모델을 구현하는 방식이죠.\r\n필요한 서브모듈은 아래와 같습니다."),"\n",l.createElement(n.ul,null,"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"Bounding Box",l.createElement(n.br),"\n","먼저 우리는 입력으로 받은 사진에 대해 어디에 알약이 존재하는지 Box의 형태로 위치를 파악하는 모듈을 만들 거에요.\r\n이를 활용해서 이미지를 crop하고 다음 모듈들에 입력으로 전달해 줄 것입니다."),"\n"),"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"Color Classifier",l.createElement(n.br),"\n","앞서 crop된 이미지를 통해 우리는 알약의 색을 구별할거에요.\r\n(빨간색, 파란색, 노란색, ... 등)\r\n이는 어려운 작업이 아니기 때문에 간단한 CNN 모델로 구현이 될 것 같습니다."),"\n"),"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"Shape Classifier",l.createElement(n.br),"\n","똑같이 crop된 이미지를 통해 알약의 모양을 구별할거에요.\r\n(원형, 타원형, 오각형, ... 등)\r\n이 작업은 사실 Bounding Box 파악하는 모델로 한꺼번에 진행할 수 있을 것 같아요.\r\nYOLO 모델을 활용하여 Class를 알약의 모양으로 두고 detection하는 방식으로 통합할 수 있겠네요."),"\n"),"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"Fomulation Classifier",l.createElement(n.br),"\n","알약의 재형이라는 특징도 구별해 볼거에요.\r\n재형이라 함은 알약이 캡슐로 이루어 졌는지, 코팅이 되어있는지 등과 같은 알약의 질감과 같은 복합적인 특징이네요."),"\n"),"\n",l.createElement(n.li,null,"\n",l.createElement(n.p,null,"Text Recognition",l.createElement(n.br),"\n","솔직히 가장 걱정되는 모듈입니다.\r\n알약 위에 글자가 프린팅 되어있는 형태도 있고, 알약 안쪽으로 파고 들어 음영으로 글자가 쓰여져 있는 형태도 있어요.\r\n그리고 데이터가 25,000개 라고 하지만 모든 알약에 글씨가 있는 것도 아니고 글자도 다 다르거든요.\r\n그래서 우리는 위에서 구한 색, 모양, 제형으로 추정되는 알약의 후보군을 생성하고,\r\n후보군의 텍스트와 인식한 텍스트의 유사성을 판단하는 방식으로 최종 결정을 내리려고 합니다."),"\n"),"\n"),"\n",l.createElement(n.p,null,"사실 위 방식은 어느 하나의 특징이라도 잘못 인식하면 아예 다른 종류의 알약으로 결정을 내릴 수 있다는 문제가 있어요.\r\n이를 해결하기 위한 솔루션은 일단 초기 프로토타입을 구현하고 난 후에 생각해 봅시다."))}var i=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?l.createElement(n,e,l.createElement(r,e)):r(e)},o=t(4316),d=t(1840),s=t(7821),m=t(2654),c=t(4111),p=t(2726),g=t(4480),u=t(2818),f=t(9213),h=t(7213),b=t(9265),E=t(9601),w=t(3071),Z=t(6097),y=t(6782),v=t(4891),x=t(3387),A=t(917);const j=e=>{let{data:{mdx:n,file:t},children:r}=e;const i=(0,g.sJ)((0,u.cp)(u.eE,!1)),o=(0,g.sJ)((0,u.cp)(u.rf,!1)),f=(0,g.Zl)((0,u.cp)(u.Cy,n.tableOfContents.items));return(0,l.useEffect)((()=>{f(n.tableOfContents.items)}),[n]),(0,A.tZ)(d.Z,null,(0,A.tZ)(z,null,(0,A.tZ)(c.Z,null)),(0,A.tZ)(k,null,(0,A.tZ)(P,{className:"navigation",isNavOpened:o},(0,A.tZ)(G,{className:"hide_scroll"},(0,A.tZ)(s.Z,null))),(0,A.tZ)(H,{isNavOpened:o},(0,A.tZ)(C,{isWide:i},(0,A.tZ)(p.Z,{title:n.frontmatter.title,modifiedTime:t.modifiedTime}),(0,A.tZ)(a.Zo,{components:{p:h.Z,h1:b.H1,h2:b.H2,h3:b.H3,h4:b.H4,h5:b.H5,h6:b.H6,hr:E.Z,blockquote:w.Z,ul:y.Z,ol:Z.Z,pre:v.Z,code:x.Z}},r))),(0,A.tZ)(N,null,(0,A.tZ)(R,null,(0,A.tZ)(m.Z,null)))))},z=(0,o.Z)("div",{target:"e1ojob7j7"})({name:"11t2x7x",styles:"display:flex;height:var(--header-height);z-index:5;padding:0.6rem 2rem 0.6rem 0.6rem;position:fixed;width:100%;background:var(--background-color);border-bottom:1px solid var(--border-color)"}),k=(0,o.Z)("div",{target:"e1ojob7j6"})({name:"majwgz",styles:"position:relative;display:flex;min-height:calc(100vh - var(--header-height));overflow-x:hidden"}),P=(0,o.Z)("aside",{target:"e1ojob7j5"})("margin-left:",(e=>e.isNavOpened?"0":"calc(-1 * var(--sidebar-width))"),";flex:0 0 var(--sidebar-width);font-size:0.875rem;overflow-x:hidden;overflow-y:auto;transition:margin 0.25s var(--ease-in-out-quad);@media (min-width: ",f.Z.IPAD_PRO,"px){margin-left:0;}"),G=(0,o.Z)("nav",{target:"e1ojob7j4"})({name:"l4vzaw",styles:"overflow-y:auto;height:100%;padding:var(--body-padding-top) 0 3rem 0;position:fixed;width:var(--sidebar-width);&:-webkit-scrollbar{display:none;}"}),C=(0,o.Z)("main",{target:"e1ojob7j3"})("padding:1rem;width:100%;@media (min-width: ",f.Z.IPAD_AIR,"px){width:",(e=>e.isWide?"90%":"65%"),";}"),H=(0,o.Z)("main",{target:"e1ojob7j2"})("width:calc(100% - 2 * var(--sidebar-width));padding-top:var(--body-padding-top);flex-grow:1;min-width:20rem;display:flex;justify-content:center;opacity:",(e=>e.isNavOpened?.3:1),";@media (min-width: ",f.Z.IPAD_PRO,"px){opacity:1;}"),N=(0,o.Z)("aside",{target:"e1ojob7j1"})("font-size:0.75rem;font-weight:bold;overflow-x:hidden;overflow-y:auto;padding-top:var(--body-padding-top);width:0;transition:width 0.25s var(--ease-in-out-quad);@media (min-width: ",f.Z.HD,"px){width:var(--sidebar-width);}"),R=(0,o.Z)(G,{target:"e1ojob7j0"})({name:"b40oxt",styles:"padding:0 1rem 0 1rem"});function q(e){return l.createElement(j,e,l.createElement(i,e))}}}]);
//# sourceMappingURL=component---src-components-templates-main-template-tsx-content-file-path-contents-pill-recognizer-index-mdx-d553edffb75183597006.js.map