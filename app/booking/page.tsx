// app/page.tsx
"use client";

import Map from "@/components/map";
import SearchBar from "@/components/SearchBar";
import VehicleSelection from "@/components/vehicleselection";
import BookingForm from "@/components/BookingForm";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useState } from "react";

export default function Home() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [locations, setLocations] = useState({
    pickup: null,
    destination: null,
  });
  const handleSearchSelect = (coords) => {
    console.log("Selected Destination Coordinates:", coords);
    setLocations((prev) => ({
      ...prev,
      destination: coords,
    }));
  };

  const handleLocationUpdate = ({ type, coords }) => {
    setLocations((prev) => ({
      ...prev,
      [type]: coords,
    }));
  };

  const handleBooking = async () => {
    const bookingDetails = {
      vehicle: selectedVehicle,
      pickup: locations.pickup,
      destination: locations.destination,
    };

    console.log("Booking Details:", bookingDetails);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingDetails),
      });

      const data = await response.json();
      console.log("Server Response:", data);
    } catch (error) {
      console.error("Error sending booking:", error);
    }

    alert(`Booking Confirmed! Vehicle: ${selectedVehicle.name}`);
    setShowConfirmation(true);
  };

  return (
    <main className="flex min-h-screen relative">
      <div className="absolute inset-0">
        <Map
          onLocationUpdate={handleLocationUpdate}
          pickupLocation={locations.pickup}
          destination={locations.destination}
        />
      </div>

      <div className="absolute top-0 left-0 w-[400px] h-full bg-background/95 backdrop-blur-sm p-6 shadow-xl z-10">
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Book a Ride</h1>

          <SearchBar onSearchSelect={handleSearchSelect} />
          <div className="py-4">
            <h2 className="text-lg font-semibold mb-4">Select Vehicle Type</h2>
            <VehicleSelection onSelect={setSelectedVehicle} />
          </div>
          <div className="pt-4">
            <BookingForm
              selectedVehicle={selectedVehicle}
              onBook={handleBooking}
              pickupLocation={locations.pickup}
              destination={locations.destination}
            />
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
      />
    </main>
  );
}
