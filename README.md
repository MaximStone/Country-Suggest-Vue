[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

# Country-Suggest-Vue
Vue list of countries with flags, works as component.

src/components/Country-Suggest.vue

# Usage
```
<template>
  <div id="app">
    <CountrySuggest />
  </div>
</template>
```


# Properties

| Property  | Type            | Default                                                        | Description                                                                                   | Optional |
|-----------|-----------------|----------------------------------------------------------------|-----------------------------------------------------------------------------------------------|----------|
| apiURL    | String          | https://restcountries.eu/rest/v2/name/{name}?fields=name;flag; | REST endpoint for search countries by name. Value must be placed instead of {name} substring. | true     |
| flagField | String/Function | flag                                                           | Property name that uses to get country name from recieved object.                             | true     |
| delay     | Number          | 600                                                            | Delay between calls to endpoint in milliseconds.                                              | true     |

## Install example project
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Lints and fixes files
```
yarn run lint
```

### Run your unit tests
```
yarn run test:unit
```
