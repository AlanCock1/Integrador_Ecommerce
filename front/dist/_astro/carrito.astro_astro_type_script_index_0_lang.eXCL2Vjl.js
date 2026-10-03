import{t as e}from"./cart.DMgG0ncx.js";var t=document.getElementById(`cart-empty-view`),n=document.getElementById(`cart-content-view`),r=document.getElementById(`cart-items-container`),i=document.getElementById(`cart-items-title`),a=document.getElementById(`clear-all-cart-btn`),o=document.getElementById(`summary-subtotal`),s=document.getElementById(`discount-row`),c=document.getElementById(`discount-name`),l=document.getElementById(`summary-discount`),u=document.getElementById(`summary-shipping`),d=document.getElementById(`summary-total`),f=document.getElementById(`shipping-msg-text`),p=document.getElementById(`shipping-progress-bar`),m=document.getElementById(`coupon-input`),h=document.getElementById(`apply-coupon-btn`),g=document.getElementById(`coupon-alert`),_=document.getElementById(`proceed-checkout-btn`);function v(){let a=e.getItems(),m=e.getCount();if(a.length===0){t&&(t.style.display=`block`),n&&(n.style.display=`none`);return}t&&(t.style.display=`none`),n&&(n.style.display=`grid`),i&&(i.textContent=`Artículos en el carrito (${m})`),r&&(r.innerHTML=a.map(e=>`
        <div class="cart-item-row" data-id="${e.id}">
          <div class="cart-item-thumb">
            <img src="${e.imagen}" alt="${e.titulo}" />
          </div>

          <div class="cart-item-info">
            <h4><a href="/producto/${e.id}">${e.titulo}</a></h4>
            <p class="cart-item-author">${e.autor}</p>
            <span class="cart-item-unit-price">$${Number(e.precio).toFixed(2)} MXN c/u</span>
          </div>

          <div class="qty-widget">
            <button type="button" class="qty-btn-sm btn-minus" data-id="${e.id}" aria-label="Restar">−</button>
            <span class="qty-val-sm">${e.cantidad}</span>
            <button type="button" class="qty-btn-sm btn-plus" data-id="${e.id}" aria-label="Sumar">+</button>
          </div>

          <div class="cart-item-subtotal-col">
            <span class="item-total-price">$${(Number(e.precio)*Number(e.cantidad)).toFixed(2)} MXN</span>
            <button type="button" class="remove-item-btn btn-remove" data-id="${e.id}">
              Eliminar
            </button>
          </div>
        </div>
      `).join(``),r.querySelectorAll(`.btn-minus`).forEach(t=>{t.addEventListener(`click`,t=>{let n=t.currentTarget.dataset.id,r=a.find(e=>String(e.id)===String(n));r&&(e.updateQuantity(n,r.cantidad-1),v())})}),r.querySelectorAll(`.btn-plus`).forEach(t=>{t.addEventListener(`click`,t=>{let n=t.currentTarget.dataset.id,r=a.find(e=>String(e.id)===String(n));if(r)try{e.updateQuantity(n,r.cantidad+1),v()}catch(e){window.showToast&&window.showToast(e.message,`warning`)}})}),r.querySelectorAll(`.btn-remove`).forEach(t=>{t.addEventListener(`click`,t=>{let n=t.currentTarget.dataset.id;e.removeItem(n),v()})}));let h=e.getFinancials();if(o&&(o.textContent=`$${h.subtotal.toFixed(2)} MXN`),u&&(u.textContent=h.shipping===0?`GRATIS`:`$${h.shipping.toFixed(2)} MXN`),d&&(d.textContent=`$${h.total.toFixed(2)} MXN`),h.discount>0&&s?(s.style.display=`flex`,c&&(c.textContent=h.coupon||`Cupón`),l&&(l.textContent=`-$${h.discount.toFixed(2)} MXN`)):s&&(s.style.display=`none`),h.subtotal>=999)f&&(f.textContent=`¡Felicidades! Tienes Envío GRATIS en esta compra.`),p&&(p.style.width=`100%`);else{let e=999-h.subtotal,t=Math.min(100,Math.round(h.subtotal/999*100));f&&(f.textContent=`Faltan $${e.toFixed(2)} MXN para obtener Envío GRATIS`),p&&(p.style.width=`${t}%`)}}if(v(),window.addEventListener(`cart-updated`,v),a&&a.addEventListener(`click`,()=>{confirm(`¿Estás seguro de que deseas vaciar tu carrito?`)&&(e.clearCart(),v())}),h&&m){let t=e.getCoupon();t&&(m.value=t),h.addEventListener(`click`,()=>{let t=m.value.trim(),n=e.applyCoupon(t);g&&(g.textContent=n.message,g.className=`coupon-alert ${n.valid?`success`:`error`}`,g.style.display=`block`),v()})}_&&_.addEventListener(`click`,()=>{window.location.href=`/checkout`});