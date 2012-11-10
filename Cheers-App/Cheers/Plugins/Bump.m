 
#import "Bump.h"
#import <Cordova/CDV.h>
#import "BumpClient.h"

@implementation Bump

- (void)bump:(CDVInvokedUrlCommand*)command
{
     [BumpClient configureWithAPIKey:@"8751445c74854cd387db6e09050ebb22" andUserID:[[UIDevice currentDevice] name]];
    
    [[BumpClient sharedClient] setMatchBlock:^(BumpChannelID channel) {
        [self bumpMatch], [[BumpClient sharedClient] userIDForChannel:channel];
        [[BumpClient sharedClient] confirmMatch:YES onChannel:channel];
    }];
    
    [[BumpClient sharedClient] setChannelConfirmedBlock:^(BumpChannelID channel) {
        NSLog(@"Channel with %@ confirmed.", [[BumpClient sharedClient] userIDForChannel:channel]);
        [[BumpClient sharedClient] sendData:[[NSString stringWithFormat:@"Hello, world!"] dataUsingEncoding:NSUTF8StringEncoding]
                                  toChannel:channel];
    }];
    
    [[BumpClient sharedClient] setDataReceivedBlock:^(BumpChannelID channel, NSData *data) {
        NSLog(@"Data received from %@: %@",
              [[BumpClient sharedClient] userIDForChannel:channel],
              [NSString stringWithCString:[data bytes] encoding:NSUTF8StringEncoding]);
    }];
    
    [[BumpClient sharedClient] setConnectionStateChangedBlock:^(BOOL connected) {
        if (connected) {
            
            [self bumpConnected];
            
        } else {
            NSLog(@"DISCONNECTED");
            [self bumpDisconnected];
        }
    }];
    
    [[BumpClient sharedClient] setBumpEventBlock:^(bump_event event) {
        switch(event) {
            case BUMP_EVENT_BUMP:
                NSLog(@"BUMP-EVENT");
                [self bumpDetected];
                break;
            case BUMP_EVENT_NO_MATCH:
                NSLog(@"NO-MATCH");
                [self bumpNoMatch];
                break;
        }
    }];
   
}


- (void) bumpMatch {
    // caption = input;
    NSLog(@"Bump connected...");
    NSString *js = [NSString stringWithFormat:@"updateContent( '%@' );", @"MATCH"];
    [self writeJavascript:js];
}

- (void) bumpNoMatch {
    // caption = input;
    NSLog(@"No match.");
    NSString *js = [NSString stringWithFormat:@"updateContent( '%@' );", @"NO-MATCH"];
    [self writeJavascript:js];
}

- (void) bumpDetected {
    // caption = input;
    NSLog(@"Bump Deteced.");
    NSString *js = [NSString stringWithFormat:@"updateContent( '%@' );", @"BUMP-DETECTED"];
    [self writeJavascript:js];
}

- (void) bumpDisconnected {
    // caption = input;
    NSLog(@"Bump connected...");
    NSString *js = [NSString stringWithFormat:@"updateContent( '%@' );", @"DISCONNECTED"];
    [self writeJavascript:js];
}

- (void) bumpConnected {
    // caption = input;
    NSLog(@"Bump connected...");
    NSString *js = [NSString stringWithFormat:@"updateContent( '%@' );", @"CONNECTED"];
    [self writeJavascript:js];
}


@end