# Meet Greet0r
## Challenge Description
Meet Greet0r! He's a cute little program that is absolutely just DYING to meet new people.

## Files
`distrib` is the challenge files given to the participants and `Program` is the challenge host source files.

## Solution

Analyse the C code given, notice use of insecure `gets` function used. This allows us to overflow the `loopCount` variable if we pass an input to `gets` that is of length > 72 (as we need to round 52 to the nearest multiple of 16 making it 64, then add 8 for leave and ret stack space).

Use the below solution to overwrite 

Solution code:
```bash
# prints 'a' 72 times to reach loopCount on stack, then change its value to 6, afterwards pipe to Greet0r
python2 -c "import pwn; print 'a'*72+pwn.p64(0x06)" | nc ip port
```

Flag
```
NYP{m3ss1ng_w1th_f1l3_d3scr1pt0rs}
```