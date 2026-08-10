import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Layout = () => {
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white px-6 py-4 shadow-md">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">iRepair</h1>
            <p className="text-slate-400 text-sm mb-3">Gestão de Ordens de Serviço</p>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <span className="text-slate-300">{user?.name}</span>
            <button
              onClick={handleLogout}
              className="bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-xs"
            >
              Sair
            </button>
          </div>
        </div>

        <nav className="flex gap-4 text-sm">
          <Link to="/" className="hover:text-slate-300">Dashboard</Link>
          <Link to="/clients" className="hover:text-slate-300">Clientes</Link>
          <Link to="/service-orders" className="hover:text-slate-300">Ordens de Serviço</Link>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};