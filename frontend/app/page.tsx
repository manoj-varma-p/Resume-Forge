import Herosection from "@/components/herosection";
import Navbar from "@/components/navbar";
import RightLoop from "@/components/rightloop";
import LeftLoop from "@/components/leftloop";
import Features from "@/components/features";
import Gallery from "@/components/gallery";
import Footer from "@/components/footer";
import ResumeForgeShowcase from "@/components/resumeforge";
import FloatingLines from "@/components/FloatingLines";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden snap-y snap-proximity scroll-smooth relative bg-white">
      <Preloader />
      {/* Global Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-100">
        <FloatingLines 
          linesGradient={['#000000', '#222222', '#444444']}
          lineCount={[8, 12, 8]}
          lineDistance={[15, 18, 15]}
          animationSpeed={0.3}
          parallax={true}
          parallaxStrength={0.1}
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        
        {/* First Viewport: Hero Section */}
        <section className="snap-start w-full h-screen shrink-0">
          <Herosection />
        </section>
  
        {/* Second Viewport: RightLoop Ticker + Features + LeftLoop Ticker */}
        <section className="snap-start w-full h-screen flex flex-col shrink-0">
          <RightLoop />
          <div className="flex-1 w-full relative overflow-hidden">
            <Features />
          </div>
          <LeftLoop />
        </section>
  
        {/* Third Viewport: Template Gallery */}
        <section className="snap-start w-full min-h-screen shrink-0">
          <Gallery />
        </section>
  
        {/* 3D Showcase Section */}
        <section className="snap-start w-full shrink-0">
          <ResumeForgeShowcase />
        </section>
  
        {/* Footer Viewport */}
        <section className="snap-start w-full shrink-0">
          <Footer />
        </section>
      </div>
    </main>
  );
}