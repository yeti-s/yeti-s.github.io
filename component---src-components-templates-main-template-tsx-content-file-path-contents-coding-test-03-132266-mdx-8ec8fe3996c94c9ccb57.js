"use strict";(self.webpackChunkyeti_docs=self.webpackChunkyeti_docs||[]).push([[3542],{2788:function(e,n,r){r.d(n,{Z:function(){return s}});r(7294);var t=r(917);const a={warning:{color:"#ffffff",borderColor:"#ffeb9d",backgroundColor:"#fdd510"},error:{color:"#ffffff",borderColor:"#ffeb9d",backgroundColor:"#ff0909"},info:{color:"#ffffff",borderColor:"#ffeb9d",backgroundColor:"#107afd"}};var l=e=>{let{color:n,text:r}=e;const l={backgroundColor:n,color:a[n].color,borderColor:a[n].borderColor,backgroundColor:a[n].backgroundColor,width:65,height:27,border:"1px solid",borderRadius:"1rem",textAlign:"center",margin:"0px 4px 0px 4px",fontFamily:'"IBM Plex Sans",-apple-system,BlinkMacSystemFont,sans-serif'};return(0,t.tZ)("div",{style:l},r)};const o={wrapper:{display:"flex",alignItems:"center"},level_box:{width:35,backgroundColor:"yellow"}};var s=e=>{let{url:n,level:r,solved:a}=e;return(0,t.tZ)("div",{style:o.wrapper,href:n},(0,t.tZ)(l,{color:"warning",text:"Lv. "+r}),(0,t.tZ)(l,{color:a?"info":"error",text:a?"sol":"unsol"}))}},9920:function(e,n,r){r.r(n),r.d(n,{default:function(){return F}});var t=r(1151),a=r(7294),l=r(2788);function o(e){const n=Object.assign({h1:"h1",p:"p",pre:"pre",code:"code",a:"a",span:"span",math:"math",semantics:"semantics",mrow:"mrow",mn:"mn",mo:"mo",mi:"mi",annotation:"annotation"},(0,t.ah)(),e.components);return a.createElement(a.Fragment,null,a.createElement(l.Z,{url:"https://school.programmers.co.kr/learn/courses/30/lessons/132266",level:3,solved:!1}),"\n",a.createElement(n.h1,{id:"문제-분석"},"문제 분석"),"\n",a.createElement(n.p,null,"각 포인트에서 특정 포인트로 가야 합니다.\r\n모든 포인트와 포인트 사이 거리는 1이라고 합니다.\r\n그런데 어떤 포인트에서 포인트까지 가는 길이 부서져서 갈 수 없는 길도 있다고 하는군요.\r\n이 때 출발지에서 도착지까지 가장 빠르게 도착하는 경로를 계산하는 문제에요.\r\n모든 경로가 차단되어 도착지까지 절대 갈 수 없는 경우가 생긴다면 -1을 반환합니다."),"\n",a.createElement(n.p,null,"간단하게 생각하면 최단 경로를 찾는 다익스트라 알고리즘으로 풀 수 있을 것 같아요."),"\n",a.createElement(n.h1,{id:"풀이"},"풀이"),"\n",a.createElement(n.p,null,"먼저 경로에 대한 연결을 나타내는 행렬을 만들어보죠."),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"import numpy as np\r\nmatrix = np.ones((n, n)) * (n+1)\r\n\r\nfor road in roads:\r\n    node1 = road[0]-1\r\n    node2 = road[1]-1\r\n    matrix[node1, node2] = 1\r\n    matrix[node2, node1] = 1\r\n\r\nfor i in range(n):\r\n    matrix[i, i] = 0\n")),"\n",a.createElement(n.p,null,"자기 자신에 대한 경로는 0으로 만들어 주고 연결이 되지 않은 지역은 포인트의 수 보다 큰 n+1로 정해주었어요.\r\n이제 다익스트라 알고리즘을 사용하여 출발 지점에서 각 포인트까지 최단 경로를 찾아봅시다."),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"def get_min_route(s, e):\r\n    for i in range(n):\r\n        argsort = matrix[s].argsort()\r\n        min_idx = argsort[i]\r\n        if s == min_idx:\r\n            continue\r\n            \r\n        min_val = matrix[s, min_idx]\r\n        for j in range(n):\r\n            s_to_j = min_val + matrix[min_idx, j]\r\n            if matrix[s, j] > s_to_j:\r\n                matrix[s, j] = s_to_j\r\n                \r\n    result = matrix[s, e]\r\n    return -1 if result > n else result\n")),"\n",a.createElement(n.p,null,"각 시작 포인트에서 다른 포인트까지 연결된 거리가 짧은 순으로 정렬한 후 경유하여 도착하는 값까지 모두 계산하였습니다.\r\n이때 도착 포인트까지 연결이 없어 n+1 값을 그대로 가지는 경로에 대해 -1을 반환하도록 만들어 주었어요.\r\n이 코드를 제출하여 결과를 확인해 봅시다."),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"import numpy as np\r\n\r\ndef solution(n, roads, sources, destination):\r\n    answer = []\r\n    matrix = np.ones((n, n)) * (n+1)\r\n    \r\n    for road in roads:\r\n        node1 = road[0]-1\r\n        node2 = road[1]-1\r\n        matrix[node1, node2] = 1\r\n        matrix[node2, node1] = 1\r\n    \r\n    for i in range(n):\r\n        matrix[i, i] = 0\r\n    \r\n    def get_min_route(s, e):\r\n        for i in range(n):\r\n            argsort = matrix[s].argsort()\r\n            min_idx = argsort[i]\r\n            if s == min_idx:\r\n                continue\r\n                \r\n            min_val = matrix[s, min_idx]\r\n            for j in range(n):\r\n                s_to_j = min_val + matrix[min_idx, j]\r\n                if matrix[s, j] > s_to_j:\r\n                    matrix[s, j] = s_to_j\r\n                    \r\n        result = matrix[s, e]\r\n        return -1 if result > n else result\r\n                \r\n    for source in sources:\r\n        result = get_min_route(source-1, destination-1)\r\n        answer.append(result)\r\n        \r\n    return answer\n")),"\n",a.createElement(n.p,null,"테스트 1~5까지 통과라고 뜨지만 6~16까지 시간초과, 런타임 에러가 발생하네요.\r\n알고리즘을 조금 더 효과적으로 수정할 필요가 있습니다."),"\n",a.createElement(n.p,null,"우리는 여러 시작 포인트에서 도착 포인트까지 경로를 조사하는 형태로 알고리즘을 구성하였지만,\r\n이는 각 시작 포인트마다 모든 포인트까지 경로를 조사하는 비효율적인 방법었네요.\r\n생각해보면 그냥 도착포인트에 대한 모든 포인트까지 경로를 한번만 조사하면 되는 간단한 문제였어요."),"\n",a.createElement(n.p,null,"위 방법으로 시간초과는 해결할 수 있겠지만 정확하게 어떤 부분에러 런타임 에러가 발생하는지 확인을 할 필요가 있겟어요.\r\n단순히 numpy 배열 만드는 것만으로도 런타임 오류가 발생하네요.\r\n메모리의 크기가 정해져서 그런 걸까요?"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"matrix = [[n+1]*n for _ in range(n)]\n")),"\n",a.createElement(n.p,null,"단순히 위 배열을 선언하는 것만 해도 11~16번이 시간 초과로 발생합니다.\r\n다익스트라 알고리즘은 안되는 듯,,"),"\n",a.createElement(n.h1,{id:"힌트"},"힌트"),"\n",a.createElement(n.p,null,"BFS로 풀면 된다는 힌트를 받았어요.\r\n사실상 그냥 정답을 받은거나 다름 없는,,\r\n이런 알고리즘에 제가 취약하다는 것을 또 깨닫는 순간입니다.\r\nBFS에 대한 정리는 ",a.createElement(n.a,{href:"/algorithm/bfs"},"여기"),"에 해두었어요"),"\n",a.createElement(n.p,null,"이 문제는 제한사항을 보면 ",a.createElement(n.span,{className:"math math-inline"},a.createElement(n.span,{className:"katex"},a.createElement(n.span,{className:"katex-mathml"},a.createElement(n.math,{xmlns:"http://www.w3.org/1998/Math/MathML"},a.createElement(n.semantics,null,a.createElement(n.mrow,null,a.createElement(n.mn,null,"3"),a.createElement(n.mo,null,"≤"),a.createElement(n.mi,null,"n"),a.createElement(n.mo,null,"≤"),a.createElement(n.mn,null,"100000")),a.createElement(n.annotation,{encoding:"application/x-tex"},"3 \\leq n \\leq 100000")))),a.createElement(n.span,{className:"katex-html","aria-hidden":"true"},a.createElement(n.span,{className:"base"},a.createElement(n.span,{className:"strut",style:{height:"0.7804em",verticalAlign:"-0.136em"}}),a.createElement(n.span,{className:"mord"},"3"),a.createElement(n.span,{className:"mspace",style:{marginRight:"0.2778em"}}),a.createElement(n.span,{className:"mrel"},"≤"),a.createElement(n.span,{className:"mspace",style:{marginRight:"0.2778em"}})),a.createElement(n.span,{className:"base"},a.createElement(n.span,{className:"strut",style:{height:"0.7719em",verticalAlign:"-0.136em"}}),a.createElement(n.span,{className:"mord mathnormal"},"n"),a.createElement(n.span,{className:"mspace",style:{marginRight:"0.2778em"}}),a.createElement(n.span,{className:"mrel"},"≤"),a.createElement(n.span,{className:"mspace",style:{marginRight:"0.2778em"}})),a.createElement(n.span,{className:"base"},a.createElement(n.span,{className:"strut",style:{height:"0.6444em"}}),a.createElement(n.span,{className:"mord"},"100000"))))),"으로 포인트의 수가 굉장히 많습니다.\r\n이를 ",a.createElement(n.span,{className:"math math-inline"},a.createElement(n.span,{className:"katex"},a.createElement(n.span,{className:"katex-mathml"},a.createElement(n.math,{xmlns:"http://www.w3.org/1998/Math/MathML"},a.createElement(n.semantics,null,a.createElement(n.mrow,null,a.createElement(n.mi,null,"n"),a.createElement(n.mo,null,"×"),a.createElement(n.mi,null,"n")),a.createElement(n.annotation,{encoding:"application/x-tex"},"n \\times n")))),a.createElement(n.span,{className:"katex-html","aria-hidden":"true"},a.createElement(n.span,{className:"base"},a.createElement(n.span,{className:"strut",style:{height:"0.6667em",verticalAlign:"-0.0833em"}}),a.createElement(n.span,{className:"mord mathnormal"},"n"),a.createElement(n.span,{className:"mspace",style:{marginRight:"0.2222em"}}),a.createElement(n.span,{className:"mbin"},"×"),a.createElement(n.span,{className:"mspace",style:{marginRight:"0.2222em"}})),a.createElement(n.span,{className:"base"},a.createElement(n.span,{className:"strut",style:{height:"0.4306em"}}),a.createElement(n.span,{className:"mord mathnormal"},"n")))))," 배열로 만든다면 메모리가 부족할 수 밖에 없었을 거에요."),"\n",a.createElement(n.p,null,"또한 각 포인트와 포인트의 거리는 1로 동일하다는 것을 주목해야 했어요.\r\n가중치가 없는 형태이기 때문에 다익스트라 알고리즘을 굳이 사용하지 않아도 되었지요."),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"graph = [[] for _ in range(n+1)]\r\nfor road in roads:\r\n    node1 = road[0]\r\n    node2 = road[1]\r\n    graph[node1].append(node2)\r\n    graph[node2].append(node1)\n")),"\n",a.createElement(n.p,null,"먼저 각 노드들과 연결된 노드들의 관계를 그래프로 설정하도록 합니다."),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"visited = {destination: 0}\r\nqueue = deque([(destination, 0)])\r\nwhile(len(queue) > 0):\r\n    item = queue.popleft()\r\n    node = item[0]\r\n    wide = item[1]\r\n    for tar in graph[node]:\r\n        if tar not in visited:\r\n            queue.append((tar, wide+1))\r\n            visited[tar] = wide+1\n")),"\n",a.createElement(n.p,null,"이제 queue와 그래프를 이용하여 연결된 노드들에 대한 방문을 우선으로 하는 BFS 알고리즘을 만들었어요.\r\n이를 실행해보니 깔끔하게 모든 테스트가 완료되었어요."),"\n",a.createElement(n.p,null,"전체 코드"),"\n",a.createElement(n.pre,null,a.createElement(n.code,{className:"language-python"},"from collections import deque\r\n\r\ndef solution(n, roads, sources, destination):\r\n    answer = []\r\n    \r\n    graph = [[] for _ in range(n+1)]\r\n    for road in roads:\r\n        node1 = road[0]\r\n        node2 = road[1]\r\n        graph[node1].append(node2)\r\n        graph[node2].append(node1)\r\n\r\n    visited = {destination: 0}\r\n    queue = deque([(destination, 0)])\r\n    while(len(queue) > 0):\r\n        item = queue.popleft()\r\n        node = item[0]\r\n        wide = item[1]\r\n        for tar in graph[node]:\r\n            if tar not in visited:\r\n                queue.append((tar, wide+1))\r\n                visited[tar] = wide+1\r\n        \r\n    for source in sources:\r\n        if source in visited:\r\n            answer.append(visited[source])\r\n        else:\r\n            answer.append(-1)\r\n    \r\n    return answer\n")))}var s=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,t.ah)(),e.components);return n?a.createElement(n,e,a.createElement(o,e)):o(e)},i=r(4316),m=r(1840),d=r(7821),c=r(2654),p=r(4111),u=r(2726),h=r(4480),g=r(2818),f=r(9213),E=r(7213),x=r(9265),w=r(9601),v=r(3071),b=r(6097),y=r(6782),Z=r(4891),N=r(3387),_=r(917);const j=e=>{let{data:{mdx:n,file:r},children:l}=e;const o=(0,h.sJ)((0,g.cp)(g.eE,!1)),s=(0,h.sJ)((0,g.cp)(g.rf,!1)),i=(0,h.Zl)((0,g.cp)(g.Cy,n.tableOfContents.items));return(0,a.useEffect)((()=>{i(n.tableOfContents.items)}),[n]),(0,_.tZ)(m.Z,null,(0,_.tZ)(k,null,(0,_.tZ)(p.Z,null)),(0,_.tZ)(q,null,(0,_.tZ)(C,{className:"navigation",isNavOpened:s},(0,_.tZ)(O,{className:"hide_scroll"},(0,_.tZ)(d.Z,null))),(0,_.tZ)(A,{isNavOpened:s},(0,_.tZ)(R,{isWide:o},(0,_.tZ)(u.Z,{title:n.frontmatter.title,modifiedTime:r.modifiedTime}),(0,_.tZ)(t.Zo,{components:{p:E.Z,h1:x.H1,h2:x.H2,h3:x.H3,h4:x.H4,h5:x.H5,h6:x.H6,hr:w.Z,blockquote:v.Z,ul:y.Z,ol:b.Z,pre:Z.Z,code:N.Z}},l))),(0,_.tZ)(M,null,(0,_.tZ)(H,null,(0,_.tZ)(c.Z,null)))))},k=(0,i.Z)("div",{target:"e1ojob7j7"})({name:"11t2x7x",styles:"display:flex;height:var(--header-height);z-index:5;padding:0.6rem 2rem 0.6rem 0.6rem;position:fixed;width:100%;background:var(--background-color);border-bottom:1px solid var(--border-color)"}),q=(0,i.Z)("div",{target:"e1ojob7j6"})({name:"majwgz",styles:"position:relative;display:flex;min-height:calc(100vh - var(--header-height));overflow-x:hidden"}),C=(0,i.Z)("aside",{target:"e1ojob7j5"})("margin-left:",(e=>e.isNavOpened?"0":"calc(-1 * var(--sidebar-width))"),";flex:0 0 var(--sidebar-width);font-size:0.875rem;overflow-x:hidden;overflow-y:auto;transition:margin 0.25s var(--ease-in-out-quad);@media (min-width: ",f.Z.IPAD_PRO,"px){margin-left:0;}"),O=(0,i.Z)("nav",{target:"e1ojob7j4"})({name:"l4vzaw",styles:"overflow-y:auto;height:100%;padding:var(--body-padding-top) 0 3rem 0;position:fixed;width:var(--sidebar-width);&:-webkit-scrollbar{display:none;}"}),R=(0,i.Z)("main",{target:"e1ojob7j3"})("padding:1rem;width:100%;@media (min-width: ",f.Z.IPAD_AIR,"px){width:",(e=>e.isWide?"90%":"65%"),";}"),A=(0,i.Z)("main",{target:"e1ojob7j2"})("width:calc(100% - 2 * var(--sidebar-width));padding-top:var(--body-padding-top);flex-grow:1;min-width:20rem;display:flex;justify-content:center;opacity:",(e=>e.isNavOpened?.3:1),";@media (min-width: ",f.Z.IPAD_PRO,"px){opacity:1;}"),M=(0,i.Z)("aside",{target:"e1ojob7j1"})("font-size:0.75rem;font-weight:bold;overflow-x:hidden;overflow-y:auto;padding-top:var(--body-padding-top);width:0;transition:width 0.25s var(--ease-in-out-quad);@media (min-width: ",f.Z.HD,"px){width:var(--sidebar-width);}"),H=(0,i.Z)(O,{target:"e1ojob7j0"})({name:"b40oxt",styles:"padding:0 1rem 0 1rem"});function F(e){return a.createElement(j,e,a.createElement(s,e))}}}]);
//# sourceMappingURL=component---src-components-templates-main-template-tsx-content-file-path-contents-coding-test-03-132266-mdx-8ec8fe3996c94c9ccb57.js.map