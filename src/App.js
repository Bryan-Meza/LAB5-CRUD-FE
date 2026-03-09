import TipoIniciativaList from "./components/CountryList";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="banorte-header">
        <div className="banorte-header-content">
          <div className="banorte-logo">
            <span className="banorte-logo-icon">B</span>
            <span className="banorte-logo-text">Banorte</span>
          </div>
          <h1>Gestión de Tipos de Iniciativa</h1>
        </div>
      </header>
      <main className="banorte-main">
        <TipoIniciativaList />
      </main>
      <footer className="banorte-footer">
        <p>© 2026 Banorte — Sistema de Gestión de Tipos de Iniciativa</p>
      </footer>
    </div>
  );
}

export default App;
