export default function routeTable(role) {
    const routes = {
        beneficiary: '/beneficiario',
        ubs: '/ubs',
        warehouse: '/almoxarifado',
        secretary: '/secretaria'
    };

    return routes[role] || '/login';
}   