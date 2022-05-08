# Lost my homework again!
## Challenge Description
Oh no! A virus just stole my master key to my homework folder and encrypted it!
It looks like it ran 2 different functions on my master key and gave me back a whole mess of numbers in txt.txt.
Thankfully, I managed to find the virus programs, but I don't understand the code at all!
Could you help me retrieve my master key again so I can continue doing my "homework"?

## Files
`distrib` is the challenge files given to the participants and a `Makefile` to compile the assembly programs.

## Solution
There are 2 assembly files given, `virus1.s` and `virus2.s`. 

`virus1.s` does the following:
1. Subtract 20 from the input
2. Divides the input by 4
3. Adds the remainder of the division to the input
4. Multiplies number by 3

`virus2.s` does the following:
1. Subtract 20 from the input
2. Divides the input by 4
3. Returns the remainder of the division.

Using this information, we can reverse the entire virus using the following program:

```python
import base64

f = open('./txt.txt', 'r')
[q, r] = [x.split(" ") for x in f.read().split("\n")]

def undoChar(c, b):
    quotient = ((c/3) - b) * 4 + b
    return int(quotient + 20)

o = ""
for i in range(len(q)):
    a = undoChar(int(q[i]), int(r[i]))
    o += chr(a)

print(base64.b64decode(o))
```

Flag
```
NYP{0rd1nal_ass3mbly_1s_s0_c00L}
```