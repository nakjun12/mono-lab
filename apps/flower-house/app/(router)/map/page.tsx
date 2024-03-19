"use client";
import MapSection from "@/app/core/map/components/map-initializer";
import MapOverlay from "@/app/core/map/components/map-overlay";
import Footer from "@/app/core/shared/components/footer";

export default function MapPage() {
  return (
    <main className="flex overflow-hidden relative flex-col md:px-3.5 w-full min-h-[932px]">
      <MapOverlay>
        <MapSection />
      </MapOverlay>
      <Footer />
    </main>
  );
}
