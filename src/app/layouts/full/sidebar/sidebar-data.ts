import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:chart-bold',
    route: '/dashboard',
    roles: ['Admin', 'Owner'],
  },

  {
    displayName: 'Cashier',
    iconName: 'solar:cash-out-bold-duotone',
    route: '/cashier',
    roles: ['Admin', 'Cashier', 'Owner'],
  },
  {
    displayName: 'Sales',
    iconName: 'solar:hand-money-bold',
    route: '/sales',
    roles: ['Admin', 'Cashier', 'Owner'],
  },
  {
    displayName: 'Products',
    iconName: 'solar:widget-add-line-duotone',
    route: '/products',
    roles: ['Admin', 'Inventory'],
  },

  {
    displayName: 'Product Category',
    iconName: 'tabler:category',
    route: '/product-category',
    roles: ['Admin', 'Inventory'],
  },
  {
    displayName: 'Stocks Receiving',
    iconName: 'line-md:backup-restore',
    route: '/stocks-receiving',
    roles: ['Admin', 'Inventory'],
  },

  {
    displayName: 'Storage Location',
    iconName: 'tabler:current-location-filled',
    route: '/storage-location',
    roles: ['Admin', 'Inventory'],
  },

  {
    displayName: 'Inventory',
    iconName: 'line-md:check-list-3-twotone',
    route: '/inventory',
    roles: ['Admin', 'Inventory', 'Owner'],
  },
  {
    displayName: 'Test',
    iconName: 'solar:widget-add-line-duotone',
    route: '/test',
    roles: ['Admin'],
  },
  {
    displayName: 'Entity History',
    iconName: 'solar:widget-add-line-duotone',
    route: '/entity-history',
    roles: ['Admin'],
  },
  {
    navCap: 'Ui Components',
    divider: true,
    roles: ['Admin'],
  },
  {
    displayName: 'Badge',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/ui-components/badge',
    roles: ['Admin'],
  },
  {
    displayName: 'Chips',
    iconName: 'solar:danger-circle-line-duotone',
    route: '/ui-components/chips',
    roles: ['Admin'],
  },
  {
    displayName: 'Lists',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/lists',
    roles: ['Admin'],
  },
  {
    displayName: 'Menu',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/menu',
    roles: ['Admin'],
  },
  {
    displayName: 'Tooltips',
    iconName: 'solar:text-field-focus-line-duotone',
    route: '/ui-components/tooltips',
    roles: ['Admin'],
  },
  {
    displayName: 'Forms',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/forms',
    roles: ['Admin'],
  },
  {
    displayName: 'Tables',
    iconName: 'solar:tablet-line-duotone',
    route: '/ui-components/tables',
    roles: ['Admin'],
  },
  {
    navCap: 'Auth',
    divider: true,
    roles: ['Admin'],
  },
  // {
  //   displayName: 'Login',
  //   iconName: 'solar:login-3-line-duotone',
  //   route: '/authentication/login',
  // },
  {
    displayName: 'Register',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/authentication/register',
    roles: ['Admin'],
  },
  {
    navCap: 'Extra',
    divider: true,
    roles: ['Admin'],
  },
  {
    displayName: 'Icons',
    iconName: 'solar:sticker-smile-circle-2-line-duotone',
    route: '/extra/icons',
    roles: ['Admin'],
  },
  {
    displayName: 'Sample Page',
    iconName: 'solar:planet-3-line-duotone',
    route: '/extra/sample-page',
    roles: ['Admin'],
  },
];
