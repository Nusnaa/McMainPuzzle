
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://nusnaa.github.io/McMainPuzzle/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/McMainPuzzle"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 500, hash: 'ede20515bfa3d891b9ac5fc4ff3bfba6841b0c227391ff0e3afd232e730f8191', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1017, hash: '8149b24e99e1454ab5fd7ab27395f46a9e2033fbe5a5b03da67b5ff691aa6eb1', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 4567, hash: 'fb1f5387dbb7bcc4d36dd4a470ac5d55b609f9c1333e3050a0b1fa82f86c07ca', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-5INURTSO.css': {size: 0, hash: 'menYUTfbRu8', text: () => import('./assets-chunks/styles-5INURTSO_css.mjs').then(m => m.default)}
  },
};
