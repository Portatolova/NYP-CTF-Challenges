# The Big Apple
## Challenge Description
how deep into the apple ecosystem can you go...

when the flag is entered into the watchOS companion app, this is produced on the companion iPhone:
VGytUWU{Tn9jM1Z{WlY4fFhzY3qlRklxYUROZnJrTkNYMkFpWTE5fnRIVnuiVEJnYUROd2NGOXRNMTmsTTJNfFqETnZNV1JzZmE9PQ==

P.S. A Mac, iPhone and Apple Watch is needed to run this project, but you don't need anything to solve this challenge. This challenge can be solved by understanding and reversing the code found inside this Xcode Project.

## Files
`Distrib` is the files given to the participants and `sol.py` is the solution to the challenge

## Solution
Upon analysing the entire Xcode project, you'll realise almost the entire thing is redundant and irrelevant. In the watchOS app located inside `The Big Apple WatchKit Extension`, the app contains a textbox that send the data to the iPhone companion app when a button is pressed.

Inside the iPhone companion app inside `The Big Apple`, `ContentView.swift` contains an `OutputFieldView` component that takes `watchOSModel.message` as a prop. We then look inside `OutputField.swift` to find even more UIKit to SwiftUI garbage that is largely distraction from the entire challenge. However there is one function that is actually of input here:

```swift
func onInputUpdate() {
    let encoder = MySuperSecretEncoder()
    let txt = Data(self.input.wrappedValue.utf8).base64EncodedString();
    self.textField.text = encoder.encode(txt) ?? ""
}
```

The UIKit component calls a function called `MySuperSecretEncoder`, then Base64 encodes the original message and sends it to the `encode` method of the `MySuperSecretEncoder` object.

If we look inside `enc.h`, we can see the Objective-C interface for the `MySuperSecretEncoder` class. Then inside `enc.m`, we can see the actual `MySuperSecretEncoder` class.

```objc
#import "enc.h"
#import "magic.h"

@implementation MySuperSecretEncoder

- (NSString*)encode:(NSString*)input {

    NSData *plainData = [input dataUsingEncoding:NSUTF8StringEncoding];
    NSString *encodedString = [plainData base64EncodedStringWithOptions:0];
    
    const char *encodedArray = [encodedString UTF8String];
    char magicString[255] = "";
    
    magic(encodedArray, magicString);
    
    return [NSString stringWithCString:magicString encoding:NSASCIIStringEncoding];
    
}
```

This function appears to Base64 encode the same string again, followed by passing the string into yet another function `magic()` which takes a *char array and a char array. We can find the declarations for the `magic()` function inside `magic.h` and the ARM64 Assembly code for the `magic()` function inside `magic.s`.

`magic.s`:

```arm
.global _magic
.align 4

_magic: MOV    X4, X1

loop:    LDRB    W5, [X0], #1

    CMP    W5, #'z'
    B.GT    cont

    CMP    W5, #'a'
    B.LT    cont

    ADD    W5, W5, #1
cont:
    STRB    W5, [X1], #1    // store character to output str
    CMP    W5, #0           // stop on hitting a null character
    B.NE    loop            // loop if character isn't null
    SUB    X0, X1, X4       // get the length by subtracting the pointers
    RET                     // Return to caller

```

This assembler program first loads the entire string and loops through every character in the string:

```arm
loop:    LDRB    W5, [X0], #1
```

`LDRB` means load bytes of data, typically used to read from memory. So `LDRB W5, [X0], #1` inside the `loop` means load each character of the input `X0` into register `W5`, then increment the pointer by `#1` aka the number 1.

Inside the loop, we first see 2 comparison or `CMP` operations,

```arm
CMP    W5, #'z'
B.GT    cont

CMP    W5, #'a'
B.LT    cont
```

The first `CMP W5, #'z'` checks if the value in the register `W5` is greater than the value 'z', aka its checking if the ascii value of the character inside `W5` is greater (or `B.GT`) than the ascii value of the `'z'` character. If it is, `cont` or continue to the next iteration of the loop.

The second `CMP W5, #'a'` does something similar to the first, except its checking if the character's inside `W5`'s ascii value is less than the ascii value of `'a'`. If it is, `cont` or continue to the next iteration of the loop.

Essentially, the above part of the program is checking if the character is a lowercase letter, and if it isn't, skip to the next character.

Finally, there is

```arm
ADD    W5, W5, #1
```

which takes the ascii value of the character inside of the `W5` register and increments it by 1, so the letter `'a'` for example with ascii value of 97 becomes `'b'` with ascii value of 98.

So the program is shifting every lowercase letter to the right by one.

The bottom part of the program inside the `cont` is already labelled so I will not explain too in depth, but essentially it just returns the final string.

We finally have enough information to reverse the challenge prompt's encoded string.

Using the program found in `sol.py` of this repository, you'll be able to reverse the encoding and generate the flag:
```
NYP{should_1_g3t_th3_n3w_mac_studi0_h3lp_m3_d3c1d3_1dk}
```