//
//  ListWindow.m
//  TodoListApp
//
//  Created by Danil Korotenko on 3/3/24.
//

#import "ListWindow.h"

@interface ListWindow ()

@end

@implementation ListWindow

// singleton implementation
+ (ListWindow *)sharedController
{
    static ListWindow *sharedController = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken,
    ^{
        sharedController = [[ListWindow alloc] init];
    });
    return sharedController;
}

- (instancetype)init
{
    self = [super initWithWindowNibName:@"ListWindow"];
    if (self)
    {
        [self window]; // load window
    }
    return self;
}

- (void)awakeFromNib
{
}

@end
