const { installPackage } = require('./process');

installPackage();
process.on('message', async (data) => {
  console.log('install Start');
  try {
    await installPackage(data);
    process.exit();
  } catch (error) {
    throw error;
  }
})
