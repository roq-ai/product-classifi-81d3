interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Owner', 'User', 'Algorithm Creator', 'Research'],
  tenantName: 'Organization',
  applicationName: 'Product Classification Data Platform',
  addOns: ['file upload', 'file'],
};
