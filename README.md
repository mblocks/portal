# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## Set Local Setting for Dev

create a file named `.umirc.local.ts`, it will overwrite `.umirc.ts`.

```js

export default {
    proxy: {
        '/api/': {
          'target': 'http://127.0.0.1:8000',
          'changeOrigin': true,
          'pathRewrite': { '^/api/' : '/' },
        },
    },
}


```
