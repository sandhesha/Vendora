
import Navbar from "../components/Navbar";
import { AuthProvider } from "@/lib/auth/auth-context";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </AuthProvider>
  );
}
