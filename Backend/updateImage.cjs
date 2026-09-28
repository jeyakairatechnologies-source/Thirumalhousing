const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/thirumal_housing').then(async () => {
  const db = mongoose.connection.db;
  await db.collection('projects').updateOne(
    { _id: new mongoose.Types.ObjectId('6aab6fbaef614f74733a1bc4') },
    { $set: { mainImage: '/project4.png' } }
  );
  console.log('Update done');
  process.exit(0);
});
