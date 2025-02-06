import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import ConfirmationModal from "@/components/ConfirmationModal";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface BookingFormProps {
  selectedVehicle: { id: VehicleType; name: string } | null;
  onBook: () => void;
  pickupLocation: [number, number] | null; // [longitude, latitude]
  destination: [number, number] | null; // [longitude, latitude]
}

type VehicleType = "car" | "bike" | "auto";

// New function: Uses Mapbox Directions API to get the route distance (in km)
const getRouteDistance = async (
  start: [number, number],
  end: [number, number]
): Promise<number> => {
  const accessToken =
    "pk.eyJ1Ijoic3llZDc4Njc4NiIsImEiOiJjbTZzNDNyM2UwM3JuMnFzYjdndjl6dDdnIn0.vIu9Tx54Wx6UkIP2XfZlQA";
  // Note: Mapbox expects coordinates as longitude,latitude
  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?access_token=${accessToken}&geometries=geojson`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.routes && data.routes.length > 0) {
    // distance is returned in meters; convert to kilometers
    const distanceMeters = data.routes[0].distance;
    return distanceMeters / 1000;
  }
  throw new Error("No route found");
};

// Updated fare calculation using new parameters
// Chosen numbers: these give roughly:
// - Bike: 5 + 4*5.3 = 26.2 ~29
// - Auto: 20 + 17*5.3 = 20 + 90.1 = 110.1 ~113
// - Car: 40 + 20*5.3 = 40 + 106 = 146 ~150
const calculateFare = (distance: number, vehicleType: VehicleType): number => {
  const baseFare = {
    car: 60,
    bike: 5.2,
    auto: 30,
  };
  const perKmFare = {
    car: 20,
    bike: 7,
    auto: 15,
  };
  return baseFare[vehicleType] + perKmFare[vehicleType] * distance
};

export default function BookingForm({
  selectedVehicle,
  onBook,
  pickupLocation,
  destination,
}: BookingFormProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [fare, setFare] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleBook = async () => {
    if (!pickupLocation) {
      alert("Please select a pickup location.");
      return;
    }
    if (!destination) {
      alert("Please select a destination location.");
      return;
    }
    if (!selectedVehicle) {
      alert("Please select a vehicle.");
      return;
    }

    setIsLoading(true);
    setShowConfirmation(true);

    try {
      // Use the Mapbox API to get the real route distance (in km)
      const distance = await getRouteDistance(pickupLocation, destination);
      console.log("Route distance (km):", distance);

      // Compute fares for different services (you may update this if needed)
      const fares = {
        // Replace these values with actual rates from OLA, Uber, or Rapido
        ola: calculateFare(distance, selectedVehicle.id),
        uber: calculateFare(distance, selectedVehicle.id), // Uber's rates are considered correct
        rapido: calculateFare(distance, selectedVehicle.id),
      };

      // Simulate a guessing animation (3 seconds delay)
      setTimeout(() => {
        const bestFare = Math.min(fares.ola, fares.uber, fares.rapido);
        setFare(bestFare.toFixed(2));
        setIsLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error calculating route distance:", error);
      alert("Could not calculate the route. Please try again.");
      setIsLoading(false);
    }
  };
  const router = useRouter();
   const handleLogout = () => {
     router.push("/logout");
   };
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold">Vehicle Type</h3>
            <p className="text-sm text-muted-foreground">Selected vehicle</p>
          </div>
          <div className="text-lg font-semibold">
            {selectedVehicle ? selectedVehicle.name : "No vehicle selected"}
          </div>
        </div>
        <Button className="w-full" size="lg" onClick={handleBook}>
          Book {selectedVehicle ? selectedVehicle.name : "Vehicle"}
        </Button>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        fare={fare}
        isLoading={isLoading}
      />

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-md"
      >
        Logout
      </button>
    </Card>
  );
}