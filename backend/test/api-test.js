// API Test Script
// Run this with Node.js to test all the API endpoints

import axios from 'axios';

const API_URL = 'http://localhost:5000/api/data';
let createdId = null;

// Helper function to make API requests
async function makeRequest(url, method, body = null) {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      data: body
    };

    const response = await axios(url, options);
    const data = response.data;
    
    console.log(`\n${method} ${url}`);
    console.log(`Status: ${response.status} ${response.statusText || ''}`);
    console.log('Response:', JSON.stringify(data, null, 2));
    
    return data;
  } catch (error) {
    console.log(`\n${method} ${url}`);
    console.log(`Status: ${error.response?.status || 'Error'}`);
    console.log('Error:', error.response?.data || error.message);
    return error.response?.data || { error: error.message };
  }
}

// Test all endpoints
async function testAllEndpoints() {
  try {
    console.log('=== TESTING API ENDPOINTS ===');
    
    // 1. POST - Create a new data entry
    console.log('\n=== 1. CREATING NEW DATA ===');
    const newData = {
      data: {
        name: 'Test Product',
        price: 29.99,
        description: 'This is a test product',
        inStock: true
      },
      collection: 'products'
    };
    
    const createResult = await makeRequest(API_URL, 'POST', newData);
    createdId = createResult.data._id;
    
    // 2. GET - Retrieve all data
    console.log('\n=== 2. RETRIEVING ALL DATA ===');
    await makeRequest(API_URL, 'GET');
    
    // 3. GET - Retrieve by collection
    console.log('\n=== 3. RETRIEVING BY COLLECTION ===');
    await makeRequest(`${API_URL}?collection=products`, 'GET');
    
    // 4. GET - Retrieve by ID
    console.log('\n=== 4. RETRIEVING BY ID ===');
    await makeRequest(`${API_URL}/${createdId}`, 'GET');
    
    // 5. PUT - Update data
    console.log('\n=== 5. UPDATING DATA (PUT) ===');
    const updatedData = {
      data: {
        name: 'Updated Product',
        price: 39.99,
        description: 'This product has been updated',
        inStock: true,
        featured: true
      },
      collection: 'products'
    };
    
    await makeRequest(`${API_URL}/${createdId}`, 'PUT', updatedData);
    
    // 6. PATCH - Partially update data
    console.log('\n=== 6. PARTIALLY UPDATING DATA (PATCH) ===');
    const partialUpdate = {
      'data.price': 49.99,
      'data.onSale': true
    };
    
    await makeRequest(`${API_URL}/${createdId}`, 'PATCH', partialUpdate);
    
    // 7. DELETE - Delete data
    console.log('\n=== 7. DELETING DATA ===');
    await makeRequest(`${API_URL}/${createdId}`, 'DELETE');
    
    // 8. Verify deletion
    console.log('\n=== 8. VERIFYING DELETION ===');
    await makeRequest(`${API_URL}/${createdId}`, 'GET');
    
    console.log('\n=== API TESTING COMPLETE ===');
  } catch (error) {
    console.error('Error testing API:', error);
  }
}

// Run the tests
testAllEndpoints();