"use client";
import MapSection from "@/app/core/components/map/map-initializer";
import MapOverlay from "@/app/core/components/map/map-overlay";
import Footer from "@/app/core/components/shared/footer";

export default function Home() {
  return (
    <main className="flex overflow-hidden relative flex-col md:px-3.5 w-full min-h-[932px]">
      <MapOverlay>
        <MapSection />
      </MapOverlay>
      <Footer />
    </main>
  );
}
