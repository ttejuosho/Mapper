
async function addStore(e){
    e.preventDefault();
    const storeData = {
        storeId: $('#store-id').val(),
        address: $('#store-address').val()
    }
    try {
        const res = await fetch('/api/v1/stores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(storeData)
        });

        if (res.status === 400) {
            throw Error('Store already exists!');
          }

        alert('Store Added');
        window.location.href = '/index.html';
    } catch(error){
        alert(error);
        return;
    }
}

$('#store-form').on('submit', addStore);
