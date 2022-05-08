//
//  enc2.s
//  Assembler program to convert a string to magic ✨
//  The Big Apple
//
//  Created by Carl Ian Voller on 30/4/22.
//


.global _magic              // Allow other files to call this routine
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
