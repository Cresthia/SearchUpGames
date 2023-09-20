async function FetchData() {
    const search = document.getElementById('search').value;
    await fetch(`https://api.rawg.io/api/games?search=${search}&key=0c1ced692e204cab9bce4796219ed951`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (search.length !== 0) {
                document.getElementById("results").innerText = `${data.count} Results`;
            } else {
                document.getElementById("results").innerText = "";
            }
            grid.innerHTML = "";
            for (let i = 0; i < data.results.length; i++) {
                // Extract platform names from the array and format as a string
                const platformsArray = data.results[i].platforms.map(platform => platform.platform.name);
                const platformsString = platformsArray.join(", ");
                
                // Create a new game div for each game
                let newGameDiv = document.createElement("div");
                newGameDiv.classList.add("one-game");
                newGameDiv.innerHTML = `
                <div class="game-img-pos">
                    <img class="game-img" src="${data.results[i].background_image}">
                </div>
                <div class="title-pos">
                    <h2 class="title">${data.results[i].name}</h2>
                </div>
                <div class="rating-pos">
                    <h4 class="rating">Rating: ${data.results[i].rating}</h4>
                </div>
                <div class="platforms-pos">
                    <h4 class="platforms">Platforms: ${platformsString}</h4>
                </div>
                <div class="release-pos">
                    <h4 class="release">Released: ${data.results[i].released}</h4>
                </div>`;

                // Append the new game div to the grid div
                grid.appendChild(newGameDiv);
            }
        })
}