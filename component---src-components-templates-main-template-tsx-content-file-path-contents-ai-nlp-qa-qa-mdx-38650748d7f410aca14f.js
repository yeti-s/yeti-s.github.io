"use strict";(self.webpackChunkyeti_docs=self.webpackChunkyeti_docs||[]).push([[682],{2771:function(e,n,t){t.r(n),t.d(n,{default:function(){return T}});var a=t(1151),r=t(7294);function i(e){const n=Object.assign({p:"p",code:"code",h1:"h1",h3:"h3",pre:"pre",br:"br",span:"span"},(0,a.ah)(),e.components);return r.createElement(r.Fragment,null,r.createElement(n.p,null,r.createElement(n.code,null,"QA"),"는 사람에 의해 발생한 질문에 대한 대답 자동화가 목적입니다.\r\n가지고 있는 정보에서 정답을 찾아내는 것이죠.\r\n",r.createElement(n.code,null,"IR(Information Retrieval)"),"은 정보를 검색하는 것입니다.\r\n정답을 포함하는 문서를 찾아내는 것이죠."),"\n",r.createElement(n.p,null,"QA는 기존에도 다양한 곳에서 실제 application으로 작동하고 있었어요.\r\nIBM의 Watson은 퀴즈 챔피언이 되기도 했죠.\r\nWatson은 질문에 대해 processing을 거쳐 답변 후보지를 생성하고 점수를 매겨 답을 도출하는 고전 방식으로 만들어졌습니다."),"\n",r.createElement(n.p,null,"현재에는 딥러닝을 이용한 QA 모델들이 SOTA를 달성하고 있죠.\r\n최근 QA는 텍스트로 구성되어 있지 않은 질문에 대해서도 대답을 내놓는 방법에도 주목하고 있어요.\r\n예를 들면 사진을 주고 그 안에 사과가 몇개 존재하는지 물어보는 방식이죠."),"\n",r.createElement(n.h1,{id:"reading-comprehension"},"Reading comprehension"),"\n",r.createElement(n.p,null,r.createElement(n.code,null,"Reading comprehension"),"은 제공되는 텍스트를 이해하고 해당 내용에 대한 답을 내는 것입니다.\r\nReading comprehension를 통해 기계가 사람의 언어를 얼마나 이해하는지 파악할 수 있죠.\r\nNLP의 많은 작업들도 reading comprehension 문제로 단순화할 수 있어요."),"\n",r.createElement(n.h3,{id:"squad"},"SQuAD"),"\n",r.createElement(n.p,null,"이를 위한 가장 대표적인 데이터셋 ",r.createElement(n.code,null,"SQuAD"),"가 있습니다.\r\n위키피디아를 통해 각각 passage, question, answer로 구성된 데이터로 이루어져 있죠.\r\n특히 3가지 answer로 이루어져 다양한 답변에 대해 강한 모델을 구축할 수 있게 하죠.\r\n이를 활용하여 답변을 예측하고 exact match와 F1 방식을 모두 사용하여 모델을 평가합니다.\r\n이때 a, an, the 와 같은 단어를 제거한 후 사용합니다."),"\n",r.createElement(n.pre,null,r.createElement(n.code,null,"Q: What did Tesla do in December 1878?\r\nA: {left Graz, left Graz, left Graz and severed all relations with his family}\r\nPrediction: {left Graz and served}\r\n\r\nExact match: max{0, 0, 0} = 0\r\nF1: max{0.67, 0.67, 0.61} = 0.67\n")),"\n",r.createElement(n.p,null,"하지만 여기에 문제가 있었습니다.\r\npassage를 이해하지 않고 단어들의 랭킹만 세워도 문제가 풀렸어요.\r\n그렇기에 답이 없는 즉 no answer 문제를 추가하여 모델을 평가하였더니 정확도가 많이 낮아졌습니다.\r\n즉, 모델이 passage에 대한 이해 없이 문제를 풀고 있었다는 것이죠."),"\n",r.createElement(n.h1,{id:"neural-models-for-reading-comprehension"},"Neural models for reading comprehension"),"\n",r.createElement(n.p,null,"Passage(context), question(query)을 이용하여 답을 생성하는 모델을 만드려고 합니다.\r\n기존에는 bidirectional LSTM 기반 attention을 활용한 ",r.createElement(n.code,null,"BiDAF"),"모델을 이용하였습니다.\r\n그러다 트랜스포머의 등장으로 ",r.createElement(n.code,null,"BERT"),"와 같은 모델을 이용하여 reading comprehension 작업을 수행하였죠.\r\n여기서 사전 학습이 큰 역할을 했지만 그 비용은 비쌉니다."),"\n",r.createElement(n.p,null,"Reading comprehension을 위한 더 좋은 사전 학습 방법을 구축할 수 있을까요?",r.createElement(n.br),"\n",r.createElement(n.code,null,"Masked LM")," 방식에서 랜덤하게 15%를 masking 하는 것이 아닌, 연속되는 span을 masking합니다.\r\n또한 span을 예측하기 위해 span의 양 끝 두 단어를 이용하는 방식을 사용해습니다.\r\n이를 통해 기존 BERT 모델보다 SpanBERT 모델의 QA 평가가 더 높은 점수를 획득할 수 있었어요."),"\n",r.createElement(n.h1,{id:"is-reading-comprehension-solved"},"Is reading comprehension solved?"),"\n",r.createElement(n.p,null,"이러한 방법을 통해 학습된 모델은 사람보다 더 높은 점수를 가지기도 하였습니다.\r\n그렇다면 이 모델이 reading comprehension 작업을 수행한다고 할 수 있을까요?\r\n아래는 각 데이터셋으로 학습된 모델을 다른 데이터셋으로 평가한 점수입니다."),"\n",r.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 704px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/c1509f708b7898092661e8599338083d/d2a60/00.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 42.04545454545454%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABM0lEQVR42l2SW4+CUAyE+f//iwcefIFoQBQQRRCViwpGLnb36+Ykq01OKG1nOnPAer1e8nw+P84wDDJNk+br9Vpc1xXP8yRNU+2BGcfxI+eAseQ33u+3/H8WRaFEeZ5LWZYSBIH4vi9N0yjp7XaTOI61X1WVbLdbfe/7/o8QJZvNRouPx0PathXHceR4PKoCyPf7vQIghiQMQ62BjaJIsixTxRbbzuezblkul3K5XFQlQxATq9VK1eHgcDioNZaZWZTWda25dTqdZLfbqRXTAJAkidzvdx1CIYTzPGuOUq4FpYbQkFsQsBWFXddpEUJjkfgmxxUYxBCoNW4s7LKBO0Eptr4JAZhl5NTpgyPA4UAJ+QjX61Xvb7FY6MdBDUqwAZgel44yFuOKOYjA27ativl1fgCA01sxQOqwvQAAAABJRU5ErkJggg==\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="00"\n        title=""\n        src="/static/c1509f708b7898092661e8599338083d/5ebd7/00.png"\n        srcset="/static/c1509f708b7898092661e8599338083d/06437/00.png 176w,\n/static/c1509f708b7898092661e8599338083d/ba1c3/00.png 352w,\n/static/c1509f708b7898092661e8599338083d/5ebd7/00.png 704w,\n/static/c1509f708b7898092661e8599338083d/d2a60/00.png 807w"\n        sizes="(max-width: 704px) 100vw, 704px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}}),"\n",r.createElement(n.p,null,"하나의 데이터셋으로 학습된 모델은 다른 데이터셋을 평가하는 부분에서 일반화된 지표를 얻지 못하였습니다.\r\n즉 완벽하게 reading comprehension을 수행한다고 볼 수 없죠."),"\n",r.createElement(n.h1,{id:"open-domain-qa"},"Open-domain QA"),"\n",r.createElement(n.p,null,"Passage를 제공해주었던 reading comprehension과 달리 문제만을 제시하고 정답을 맞추는 ",r.createElement(n.code,null,"open-domain QA")," 작업도 있습니다.\r\nPassage를 제공하는 대신 여러 문서 뭉치에 접근할 수 있게 만들어 두었죠.\r\n물론 우리는 어디에 정답이 존재하는지 모릅니다.\r\n그저 옳은 정답만을 바라는 것이죠.\r\n이 문제는 앞선 작업보다 더욱 어렵지만 훨씬 실용적입니다."),"\n",r.createElement(n.p,null,"이 작업은 관련된 문서를 찾는 ",r.createElement(n.code,null,"retriever")," 단계와 문서에서 답을 찾는 ",r.createElement(n.code,null,"reader")," 단계로 구성할 수 있습니다.\r\nReader는 앞에서 다룬 reading comprehension을 수행하는 모델입니다.\r\nRetriever는 기존 ",r.createElement(n.code,null,"TF-IDF"),"를 이용하여 문제와 관련된 문서를 찾는 학습없는 모듈이죠."),"\n",r.createElement(n.h3,{id:"train-retriever"},"Train retriever"),"\n",r.createElement(n.p,null,"그러나 이러한 retriever 역시 학습을 통해 모델을 구축하는 시도가 있었어요.\r\n기존 ",r.createElement(n.code,null,"TF-IDF"),"의 단어의 통계적 접근은 의미를 이해하지 못하였으니까요.\r\n하지만 막대한 양의 passage를 학습하는 것은 쉽지 않았습니다."),"\n",r.createElement(n.p,null,"따라서 두 개의 ",r.createElement(n.code,null,"BERT")," 모델을 활용하여 question과 passage를 각각 feature map을 생산하고\r\ndot product를 통해 유사도를 구하는 방식으로 ",r.createElement(n.code,null,"DPR(Dense Passage Retrieval)")," 방식을 만들었어요."),"\n",r.createElement(n.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 704px; "\n    >\n      <a\n    class="gatsby-resp-image-link"\n    href="/static/f0017d0d07c3cdefb63dfef79eb7d052/64d87/01.png"\n    style="display: block"\n    target="_blank"\n    rel="noopener"\n  >\n    <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 38.06818181818182%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAICAYAAAD5nd/tAAAACXBIWXMAAA7DAAAOwwHHb6hkAAABW0lEQVR42nWSyW6DQBBE+f9/iZQfSI652pZywGAhO8HsmGEWmAWo9CA7ieykpL4M3TVvqglYz6G1wU3OOUipME0T7rVQ2WGAPKfgxyNkkUF8nNAfYoxNs/YE6WcC3rfXdkCPCod4j0GJB0OtNYzRmOeZjEcYLqGFgOwZJGMw9D1I35/BTi9wRmKZHZrkFcnmCSx9e6BkNOSsw9BxsLoCayo0RNmWBVhbYRwUgijcIT1F1Gjo5gnlOUES7VAXx5Xkt6qKTMoafVdDDRxiJEKr4SYL6+waV7Dd7hDuo/U5/mAfxdjQWRwfHgzzLMflUkKNApp6l2WB1APyvIC1V0NBGVjzsxRv0lMmf6ml4IXsiWj+XpMSDGEYoiiKNaLglk1ZluuTGhryN/u6l6eQtGU/6Gl8jXJAQYRZRhsnuNXQEGHXdeCcQymF/+TpvZmkwaqqV6osz+jJ+fUPMPgC5NtomQKeNGkAAAAASUVORK5CYII=\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="01"\n        title=""\n        src="/static/f0017d0d07c3cdefb63dfef79eb7d052/5ebd7/01.png"\n        srcset="/static/f0017d0d07c3cdefb63dfef79eb7d052/06437/01.png 176w,\n/static/f0017d0d07c3cdefb63dfef79eb7d052/ba1c3/01.png 352w,\n/static/f0017d0d07c3cdefb63dfef79eb7d052/5ebd7/01.png 704w,\n/static/f0017d0d07c3cdefb63dfef79eb7d052/64d87/01.png 818w"\n        sizes="(max-width: 704px) 100vw, 704px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n  </a>\n    </span>'}}),"\n",r.createElement(n.p,null,"또 매우 큰 모델을 사용하면 retriever가 없어도 충분히 open-domain QA를 수행할 수 있다고 합니다.\r\n심지어 dense vector만을 이용해 모든 정보를 인코딩하여 질문이 들어올 때 최근접 이웃 탐색으로 해결하는 방식으로도 할 수 있다고 하죠.\r\n물론 이러한 분야는 아직까지 많은 연구중에 있습니다."))}var l=function(e){void 0===e&&(e={});const{wrapper:n}=Object.assign({},(0,a.ah)(),e.components);return n?r.createElement(n,e,r.createElement(i,e)):i(e)},d=t(4316),o=t(1840),s=t(7821),c=t(2654),p=t(4111),m=t(2726),g=t(4480),h=t(2818),u=t(9213),b=t(7213),A=t(9265),f=t(9601),w=t(3071),E=t(6097),v=t(6782),y=t(4891),Z=t(3387),x=t(917);const k=e=>{let{data:{mdx:n},children:t}=e;const i=(0,g.sJ)((0,h.cp)(h.eE,!1)),l=(0,g.sJ)((0,h.cp)(h.rf,!1)),d=(0,g.Zl)((0,h.cp)(h.Cy,n.tableOfContents.items));return(0,r.useEffect)((()=>{d(n.tableOfContents.items)}),[n]),(0,x.tZ)(o.Z,null,(0,x.tZ)(R,null,(0,x.tZ)(p.Z,null)),(0,x.tZ)(Q,null,(0,x.tZ)(j,{className:"navigation",isNavOpened:l},(0,x.tZ)(O,{className:"hide_scroll"},(0,x.tZ)(s.Z,null))),(0,x.tZ)(I,{isNavOpened:l},(0,x.tZ)(B,{isWide:i},(0,x.tZ)(m.Z,{title:n.frontmatter.title,date:n.frontmatter.date}),(0,x.tZ)(a.Zo,{components:{p:b.Z,h1:A.H1,h2:A.H2,h3:A.H3,h4:A.H4,h5:A.H5,h6:A.H6,hr:f.Z,blockquote:w.Z,ul:v.Z,ol:E.Z,pre:y.Z,code:Z.Z}},t))),(0,x.tZ)(N,null,(0,x.tZ)(D,null,(0,x.tZ)(c.Z,null)))))},R=(0,d.Z)("div",{target:"e1ojob7j7"})({name:"11t2x7x",styles:"display:flex;height:var(--header-height);z-index:5;padding:0.6rem 2rem 0.6rem 0.6rem;position:fixed;width:100%;background:var(--background-color);border-bottom:1px solid var(--border-color)"}),Q=(0,d.Z)("div",{target:"e1ojob7j6"})({name:"majwgz",styles:"position:relative;display:flex;min-height:calc(100vh - var(--header-height));overflow-x:hidden"}),j=(0,d.Z)("aside",{target:"e1ojob7j5"})("margin-left:",(e=>e.isNavOpened?"0":"calc(-1 * var(--sidebar-width))"),";flex:0 0 var(--sidebar-width);font-size:0.875rem;overflow-x:hidden;overflow-y:auto;transition:margin 0.25s var(--ease-in-out-quad);@media (min-width: ",u.Z.IPAD_PRO,"px){margin-left:0;}"),O=(0,d.Z)("nav",{target:"e1ojob7j4"})({name:"l4vzaw",styles:"overflow-y:auto;height:100%;padding:var(--body-padding-top) 0 3rem 0;position:fixed;width:var(--sidebar-width);&:-webkit-scrollbar{display:none;}"}),B=(0,d.Z)("main",{target:"e1ojob7j3"})("padding:1rem;width:100%;@media (min-width: ",u.Z.IPAD_AIR,"px){width:",(e=>e.isWide?"90%":"65%"),";}"),I=(0,d.Z)("main",{target:"e1ojob7j2"})("width:calc(100% - 2 * var(--sidebar-width));padding-top:var(--body-padding-top);flex-grow:1;min-width:20rem;display:flex;justify-content:center;opacity:",(e=>e.isNavOpened?.3:1),";@media (min-width: ",u.Z.IPAD_PRO,"px){opacity:1;}"),N=(0,d.Z)("aside",{target:"e1ojob7j1"})("font-size:0.75rem;font-weight:bold;overflow-x:hidden;overflow-y:auto;padding-top:var(--body-padding-top);width:0;transition:width 0.25s var(--ease-in-out-quad);@media (min-width: ",u.Z.HD,"px){width:var(--sidebar-width);}"),D=(0,d.Z)(O,{target:"e1ojob7j0"})({name:"b40oxt",styles:"padding:0 1rem 0 1rem"});function T(e){return r.createElement(k,e,r.createElement(l,e))}}}]);
//# sourceMappingURL=component---src-components-templates-main-template-tsx-content-file-path-contents-ai-nlp-qa-qa-mdx-38650748d7f410aca14f.js.map