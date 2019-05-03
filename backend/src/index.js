const Firestore = require('@google-cloud/firestore');

async function main() {
  const firestore = new Firestore({
    projectId: 'weperform-8063b',
    keyFilename: '../adminsdk.json'
  });

  const document = firestore.doc('posts/intro-to-firestore');
  console.log('Document created');

  // Enter new data into the document.
  await document.set({
    title: 'Welcome to Firestore',
    body: 'Hello World',
  });
  console.log('Entered new data into the document');

  // Update an existing document.
  // //await document.update({
  //   body: 'My first Firestore app',
  // });
  console.log('Updated an existing document');

  // Read the document.
  //let doc = await document.get();
  console.log('Read the document');

  // Delete the document.
  //await document.delete();
  console.log('Deleted the document');
}

main().catch(console.error);