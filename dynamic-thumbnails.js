document.addEventListener("DOMContentLoaded", async () => {
    const workItems = document.querySelectorAll(".work-item img");

    for (const img of workItems) {
        const link = img.dataset.link; // Get the link from the `data-link` attribute

        try {
            // Construct the API request URL
            const apiUrl = `https://opengraph.io/api/1.1/site/${encodeURIComponent(link)}?app_id=ab4b7a19-edcc-42b7-b0ae-f510d60e7eb8`;

            const response = await fetch(apiUrl);

            // Check for a successful response
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();

            // Assign OpenGraph image if available
            if (data?.hybridGraph?.image) {
                img.src = data.hybridGraph.image;
            } else {
                img.src = "https://via.placeholder.com/300?text=No+Preview"; // Fallback to a placeholder
            }
        } catch (error) {
            console.error(`Error fetching OpenGraph data for ${link}:`, error);
            img.src = "https://via.placeholder.com/300?text=No+Preview"; // Fallback to a placeholder
        }
    }
});
