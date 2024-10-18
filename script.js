
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    const formResponse = document.getElementById('formResponse');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting the default way

        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim()
        };

        // Send data to your local server using POST method
        fetch('http://localhost:4000/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            formResponse.textContent = 'Formm submitted successfully!';
            console.log('Success:', data);
        })
        .catch(error => {
            formResponse.textContent = 'Failed to submit form. Please try again.';
            console.error('Error:', error);
        });
        alert('Form submitted successfully!');
        // Clear the form after submission
        form.reset();
    });
});
 // JavaScript for dynamically populating lotions based on section
        const sectionSelect = document.getElementById('section');
        const lotionSelect = document.getElementById('lotion');

        const lotions = {
            'moisturizer': ['Moisturizer A', 'Moisturizer B', 'Moisturizer C'],
            'sunscreen': ['Sunscreen A', 'Sunscreen B'],
            'baby_skincare': ['Baby Lotion A', 'Baby Lotion B'],
            'serum': ['Serum A', 'Serum B']
        };

        sectionSelect.addEventListener('change', function() {
            lotionSelect.innerHTML = '';
            lotions[this.value].forEach(lotion => {
                const option = document.createElement('option');
                option.value = lotion;
                option.textContent = lotion;
                lotionSelect.appendChild(option);
            });
        });