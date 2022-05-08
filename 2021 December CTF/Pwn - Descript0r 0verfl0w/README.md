# Descript0r 0verfl0w
## Challenge Description

What have you done to Greet0r??? >:(

His best friend Descript0r is extra mad at you now. Becareful I heard he knows kung-fd!

## Files
`distrib` is the challenge files given to the participants and `Program` is the challenge host source files.

## Solution
Disassemble the given elf binary, overflow the input buffer until the friendliness variable has been overwritten to `0xcafebabe` and the file descriptor variable has been overwritten to `0x05` since the program actually subtracts 5 from the file descriptor variable.

This then sets the `read` syscall to read from file descriptor 0, which is actually STDIN or Standard Input. The flag is then found as it is being piped into Descript0r's STDIN.

Solution code:
```bash
# overflows fd variable to 0x05 then subtracts 5 to get 0 (fd for stdin) which is where the flag is
python2 -c 'import pwn; print "a"*64 + pwn.p64(0xcafebabe) + "\x00"*5 + pwn.p64(0x05)' | nc ip port
```

Flag
```
NYP{m3ss1ng_w1th_f1l3_d3scr1pt0rs}
```