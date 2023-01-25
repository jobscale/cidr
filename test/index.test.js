const { Cidr } = require('..');

const logger = console;

describe('test cidr', () => {
  describe('success cidr', () => {
    it('toBe prompt', () => {
      expect(new Cidr('0.0.0.0/0').has('160.160.160.160')).toBe(true);
    });

    it('toBe prompt', () => {
      expect(new Cidr('160.0.0.0/8').has('160.160.160.160')).toBe(true);
    });

    it('toBe prompt', () => {
      expect(new Cidr('160.160.0.0/16').has('160.160.160.160')).toBe(true);
    });

    it('toBe prompt', () => {
      expect(new Cidr('160.160.160.0/24').has('160.160.160.160')).toBe(true);
    });

    it('toBe prompt', () => {
      expect(new Cidr('160.160.160.160/32').has('160.160.160.160')).toBe(true);
    });

    it('toBe prompt', () => {
      expect(new Cidr('160.0.0.0/9').has('160.160.160.160')).toBe(false);
    });

    it('toBe prompt', () => {
      expect(new Cidr('160.160.0.0/17').has('160.160.160.160')).toBe(false);
    });

    it('toBe prompt', () => {
      expect(new Cidr('160.160.160.0/25').has('160.160.160.160')).toBe(false);
    });

    it('toBe prompt', () => {
      expect(new Cidr('160.160.160.161/32').has('160.160.160.160')).toBe(false);
    });

    it('toBe prompt', () => {
      expect(new Cidr('160.160.160.160').has('160.160.160.160')).toBe(true);
    });

    it('toBe prompt', () => {
      expect(new Cidr('160.160.160.161').has('160.160.160.160')).toBe(false);
    });
  });

  describe('exception cidr', () => {
    it('toThrow prompt', () => {
      expect(() => new Cidr('0.0.0.0/0').has('160.160.160')).toThrow("ipv4 required");
    });
  });
});
