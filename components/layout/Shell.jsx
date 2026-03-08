'use client';
import BottomNav from './BottomNav';
import Sidebar from './Sidebar';

export default function Shell({ children }) {
  return (
    <div className="grain">
      <Sidebar />
      <BottomNav />
      <main className="md:ml-[220px] page-content min-h-[100dvh]">
        {children}
      </main>
    </div>
  );
}
