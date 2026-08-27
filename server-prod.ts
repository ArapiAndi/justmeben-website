import express from "express";
import path from "path";

const app = express();
const PORT = 3000;

app.use(express.static(path.join(process.cwd(), "dist_prod")));

app.get("*", (req, res) => {
  res.sendFile(path.join(process.cwd(), "dist_prod/index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Sito production in locale su http://localhost:${PORT}`);
});
