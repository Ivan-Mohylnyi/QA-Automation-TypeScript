function displayPost(post) {
    console.log('Post title:', post.title);
    console.log('Post body:', post.body);
}

export function getPostWithPromises() {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            return response.json();
        })
        .then((data) => {
            console.log('Data received with then():');
            displayPost(data);
        })
        .catch((error) => {
            console.error('Error:', error.message);
        });
}
