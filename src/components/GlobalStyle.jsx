import { createGlobalStyle } from 'styled-components';
import 'modern-normalize';

export const GlobalStyle = createGlobalStyle`
html {
  box-sizing: border-box;
  width: 100vw;
  overflow-x: hidden;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
  color: #212121;
 background-color: #ebdfdf;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
img {
  display: block;
  max-width: 100%;
  height: auto;
}
h1,
h2,
h3,
h4,
h5,
h6,
p {
margin: 0;
}
button {
margin: 0 auto;
cursor: pointer;
border: none;
}
ul {
list-style: none;
padding: 0;
margin: 0;
}
a {
text-decoration: none;
color: inherit;
cursor: pointer;
}
`;
