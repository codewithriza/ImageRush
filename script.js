document.getElementById('download-btn').addEventListener('click', async () => {
    const baseUrl = document.getElementById('base-url').value.trim();
    const startNum = parseInt(document.getElementById('start-num').value, 10);
    const endNum = parseInt(document.getElementById('end-num').value, 10);
    const output = document.getElementById('output');

    // Input validation
    if (!baseUrl) {
        output.innerHTML = 'Please enter a valid base URL.';
        return;
    }
    if (isNaN(startNum) || isNaN(endNum) || startNum > endNum) {
        output.innerHTML = 'Please enter a valid range of numbers.';
        return;
    }

    output.innerHTML = 'Starting downloads...';

    // Function to create download link and trigger click
    function downloadImage(i) {
        const fileName = `${i}.webp`;
        const url = `${baseUrl}${fileName}`;

        // Create an anchor element to trigger download
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;

        // Append the link, trigger the download, and then remove the link
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Show the download progress
        const message = document.createElement('p');
        message.textContent = `Started download: ${fileName}`;
        output.appendChild(message);
    }

    // Function to download images sequentially with delay
    async function downloadImages() {
        for (let i = startNum; i <= endNum; i++) {
            downloadImage(i);

            // Wait for 500ms before downloading the next image
            await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
        }

        output.innerHTML += '<p>All downloads initiated!</p>';
    }

    // Start the download process
    downloadImages();
});
