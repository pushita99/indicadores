const admin = [
    {
        label: 'Principal',
        items: [{
            label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/'
        }]
    },  
    {
        label: 'Indicadores', icon: 'pi pi-fw pi-sitemap',
        items: [
            { label: 'Indicadores del mes', icon: 'pi pi-fw pi-chart-bar', to: '/indicatorcompanydirection' },

        ]
    },
    {
        label: 'Nomencladores',
        items: [
            { label: 'Empresas', icon: 'pi pi-fw  pi-list', to: '/companies' },
            { label: 'Direcciones', icon: 'pi pi-fw  pi-list', to: '/directions' },
            { label: 'Tipos de indicadores', icon: 'pi pi-fw  pi-list', to: '/indicators' },
            { label: 'Unidades de medida', icon: 'pi pi-fw  pi-list', to: '/measurementunits' },
           
            { label: 'Reportes', icon: 'pi pi-fw  pi-list', to: '/reportes' }

        ]
    }, 
];

const superadmin = [
{
    label: 'Seguridad', icon: 'pi pi-fw pi-sitemap',
    items: [
        { label: 'Usuarios', icon: 'pi pi-fw pi-users', to: '/users' },
        { label: 'Bitacora', icon: 'pi pi-fw pi-shield', to: '/binnacle' },

    ]
},
{
    label: 'Nomencladores',
    items: [
        { label: 'Unidades de medida', icon: 'pi pi-fw  pi-list', to: '/measurementunits' }, 
        { label: 'Empresas', icon: 'pi pi-fw  pi-list', to: '/companies' },
        { label: 'Direcciones', icon: 'pi pi-fw  pi-list', to: '/directions' },
        { label: 'Tipos de indicadores', icon: 'pi pi-fw  pi-list', to: '/indicators' }
           

    ]
}, 
];
const especialista = [
    {
        label: 'Principal',
        items: [{
            label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/'
        }]
    },
   
    {
        label: 'Indicadores', icon: 'pi pi-fw pi-sitemap',
        items: [
            { label: 'Indicadores del mes', icon: 'pi pi-fw pi-chart-bar', to: '/indicatorcompanydirection' },

        ]
    },
 
];
const director = [
    {
        label: 'Principal',
        items: [{
            label: 'Inicio', icon: 'pi pi-fw pi-home', to: '/'
        }]
    },
    {
        label: 'Reportes',
        items: [
            { label: 'Reportes', icon: 'pi pi-fw  pi-list', to: '/reportes' }
        ]
    },
];

export default function roles(role) {
    let roles = [];
    switch (role) {
        case 'admin':
            roles = admin;        
            break;
        case 'especialista':
            roles = especialista;
            break;
        case 'director': 
            roles = director;
            break;
        case 'superadmin':
             roles = superadmin;
             break;
    }
    return roles;
}