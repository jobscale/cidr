import { Cidr } from '../index.js';

describe('test cidr', () => {
  describe('success cidr', () => {
    it('toBe prompt 160.160.160.160 of 0.0.0/0', () => {
      expect(new Cidr('0.0.0.0/0').has('160.160.160.160')).toBe(true);
    });

    it('toBe prompt 160.160.160.160 of 0.0.0/8', () => {
      expect(new Cidr('160.0.0.0/8').has('160.160.160.160')).toBe(true);
    });

    it('toBe prompt 160.160.160.160 of 160.0.0/16', () => {
      expect(new Cidr('160.160.0.0/16').has('160.160.160.160')).toBe(true);
    });

    it('toBe prompt 160.160.160.160 of 160.160.0/24', () => {
      expect(new Cidr('160.160.160.0/24').has('160.160.160.160')).toBe(true);
    });

    it('toBe prompt 160.160.160.160 of 160.160.160/32', () => {
      expect(new Cidr('160.160.160.160/32').has('160.160.160.160')).toBe(true);
    });

    it('toBe prompt 160.160.160.160 of 0.0.0/9', () => {
      expect(new Cidr('160.0.0.0/9').has('160.160.160.160')).toBe(false);
    });

    it('toBe prompt 160.160.160.160 of 160.0.0/17', () => {
      expect(new Cidr('160.160.0.0/17').has('160.160.160.160')).toBe(false);
    });

    it('toBe prompt 160.160.160.160 of 160.160.0/25', () => {
      expect(new Cidr('160.160.160.0/25').has('160.160.160.160')).toBe(false);
    });

    it('toBe prompt 160.160.160.160 of 160.160.161/32', () => {
      expect(new Cidr('160.160.160.161/32').has('160.160.160.160')).toBe(false);
    });

    it('toBe prompt 160.160.160.160 of 160.160.160.160', () => {
      expect(new Cidr('160.160.160.160').has('160.160.160.160')).toBe(true);
    });

    it('toBe prompt 160.160.160.160 of 160.160.160.161', () => {
      expect(new Cidr('160.160.160.161').has('160.160.160.160')).toBe(false);
    });

    it('toBe prompt 160.160.160.160 of 172.16.0.0/12', () => {
      expect(new Cidr([
        '172.16.0.0/12',
        '160.160.160.160/30',
      ]).has('160.160.160.160')).toBe(true);
    });

    it('toBe prompt 160.160.160.160', () => {
      expect(new Cidr([
        '160.160.160.158',
        '160.160.160.159',
        '160.160.160.160',
      ]).has('160.160.160.160')).toBe(true);
    });

    it('toBe prompt 160.160.160.161', () => {
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
    it('toThrow prompt 160.160 of 0.0.0.0/0', () => {
      expect(() => new Cidr('0.0.0.0/0').has('160.160.160')).toThrow('ipv4 required');
    });

    it('toThrow prompt 160.160 of f.f.f.f', () => {
      expect(() => new Cidr('f.f.f.f').has('160.160.160.160')).toThrow('ipv4 required');
    });

    it('toThrow prompt 160.160 of 0.0.0.256', () => {
      expect(() => new Cidr('0.0.0.256').has('160.160.160.160')).toThrow('ipv4 required');
    });
  });

  describe('additional cidr checks', () => {
    describe('ipv6 mask length checks', () => {
      it('toBe true for /64 network', () => {
        // 2001:db8::/64 は先頭64ビットが一致すれば含まれる
        expect(new Cidr('2001:db8::/64').has('2001:db8:0:0:abcd::1')).toBe(true);
      });

      it('toBe false for /64 network mismatch', () => {
        expect(new Cidr('2001:db8::/64').has('2001:dead:beef::1')).toBe(false);
      });

      it('toBe true for /128 exact match', () => {
        const ip = '2001:db8::1';
        expect(new Cidr(`${ip}/128`).has(ip)).toBe(true);
      });

      it('toBe false for /128 exact mismatch', () => {
        expect(new Cidr('2001:db8::1/128').has('2001:db8::2')).toBe(false);
      });
    });

    describe('mixed ipv4 and ipv6 array', () => {
      it('toBe true when ip matches one of mixed cidrs', () => {
        const cidr = new Cidr([
          '192.168.1.0/24',
          '2001:db8::/64',
        ]);
        expect(cidr.has('192.168.1.42')).toBe(true);
        expect(cidr.has('2001:db8::1234')).toBe(true);
      });

      it('toBe false when ip not in any mixed cidrs', () => {
        const cidr = new Cidr([
          '192.168.1.0/24',
          '2001:db8::/64',
        ]);
        expect(cidr.has('10.0.0.1')).toBe(false);
        expect(cidr.has('2001:dead:beef::1')).toBe(false);
      });
    });
  });
});
