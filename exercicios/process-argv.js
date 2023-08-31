console.log('teste argv');

const args = process.argv.slice(2)

args.forEach(element => {
    console.log(element);
});