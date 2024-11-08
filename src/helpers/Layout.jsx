import { Navbar } from '../components/componentes';
import { loadingStyle } from '../helpers/Notifications'
import { Toaster } from 'sonner';

export const Layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen font-poppins">
        <style>{`body { margin: 0; padding: 0; background-color: #fffeea; }`}</style>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Toaster toastOptions={loadingStyle} position="bottom-right" closeButton />
      </div>
    </>
  )
}
