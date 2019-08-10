# Criando um projeto em ReactJs

Execute o comando

```
yarn create react-app nome-do-projeto
```

Exclua os arquivos:

- public/manifest.json
- src/App.css
- src/index.css
- src/App.test.js
- src/logo.svg
- src/serviceWorker.js

Remova as referencia desses arquivos

## ESLint, Prettier & EditorConfig
Crie o arquivo **.editorconfig**

```
root = true

[*]
indent_style = space
indent_size = 2
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
end_of_line = lf
```

Execute os comandos para utilizar o Eslint

```
yarn add eslint -D
yarn eslint --init
```

Exclua o arquivo package-lock.json e excute os comandos

```
yarn

yarn add prettier eslint-config-prettier eslint-plugin-prettier babel-eslint -D
```

Altere o arquivo **.eslintrc.js**

```
module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["airbnb", "prettier", "prettier/react"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": ["warn", { extensions: [".jsx", ".js"] }],
    "import/prefer-default-export": "off"
  }
};
```

Crie o arquivo **.prettierrc**

```
{
  "singleQuote": true,
  "trailingComma": "es5"
}
```

## Criando rotas

Execute o comando

```
yarn add react-router-dom
```

Crie os arquivos

- src/pages/Main/index.js

```
import React from 'react';

// import { Container } from './styles';

export default function Main() {
  return (
    <h1>Main</h1>
  );
}
```

- src/pages/Repository/index.js

```
import React from 'react';

// import { Container } from './styles';

export default function Repository() {
  return <h1>Repository</h1>;
}
```

- src/routes.js

```
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/Main';
import Repository from './pages/Repository';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/repository" component={Repository} />
      </Switch>
    </BrowserRouter>
  );
}
```

Altere o arquivo **src/app.js**

```
import React from 'react';

import Routes from './routes';
function App() {
  return <Routes />;
}

export default App;
```

## Styled Components

> Instale a extensão do VSCode : vscode-styled-components

Execute o comando

```
yarn add styled-components
```

Crie o arquivo **src/Main/style.js**

```
import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 24px;
  color: #7159c1;
  font-family: Arial, Helvetica, sans-serif;
`;

```

### Global Style

Crie o arquivo **src/styles/global.js**

```
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box
}

html, body, #root {
  min-height: 100%
}

body {
  background: #f0f0f0;
  -webkit-font-smoothing: antialiased !important
}

body, input, button {
  color: #222;
  font-size: 14px;
  font-family: Arial, Helvetica, sans-serif;
}

button {
  cursor: pointer
}
`;

```

Altere o arquivo **src/App.js**

```
import React from 'react';

import Routes from './routes';
import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <Routes />
      <GlobalStyle />
    </>
  );
}

export default App;

```

Para usar icones na aplicação podemos usar o pacote React-Icons

```
yarn add react-icons
```
