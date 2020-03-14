const { installPackage } = require('./process');

process.on('message', async (data) => {
  try {
    await installPackage(data);
    process.exit();
  } catch (error) {
    throw error;
  }
})
