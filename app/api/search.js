import mbxClient from "@mapbox/mapbox-sdk/services/geocoding";

const geocodingClient = mbxClient({
  accessToken:
    "pk.eyJ1Ijoic3llZDc4Njc4NiIsImEiOiJjbTZzNDNyM2UwM3JuMnFzYjdndjl6dDdnIn0.vIu9Tx54Wx6UkIP2XfZlQA",
});

export default async function handler(req, res) {
  const { query } = req.query;

  try {
    const response = await geocodingClient
      .forwardGeocode({
        query,
        limit: 5,
        countries: ["IN"],
        types: ["address", "place"],
      })
      .send();

    res.status(200).json(response.body);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch locations" });
  }
}
