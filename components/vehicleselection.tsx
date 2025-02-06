import { Button } from "@/components/ui/button";
import { Car, Bike, Truck } from "lucide-react";

const vehicles = [
  {
    id: "car",
    name: "Car",
    icon: Car,
    price: "$10-15",
    time: "3 min away",
  },
  {
    id: "bike",
    name: "Bike",
    icon: Bike,
    price: "$5-8",
    time: "1 min away",
  },
  {
    id: "auto",
    name: "Auto",
    icon: Truck,
    price: "$8-12",
    time: "2 min away",
  },
];

export default function VehicleSelection({ onSelect }) {
  return (
    <div className="space-y-2">
      {vehicles.map((vehicle) => {
        const Icon = vehicle.icon;
        return (
          <Button
            key={vehicle.id}
            variant="outline"
            className={`w-full justify-between p-4 hover:bg-primary/5`}
            onClick={() => onSelect(vehicle)}
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-primary/10 rounded-full">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold">{vehicle.name}</div>
              </div>
            </div>
          </Button>
        );
      })}
    </div>
  );
}
