(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{20:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var c=t(2),r=t(15),u=t.n(r),i=(t(20),t(6)),o=t(3),a=t(4),s=t.n(a),l="/api/persons",d=function(){return s.a.get(l).then((function(e){return e.data}))},j=function(e){return s.a.post(l,e).then((function(e){return e.data}))},b=function(e,n){return s.a.put("".concat(l,"/").concat(e),n).then((function(e){return e.data}))},f=function(e){return console.log("Delete person number",e),s.a.delete("".concat(l,"/").concat(e)).then((function(e){return e.data}))},m=t(0),h=function(e){var n=e.filter,t=e.handleFilterChange;return Object(m.jsxs)("div",{children:["Filter with ",Object(m.jsx)("input",{value:n,onChange:t})]})},O=function(e){var n=e.message,t=e.className;return null===n?null:Object(m.jsx)("div",{className:t,children:n})},v=function(e){var n=e.person,t=e.deletePerson;return Object(m.jsxs)("div",{children:[n.name,", ",n.number," ",Object(m.jsx)("button",{onClick:t,children:"Delete"})]})},p=function(e){return Object(m.jsxs)("form",{onSubmit:e.addPerson,children:[Object(m.jsxs)("div",{children:["name: ",Object(m.jsx)("input",{value:e.newName,onChange:e.handleNameChange})]}),Object(m.jsxs)("div",{children:["number: ",Object(m.jsx)("input",{value:e.newNumber,onChange:e.handleNumberChange})]}),Object(m.jsx)("div",{children:Object(m.jsx)("button",{type:"submit",children:"add"})})]})},g=function(){var e=Object(c.useState)([]),n=Object(o.a)(e,2),t=n[0],r=n[1],u=Object(c.useState)(""),a=Object(o.a)(u,2),s=a[0],l=a[1],g=Object(c.useState)(""),x=Object(o.a)(g,2),w=x[0],N=x[1],C=Object(c.useState)(""),P=Object(o.a)(C,2),S=P[0],T=P[1],k=Object(c.useState)(null),D=Object(o.a)(k,2),y=D[0],F=D[1],A=Object(c.useState)(null),E=Object(o.a)(A,2),J=E[0],B=E[1];Object(c.useEffect)((function(){d().then((function(e){r(e)}))}),[]);var I=0===S.length?t:t.filter((function(e){return e.name.toLowerCase().includes(S)}));return Object(m.jsxs)("div",{children:[Object(m.jsx)("h2",{children:"Phonebook"}),Object(m.jsx)(O,{message:J,className:"error"}),Object(m.jsx)(O,{message:y,className:"notification"}),Object(m.jsx)(h,{filter:S,handleFilterChange:function(e){T(e.target.value)}}),Object(m.jsx)("h2",{children:"Add new"}),Object(m.jsx)(p,{addPerson:function(e){e.preventDefault();var n={name:s,number:w};if(t.some((function(e){return e.name===s}))){if(window.confirm("Replace old number for this person?")){var c=t.find((function(e){return e.name===s}));console.log("Person: ",c);var u=Object(i.a)(Object(i.a)({},c),{},{number:w});console.log("newPersonObject: ",u);var o=t.filter((function(e){return e.id!==c.id}));console.log("newPersons: ",o),b(c.id,u).then((function(e){r(o.concat(u)),F("New number is saved!"),setTimeout((function(){F(null)}),3e3)})).catch((function(e){B("".concat(c.name," is already removed from the server")),setTimeout((function(){B(null)}),3e3)}))}}else j(n).then((function(e){r(t.concat(e))})).catch((function(e){B("Pieleen meni t\xe4m\xe4 homma"),setTimeout((function(){B(null)}),3e3)})),F("Addition completed!"),setTimeout((function(){F(null)}),3e3);l(""),N("")},newName:s,newNumber:w,handleNameChange:function(e){l(e.target.value)},handleNumberChange:function(e){N(e.target.value)}}),Object(m.jsx)("h2",{children:"Numbers"}),I.map((function(e){return Object(m.jsx)(v,{person:e,deletePerson:function(){return function(e){if(window.confirm("Delete this number?")){var n=t.filter((function(n){return n.id!==e}));f(e),r(n),F("Number is deleted!"),setTimeout((function(){F(null)}),3e3)}}(e.id)}},e.name)}))]})};u.a.render(Object(m.jsx)(g,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.ef269342.chunk.js.map