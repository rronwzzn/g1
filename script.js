async function searchData() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultsDiv = document.getElementById("results");

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  resultsDiv.innerHTML = "<p>Searching...</p>";

  let data;
  try {
    const response = await fetch("database.csv");
    if (!response.ok) throw new Error(`Failed to load file: ${response.status}`);
    data = await response.text();
  } catch (err) {
    resultsDiv.innerHTML = `<p style="color:red;">Error loading database: ${err.message}</p>`;
    return;
  }

  const rows = data.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split("\n").slice(1);

  resultsDiv.innerHTML = "";
  let found = false;

  for (let row of rows) {
    if (!row.trim()) continue;

    const parts = row.split(",");
    const id     = (parts[0] || "").trim();
    const name   = (parts[1] || "").trim();
    const course = (parts[2] || "").trim();

    if (id.toLowerCase().includes(query) || name.toLowerCase().includes(query)) {
      found = true;
      resultsDiv.innerHTML += `
        <div class="result-item">
          <strong>${name}</strong><br>
          ID: ${id}<br>
          Course: ${course}
        </div>
      `;
    }
  }

  if (!found) {
    resultsDiv.innerHTML = "<p>No results found.</p>";
  }
}
