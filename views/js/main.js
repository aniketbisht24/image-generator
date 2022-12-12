const showSpinner = () => {
    document.querySelector('.spinner').classList.add('show')
}

const removeSpinner = () => {
    document.querySelector('.spinner').classList.remove('show')
}

const generateImageRequest = async (image, size) => {
    try {
        showSpinner();
        const response = await fetch('/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                image,
                size
            })
        })

        if (!response.ok) {
            removeSpinner();
            throw new Error('That image could not be generated');
        }

        const data = await response.json();

        const imageUrl = data.response[0].url

        document.querySelector('#image').src = imageUrl

        console.log(imageUrl)
        removeSpinner();
    }
    catch (error) {
        document.querySelector('.msg').textContent = error
    }
}

const onSubmit = (e) => {
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';

    const prompt = document.querySelector('#prompt').value
    const size = document.querySelector('#size').value

    if (prompt === '') {
        alert('Please enter the description of image to be displayed')
        return;
    }

    generateImageRequest(prompt, size);
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);