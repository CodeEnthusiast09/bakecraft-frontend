import { Header } from "./_components/header";
import { Sidebar } from "./_components/sidebar";
import { Wrapper } from "./_components/wrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <div className="relative">
        <div className="lg:flex">
          <Sidebar />
          <div className="w-full lg:w-3/4 2xl:w-[82vw] block relative">
            <Header />

            <main
              data-testid="main"
              className="w-full min-h-screen overflow-y-auto py-12 px-wrapper md:wrapper-md xl:px-wrapper-xl 2xl:px-[3.5rem] bg-secondary-300"
            >
              {/* main content  */}
              {children}
            </main>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
