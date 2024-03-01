//
//  WebApi.h
//  TodoListApp
//
//  Created by Danil Korotenko on 2/29/24.
//

#import <Foundation/Foundation.h>
#import "Item.h"

NS_ASSUME_NONNULL_BEGIN

@interface WebApi : NSObject

+ (WebApi *)shared;

- (void)getAllItemsWithCompletionHandler:
    (void (^)(NSArray * _Nullable allItems, NSError * _Nullable error))completionHandler;
- (void)setItem:(Item *)anItem withCompletionHandler:(void (^)(NSError * _Nullable error))completionHandler;
- (void)addItem:(Item *)anItem withCompletionHandler:(void (^)(NSError * _Nullable error))completionHandler;

@end

NS_ASSUME_NONNULL_END
