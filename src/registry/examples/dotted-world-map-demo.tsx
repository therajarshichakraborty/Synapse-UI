import { DottedWorldMap } from "@/components/animated/dotted-world-map";

const sf = { lat: 37.77, lng: -122.42 };
const ny = { lat: 40.71, lng: -74.0 };
const london = { lat: 51.5, lng: -0.12 };
const mumbai = { lat: 19.07, lng: 72.88 };
const tokyo = { lat: 35.68, lng: 139.69 };
const sydney = { lat: -33.86, lng: 151.2 };
const sao = { lat: -23.55, lng: -46.63 };

export default function DottedWorldMapDemo() {
  return (
    <div className="w-full max-w-3xl">
      <DottedWorldMap
        connections={[
          { from: sf, to: london },
          { from: ny, to: sao },
          { from: london, to: mumbai },
          { from: mumbai, to: tokyo },
          { from: tokyo, to: sydney },
        ]}
      />
    </div>
  );
}
