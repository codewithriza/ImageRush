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
    function downloadImage(i, format) {
        const fileName = `${i}.${format}`;
        const url = `${baseUrl}${fileName}`;

        // Check if the file exists (optional, may add further validation if needed)
        // Assuming the file exists on the server, otherwise, you could implement a check for file existence

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
        const formats = ['webp', 'png'];  // Formats to try

        for (let i = startNum; i <= endNum; i++) {
            for (let format of formats) {
                try {
                    // Try downloading the image in the specified format
                    downloadImage(i, format);
                    break; // Break if download is successful
                } catch (error) {
                    // If there’s an error, try the next format
                    console.error(`Failed to download image ${i} in format ${format}:`, error);
                }
            }

            // Wait for 500ms before downloading the next image
            await new Promise(resolve => setTimeout(resolve, 500)); // 500ms delay
        }

        output.innerHTML += '<p>All downloads initiated!</p>';
    }

    // Start the download process
    downloadImages();
});
