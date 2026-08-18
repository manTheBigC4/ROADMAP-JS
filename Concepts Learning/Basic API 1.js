async function fetchData() {
    try {
        const pokemonName = document
            .getElementById("pokemonName")
            .value.toLowerCase();

        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
        );

        if (!response.ok) {
            throw new Error("Could not fetch!");
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        console.log(data);
        const img = document.getElementById("pokemonSprite");
        img.src = pokemonSprite;
        img.style.display = "block";
    } catch (error) {
        console.error(error);
    }
}

fetchData();
