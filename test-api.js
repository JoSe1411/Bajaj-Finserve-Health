#!/usr/bin/env node

/**
 * Quick API test script
 * Run with: node test-api.js
 */

const testCases = [
  {
    name: 'Example A',
    data: ["a", "1", "334", "4", "R", "$"],
    expected: {
      odd_numbers: ["1"],
      even_numbers: ["334", "4"],
      alphabets: ["A", "R"],
      special_characters: ["$"],
      sum: "339",
      concat_string: "Ra"
    }
  },
  {
    name: 'Example B',
    data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"],
    expected: {
      odd_numbers: ["5"],
      even_numbers: ["2", "4", "92"],
      alphabets: ["A", "Y", "B"],
      special_characters: ["&", "-", "*"],
      sum: "103",
      concat_string: "ByA"
    }
  },
  {
    name: 'Example C',
    data: ["A", "ABcD", "DOE"],
    expected: {
      odd_numbers: [],
      even_numbers: [],
      alphabets: ["A", "ABCD", "DOE"],
      special_characters: [],
      sum: "0",
      concat_string: "EoDdCbAa"
    }
  }
];

async function testAPI() {
  const apiUrl = process.argv[2] || 'http://localhost:3000';
  
  console.log(`🧪 Testing API at: ${apiUrl}/bfhl\n`);

  for (const testCase of testCases) {
    try {
      console.log(`Testing ${testCase.name}...`);
      
      const response = await fetch(`${apiUrl}/bfhl`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: testCase.data })
      });

      const result = await response.json();
      
      if (!response.ok) {
        console.log(`❌ ${testCase.name} - HTTP ${response.status}`);
        console.log(result);
        continue;
      }

      // Check specific fields
      const checks = [
        { field: 'is_success', expected: true },
        { field: 'odd_numbers', expected: testCase.expected.odd_numbers },
        { field: 'even_numbers', expected: testCase.expected.even_numbers },
        { field: 'alphabets', expected: testCase.expected.alphabets },
        { field: 'special_characters', expected: testCase.expected.special_characters },
        { field: 'sum', expected: testCase.expected.sum },
        { field: 'concat_string', expected: testCase.expected.concat_string }
      ];

      let passed = true;
      for (const check of checks) {
        const actual = result[check.field];
        const expected = check.expected;
        
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          console.log(`❌ ${testCase.name} - ${check.field} mismatch`);
          console.log(`   Expected: ${JSON.stringify(expected)}`);
          console.log(`   Actual:   ${JSON.stringify(actual)}`);
          passed = false;
        }
      }

      if (passed) {
        console.log(`✅ ${testCase.name} - All checks passed`);
      }

      console.log(''); // Empty line
      
    } catch (error) {
      console.log(`❌ ${testCase.name} - Error: ${error.message}`);
    }
  }

  // Test health check
  try {
    console.log('Testing health check...');
    const response = await fetch(`${apiUrl}/bfhl`);
    const result = await response.json();
    
    if (response.ok && result.operation_code === 1) {
      console.log('✅ Health check - Passed');
    } else {
      console.log('❌ Health check - Failed');
      console.log(result);
    }
  } catch (error) {
    console.log(`❌ Health check - Error: ${error.message}`);
  }
}

// Check if fetch is available (Node 18+)
if (typeof fetch === 'undefined') {
  console.log('❌ This script requires Node.js 18+ or install node-fetch');
  console.log('Alternative: Use npm test to run the comprehensive test suite');
  process.exit(1);
}

testAPI().catch(console.error);
