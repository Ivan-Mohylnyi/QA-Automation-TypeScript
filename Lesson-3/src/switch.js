const animal = 'cat';

switch (animal) {
    case 'dog':
        console.log('The animal is a dog.');
        break;
    case 'cat': {
        console.log('The animal is a cat.');
        break;
    }
    default:
        console.log('The animal is unknown.');
}

const day = 'Monday';

switch (day) {
    case 'Monday':
        console.log('The day is Monday.');
        break;
    case 'Tuesday':
        console.log('The day is Tuesday.');
        break;
    default:
        console.log('The day is unknown.') ;
}
