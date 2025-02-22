import { ReactNode } from "react";
import Nav from "../partials/nav";
import Footer from "../partials/footer";

interface AppProps {
  children: ReactNode;
}

function App({ children }: AppProps) {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
}

export default App;
