const showSpinner = () => {
    document.querySelector('.spinner').classList.add('show')
}

const removeSpinner = () => {
    document.querySelector('.spinner').classList.remove('show')
}

const generateImageRequest = async (image, size, count) => {
    try {
        showSpinner();
        const response = await fetch('/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image,
                size,
                count
            })
        })

        if (!response.ok) {
            removeSpinner();
            throw new Error('That image could not be generated');
        }

        const data = await response.json();

        const imageContainer = document.querySelector('.image-container');

        console.log('1', imageContainer)

        data.response.forEach((element) => {
            const image = document.createElement('img');

            image.src = element.url;
            image.id="image";

            imageContainer.appendChild(image)
        })

        // const imageUrl = data.response[0].url

        // document.querySelector('#image').src = imageUrl

        console.log('2', imageContainer)
        removeSpinner();
    }
    catch (error) {
        document.querySelector('.msg').textContent = error
    }
}

const onSubmit = (e) => {
    e.preventDefault();

    document.querySelector('.msg').textContent = '';

    document.querySelectorAll('#image').forEach((e) => e.remove());

    const prompt = document.querySelector('#prompt').value
    const size = document.querySelector('#size').value
    const count = document.querySelector('#count').value

    if (prompt === '' || count <=0) {
        alert('Please enter the description of image to be displayed')
        return;
    }

    generateImageRequest(prompt, size, count);
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);