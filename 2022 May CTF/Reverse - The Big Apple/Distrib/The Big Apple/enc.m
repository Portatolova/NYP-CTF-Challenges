//
//  enc.m
//  The Big Apple
//
//  Created by Carl Ian Voller on 30/4/22.
//

#import <Foundation/Foundation.h>
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

@end

