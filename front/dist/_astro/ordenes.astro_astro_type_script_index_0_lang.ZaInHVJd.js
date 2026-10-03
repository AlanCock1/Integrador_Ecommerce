import{n as e,t}from"./auth.DU1tc4gE.js";var n=document.getElementById(`orders-auth-box`),r=document.getElementById(`orders-main-view`),i=document.getElementById(`orders-loading`),a=document.getElementById(`orders-empty`),o=document.getElementById(`orders-list`),s=document.getElementById(`user-greeting-text`),c=document.getElementById(`refresh-orders-btn`);if(!t.isAuthenticated())n&&(n.style.display=`block`),r&&(r.style.display=`none`);else{n&&(n.style.display=`none`),r&&(r.style.display=`block`);let l=t.getUser();l&&s&&(s.textContent=`Pedidos realizados por ${l.nombre} (${l.email})`);async function u(){i&&(i.style.display=`block`),a&&(a.style.display=`none`),o&&(o.style.display=`none`);try{let t=[];try{t=(await e.query(`
        query MisOrdenesDeCompra {
          misPedidos {
            id
            folio
            fecha
            subtotal
            envio
            total
            status
            metodoPago
            direccionEnvio
            nombreCliente
            detalles {
              id
              cantidad
              precioUnitario
              subtotal
              producto {
                id
                titulo
                autor
                precio
                imagen
              }
            }
          }
        }
      `))?.misPedidos||[]}catch{t=(await e.query(`
            query TodosLosPedidos {
              pedidos {
                id
                folio
                fecha
                subtotal
                envio
                total
                status
                metodoPago
                direccionEnvio
                nombreCliente
                detalles {
                  id
                  cantidad
                  precioUnitario
                  subtotal
                  producto {
                    id
                    titulo
                    autor
                    precio
                    imagen
                  }
                }
              }
            }
          `))?.pedidos||[]}if(i&&(i.style.display=`none`),t.length===0){a&&(a.style.display=`block`),o&&(o.style.display=`none`);return}a&&(a.style.display=`none`),o&&(o.style.display=`flex`,o.innerHTML=t.map(e=>{let t=e.fecha?new Date(e.fecha).toLocaleString(`es-MX`,{dateStyle:`medium`,timeStyle:`short`}):`Fecha reciente`,n=e.status===`PAGADO`?`badge-success`:`badge-warning`,r=(e.detalles||[]).map(e=>`
              <div class="order-item-row">
                <div>
                  <span class="order-item-title">${e.producto?.titulo||`Libro`}</span>
                  <span class="order-item-qty">× ${e.cantidad} un. ($${Number(e.precioUnitario).toFixed(2)})</span>
                </div>
                <span class="order-item-price">$${Number(e.subtotal).toFixed(2)} MXN</span>
              </div>
            `).join(``);return`
              <div class="order-card card">
                <div class="order-card-header">
                  <div class="order-header-left">
                    <span class="order-folio">${e.folio}</span>
                    <span class="order-date">${t}</span>
                    <span class="badge ${n}">${e.status}</span>
                  </div>
                  <div class="order-header-right">
                    <span class="order-total-badge">$${Number(e.total).toFixed(2)} MXN</span>
                  </div>
                </div>

                <div class="order-card-body">
                  <div class="order-meta-grid">
                    <div class="meta-col">
                      <strong>Destinatario</strong>
                      <span>${e.nombreCliente}</span>
                    </div>
                    <div class="meta-col">
                      <strong>Dirección de Entrega</strong>
                      <span>${e.direccionEnvio||`Guadalajara, Jalisco`}</span>
                    </div>
                    <div class="meta-col">
                      <strong>Método de Pago</strong>
                      <span>${e.metodoPago.replace(`_`,` `)}</span>
                    </div>
                    <div class="meta-col">
                      <strong>Costo de Envío</strong>
                      <span>${Number(e.envio)===0?`GRATIS`:`$${Number(e.envio).toFixed(2)} MXN`}</span>
                    </div>
                  </div>

                  <h4 class="order-items-title">Libros incluidos en la orden:</h4>
                  <div class="order-items-table">
                    ${r||`<p style="color:var(--color-text-muted); font-size:0.85rem;">Detalles registrados en almacén.</p>`}
                  </div>
                </div>
              </div>
            `}).join(``))}catch(e){i&&(i.innerHTML=`<p style="color:#ef4444;">No se pudieron cargar las órdenes: ${e.message}</p>`)}}u(),c&&c.addEventListener(`click`,u)}