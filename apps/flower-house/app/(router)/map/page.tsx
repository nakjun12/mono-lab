"use client";
import MapSection from "@/app/(router)/map/components/map-initializer";
import MapOverlay from "@/app/(router)/map/components/map-overlay";
import Footer from "@/app/shared/components/footer";

function MapPage() {
  return (
    <div className="flex overflow-hidden relative flex-col md:px-3.5 w-full min-h-[932px]">
      <MapOverlay>
        <MapSection />
      </MapOverlay>
      <Footer />
    </div>
  );
}

export default MapPage;
