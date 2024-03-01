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

+ (Item *)itemWithDictionary:(NSDictionary *)aDictionary
{
    return [[Item alloc] initWithDictionary:aDictionary];
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

- (NSInteger)itemId
{
    return [[self.mutableDictionaryRepresentation objectForKey:kItemId] intValue];
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
