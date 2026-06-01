function displayPost(post) {
    console.log('Post title:', post.title);
    console.log('Post body:', post.body);
}

export async function getPostWithAsyncAwait() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/2');

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();

        console.log('Data received with async/await:');
        displayPost(data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}
