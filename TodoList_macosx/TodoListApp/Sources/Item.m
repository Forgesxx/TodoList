//
//  Item.m
//  TodoListApp
//
//  Created by Danil Korotenko on 3/1/24.
//

#import "Item.h"

static NSString *const kItemId = @"id";
static NSString *const kItemText = @"item";

@interface Item ()

@property (strong) NSMutableDictionary *mutableDictionaryRepresentation;

@end

@implementation Item

+ (Item *)emptyItem
{
    return [[Item alloc] init];
}

+ (Item *)itemWithDictionary:(NSDictionary *)aDictionary
{
    return [[Item alloc] initWithDictionary:aDictionary];
}

- (instancetype)init
{
    self = [super init];
    if (self)
    {
        self.mutableDictionaryRepresentation = [NSMutableDictionary dictionary];
//        self.text = @"<Add text here....>";
        self.text = @"";
    }
    return self;
}

- (instancetype)initWithDictionary:(NSDictionary *)aDictionary
{
    self = [super init];
    if (self)
    {
        self.mutableDictionaryRepresentation = [NSMutableDictionary dictionaryWithDictionary:aDictionary];
    }
    return self;
}

- (BOOL)isEqual:(id)other
{
    if ([other isKindOfClass:[Item class]])
    {
        Item *item = (Item *)other;
        return self.itemId == item.itemId &&
            self.text == item.text;
    }
    return NO;
}

#pragma mark -

- (NSInteger)itemId
{
    NSInteger result = NSNotFound;
    NSNumber *number = [self.mutableDictionaryRepresentation objectForKey:kItemId];
    if (number)
    {
        result = number.intValue;
    }
    return result;
}

- (NSString *)text
{
    return [self.mutableDictionaryRepresentation objectForKey:kItemText];
}

- (void)setText:(NSString *)text
{
    [self.mutableDictionaryRepresentation setObject:text forKey:kItemText];
}

#pragma mark -

- (NSDictionary *)dictionaryRepresentation
{
    return self.mutableDictionaryRepresentation;
}

@end
