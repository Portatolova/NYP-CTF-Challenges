# Escaping Class
## Challenge Description
Class can be SOOOO boring. I just really wanna escape. 

## Files
`Program` is the challenge host source files.

## Solution

We are given a code editor on the left and a compiler on the right. The page gives us a clue that the compiler is running NodeJS.

We can confirm its NodeJS by purposefully creating a javascript error, this will cause the compiler to return useful debug logs confirming that we are inside a Node VM.

Since we are inside a node vm, we can break out of it using the below code:

```
console.log((this.constructor.constructor("return flag"))());
```

This code allows us to break out of the node vm and access variables inside the process global scope. We then return the flag which is a variable defined inside the global scope.

Recommended Read: https://gist.github.com/jcreedcmu/4f6e6d4a649405a9c86bb076905696af

Flag
```
NYP{yay_i_can_sleep_now}
```