import{t as e}from"./cart.DMgG0ncx.js";import{n as t,t as n}from"./auth.DU1tc4gE.js";var r=document.getElementById(`auth-required-box`),i=document.getElementById(`checkout-main-view`),a=document.getElementById(`checkout-form`),o=document.getElementById(`submit-order-btn`),s=document.getElementById(`checkout-error-alert`),c=document.getElementById(`order-items-preview`),l=document.getElementById(`chk-subtotal`),u=document.getElementById(`chk-discount-row`),d=document.getElementById(`chk-discount`),f=document.getElementById(`chk-shipping`),p=document.getElementById(`chk-total`);if(!n.isAuthenticated())r&&(r.style.display=`block`),i&&(i.style.display=`none`);else{r&&(r.style.display=`none`),i&&(i.style.display=`grid`);let m=e.getItems();m.length===0&&(window.showToast&&window.showToast(`Tu carrito está vacío. Agrega libros primero.`,`info`),setTimeout(()=>{window.location.href=`/catalogo`},500));let h=n.getUser();if(h){let e=document.getElementById(`nombreCliente`),t=document.getElementById(`emailCliente`),n=document.getElementById(`telefonoCliente`),r=document.getElementById(`direccionEnvio`);e&&(e.value=h.nombre||``),t&&(t.value=h.email||``),n&&h.telefono&&(n.value=h.telefono),r&&h.direccion&&(r.value=h.direccion)}c&&(c.innerHTML=m.map(e=>`
        <div class="order-item-mini">
          <img src="${e.imagen}" alt="${e.titulo}" class="mini-thumb" />
          <div class="mini-details">
            <span class="mini-title">${e.titulo}</span>
            <span class="mini-meta">Cant: ${e.cantidad} × $${Number(e.precio).toFixed(2)}</span>
          </div>
          <span class="mini-price">$${(Number(e.precio)*Number(e.cantidad)).toFixed(2)}</span>
        </div>
      `).join(``));let g=e.getFinancials();l&&(l.textContent=`$${g.subtotal.toFixed(2)} MXN`),f&&(f.textContent=g.shipping===0?`GRATIS`:`$${g.shipping.toFixed(2)} MXN`),p&&(p.textContent=`$${g.total.toFixed(2)} MXN`),g.discount>0&&u&&(u.style.display=`flex`,d&&(d.textContent=`-$${g.discount.toFixed(2)} MXN`)),document.querySelectorAll(`.payment-card-option`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.payment-card-option`).forEach(e=>e.classList.remove(`selected`)),e.classList.add(`selected`);let t=e.querySelector(`input`);t&&(t.checked=!0);let n=document.getElementById(`card-fields-box`);n&&(n.style.display=t.value===`TARJETA_CREDITO`||t.value===`TARJETA_DEBITO`?`block`:`none`)})}),a&&a.addEventListener(`submit`,async n=>{n.preventDefault(),s&&(s.style.display=`none`);let r=document.getElementById(`nombreCliente`).value.trim(),i=document.getElementById(`emailCliente`).value.trim(),a=document.getElementById(`direccionEnvio`).value.trim(),c=document.getElementById(`ciudadCliente`).value.trim(),l=document.querySelector(`input[name="metodoPago"]:checked`),u=l?l.value:`TARJETA_CREDITO`,d=`${a}, ${c}`,f=m.map(e=>({productoId:e.id,cantidad:e.cantidad}));o.disabled=!0,o.innerHTML=`<span>⏳ Procesando pago y registrando orden...</span>`;try{let n=await t.mutation(`
          mutation CrearPedidoDirecto($datos: PedidoInput!) {
            crearPedido(datos: $datos) {
              id
              folio
              fecha
              subtotal
              envio
              total
              status
              metodoPago
              nombreCliente
            }
          }
        `,{datos:{items:f,metodoPago:u,direccionEnvio:d,nombreCliente:r,emailCliente:i,usuarioId:h?h.id:null}});if(n?.crearPedido?.folio)e.clearCart(),window.showToast&&window.showToast(`¡Orden generada exitosamente!`,`success`),setTimeout(()=>{window.location.href=`/orden-confirmada?folio=${n.crearPedido.folio}`},500);else throw Error(`No se recibió el folio de confirmación.`)}catch(e){s&&(s.textContent=e.message||`Error al procesar la orden. Verifica la disponibilidad.`,s.style.display=`block`),o.disabled=!1,o.innerHTML=`<span>Confirmar y Pagar Orden</span>`}})}