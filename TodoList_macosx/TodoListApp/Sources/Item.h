//
//  Item.h
//  TodoListApp
//
//  Created by Danil Korotenko on 3/1/24.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Item : NSObject

+ (Item *)emptyItem;
+ (Item *)itemWithDictionary:(NSDictionary *)aDictionary;

@property (readonly) NSInteger itemId;
@property (readwrite) NSString *text;

@property (readonly) NSDictionary *dictionaryRepresentation;

@end

NS_ASSUME_NONNULL_END
