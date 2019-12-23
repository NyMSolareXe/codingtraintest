getData();

async function getData() {
    const response = await fetch("/api");
    const data = await response.json();

    for (item of data) {
        const root = document.createElement("div");
        const mood = document.createElement("div");
        const geo = document.createElement("div");
        const date = document.createElement("div");
        const image = document.createElement('img');
        const linebreaker = document.createElement("br");


        mood.textContent = `mood: ${item.name}`;
        geo.textContent = `${item.lat}&deg;, ${item.lon}&deg;`;
        const dateString = new Date(item.timestamp).toLocaleString();
        date.textContent = dateString;
        image.src = item.image64;
        image.alt = "Dan Shiffman making silly faces";

        root.append(mood, geo, date, image, linebreaker);
        document.body.append(root);
    }

    console.log(data);
}