const mock = () => {
  let storage: any = {};

  return {
    clear: () => storage = {},
    getItem: (key: any) => key in storage ? storage[key] : undefined,
    // tslint:disable-next-line:no-dynamic-delete
    removeItem: (key: any) => delete storage[key],
    setItem: (key: any, value: any) => storage[key] = value || ''
  };
};

Object.defineProperty(window, 'localStorage', { value: mock() });
Object.defineProperty(window, 'sessionStorage', { value: mock() });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ['-webkit-appearance']
});
