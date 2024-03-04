//
//  WebApi.m
//  TodoListApp
//
//  Created by Danil Korotenko on 2/29/24.
//

#import "WebApi.h"
#import "Preferences.h"
#import "Item.h"

static NSString *const kGetAllItemsURI =    @"getAllItems";
static NSString *const kAddItemURI =        @"addItem";
static NSString *const kSetItemURI =        @"setItem";
static NSString *const kDeleteItemURI =     @"deleteItem";

@interface WebApi ()

@property (strong) NSURLSession *session;

@end

@implementation WebApi

+ (WebApi *)shared
{
    static WebApi *shared = nil;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken,
    ^{
        shared = [[WebApi alloc] init];
    });
    return shared;
}

#pragma mark -

- (instancetype)init
{
    self = [super init];
    if (self)
    {
        NSURLSessionConfiguration *configuration = [NSURLSessionConfiguration defaultSessionConfiguration];

        self.session = [NSURLSession sessionWithConfiguration:configuration];
    }
    return self;
}

#pragma mark -

- (void)getAllItemsWithCompletionHandler:(void (^)(NSArray * _Nullable allItems, NSError * _Nullable error))completionHandler
{
    [self makePostRequest:kGetAllItemsURI data:nil completionHandler:
        ^(NSData * _Nullable data, NSError * _Nullable error)
        {
            if (error)
            {
                completionHandler(nil, error);
                return;
            }

            NSArray *allItems = nil;
            if (data)
            {
                NSError *err = nil;
                allItems = [NSJSONSerialization JSONObjectWithData:data
                    options:kNilOptions error:&err];
            }
            completionHandler(allItems, nil);
        }];
}

- (void)setItem:(Item *)anItem withCompletionHandler:(void (^)(NSError * _Nullable error))completionHandler
{
    NSArray *itemArray = [NSArray arrayWithObject:anItem.dictionaryRepresentation];

    NSError *error = nil;
    NSData *postData = [NSJSONSerialization dataWithJSONObject:itemArray options:0 error:&error];

    [self makePostRequest:kSetItemURI data:postData completionHandler:
        ^(NSData * _Nullable data, NSError * _Nullable error)
        {
            completionHandler(error);
        }];
}

- (void)addItem:(Item *)anItem withCompletionHandler:(void (^)(NSError * _Nullable error))completionHandler
{
    NSArray *itemArray = [NSArray arrayWithObject:anItem.text];

    NSError *error = nil;
    NSData *postData = [NSJSONSerialization dataWithJSONObject:itemArray options:0 error:&error];

    [self makePostRequest:kAddItemURI data:postData completionHandler:
        ^(NSData * _Nullable data, NSError * _Nullable error)
        {
            completionHandler(error);
        }];
}

- (void)deleteItems:(NSArray *)indexesArray withCompletionHandler:(void (^)(NSError * _Nullable error))completionHandler;
{
    NSError *error = nil;
    NSData *postData = [NSJSONSerialization dataWithJSONObject:indexesArray options:0 error:&error];

    [self makePostRequest:kDeleteItemURI data:postData completionHandler:
        ^(NSData * _Nullable data, NSError * _Nullable error)
        {
            completionHandler(error);
        }];
}

#pragma mark -

- (void)makePostRequest:(NSString *)anURI data:(NSData *)aData completionHandler:(void (^)(NSData * _Nullable data, NSError * _Nullable error))completionHandler
{
    NSURL *url = [[Preferences shared].currentServer URLByAppendingPathComponent:anURI];

    NSMutableURLRequest *request = [NSMutableURLRequest requestWithURL:url
                                                       cachePolicy:NSURLRequestUseProtocolCachePolicy
                                                   timeoutInterval:60.0];

    [request addValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    [request addValue:@"application/json" forHTTPHeaderField:@"Accept"];

    [request setHTTPMethod:@"POST"];

    if (aData)
    {
        [request setHTTPBody:aData];
    }

    NSURLSessionDataTask *postDataTask = [self.session dataTaskWithRequest:request completionHandler:
        ^(NSData *data, NSURLResponse *response, NSError *error)
        {
            completionHandler(data, error);
//            if (!error)
//            {
//                if (data)
//                {
//                    NSError *err = nil;
//                    NSArray *responseData = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:&err];
//                    NSLog(@"response: %@", responseData);
//                }
//            }
        }];

    [postDataTask resume];
}
@end
