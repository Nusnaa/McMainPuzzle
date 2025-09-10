
export default {
  basePath: 'https://nusnaa.github.io/McMainPuzzle',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
