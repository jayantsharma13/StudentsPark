import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('🧪 Testing MongoDB Connection...');
console.log('URI:', MONGODB_URI ? 'Found' : 'Missing');

async function testConnection() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Successfully connected to MongoDB Atlas!');
    
    // Test creating a simple document
    const testSchema = new mongoose.Schema({
      message: String,
      timestamp: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('Test', testSchema);
    
    const testDoc = new TestModel({
      message: 'Backend connection test successful!'
    });
    
    await testDoc.save();
    console.log('✅ Successfully created test document in database!');
    
    // Clean up test document
    await TestModel.deleteOne({ _id: testDoc._id });
    console.log('✅ Test document cleaned up!');
    
    await mongoose.disconnect();
    console.log('✅ Database connection test completed successfully!');
    
  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
  }
}

testConnection();
