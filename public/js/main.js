function onSubmit(e){
    e.preventDefault();

    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if(prompt === ''){
        alert('Please add some text');
        return;
    }

    generateImageRequest(prompt, size);
}

async function generateImageRequest(prompt, size){
    try{
        showspinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, size, }),  });
        
            if(!response.ok){
                removeSpinner();
                throw new Error("Image could not be generated !");
            }

            const data = await response.json(); //converting response to json format

            const url = data.data;

            document.querySelector('#image').src = url;

            removeSpinner();
    }
    catch(error){
        document.querySelector('.msg').textContent = error;
    }
}

function showspinner(){
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner(){
    document.querySelector('.spinner').classList.remove('show');
}

document.querySelector('#image-form').addEventListener('submit', onSubmit);