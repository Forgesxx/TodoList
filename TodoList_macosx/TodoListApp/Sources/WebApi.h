//
//  WebApi.h
//  TodoListApp
//
//  Created by Danil Korotenko on 2/29/24.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface WebApi : NSObject

+ (WebApi *)shared;

- (void)getAllItemsWithCompletionHandler:
    (void (^)(NSArray * _Nullable allItems, NSError * _Nullable error))completionHandler;

@end

NS_ASSUME_NONNULL_END
