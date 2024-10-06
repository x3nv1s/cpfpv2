document.getElementById('facebookForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const cookies = document.getElementById('cookies').value;
    const delay = document.getElementById('delay').value;

    const response = await fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cookies, delay }),
    });

    const result = await response.json();
    document.getElementById('output').textContent = JSON.stringify(result);
});
