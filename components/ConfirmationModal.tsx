"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "@/components/ui/modal";
import uber from "@/public/download.png";
import ola from "@/public/ola.png";
import rapido from "@/public/rapido.png";

export default function ConfirmationModal({
  isOpen,
  onClose,
  fare,
  isLoading,
}) {
  const [showFare, setShowFare] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [loadingMessage, setLoadingMessage] = useState(
    "Finding the best fare..."
  );

  const services = ["Uber", "Ola", "Rapido"];

  useEffect(() => {
    if (isOpen && !isLoading) {
      setShowFare(true);
      const randomIndex = Math.floor(Math.random() * services.length);
      setSelectedService(services[randomIndex]);
      setLoadingMessage(
        `Fetching the best fare from ${services[randomIndex]}...`
      );
    }
  }, [isOpen, isLoading]);

  const getLogoImage = (service) => {
    switch (service) {
      case "Uber":
        return uber;
      case "Ola":
        return ola;
      case "Rapido":
        return rapido;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 text-center">
        {isLoading ? (
          <>
            <div className="text-lg font-semibold mb-4">{loadingMessage}</div>
            <div className="space-y-2">
              <div className="flex justify-around mb-4 h-24">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 mx-auto transition-all duration-1000 ease-in-out"
                  >
                    <Image
                      src={getLogoImage(service) || "/placeholder.svg"}
                      alt={`${service} Logo`}
                      width={64}
                      height={64}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto"></div>
            </div>
          </>
        ) : (
          <>
            <div className="text-lg font-semibold mb-4">Best Fare Found!</div>
            <div className="text-2xl font-bold text-green-600">₹{fare}</div>
            <div className="text-md font-medium text-gray-600 mb-4">
              Provided by {selectedService}
            </div>
            <div className="flex justify-around mb-4 h-24">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`w-16 h-16 mx-auto flex flex-row transition-all duration-1000 ease-in-out ${
                    service === selectedService
                      ? "transform scale-150 opacity-100"
                      : "transform scale-50 opacity-0 hidden"
                  }`}
                >
                  <Image
                    src={getLogoImage(service) || "/placeholder.svg"}
                    alt={`${service} Logo`}
                    width={64}
                    height={64}
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
            <button
              className="mt-4 bg-black text-white px-4 py-2 rounded-lg"
              onClick={onClose}
            >
              Close
            </button>
          </>
        )}
      </div>
    </Modal>
  );
}
