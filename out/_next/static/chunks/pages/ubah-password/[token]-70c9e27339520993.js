(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[71],{7410:function(e,s,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/ubah-password/[token]",function(){return a(56979)}])},37543:function(e,s,a){"use strict";a.d(s,{Z:function(){return t}});var r=a(85893),l=a(71577);function t(e){var s;let{label:a,round:t,active:n}=e;return(0,r.jsx)(l.Z,{...e,className:(null!==(s=e.className)&&void 0!==s?s:"")+" "+(t||"rounded-full")+" "+(n||""),children:a})}},10519:function(e,s,a){"use strict";a.d(s,{Z:function(){return n}});var r=a(85893),l=a(44068),t=a(79531);function n(e){var s,a,n;let i={...e,"aria-label":e.label,"aria-description":e.helperText,className:"px-2.5 py-1.5 text-14px rounded-full "+(null!==(s=e.className)&&void 0!==s?s:""),style:{...e.style}};return(0,r.jsxs)(r.Fragment,{children:[void 0!==e.label?(0,r.jsx)(l.Z,{className:"mb-10px text-12px font-semibold "+(null!==(a=e.labelClassName)&&void 0!==a?a:""),style:e.labelStyle,children:e.label}):null,"password"===e.type?(0,r.jsx)(t.Z.Password,{...i}):(0,r.jsx)(t.Z,{...i}),void 0!==e.helperText?(0,r.jsx)(l.Z,{className:"text-12px opacity-90 "+(null!==(n=e.helperTextClassName)&&void 0!==n?n:""),style:e.helperTextStyle,children:e.helperText}):null]})}},88190:function(e,s,a){"use strict";a.d(s,{Z:function(){return T}});var r=a(85893),l=a(68265),t=a(38792),n=a(71577),i=a(38504),c=a(26713),o=a(44068),d=a(94184),u=a.n(d),m=a(41664),p=a.n(m),x=a(67294),h=a(72999),j=a(13448),g=a(94321),w=a(10519),b=a(37543),f=a(82887);let y=e=>{let{visible:s,setVisibility:a,role:l,...t}=e,[n]=h.Z.useForm(),[i,{isLoading:c}]=(0,f.YA)(),d={pembaca:"reader",penulis:"creator"};(0,x.useEffect)(()=>{s||n.resetFields()},[n,s]);let u=e=>{i({role:d[l],email:e["login-email"],password:e["login-password"]}).unwrap().then(e=>{j.Z.success({message:(null==e?void 0:e.message)||"Success"}),a(!1)}).catch(e=>{var s;j.Z.error({message:(null==e?void 0:null===(s=e.data)||void 0===s?void 0:s.message)||"Error"})})},m=()=>{a(!1)};return(0,r.jsxs)(g.Z,{...t,forceRender:!0,centered:!0,visible:s,closable:!1,footer:null,children:[(0,r.jsxs)("div",{className:"mb-30px",children:[(0,r.jsx)(o.Z.Title,{level:2,className:"mb-1",children:"BacaAku"}),(0,r.jsx)(o.Z.Paragraph,{className:"mb-0 text-12px text-secondary-color",children:{pembaca:"Login dulu yuk, agar dapat membaca lebih menyenangkan dengan",penulis:"Bagikan tulisanmu untuk pembaca, ayo gabung sebagai penulis"}[l]}),(0,r.jsx)(o.Z.Paragraph,{className:"text-12px text-secondary-color",children:"BacaAku"})]}),(0,r.jsxs)(h.Z,{form:n,onFinish:u,autoComplete:"off",children:[(0,r.jsx)(h.Z.Item,{className:"mb-35px",name:"login-email",rules:[{required:!0,message:"Please input your email!"}],children:(0,r.jsx)(w.Z,{type:"email",label:"Email",placeholder:"Silakan tulis email"})}),(0,r.jsx)(h.Z.Item,{className:"mb-10px",name:"login-password",rules:[{required:!0,message:"Please input your password!"}],children:(0,r.jsx)(w.Z,{type:"password",label:"Password",placeholder:"Silakan tulis password"})}),(0,r.jsx)("div",{className:"text-right mb-30px",children:(0,r.jsx)(o.Z.Paragraph,{className:"mb-0 text-12px ",children:(0,r.jsx)(p(),{href:"/lupa-password?role=".concat(l),onClick:m,className:"text-black hover:text-secondary-color",children:"Lupa password"})})}),(0,r.jsxs)("div",{className:"text-center",children:[(0,r.jsx)(b.Z,{type:"primary",label:"Login",htmlType:"submit",className:"mb-10px",loading:c}),(0,r.jsxs)(o.Z.Paragraph,{className:"mb-0 text-12px",children:["Anda belum punya akun ?",(0,r.jsxs)(p(),{href:"/registrasi-".concat(l),onClick:m,children:[" ","Registrasi"]})]})]})]})]})};var v=a(11163),k=a(41248),N=a(18177);function Z(e){let{showWrapperOption:s=!0}=e,[a,d]=(0,x.useState)("pembaca"),[m,h]=(0,x.useState)(!1),j=(0,v.useRouter)(),g=(0,k.I0)(),{auth:w}=(0,k.v9)(e=>e),b=e=>{d(e),h(!0)},f=[{name:"Pembaca",login:"pembaca",register:"/registrasi-pembaca"},{name:"Penulis",login:"penulis",register:"/registrasi-penulis"}];function Z(e){return(0,r.jsx)(t.Z,{children:"logout"==e?(0,r.jsx)(t.Z.Item,{children:(0,r.jsx)(n.Z,{className:"bg-transparent",type:"text",onClick:()=>g((0,N.Li)()),children:"Keluar"})}):f.map((s,a)=>"login"==e?(0,r.jsx)(t.Z.Item,{children:(0,r.jsx)(n.Z,{className:"bg-transparent",type:"text",onClick:()=>b(s.login),children:s.name})},a):(0,r.jsx)(t.Z.Item,{children:(0,r.jsx)(p(),{href:s.register,className:u()({"text-success-color":j.asPath==s.register}),children:s.name})},a))})}let P=w.isLogin?(0,r.jsx)(r.Fragment,{children:"reader"==w.role?[{name:"Lihat Artikel",type:"link",url:"/lihat-artikel"},{name:"Daftar Artikelmu",type:"link",url:"/daftar-artikel"},{name:"Hi nama kamu",type:"dropdown",menu:"logout",url:"/registrasi-pembaca"}].map((e,s)=>{switch(e.type){case"link":return(0,r.jsx)(p(),{href:"/lihat-artikel",className:u()({"text-success-color":j.asPath==e.url}),children:e.name},s);case"dropdown":return(0,r.jsx)(i.Z,{overlay:Z(e.menu),trigger:["click"],className:u()("cursor-pointer hover:text-success-color",{"text-success-color":j.asPath==e.url||j.asPath==e.url2}),children:(0,r.jsxs)(c.Z,{children:[e.name," ",(0,r.jsx)(l.Z,{})]})},s)}}):(0,r.jsx)(r.Fragment,{children:(0,r.jsxs)("div",{className:"flex items-center justify-center gap-8",children:[(0,r.jsx)("div",{className:"w-10 h-10 rounded-full bg-primary-color"}),(0,r.jsxs)(o.Z.Paragraph,{className:"mb-0 font-normal text-14px text-secondary-color",children:["Selamat Datang, ","nama penulis"]})]})})}):(0,r.jsx)(r.Fragment,{children:[{name:"Lihat Artikel",type:"link",url:"/lihat-artikel"},{name:"Masuk Akun",type:"dropdown",menu:"login",url:"/login-pembaca"},{name:"Buat Akun",type:"dropdown",menu:"register",url:"/registrasi-pembaca",url2:"/registrasi-penulis"}].map((e,s)=>{switch(e.type){case"link":return(0,r.jsx)(p(),{href:"/lihat-artikel",className:u()({"text-success-color":j.asPath==e.url}),children:e.name},s);case"dropdown":return(0,r.jsx)(i.Z,{overlay:Z(e.menu),trigger:["click"],className:u()("cursor-pointer hover:text-success-color",{"text-success-color":j.asPath==e.url||j.asPath==e.url2}),children:(0,r.jsxs)(c.Z,{children:[e.name," ",(0,r.jsx)(l.Z,{})]})},s)}})});return(0,x.useEffect)(()=>{h(!1)},[j.asPath]),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"sticky top-0 flex flex-row w-full bg-monocrom-color px-30px py-20px shadow-primary-box-shadow z-50",children:[(0,r.jsx)("div",{className:"flex items-center justify-center",children:(0,r.jsx)(p(),{href:"/",className:"text-30px !text-secondary-color",children:"BacaAku"})}),s&&(0,r.jsx)("div",{className:"flex flex-row ml-auto p-20px space-x-30px",children:P})]}),(0,r.jsx)(y,{visible:m,setVisibility:h,role:a,onCancel:()=>h(!1)})]})}var P=a(9008),F=a.n(P);function T(e){let{showNavbar:s,title:a,showWrappOption:l=!0}=e;return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(F(),{children:[(0,r.jsx)("title",{children:a}),(0,r.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,r.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),s&&(0,r.jsx)(Z,{showWrapperOption:l})]})}},56979:function(e,s,a){"use strict";a.r(s),a.d(s,{default:function(){return m}});var r=a(85893),l=a(37543),t=a(10519),n=a(88190),i=a(82887),c=a(72999),o=a(13448),d=a(44068),u=a(11163);function m(){let{query:e}=(0,u.useRouter)(),[s]=c.Z.useForm(),[a,{isLoading:m}]=(0,i.vE)(),p=r=>{a({newPassword:r.newPassword,resetPasswordToken:e.token}).unwrap().then(e=>{o.Z.success({message:(null==e?void 0:e.message)||"Success"}),s.resetFields()}).catch(e=>{var s;o.Z.error({message:(null==e?void 0:null===(s=e.data)||void 0===s?void 0:s.message)||"Error"})})};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.Z,{title:"Ubah Password",showNavbar:!0,showWrappOption:!1}),(0,r.jsxs)("div",{children:[(0,r.jsx)("div",{className:"flex flex-row justify-center",children:(0,r.jsxs)("div",{className:"inline-block mt-5 text-center align-top ",children:[(0,r.jsx)(d.Z.Title,{className:"mb-2.5",children:"Ubah Password"}),(0,r.jsx)(d.Z.Text,{className:"text-secondary-color",children:"Silakan masukan password baru anda"})]})}),(0,r.jsxs)(c.Z,{form:s,onFinish:p,autoComplete:"off",children:[(0,r.jsx)(c.Z.Item,{className:"px-20 mt-5",name:"password",hasFeedback:!0,rules:[{required:!0,message:"Please input your password!"}],children:(0,r.jsx)(t.Z,{id:"password",type:"password",label:"Password Baru",placeholder:"Password Baru anda"})}),(0,r.jsx)(c.Z.Item,{className:"px-20 mt-5",name:"newPassword",dependencies:["password"],hasFeedback:!0,rules:[{required:!0,message:"Please confirm your password!"},e=>{let{getFieldValue:s}=e;return{validator:(e,a)=>a&&s("password")!==a?Promise.reject(Error("The two passwords that you entered do not match!")):Promise.resolve()}}],children:(0,r.jsx)(t.Z,{id:"newPassword",type:"password",label:"Konfirmasi Password Baru",placeholder:"Mohon untuk periksa kembali password anda"})}),(0,r.jsx)("div",{className:"text-center mt-7",children:(0,r.jsx)(l.Z,{htmlType:"submit",type:"primary",label:"Ganti Password",className:"self-center",loading:m})})]})]})]})}}},function(e){e.O(0,[333,64,774,888,179],function(){return e(e.s=7410)}),_N_E=e.O()}]);