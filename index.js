export class Cidr {
  constructor(cidr, trackBits = 128) {
    if (!cidr) throw new Error('cidr required');
    if (Array.isArray(cidr)) {
      this.child = cidr.map(ip => new Cidr(ip, trackBits));
      return;
    }
    this.family = this.getFamily(cidr);
    this.size = this.family === 6 ? trackBits : 32;
    const addrBits = cidr.split('/');
    this.mask = Number.parseInt(addrBits[1], 10);
    if (Number.isNaN(this.mask)) this.mask = this.family === 6 ? 64 : 32;
    const address = this[this.family === 6 ? 'ipv6ToBinary' : 'ipv4ToBinary'](addrBits[0]);
    this.min = address.substring(0, this.mask).padEnd(this.size, '0');
    this.max = address.substring(0, this.mask).padEnd(this.size, '1');
  }

  has(ip) {
    if (Array.isArray(this.child)) {
      return !!this.child.find(cidr => cidr.has(ip));
    }
    if (this.getFamily(ip) !== this.family) return false;
    const bin = this[this.family === 6 ? 'ipv6ToBinary' : 'ipv4ToBinary'](ip);
    return bin >= this.min && bin <= this.max;
  }

  getFamily(ip) {
    return ip.split(':').length === 8 || ip.match(/::/) ? 6 : 4;
  }

  ipv4ToBinary(ip) {
    const address = ip.split('.');
    if (address.length !== 4) throw new Error('ipv4 required');
    let bin = '';
    for (const i of address) {
      if (!i.match(/^\d{1,3}$/)) throw new Error('ipv4 required');
      const num = Number.parseInt(i, 10);
      if (!(num >= 0 && num <= 0xff)) throw new Error('ipv4 required');
      bin += num.toString(2).padStart(8, '0');
    }
    return bin.padEnd(this.size, '0');
  }

  ipv6ToBinary(ip) {
    const [headStr, tailStr] = ip.split('::');
    const head = headStr ? headStr.split(':').filter(Boolean) : [];
    const tail = tailStr ? tailStr.split(':').filter(Boolean) : [];
    const fill = new Array(8 - (head.length + tail.length)).fill('0');
    const address = [...head, ...fill, ...tail];

    if (address.length !== 8) throw new Error('ipv6 required');

    let bin = '';
    for (const i of address) {
      if (!i.match(/^[\da-f]{1,4}$/)) throw new Error('ipv6 required');
      const num = parseInt(i, 16);
      bin += num.toString(2).padStart(16, '0');
    }
    return bin.padEnd(this.size, '0');
  }
}

export default {
  Cidr,
};
