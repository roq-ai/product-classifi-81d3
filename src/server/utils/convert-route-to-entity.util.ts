const mapping: Record<string, string> = {
  algorithms: 'algorithm',
  classifications: 'classification',
  organizations: 'organization',
  products: 'product',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
