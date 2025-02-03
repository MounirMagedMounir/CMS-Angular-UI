import{ka as s,ma as J,oa as P}from"./chunk-WZCEQT4A.js";import{Bb as B,Cb as T,Cc as V,Db as i,Eb as S,Ec as k,Fb as F,Jc as H,Ka as $,Na as g,Ob as d,Pb as L,Qb as j,R as x,S as _,Wb as N,X as y,Ya as M,Za as C,ab as w,cb as l,da as b,ea as z,ga as c,hc as h,jb as v,kb as n,la as I,mb as E,nb as D,ob as m,vb as f,wb as u,xb as A}from"./chunk-WJPNQUD4.js";var q=({dt:a})=>`
.p-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${a("avatar.width")};
    height: ${a("avatar.height")};
    font-size: ${a("avatar.font.size")};
    color: ${a("avatar.color")};
    background: ${a("avatar.background")};
    border-radius: ${a("avatar.border.radius")};
}

.p-avatar-image {
    background: transparent;
}

.p-avatar-circle {
    border-radius: 50%;
}

.p-avatar-circle img {
    border-radius: 50%;
}

.p-avatar-icon {
    font-size: ${a("avatar.icon.size")};
    width: ${a("avatar.icon.size")};
    height: ${a("avatar.icon.size")};
}

.p-avatar img {
    width: 100%;
    height: 100%;
}

.p-avatar-lg {
    width: ${a("avatar.lg.width")};
    height: ${a("avatar.lg.width")};
    font-size: ${a("avatar.lg.font.size")};
}

.p-avatar-lg .p-avatar-icon {
    font-size: ${a("avatar.lg.icon.size")};
    width: ${a("avatar.lg.icon.size")};
    height: ${a("avatar.lg.icon.size")};
}

.p-avatar-xl {
    width: ${a("avatar.xl.width")};
    height: ${a("avatar.xl.width")};
    font-size: ${a("avatar.xl.font.size")};
}

.p-avatar-xl .p-avatar-icon {
    font-size: ${a("avatar.xl.font.size")};
}

.p-avatar-group {
    display: flex;
    align-items: center;
}

.p-avatar-group .p-avatar + .p-avatar {
    margin-inline-start: ${a("avatar.group.offset")};
}

.p-avatar-group .p-avatar {
    border: 2px solid ${a("avatar.group.border.color")};
}

.p-avatar-group .p-avatar-lg + .p-avatar-lg {
    margin-inline-start: ${a("avatar.lg.group.offset")};
}

.p-avatar-group .p-avatar-xl + .p-avatar-xl {
    margin-inline-start: ${a("avatar.xl.group.offset")};
}
`,O={root:({props:a})=>["p-avatar p-component",{"p-avatar-image":a.image!=null,"p-avatar-circle":a.shape==="circle","p-avatar-lg":a.size==="large","p-avatar-xl":a.size==="xlarge"}],label:"p-avatar-label",icon:"p-avatar-icon"},R=(()=>{class a extends J{name="avatar";theme=q;classes=O;static \u0275fac=(()=>{let e;return function(t){return(e||(e=c(a)))(t||a)}})();static \u0275prov=x({token:a,factory:a.\u0275fac})}return a})();var U=["*"];function G(a,o){if(a&1&&(f(0,"span",3),L(1),u()),a&2){let e=i();g(),j(e.label)}}function K(a,o){if(a&1&&A(0,"span",5),a&2){let e=i(2);m(e.icon),n("ngClass","p-avatar-icon")}}function Q(a,o){if(a&1&&l(0,K,1,3,"span",4),a&2){let e=i(),r=d(5);n("ngIf",e.icon)("ngIfElse",r)}}function W(a,o){if(a&1){let e=B();f(0,"img",7),T("error",function(t){b(e);let p=i(2);return z(p.imageError(t))}),u()}if(a&2){let e=i(2);n("src",e.image,$),v("aria-label",e.ariaLabel)}}function X(a,o){if(a&1&&l(0,W,1,2,"img",6),a&2){let e=i();n("ngIf",e.image)}}var Y=(()=>{class a extends P{label;icon;image;size="normal";shape="square";style;styleClass;ariaLabel;ariaLabelledBy;onImageError=new I;_componentStyle=y(R);imageError(e){this.onImageError.emit(e)}get hostClass(){return this.styleClass}static \u0275fac=(()=>{let e;return function(t){return(e||(e=c(a)))(t||a)}})();static \u0275cmp=M({type:a,selectors:[["p-avatar"]],hostVars:19,hostBindings:function(r,t){r&2&&(v("data-pc-name","avatar")("aria-label",t.ariaLabel)("aria-labelledby",t.ariaLabelledBy),D(t.style),m(t.hostClass),E("p-avatar",!0)("p-component",!0)("p-avatar-circle",t.shape==="circle")("p-avatar-lg",t.size==="large")("p-avatar-xl",t.size==="xlarge")("p-avatar-image",t.image!=null))},inputs:{label:"label",icon:"icon",image:"image",size:"size",shape:"shape",style:"style",styleClass:"styleClass",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy"},outputs:{onImageError:"onImageError"},features:[N([R]),w],ngContentSelectors:U,decls:6,vars:2,consts:[["iconTemplate",""],["imageTemplate",""],["class","p-avatar-text",4,"ngIf","ngIfElse"],[1,"p-avatar-text"],[3,"class","ngClass",4,"ngIf","ngIfElse"],[3,"ngClass"],[3,"src","error",4,"ngIf"],[3,"error","src"]],template:function(r,t){if(r&1&&(S(),F(0),l(1,G,2,1,"span",2)(2,Q,1,2,"ng-template",null,0,h)(4,X,1,1,"ng-template",null,1,h)),r&2){let p=d(3);g(),n("ngIf",t.label)("ngIfElse",p)}},dependencies:[H,V,k,s],encapsulation:2,changeDetection:0})}return a})(),ua=(()=>{class a{static \u0275fac=function(r){return new(r||a)};static \u0275mod=C({type:a});static \u0275inj=_({imports:[Y,s,s]})}return a})();export{Y as a,ua as b};
