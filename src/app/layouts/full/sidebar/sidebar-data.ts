import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
    roles: ['Admin'],
  },
  {
    displayName: 'Cashier',
    iconName: 'solar:widget-add-line-duotone',
    route: '/cashier',
    roles: ['Admin', 'Cashier'],
  },
  {
    displayName: 'Sales',
    iconName: 'solar:widget-add-line-duotone',
    route: '/sales',
    roles: ['Admin', 'Cashier'],
  },
  {
    displayName: 'Products',
    iconName: 'solar:widget-add-line-duotone',
    route: '/products',
    roles: ['Admin', 'Cashier', 'Inventory'],
  },
  {
    displayName: 'Stocks Receiving',
    iconName: 'solar:widget-add-line-duotone',
    route: '/stocks-receiving',
    roles: ['Admin', 'Cashier', 'Inventory'],
  },

  {
    displayName: 'Inventory',
    iconName: 'solar:widget-add-line-duotone',
    route: '/inventory',
    roles: ['Admin', 'Cashier', 'Inventory'],
  },
  {
    displayName: 'Test',
    iconName: 'solar:widget-add-line-duotone',
    route: '/test',
  },
  {
    navCap: 'Ui Components',
    divider: true,
  },
  {
    displayName: 'Badge',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Chips',
    iconName: 'solar:danger-circle-line-duotone',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'solar:text-field-focus-line-duotone',
    route: '/ui-components/tooltips',
  },
  {
    displayName: 'Forms',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/forms',
  },
  {
    displayName: 'Tables',
    iconName: 'solar:tablet-line-duotone',
    route: '/ui-components/tables',
  },
  {
    navCap: 'Auth',
    divider: true,
  },
  {
    displayName: 'Login',
    iconName: 'solar:login-3-line-duotone',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/authentication/register',
  },
  {
    navCap: 'Extra',
    divider: true,
  },
  {
    displayName: 'Icons',
    iconName: 'solar:sticker-smile-circle-2-line-duotone',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'solar:planet-3-line-duotone',
    route: '/extra/sample-page',
  },
];
