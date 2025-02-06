import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3llZDc4Njc4NiIsImEiOiJjbTZzNDNyM2UwM3JuMnFzYjdndjl6dDdnIn0.vIu9Tx54Wx6UkIP2XfZlQA";

export default function Map({ onLocationUpdate, pickupLocation, destination }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const routeLayerId = "route-layer";

  useEffect(() => {
    if (!mapContainer.current) return;

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [78.4867, 17.385], // Default to Hyderabad
        zoom: 12,
      });

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      });
      map.current.addControl(geolocate);

      geolocate.on("geolocate", (e) => {
        const coords = [e.coords.longitude, e.coords.latitude];
        setUserLocation(coords);
        onLocationUpdate({ type: "pickup", coords });
      });

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const coords = [pos.coords.longitude, pos.coords.latitude];
          setUserLocation(coords);
          onLocationUpdate({ type: "pickup", coords });
          map.current.flyTo({ center: coords, zoom: 14 });
        },
        (err) => console.error("Error getting location:", err)
      );
    }
  }, [onLocationUpdate]);

  useEffect(() => {
    if (pickupLocation && map.current) {
      new mapboxgl.Marker({ color: "green" })
        .setLngLat(pickupLocation)
        .addTo(map.current);
    }
  }, [pickupLocation]);

  useEffect(() => {
    if (destination && map.current) {
      new mapboxgl.Marker({ color: "blue" })
        .setLngLat(destination)
        .addTo(map.current);
    }
  }, [destination]);

  useEffect(() => {
     if (pickupLocation && destination && map.current) {
       const bounds = new mapboxgl.LngLatBounds();
       bounds.extend(pickupLocation);
       bounds.extend(destination);

       map.current.fitBounds(bounds, {
         padding: 50, // Adjust padding as needed
         duration: 1000, // Smooth transition
       });
     }
    if (pickupLocation && destination) {
      fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupLocation[0]},${pickupLocation[1]};${destination[0]},${destination[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.routes.length) return;
          const route = data.routes[0].geometry;

          if (map.current.getSource("route")) {
            map.current.getSource("route").setData({
              type: "Feature",
              properties: {},
              geometry: route,
            });
          } else {
            map.current.addLayer({
              id: routeLayerId,
              type: "line",
              source: {
                type: "geojson",
                data: {
                  type: "Feature",
                  properties: {},
                  geometry: route,
                },
              },
              layout: { "line-join": "round", "line-cap": "round" },
              paint: { "line-color": "#3887be", "line-width": 5 },
            });
          }
        })
        .catch(console.error);
    }
  }, [pickupLocation, destination]);

  return (
    <div className="w-full h-full flex justify-end items-end">
      <div ref={mapContainer} className="w-[67vw] h-full flex " />
    </div>
  );
}
