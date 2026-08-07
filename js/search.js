function searchProducts() {
    let input = document.getElementById("search-input").value.toLowerCase().trim();

    // If search box is empty, do nothing
    if (input === "") return;

    // Pages to search
    const pages = {
        "paint": "paint.html",
        "cement": "cement.html",
        "tools": "tools.html",
        "plumbing": "plumbing.html",
        "electrical": "electrical.html",
        "tiles": "tiles.html",
        "sanitary": "tiles.html",
        "power tools": "powertools.html",
        "building materials": "buildingmaterials.html",
        "specials": "specials.html",
        "products": "products.html",
        "about": "about.html",
        "contact": "contact.html"
    };

    for (let key in pages) {
        if (input.includes(key)) {
            window.location.href = pages[key];
            return;
        }
    }
}