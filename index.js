const logger = console;

class Cidr {
  constructor(cidr, trackBits) {
    if (!cidr) return;
    this.family = cidr.split(':').length === 8 ? 6 : 4;
    this.size = this.family === 6 ? (trackBits || 64) : 32;
    const addrBits = cidr.split('/');
    this.mask = parseInt(addrBits[1], 10);
    if (Number.isNaN(this.mask)) this.mask = this.family === 6 ? 64 : 32;
    this.address = this[this.family === 6 ? 'ipv6ToBinary' : 'ipv4ToBinary'](addrBits[0]);
    this.min = this.address.substring(0, this.mask).padEnd(this.size, '0');
    this.max = this.address.substring(0, this.mask).padEnd(this.size, '1');
  }

  has(ip) {
    const bin = this[this.family === 6 ? 'ipv6ToBinary' : 'ipv4ToBinary'](ip);
    return bin >= this.min && bin <= this.max;
  }

  ipv4ToBinary(ip) {
    const address = ip.split('.');
    if (address.length !== 4) throw new Error('ipv4 required');
    let bin = '';
    for (const i of address) {
      if (!i.match(/^\d{1,3}$/) || parseInt(i, 10) > 255) return '0'.repeat(this.size);
      bin += parseInt(i, 10).toString(2).padStart(8, '0');
    }
    return bin.padEnd(this.size, '0');
  }

  ipv6ToBinary(ip) {
    const address = ip.split(':');
    if (address.length !== 6) throw new Error('ipv6 required');
    let bin = '';
    for (let i of address) {
      if (i === '') i = '0';
      if (!i.match(/^[\da-f]{0,4}$/)) return '0'.repeat(this.size);
      bin += parseInt(i, 16).toString(2).padStart(16, '0');
    }
    return bin.padEnd(this.size, '0');
  }
}

module.exports = {
  Cidr,
};
