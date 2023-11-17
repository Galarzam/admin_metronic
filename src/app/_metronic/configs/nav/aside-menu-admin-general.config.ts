export const AsideMenuAdminGeneral = {
    items: [
      {
        title: 'Pandel de Administracion',
        root: true,
        name: "dashboard",
        icon: 'flaticon2-architecture-and-city',
        svg: './assets/media/svg/icons/Design/Layers.svg',
        page: '/dashboard',
        translate: 'MENU.DASHBOARD',
        bullet: 'dot',
      },
      { section: 'Usuario' }, 
      {
        title: 'Usuarios',
        root: true,
        name: "users",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/General/User.svg',
        page: '/users',
        submenu: [
          {
            title: 'Gestion Usuarios',
            page: '/users/list'
          }
        ]
      },
      { section: 'Comercial' }, 
      {
        title: 'Ventas',
        root: true,
        name: "ventas",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Shopping/Cart1.svg',
        page: '/ventas',
        submenu: [
          {
            title: 'Gestion de Ordenes',
            page: '/ventas/lista-de-ordenes'
          }
        ]
      },

      { section: 'Productos' }, 
      {
        title: 'Categorias',
        root: true,
        name: "categorias",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Text/Bullet-list.svg',
        page: '/categorias',
        submenu: [
          {
            title: 'Gestion Categorias',
            page: '/categorias/list'
          }
        ]
      },
 
      {
        title: 'Productos',
        root: true,
        name: "products",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Home/Commode2.svg',
        page: '/products',
        submenu: [
          {
            title: 'Crear Producto',
            page: '/products/add-product'
          },
          {
            title: 'Productos Listados',
            page: '/products/list-product'
          }
        ]
      },

      {
        title: 'Sliders',
        root: true,
        name: "sliders",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Layout/Layout-3d.svg',
        page: '/sliders',
        submenu: [
          {
            title: 'Lista de Slider',
            page: '/sliders/lista'
          }
        ]
      },

      {
      title: 'Cupones',
      root: true,
      name: "cupones",
      bullet: 'dot',
      icon: 'flaticon2-user-outline-symbol',
      svg: './assets/media/svg/icons/Shopping/Price2.svg',
      page: '/cupones',
      submenu: [
        {
          title: 'Regitrar Cupon',
          page: '/cupones/registrar-cupon'
        },
        {
          title: 'Listar Cupones',
          page: '/cupones/lista-cupones'
        }
      ]
    },

      {
        title: 'Descuento',
        root: true,
        name: "descuento",
        bullet: 'dot',
        icon: 'flaticon2-user-outline-symbol',
        svg: './assets/media/svg/icons/Shopping/Sale2.svg',
        page: '/descuento',
        submenu: [
          {
            title: 'Registrar Descuento',
            page: '/descuento/registrar-descuento'
          },
          {
            title: 'Listar descuentos',
            page: '/descuento/lista-descuentos'
          }
        ]
      },
    ]
}