import{s as V}from"./chunk-TT7EF6JP.js";import{g as j,j as F,o as Y,p as $}from"./chunk-WCNMP4L4.js";import{Aa as M,Ea as i,Fa as h,Ra as C,Sb as E,Ta as m,Tb as I,Vb as z,Wb as q,Xa as e,Xb as T,Ya as n,Za as d,ab as v,bb as _,cb as s,fa as O,gb as r,hb as y,ib as l,jb as P,na as u,oa as x,pb as w,qb as k,tb as p,ub as g,vb as S}from"./chunk-VN2BL3SM.js";var B=()=>["/checkout"];function L(a,f){a&1&&(e(0,"div",3),d(1,"div",4),n())}function D(a,f){a&1&&(e(0,"div",12)(1,"div",13),d(2,"i",14),n(),e(3,"h2",15),r(4," Your cart is empty "),n(),e(5,"p",16),r(6," Looks like you haven't added any products to your cart yet. "),n(),e(7,"a",17),d(8,"i",18),r(9," Start Shopping "),n()())}function Q(a,f){if(a&1){let t=v();e(0,"div",43)(1,"div",44)(2,"div",45),d(3,"img",46),n(),e(4,"div",47)(5,"h3",48),r(6),n(),e(7,"p",49),r(8),p(9,"slice"),n(),e(10,"div",50)(11,"span",51),r(12),n(),e(13,"div",52),d(14,"i",53),e(15,"span"),r(16),n(),e(17,"span"),r(18),n()()()(),e(19,"div",54)(20,"button",55),_("click",function(){let c=u(t).$implicit,b=s(3);return x(b.updateQuantity(c.product.id,c.quantity-1))}),d(21,"i",56),n(),e(22,"span",57),r(23),n(),e(24,"button",55),_("click",function(){let c=u(t).$implicit,b=s(3);return x(b.updateQuantity(c.product.id,c.quantity+1))}),d(25,"i",58),n()(),e(26,"div",59)(27,"div",60),r(28),p(29,"number"),n(),e(30,"div",61),r(31),p(32,"number"),n()(),e(33,"button",62),_("click",function(){let c=u(t).$implicit,b=s(3);return x(b.removeFromCart(c.product.id))}),d(34,"i",63),n()()()}if(a&2){let t=f.$implicit,o=s(3);i(3),m("src",t.product.image,M)("alt",t.product.title),i(3),l(" ",t.product.title," "),i(2),l(" ",S(9,12,t.product.description,0,80),"... "),i(4),y(t.product.category),i(4),y(t.product.rating.rate),i(2),l("(",t.product.rating.count,")"),i(2),m("disabled",t.quantity<=1),i(3),y(t.quantity),i(),m("disabled",t.quantity>=10),i(4),l(" $",g(29,16,o.getItemTotal(t),"1.2-2")," "),i(3),l(" $",g(32,19,t.product.price,"1.2-2")," each ")}}function R(a,f){if(a&1){let t=v();e(0,"div",19)(1,"div",20)(2,"div",21)(3,"div",22),C(4,Q,35,22,"div",23),n(),e(5,"div",24)(6,"button",25),_("click",function(){u(t);let c=s(2);return x(c.clearCart())}),d(7,"i",26),r(8," Clear Cart "),n()()(),e(9,"div",27)(10,"div",28)(11,"h2",29),r(12,"Order Summary"),n(),e(13,"div",30)(14,"div",31)(15,"span",32),r(16),n(),e(17,"span",33),r(18),p(19,"number"),n()(),e(20,"div",31)(21,"span",32),r(22,"Shipping"),n(),e(23,"span",34),r(24,"Free"),n()(),e(25,"div",31)(26,"span",32),r(27,"Tax"),n(),e(28,"span",33),r(29),p(30,"number"),n()()(),e(31,"div",35)(32,"div",36)(33,"span",37),r(34,"Total"),n(),e(35,"span",38),r(36),p(37,"number"),n()()(),e(38,"button",39),d(39,"i",40),r(40," Proceed to Checkout "),n(),e(41,"a",41),d(42,"i",42),r(43," Continue Shopping "),n()()()()()}if(a&2){let t=s(2);i(4),m("ngForOf",t.cartItems),i(12),l("Items (",t.getCartItemCount(),")"),i(2),l("$",g(19,7,t.getCartTotal(),"1.2-2"),""),i(11),l("$",g(30,10,t.getCartTotal()*.1,"1.2-2"),""),i(7),l(" $",g(37,13,t.getCartTotal()*1.1,"1.2-2")," "),i(2),m("routerLink",k(16,B))("disabled",t.isCartEmpty())}}function N(a,f){if(a&1&&(e(0,"div",5)(1,"div",6)(2,"h1",7),d(3,"i",8),r(4," Shopping Cart "),n(),e(5,"p",9),r(6),n()(),C(7,D,10,0,"div",10)(8,R,44,17,"div",11),n()),a&2){let t=s();i(6),P(" ",t.cartItems.length," item",t.cartItems.length!==1?"s":""," in your cart "),i(),m("ngIf",t.isCartEmpty()),i(),m("ngIf",!t.isCartEmpty())}}var X=(()=>{class a{constructor(t,o){this.cartService=t,this.errorService=o,this.cartItems=[],this.loading=!0}ngOnInit(){this.cartSubscription=this.cartService.cartItems$.subscribe(t=>{this.cartItems=t,this.loading=!1})}ngOnDestroy(){this.cartSubscription&&this.cartSubscription.unsubscribe()}updateQuantity(t,o){o<=0?this.removeFromCart(t):this.cartService.updateQuantity(t,o)}removeFromCart(t){let o=this.cartItems.find(c=>c.product.id===t);o&&(this.cartService.removeFromCart(t),this.errorService.addError(`${o.product.title} removed from cart`,"info"))}clearCart(){this.cartService.clearCart(),this.errorService.addError("Cart cleared","info")}getCartTotal(){return this.cartService.getCartTotal()}getCartItemCount(){return this.cartService.getCartItemCount()}getItemTotal(t){return t.product.price*t.quantity}isCartEmpty(){return this.cartItems.length===0}static{this.\u0275fac=function(o){return new(o||a)(h(Y),h($))}}static{this.\u0275cmp=O({type:a,selectors:[["app-cart"]],standalone:!0,features:[w],decls:3,vars:2,consts:[[1,"cart-page","container","mx-auto","py-8","px-4"],["class","spinner-container",4,"ngIf"],["class","fade-in",4,"ngIf"],[1,"spinner-container"],[1,"spinner"],[1,"fade-in"],[1,"cart-header","mb-8"],[1,"text-3xl","font-bold","text-gray-800"],[1,"fa-solid","fa-cart-shopping","mr-3"],[1,"text-gray-600","mt-2"],["class","empty-cart text-center py-16",4,"ngIf"],["class","cart-content",4,"ngIf"],[1,"empty-cart","text-center","py-16"],[1,"empty-cart-icon","mb-6"],[1,"fa-solid","fa-cart-plus","text-6xl","text-gray-300"],[1,"text-2xl","font-semibold","text-gray-700","mb-4"],[1,"text-gray-500","mb-8"],["routerLink","/products",1,"btn","btn-primary","btn-lg"],[1,"fa-solid","fa-store","mr-2"],[1,"cart-content"],[1,"grid","grid-cols-1","lg:grid-cols-3","gap-8"],[1,"lg:col-span-2"],[1,"cart-items"],["class","cart-item bg-white rounded-lg shadow-md p-6 mb-4",4,"ngFor","ngForOf"],[1,"cart-actions","mt-6"],[1,"btn","btn-outline","btn-danger",3,"click"],[1,"fa-solid","fa-trash","mr-2"],[1,"cart-summary"],[1,"summary-card","bg-white","rounded-lg","shadow-md","p-6"],[1,"text-xl","font-bold","text-gray-800","mb-6"],[1,"summary-items","space-y-3","mb-6"],[1,"summary-item","flex","justify-between"],[1,"text-gray-600"],[1,"font-medium"],[1,"font-medium","text-green-600"],[1,"total-section","border-t","pt-4","mb-6"],[1,"total","flex","justify-between","items-center"],[1,"text-xl","font-bold","text-gray-800"],[1,"text-2xl","font-bold","text-primary"],[1,"btn","btn-primary","btn-lg","w-full","mb-4",3,"routerLink","disabled"],[1,"fa-solid","fa-credit-card","mr-2"],["routerLink","/products",1,"btn","btn-outline","w-full"],[1,"fa-solid","fa-arrow-left","mr-2"],[1,"cart-item","bg-white","rounded-lg","shadow-md","p-6","mb-4"],[1,"flex","items-center","gap-4"],[1,"product-image"],[1,"w-20","h-20","object-cover","rounded-lg",3,"src","alt"],[1,"product-info","flex-1"],[1,"text-lg","font-semibold","text-gray-800","mb-2"],[1,"text-gray-600","text-sm","mb-2"],[1,"product-meta","flex","items-center","gap-4","text-sm","text-gray-500"],[1,"category"],[1,"rating","flex","items-center","gap-1"],[1,"fa-solid","fa-star","text-yellow-400"],[1,"quantity-controls","flex","items-center","gap-3"],[1,"quantity-btn",3,"click","disabled"],[1,"fa-solid","fa-minus"],[1,"quantity-display"],[1,"fa-solid","fa-plus"],[1,"price-info","text-right"],[1,"item-price","text-xl","font-bold","text-primary"],[1,"unit-price","text-sm","text-gray-500"],["title","Remove from cart",1,"remove-btn",3,"click"],[1,"fa-solid","fa-trash"]],template:function(o,c){o&1&&(e(0,"div",0),C(1,L,2,0,"div",1)(2,N,9,4,"div",2),n()),o&2&&(i(),m("ngIf",c.loading),i(),m("ngIf",!c.loading))},dependencies:[T,E,I,q,z,F,j,V],styles:[".cart-page[_ngcontent-%COMP%]{min-height:100vh;background:radial-gradient(ellipse at 60% 20%,#e0e7ff,#f9fafb 70%,#f3f4f6);padding:2rem 1rem;position:relative}.fade-in[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_fadeInCart .7s cubic-bezier(.4,0,.2,1)}@keyframes _ngcontent-%COMP%_fadeInCart{0%{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}.cart-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:2.5rem;font-weight:800;margin-bottom:1rem;color:var(--primary, #2563eb);letter-spacing:-.01em;text-align:center}.empty-cart[_ngcontent-%COMP%]{background:#fff;border-radius:1.1rem;box-shadow:0 2px 16px #2563eb14;border:1.5px solid #e0e7ff;padding:3rem 2rem;text-align:center;transition:box-shadow .22s,transform .22s,border .22s}.empty-cart[_ngcontent-%COMP%]:hover{box-shadow:0 8px 32px #2563eb2e;border:1.5px solid var(--primary, #2563eb)}.empty-cart-icon[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{animation:_ngcontent-%COMP%_float 3s ease-in-out infinite;color:var(--primary, #2563eb);font-size:3rem;margin-bottom:1rem}@keyframes _ngcontent-%COMP%_float{0%,to{transform:translateY(0)}50%{transform:translateY(-10px)}}.cart-item[_ngcontent-%COMP%]{background:#fff;border-radius:1.1rem;box-shadow:0 2px 16px #2563eb14;transition:all .22s cubic-bezier(.4,0,.2,1);border:1.5px solid #e0e7ff;padding:1.2rem;margin-bottom:1rem}.cart-item[_ngcontent-%COMP%]:hover{transform:translateY(-4px);box-shadow:0 8px 32px #2563eb2e;border:1.5px solid var(--primary, #2563eb)}.product-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:60px;height:60px;border-radius:.7rem;box-shadow:0 1px 8px #2563eb12;transition:transform .22s;object-fit:cover}.cart-item[_ngcontent-%COMP%]:hover   .product-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{transform:scale(1.05)}.product-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#23272f;line-height:1.4;font-weight:700;font-size:1rem;margin-bottom:.3rem}.product-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#4b5563;line-height:1.5;font-size:.9rem;opacity:.88;margin-bottom:.2rem}.product-meta[_ngcontent-%COMP%]{font-size:.8rem}.category[_ngcontent-%COMP%]{background:#e0e7ff;color:var(--primary, #2563eb);padding:.2rem .6rem;border-radius:.7rem;text-transform:capitalize;font-weight:600;font-size:.75rem}.rating[_ngcontent-%COMP%]{color:#f59e0b}.quantity-controls[_ngcontent-%COMP%]{background:#f3f4f6;border-radius:.7rem;padding:.2rem;border:1.5px solid #e0e7ff}.quantity-btn[_ngcontent-%COMP%]{width:28px;height:28px;border:1px solid #e0e7ff;border-radius:.5rem;background:#fff;color:var(--primary, #2563eb);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .22s cubic-bezier(.4,0,.2,1);font-weight:700;font-size:.8rem}.quantity-btn[_ngcontent-%COMP%]:hover:not(:disabled){background:var(--primary, #2563eb);color:#fff;border-color:var(--primary, #2563eb);transform:scale(1.05)}.quantity-btn[_ngcontent-%COMP%]:disabled{opacity:.4;cursor:not-allowed;background:#f1f5f9}.quantity-display[_ngcontent-%COMP%]{min-width:36px;text-align:center;font-weight:700;color:#23272f;font-size:.9rem}.price-info[_ngcontent-%COMP%]{text-align:right}.item-price[_ngcontent-%COMP%]{color:var(--primary, #2563eb);font-weight:700;font-size:1.1rem}.unit-price[_ngcontent-%COMP%]{color:#4b5563;font-size:.8rem;opacity:.88}.remove-btn[_ngcontent-%COMP%]{width:32px;height:32px;border:1.5px solid #fecaca;border-radius:.7rem;background:#fee2e2;color:#dc2626;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .22s cubic-bezier(.4,0,.2,1);font-size:.9rem}.remove-btn[_ngcontent-%COMP%]:hover{background:#dc2626;color:#fff;transform:scale(1.05);box-shadow:0 4px 12px #dc26264d}.cart-actions[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:12px;margin-top:1.5rem}.btn-danger[_ngcontent-%COMP%]{color:#dc2626;border-color:#dc2626;background:#fff;transition:all .22s cubic-bezier(.4,0,.2,1);border:1.5px solid #dc2626;border-radius:.7rem;padding:.6rem 1.2rem;font-weight:600;font-size:.9rem}.btn-danger[_ngcontent-%COMP%]:hover{background:#dc2626;color:#fff;transform:translateY(-2px);box-shadow:0 4px 12px #dc26264d}.summary-card[_ngcontent-%COMP%]{background:#fff;border-radius:1.1rem;box-shadow:0 2px 16px #2563eb14;border:1.5px solid #e0e7ff;position:sticky;top:2rem;padding:1.5rem;transition:box-shadow .22s,transform .22s,border .22s}.summary-card[_ngcontent-%COMP%]:hover{box-shadow:0 8px 32px #2563eb2e;border:1.5px solid var(--primary, #2563eb)}.summary-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:var(--primary, #2563eb);border-bottom:1.5px solid #e0e7ff;padding-bottom:12px;font-weight:700;font-size:1.1rem;margin-bottom:1.2rem}.summary-items[_ngcontent-%COMP%]{space-y:16px}.summary-item[_ngcontent-%COMP%]{padding:.6rem 0;border-bottom:1px solid #e0e7ff;display:flex;justify-content:space-between;align-items:center;font-size:.9rem}.summary-item[_ngcontent-%COMP%]:last-child{border-bottom:none}.summary-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child{color:#4b5563;font-weight:500}.summary-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child{color:#23272f;font-weight:600}.total-section[_ngcontent-%COMP%]{border-top:1.5px solid #e0e7ff;margin-top:16px;padding-top:16px}.total[_ngcontent-%COMP%]{font-size:1.1rem;display:flex;justify-content:space-between;align-items:center}.total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child{color:#23272f;font-weight:700}.total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child{color:var(--primary, #2563eb);font-weight:800;font-size:1.3rem}.btn[_ngcontent-%COMP%]{padding:.75rem 1.2rem;border-radius:.7rem;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;transition:all .22s cubic-bezier(.4,0,.2,1);cursor:pointer;border:1.5px solid transparent;font-size:.9rem}.btn-primary[_ngcontent-%COMP%]{background:var(--primary, #2563eb);color:#fff;box-shadow:0 2px 16px #2563eb2e}.btn-primary[_ngcontent-%COMP%]:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 8px 32px #2563eb4d;background:#1741a6}.btn-primary[_ngcontent-%COMP%]:disabled{opacity:.6;cursor:not-allowed;transform:none}.btn-outline[_ngcontent-%COMP%]{background:#fff;color:var(--primary, #2563eb);border-color:var(--primary, #2563eb)}.btn-outline[_ngcontent-%COMP%]:hover{background:var(--primary, #2563eb);color:#fff;transform:translateY(-2px)}.btn-lg[_ngcontent-%COMP%]{padding:.8rem 1.5rem;font-size:1rem}@media (max-width: 1024px){.summary-card[_ngcontent-%COMP%]{position:static;margin-top:24px}}@media (max-width: 768px){.cart-item[_ngcontent-%COMP%]   .flex[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start;gap:12px}.quantity-controls[_ngcontent-%COMP%]{align-self:center;order:2}.price-info[_ngcontent-%COMP%]{align-self:flex-end;order:3}.remove-btn[_ngcontent-%COMP%]{align-self:flex-end;order:4}.cart-actions[_ngcontent-%COMP%]{justify-content:center}.btn-lg[_ngcontent-%COMP%]{padding:.7rem 1.3rem;font-size:.9rem}}@media (max-width: 480px){.cart-page[_ngcontent-%COMP%]{padding:1rem .5rem}.cart-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font-size:1.75rem}.cart-item[_ngcontent-%COMP%]{padding:1rem}.product-image[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:50px;height:50px}.summary-card[_ngcontent-%COMP%]{padding:1.2rem}}@media (prefers-color-scheme: dark){.cart-page[_ngcontent-%COMP%]{background:radial-gradient(ellipse at 60% 20%,#23272f,#18181b 70%,#101014)}.cart-header[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{color:#90b4fa}.cart-item[_ngcontent-%COMP%], .summary-card[_ngcontent-%COMP%], .empty-cart[_ngcontent-%COMP%]{background:#23272f;border:1.5px solid #232c3b;color:#f3f4f6}.cart-item[_ngcontent-%COMP%]:hover, .summary-card[_ngcontent-%COMP%]:hover, .empty-cart[_ngcontent-%COMP%]:hover{border:1.5px solid #90b4fa;box-shadow:0 8px 32px #2563eb2e}.product-info[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{color:#f3f4f6}.product-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#bdbdbd}.category[_ngcontent-%COMP%]{background:#232c3b;color:#90b4fa}.quantity-controls[_ngcontent-%COMP%]{background:#18181b;border:1.5px solid #232c3b}.quantity-btn[_ngcontent-%COMP%]{background:#23272f;border:1px solid #4b5563;color:#90b4fa}.quantity-btn[_ngcontent-%COMP%]:hover:not(:disabled){background:#90b4fa;color:#23272f}.quantity-display[_ngcontent-%COMP%]{color:#f3f4f6}.summary-card[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#90b4fa;border-bottom-color:#232c3b}.summary-item[_ngcontent-%COMP%]{border-bottom-color:#232c3b}.summary-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child{color:#bdbdbd}.summary-item[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child{color:#f3f4f6}.total-section[_ngcontent-%COMP%]{border-top-color:#232c3b}.total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:first-child{color:#f3f4f6}.total[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]:last-child{color:#90b4fa}.btn-outline[_ngcontent-%COMP%]{background:#23272f;color:#90b4fa;border-color:#90b4fa}.btn-outline[_ngcontent-%COMP%]:hover{background:#90b4fa;color:#23272f}}",`.spinner-container[_ngcontent-%COMP%] {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .spinner[_ngcontent-%COMP%] {
    width: 3rem;
    height: 3rem;
    border: 4px solid #e0e7ff;
    border-top: 4px solid var(--primary, #2563eb);
    border-radius: 50%;
    animation: _ngcontent-%COMP%_spin 0.8s linear infinite;
  }
  @keyframes _ngcontent-%COMP%_spin {
    to {
      transform: rotate(360deg);
    }
  }
  .fade-in[_ngcontent-%COMP%] {
    animation: _ngcontent-%COMP%_fadeIn 0.5s ease-in;
  }
  @keyframes _ngcontent-%COMP%_fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .quantity-btn[_ngcontent-%COMP%] {
    width: 32px;
    height: 32px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    background: white;
    color: #374151;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  .quantity-btn[_ngcontent-%COMP%]:hover:not(:disabled) {
    background: #f3f4f6;
    border-color: #9ca3af;
  }
  .quantity-btn[_ngcontent-%COMP%]:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .quantity-display[_ngcontent-%COMP%] {
    min-width: 40px;
    text-align: center;
    font-weight: 600;
    color: #374151;
  }
  .remove-btn[_ngcontent-%COMP%] {
    width: 40px;
    height: 40px;
    border: 1px solid #fecaca;
    border-radius: 8px;
    background: #fee2e2;
    color: #dc2626;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s;
  }
  .remove-btn[_ngcontent-%COMP%]:hover {
    background: #fecaca;
    border-color: #fca5a5;
  }
  .btn-danger[_ngcontent-%COMP%] {
    color: #dc2626;
    border-color: #dc2626;
  }
  .btn-danger[_ngcontent-%COMP%]:hover {
    background: #dc2626;
    color: white;
  }
  .empty-cart-icon[_ngcontent-%COMP%] {
    opacity: 0.6;
  }
  .cart-item[_ngcontent-%COMP%] {
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .cart-item[_ngcontent-%COMP%]:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  }
  .summary-card[_ngcontent-%COMP%] {
    position: sticky;
    top: 2rem;
  }
  @media (max-width: 768px) {
    .cart-item[_ngcontent-%COMP%]   .flex[_ngcontent-%COMP%] {
      flex-direction: column;
      align-items: flex-start;
      gap: 1rem;
    }
    .quantity-controls[_ngcontent-%COMP%] {
      align-self: center;
    }
    .price-info[_ngcontent-%COMP%] {
      align-self: flex-end;
    }
    .remove-btn[_ngcontent-%COMP%] {
      align-self: flex-end;
    }
  }`]})}}return a})();export{X as CartComponent};
