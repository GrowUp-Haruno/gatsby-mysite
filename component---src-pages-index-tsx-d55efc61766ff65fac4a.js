"use strict";(self.webpackChunkgatsby_mysite=self.webpackChunkgatsby_mysite||[]).push([[691],{3434:function(e,t,a){a.r(t),a.d(t,{default:function(){return p}});var n=a(7294),r=a(1597),c=a(6541),l=a(903),i=a(8014),m=a(7606),s=a(7059),u=a(7862),g=function(e){var t=e.articleCard;if(!t.createdAt)return null;if(!t.updatedAt)return null;if(!t.categories)return null;if(!t.eyecatch||!t.eyecatch.url)return null;if(!t.eyecatchImg||!t.eyecatchImg.childImageSharp||!t.eyecatchImg.childImageSharp.gatsbyImageData)return null;var a=(0,u.p)(new Date(t.createdAt)),g=(0,u.p)(new Date(t.updatedAt)),d=(0,s.c)(t.eyecatchImg.childImageSharp.gatsbyImageData);return n.createElement(r.Link,{to:"/blogs/post/"+t.blogsId},n.createElement(c.gC,{as:"article",w:"100%",h:"100%"},n.createElement(s.G,{image:d,alt:t.mainTitle+"のサムネイル"}),n.createElement(c.gC,{spacing:"16px",p:6,width:"100%",align:"left",flexGrow:1},n.createElement(c.X6,{as:"h3",size:"md"},t.mainTitle),n.createElement(c.Ug,{fontSize:["md","md","xs","xs"],justify:"flex-start",align:"center",spacing:4},n.createElement(c.Ug,{spacing:1},n.createElement(m.G,{icon:i._3l}),n.createElement("time",{dateTime:t.createdAt},a)),n.createElement(c.Ug,{spacing:1},n.createElement(m.G,{icon:i.T80}),n.createElement("time",{dateTime:t.updatedAt},g))),n.createElement(c.Ug,{spacing:2,fontSize:"sm"},t.categories.map((function(e){return e?n.createElement(l.Vp,{key:e.id,size:["lg","md","sm","sm"],variant:"solid",colorScheme:"teal"},n.createElement("span",null,e.name)):null}))))))},d=function(e){var t=e.articleCardList;return n.createElement(c.MI,{as:"section",columns:[1,1,2,3],spacing:8},t.map((function(e){return n.createElement(c.xu,{key:e.node.id},n.createElement(g,{articleCard:e.node}))})))},o=a(7258),p=function(e){var t=e.data;return n.createElement(o.I,null,n.createElement(d,{articleCardList:t.allMicrocmsBlogs.edges}))}}}]);
//# sourceMappingURL=component---src-pages-index-tsx-d55efc61766ff65fac4a.js.map