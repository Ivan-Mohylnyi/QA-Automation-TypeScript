export async function getDataWithFallback() {
    try {
        const response = await fetch('https://this-service-does-not-exist.com/data');

        if (!response.ok) {
            throw new Error('First service is unavailable');
        }

        const data = await response.json();

        console.log('Data from first service:', data);
    } catch (firstError) {
        console.error('First request failed:', firstError.message);

        const backupResponse = await fetch('https://jsonplaceholder.typicode.com/users/1');

        if (!backupResponse.ok) {
            throw new Error('Backup service returned invalid response', { cause: firstError });
        }

        const backupData = await backupResponse.json();

        console.log('Data from backup service:');
        console.log(backupData);
    }
}
