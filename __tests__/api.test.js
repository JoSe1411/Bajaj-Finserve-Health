const request = require('supertest');
const app = require('../server');

describe('BFHL API', () => {
  describe('POST /bfhl', () => {
    test('should process Example A correctly', async () => {
      const inputData = {
        data: ["a", "1", "334", "4", "R", "$"]
      };

      const response = await request(app)
        .post('/bfhl')
        .send(inputData)
        .expect(200);

      expect(response.body.is_success).toBe(true);
      expect(response.body.odd_numbers).toEqual(["1"]);
      expect(response.body.even_numbers).toEqual(["334", "4"]);
      expect(response.body.alphabets).toEqual(["A", "R"]);
      expect(response.body.special_characters).toEqual(["$"]);
      expect(response.body.sum).toBe("339");
      expect(response.body.concat_string).toBe("Ra");
    });

    test('should process Example B correctly', async () => {
      const inputData = {
        data: ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]
      };

      const response = await request(app)
        .post('/bfhl')
        .send(inputData)
        .expect(200);

      expect(response.body.is_success).toBe(true);
      expect(response.body.odd_numbers).toEqual(["5"]);
      expect(response.body.even_numbers).toEqual(["2", "4", "92"]);
      expect(response.body.alphabets).toEqual(["A", "Y", "B"]);
      expect(response.body.special_characters).toEqual(["&", "-", "*"]);
      expect(response.body.sum).toBe("103");
      expect(response.body.concat_string).toBe("ByA");
    });

    test('should process Example C correctly', async () => {
      const inputData = {
        data: ["A", "ABcD", "DOE"]
      };

      const response = await request(app)
        .post('/bfhl')
        .send(inputData)
        .expect(200);

      expect(response.body.is_success).toBe(true);
      expect(response.body.odd_numbers).toEqual([]);
      expect(response.body.even_numbers).toEqual([]);
      expect(response.body.alphabets).toEqual(["A", "ABCD", "DOE"]);
      expect(response.body.special_characters).toEqual([]);
      expect(response.body.sum).toBe("0");
      expect(response.body.concat_string).toBe("EoDdCbAa");
    });

    test('should handle empty data array', async () => {
      const inputData = { data: [] };

      const response = await request(app)
        .post('/bfhl')
        .send(inputData)
        .expect(400);

      expect(response.body.is_success).toBe(false);
      expect(response.body.error).toBe('Data array cannot be empty');
    });

    test('should handle invalid input format', async () => {
      const inputData = { invalid: "field" };

      const response = await request(app)
        .post('/bfhl')
        .send(inputData)
        .expect(400);

      expect(response.body.is_success).toBe(false);
      expect(response.body.error).toBe('Invalid input format');
    });

    test('should handle negative numbers correctly', async () => {
      const inputData = {
        data: ["-5", "-2", "3", "0"]
      };

      const response = await request(app)
        .post('/bfhl')
        .send(inputData)
        .expect(200);

      expect(response.body.odd_numbers).toEqual(["-5", "3"]);
      expect(response.body.even_numbers).toEqual(["-2", "0"]);
      expect(response.body.sum).toBe("-4");
    });
  });

  describe('GET /bfhl', () => {
    test('should return health check', async () => {
      const response = await request(app)
        .get('/bfhl')
        .expect(200);

      expect(response.body.operation_code).toBe(1);
      expect(response.body.message).toBe('BFHL API is running');
    });
  });

  describe('GET /', () => {
    test('should return API information', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body.message).toBe('BFHL API Server');
      expect(response.body.version).toBe('1.0.0');
    });
  });

  describe('404 handling', () => {
    test('should return 404 for non-existent routes', async () => {
      const response = await request(app)
        .get('/nonexistent')
        .expect(404);

      expect(response.body.is_success).toBe(false);
      expect(response.body.error).toBe('Endpoint not found');
    });
  });
});
