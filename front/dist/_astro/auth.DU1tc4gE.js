var e=async(e,t={})=>{let n=typeof localStorage<`u`?localStorage.getItem(`auth_token`):null,r={"Content-Type":`application/json`};n&&(r.Authorization=`Bearer ${n}`);let i=await fetch(`http://localhost:4000`,{method:`POST`,headers:r,body:JSON.stringify({query:e,variables:t})});if(i.status===401){typeof localStorage<`u`&&localStorage.removeItem(`auth_token`),typeof window<`u`&&(window.location.href=`/login`);return}if(!i.ok){let e=await i.text();throw Error(`API Error: ${i.status} - ${e}`)}let a=await i.json();if(a.errors)throw Error(a.errors[0].message);return a.data},t={query:(t,n={})=>e(t,n),mutation:(t,n={})=>e(t,n)},n=`auth_token`,r=`auth_user`,i={getToken:()=>typeof localStorage>`u`?null:localStorage.getItem(n),getUser:()=>{if(typeof localStorage>`u`)return null;let e=localStorage.getItem(r);if(!e)return null;try{return JSON.parse(e)}catch{return null}},isAuthenticated:()=>!!i.getToken(),setSession:(e,t)=>{typeof localStorage<`u`&&(localStorage.setItem(n,e),localStorage.setItem(r,JSON.stringify(t)),typeof window<`u`&&window.dispatchEvent(new CustomEvent(`auth-changed`)))},logout:()=>{typeof localStorage<`u`&&(localStorage.removeItem(n),localStorage.removeItem(r),typeof window<`u`&&window.dispatchEvent(new CustomEvent(`auth-changed`)))},login:async(e,n)=>{let r=await t.mutation(`
      mutation IniciarSesion($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          usuario {
            id
            nombre
            email
            rol
            telefono
            direccion
          }
        }
      }
    `,{email:e,password:n});if(r?.login?.token)return i.setSession(r.login.token,r.login.usuario),r.login;throw Error(`Respuesta de autenticación inválida.`)},registro:async({nombre:e,email:n,password:r,telefono:a,direccion:o})=>{let s=await t.mutation(`
      mutation RegistrarUsuario(
        $nombre: String!
        $email: String!
        $password: String!
        $telefono: String
        $direccion: String
      ) {
        registro(
          nombre: $nombre
          email: $email
          password: $password
          telefono: $telefono
          direccion: $direccion
        ) {
          token
          usuario {
            id
            nombre
            email
            rol
            telefono
            direccion
          }
        }
      }
    `,{nombre:e,email:n,password:r,telefono:a,direccion:o});if(s?.registro?.token)return i.setSession(s.registro.token,s.registro.usuario),s.registro;throw Error(`Error al registrar usuario.`)},getMe:async()=>{try{let e=await t.query(`
      query ObtenerUsuarioActual {
        me {
          id
          nombre
          email
          rol
          telefono
          direccion
        }
      }
    `);return e?.me?(typeof localStorage<`u`&&localStorage.setItem(r,JSON.stringify(e.me)),e.me):null}catch{return null}}};export{t as n,i as t};