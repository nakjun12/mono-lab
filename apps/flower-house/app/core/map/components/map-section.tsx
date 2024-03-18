"use client";
import MapInitalizer from "@/app/core/map/components/map-initializer";
import MapOverlay from "@/app/core/map/components/map-overlay";

export default function MapSection() {
  return (
    <section>
      <MapInitalizer />
      <MapOverlay />

      {/* <Footer /> */}
    </section>
  );
}
