import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: 0;
}
body {
  background: #312e38;
  color: #fff;
  -webkit-font-smoothing: antialiased;
}

body, input, button {
  font-family: 'Roboto Slab', serif;
  font-size: 16px;
}

h1, h2, h3, h4, h5, h6, strong{
  font-weight: 500;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active  {
    -webkit-box-shadow: 0 0 0 30px #232129 inset !important;
}

input:-webkit-autofill {
    -webkit-text-fill-color: #f4ede8 !important;
    caret-color: #f4ede8;
}

button {
  cursor: pointer;
}
`;
