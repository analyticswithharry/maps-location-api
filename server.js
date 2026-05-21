const express = require("express");
const path = require("path");

const app = express();
const PORT = Number(process.env.PORT || 4117);

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const lesson = {
  id: "maps-location-api",
  title: "Maps and Location API",
  level: "Specialize Later",
  stack: ["Google Maps", "Mapbox"],
  useCases: ["Routing", "Geocoding", "Logistics"],
};

app.get("/api/health", (req, res) =>
  res.json({ success: true, lesson: lesson.id }),
);
app.get("/api/lesson", (req, res) => res.json({ success: true, data: lesson }));
app.post("/api/demo", (req, res) => {
  const from = req.body.from || "A";
  const to = req.body.to || "B";
  res.json({ success: true, route: `${from} -> ${to}`, etaMinutes: 24 });
});

app.get("/", (req, res) => {
  res
    .type("html")
    .send(
      `<html><head><title>${lesson.title} Lab</title><style>body{font-family:Manrope,Arial,sans-serif;background:#f5f1ea;padding:24px}main{max-width:900px;margin:auto;background:#fff;padding:20px;border-radius:16px}</style></head><body><main><h1>${lesson.title} Lab</h1><p>Practice route requests, geocoding, and map-side caching.</p><p><a href='/api/lesson'>GET /api/lesson</a></p></main></body></html>`,
    );
});

app.listen(PORT, () =>
  console.log(`${lesson.title} lab running on http://localhost:${PORT}`),
);
