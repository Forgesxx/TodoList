//
//  Document.m
//  TodoListApp
//
//  Created by Danil Korotenko on 2/29/24.
//

#import "Document.h"

@interface Document ()

@end

@implementation Document

- (instancetype)init
{
    self = [super init];
    if (self)
    {
    }
    return self;
}

+ (BOOL)autosavesInPlace
{
    return YES;
}


- (NSString *)windowNibName
{
    return @"Document";
}

- (NSData *)dataOfType:(NSString *)typeName error:(NSError **)outError
{
    [NSException raise:@"UnimplementedMethod" format:@"%@ is unimplemented", NSStringFromSelector(_cmd)];
    return nil;
}

- (BOOL)readFromData:(NSData *)data ofType:(NSString *)typeName error:(NSError **)outError
{
    [NSException raise:@"UnimplementedMethod" format:@"%@ is unimplemented", NSStringFromSelector(_cmd)];
    return YES;
}

- (void)awakeFromNib
{
    NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];

    NSURLSession *session = [NSURLSession sessionWithConfiguration:configuration delegate:self delegateQueue:nil];

    NSURL *url = [NSURL URLWithString:@"http://localhost:8080/getAllItems"];

    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:60.0];

    [request addValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    [request addValue:@"application/json" forHTTPHeaderField:@"Accept"];

    [request setHTTPMethod:@"POST"];

//    NSDictionary *mapData = [[NSDictionary alloc] initWithObjectsAndKeys: @"TEST IOS", @"name",
//                     @"IOS TYPE", @"typemap",
//                     nil];
//NSData *postData = [NSJSONSerialization dataWithJSONObject:mapData options:0 error:&error];
//[request setHTTPBody:postData];


    NSURLSessionDataTask *postDataTask = [session dataTaskWithRequest:request completionHandler:
        ^(NSData *data, NSURLResponse *response, NSError *error)
        {
            if (!error)
            {
                NSError *err = nil;
                NSArray *responseData = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&err];
                NSLog(@"response: %@", responseData);

            }

        }];

[postDataTask resume];

}

@end
