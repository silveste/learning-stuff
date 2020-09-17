const text = 'This is a test to store in a file';

const encoder = new TextEncoder();
const data = encoder.encode(text);

Deno.writeFile('message.txt', data).then(() => {
  console.log('Done');
});
