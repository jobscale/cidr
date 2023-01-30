const { Cidr } = require('..');

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

    it('toBe prompt', () => {
      expect(new Cidr([
        '172.16.0.0/12',
        '160.160.160.160/30',
      ]).has('160.160.160.160')).toBe(true);
    });

    it('toBe prompt', () => {
      expect(new Cidr([
        '160.160.160.158',
        '160.160.160.159',
        '160.160.160.160',
      ]).has('160.160.160.160')).toBe(true);
    });

    it('toBe prompt', () => {
      expect(new Cidr([
        '160.160.160.158',
        '160.160.160.159',
        '160.160.160.160',
      ]).has('160.160.160.161')).toBe(false);
    });
  });

  describe('exception ipv6 cidr', () => {
    it('ipv6 toBe prompt', () => {
      expect(new Cidr('::/0').has('2001:268:c28c:4658:2545:3a4f:d7b7:4203')).toBe(true);
    });
  });

  describe('exception cidr', () => {
    it('toThrow prompt', () => {
      expect(() => new Cidr('0.0.0.0/0').has('160.160.160')).toThrow('ipv4 required');
    });

    it('toThrow prompt', () => {
      expect(() => new Cidr('f.f.f.f').has('160.160.160.160')).toThrow('ipv4 required');
    });

    it('toThrow prompt', () => {
      expect(() => new Cidr('0.0.0.256').has('160.160.160.160')).toThrow('ipv4 required');
    });
  });
});
