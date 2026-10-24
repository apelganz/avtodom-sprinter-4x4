import math
def tile(r0, g=6, r=11, o=4, ri=0):
    i = 32 - g/2; cut = math.sqrt(r*r - (g/2)**2); y = 32 - cut
    f = lambda v: ('%.2f' % v).rstrip('0').rstrip('.')
    return f"M{f(o+r0)} {f(o)}H{f(i-r0)}Q{f(i)} {f(o)} {f(i)} {f(o+r0)}V{f(y)}A{r} {r} 0 0 0 {f(y)} {f(i)}H{f(o+r0)}Q{f(o)} {f(i)} {f(o)} {f(i-r0)}V{f(o+r0)}Q{f(o)} {f(o)} {f(o+r0)} {f(o)}Z"
def shapes(r0, C='currentColor', A='var(--logo-accent,#02FFE0)'):
    t = tile(r0)
    return ('<g transform="translate(32 32) rotate(45) scale(.74) translate(-32 -32)">' + ''.join(f'<path d="{t}" fill="{C}" transform="rotate({rot} 32 32)"/>' for rot in (0, 90, 180, 270)) + f'</g><circle cx="32" cy="32" r="5" fill="{A}"/>')
