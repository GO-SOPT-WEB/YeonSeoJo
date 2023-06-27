import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";

import Home from "./components/Home";
import { GlobalStyle } from "./styles/GlobalStyle";
import theme from "./styles/theme";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Home />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
