function setup() {
    noCanvas();
    const video = createCapture(VIDEO);
    video.size(160, 120);
    let lat, lon;
    const button = document.getElementById("submit");

    button.addEventListener("click", async event => {
        const mood = document.getElementById("mymilo").value;
        //   inputbox = document.getElementById("mymilo").value;
        video.loadPixels();
        const image64 = video.canvas.toDataURL();
        const data = { lat, lon, mood, image64 };
        //   data.name = inputbox;

        //   console.log(data);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        const response = await fetch("/api", options);
        const json = await response.json();
        console.log(json);
    });

    if ("geolocation" in navigator) {
        console.log("geolocation is available");
        navigator.geolocation.getCurrentPosition(async position => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            document.getElementById("latitude").textContent = lat;
            document.getElementById("longitude").textContent = lon;
        });
    } else {
        console.log("geolocation is not available");
    }
}