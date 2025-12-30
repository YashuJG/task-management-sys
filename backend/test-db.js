const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskmanagement';

console.log('\n🔍 Testing MongoDB Connection...');
console.log('Connection String:', MONGODB_URI.replace(/:[^:@]+@/, ':****@'));
console.log('');

// MongoDB Connection Options
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// For MongoDB Atlas (SSL), add TLS options
if (MONGODB_URI.includes('mongodb+srv://')) {
  mongooseOptions.tls = true;
  mongooseOptions.tlsAllowInvalidCertificates = false;
  // For older Node.js versions, try without deprecated options
  if (process.version.startsWith('v14') || process.version.startsWith('v16')) {
    delete mongooseOptions.useNewUrlParser;
    delete mongooseOptions.useUnifiedTopology;
  }
}

mongoose.connect(MONGODB_URI, mongooseOptions)
.then(() => {
  console.log('✅ SUCCESS: MongoDB Connected!');
  console.log('✅ Connection State:', mongoose.connection.readyState === 1 ? 'Connected' : 'Not Connected');
  process.exit(0);
})
.catch(err => {
  console.error('❌ ERROR: MongoDB Connection Failed!');
  console.error('❌ Error Message:', err.message);
  console.error('');
  console.error('💡 Common Solutions:');
  console.error('1. Check MONGODB_URI in .env file');
  console.error('2. Verify MongoDB Atlas Network Access is configured');
  console.error('3. Check if username/password are correct');
  console.error('4. Make sure database name (taskmanagement) is in connection string');
  process.exit(1);
});

